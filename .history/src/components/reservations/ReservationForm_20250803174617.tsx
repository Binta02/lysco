// ReservationForm.tsx avec blocage intelligent des dates/heures
import { useCart } from "@/src/components/cart/CartContext";
import { supabase } from "@/src/integrations/supabase/client";
import "@/src/utils/calendarLocale";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

const HOURS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];
const FORMATION_PRICES = { hour: 10, halfDay: 25, fullDay: 45 };
const BUREAU_PRICES = { halfDay: 125, fullDay: 250 };
const COWORKING_PRICE_PER_HOUR = 5;

export default function ReservationForm({
  serviceType,
}: {
  serviceType: string;
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<
    "hour" | "halfDay" | "fullDay"
  >("hour");
  const [disabledHours, setDisabledHours] = useState<string[]>([]);
  const [fullyBookedDates, setFullyBookedDates] = useState<string[]>([]);
  const [partialBlocks, setPartialBlocks] = useState<
    Record<string, { morning: boolean; afternoon: boolean }>
  >({});
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  const isCoworking = serviceType === "coworking-space";
  const isFormation = serviceType === "formation-room";
  const isBureau = serviceType === "location-bureau";
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchDisabledDatesAndHours() {
      setLoading(true);
      const { data, error } = await supabase
        .from("reservations")
        .select("reservation_date, period")
        .ilike("reservation_type", `%${serviceType}%`);

      if (error) {
        console.error("Erreur Supabase:", error);
        setDisabledHours([]);
        setFullyBookedDates([]);
        setPartialBlocks({});
        setLoading(false);
        return;
      }

      const reservedHours: string[] = [];
      const fullDates: string[] = [];
      const partials: Record<string, { morning: boolean; afternoon: boolean }> =
        {};

      data.forEach(({ reservation_date, period }) => {
        const date = reservation_date;
        const p = period as string;

        if (!partials[date]) {
          partials[date] = { morning: false, afternoon: false };
        }

        // 1. Gestion des journées complètes
        if (p === "fullDay") {
          fullDates.push(date);
          partials[date].morning = true;
          partials[date].afternoon = true;
        }
        // 2. Gestion des demi-journées
        else if (p === "morning") {
          partials[date].morning = true;
        } else if (p === "afternoon") {
          partials[date].afternoon = true;
        }
        // 3. Gestion des heures spécifiques
        else if (p.startsWith("hour-")) {
          const h = p.split("-")[1];
          reservedHours.push(`${date}-${h}`);

          // NE PLUS BLOQUER LA DEMI-JOURNÉE AUTOMATIQUEMENT POUR LE COWORKING
          if (!isCoworking) {
            if (["09:00", "10:00", "11:00", "12:00"].includes(h)) {
              partials[date].morning = true;
            }
            if (["13:00", "14:00", "15:00", "16:00"].includes(h)) {
              partials[date].afternoon = true;
            }
          }
        }
        // 4. Gestion des plages horaires (format JSON)
        else if (p.includes('["')) {
          const regex = /\"(\d{4}-\d{2}-\d{2}) (\d{2}):(\d{2})/g;
          const matches = Array.from(p.matchAll(regex));

          if (matches.length >= 2) {
            const startHour = parseInt(matches[0][2], 10);
            const endHour = parseInt(matches[1][2], 10);

            if (startHour <= 9 && endHour >= 16) {
              fullDates.push(date);
              partials[date].morning = true;
              partials[date].afternoon = true;
            } else if (startHour >= 9 && endHour <= 12) {
              if (!isCoworking) partials[date].morning = true;
            } else if (startHour >= 13 && endHour <= 16) {
              if (!isCoworking) partials[date].afternoon = true;
            }

            for (let h = startHour; h < endHour; h++) {
              const hh = h.toString().padStart(2, "0") + ":00";
              reservedHours.push(`${date}-${hh}`);
            }
          }
        }
      });

      // Pour le coworking, on ne bloque pas les demi-journées automatiquement
      if (!isCoworking) {
        Object.entries(partials).forEach(([date, { morning, afternoon }]) => {
          if (morning && afternoon && !fullDates.includes(date)) {
            fullDates.push(date);
          }
        });
      }

      setDisabledHours(reservedHours);
      setFullyBookedDates(fullDates);
      setPartialBlocks(partials);
      setLoading(false);
    }

    if (selectedDate) fetchDisabledDatesAndHours();
  }, [selectedDate, serviceType]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const markedDates = {
    // Dates complètement bloquées
    ...Object.fromEntries(
      fullyBookedDates.map((d) => [
        d,
        {
          disabled: true,
          disableTouchEvent: true,
          marked: true,
          dotColor: "red",
          customStyles: {
            container: {
              backgroundColor: "#FFC0CB80", // Rose clair semi-transparent
              borderRadius: 8,
            },
            text: {
              color: "#dc3545",
              textDecorationLine: "line-through",
            },
          },
        },
      ])
    ),
    // Dates avec demi-journées bloquées
    ...Object.fromEntries(
      Object.entries(partialBlocks)
        .filter(([date]) => !fullyBookedDates.includes(date))
        .map(([date, { morning, afternoon }]) => [
          date,
          {
            disabled: false,
            marked: true,
            dotColor: "orange",
            customStyles: {
              container: {
                borderColor: "#FFA500",
                borderWidth: 1,
                borderRadius: 8,
              },
            },
          },
        ])
    ),
    // Dimanches
    ...generateSundayMarks(),
  };

  const isHourDisabled = (hour: string) => {
    if (!selectedDate) return false;

    const dateStr = selectedDate;

    // 1. Vérifier si la date est complètement bloquée
    if (fullyBookedDates.includes(dateStr)) return true;

    // 2. Vérifier les demi-journées bloquées
    if (partialBlocks[dateStr]) {
      const isMorningHour = ["09:00", "10:00", "11:00", "12:00"].includes(hour);
      const isAfternoonHour = ["13:00", "14:00", "15:00", "16:00"].includes(
        hour
      );

      if (isMorningHour && partialBlocks[dateStr].morning) return true;
      if (isAfternoonHour && partialBlocks[dateStr].afternoon) return true;
    }

    // 3. Vérifier les heures spécifiques bloquées
    if (disabledHours.includes(`${dateStr}-${hour}`)) return true;

    return false;
  };

  function toggleHour(hour: string) {
    setSelectedHours((prev) =>
      prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
    );
  }

  function calculatePrice() {
    if (isCoworking) return selectedHours.length * COWORKING_PRICE_PER_HOUR;
    if (isFormation)
      return selectedOption === "hour"
        ? selectedHours.length * FORMATION_PRICES.hour
        : FORMATION_PRICES[selectedOption];
    if (isBureau) return BUREAU_PRICES[selectedOption as "halfDay" | "fullDay"];
    return 0;
  }

  // function handleReservation() {
  //   const price = calculatePrice();
  //   const label =
  //     `${serviceType} — ${selectedDate} ` +
  //     (isCoworking || (isFormation && selectedOption === "hour")
  //       ? selectedHours.join(", ")
  //       : selectedOption === "halfDay"
  //       ? selectedHours[0] === "morning"
  //         ? "Demi-journée matin"
  //         : "Demi-journée après-midi"
  //       : "Journée complète");

  //   addItem({
  //     id: `${serviceType}-${selectedDate}-${selectedOption}-${selectedHours.join(
  //       ","
  //     )}`,
  //     title: label,
  //     price,
  //     quantity: 1,
  //   });

  //   alert(`✅ Ajouté au panier : ${label} (${price}€)`);
  // }

  async function handleReservation() {
    if (!selectedDate || selectedHours.length === 0) {
      alert("❌ Veuillez sélectionner une ou plusieurs heures.");
      return;
    }

    const price = calculatePrice();

    // Construction du label
    const label =
      `${serviceType} — ${selectedDate} ` + selectedHours.join(", ");

    // Trier les heures (ex: ["09:00", "10:00"])
    const sortedHours = selectedHours
      .map((h) => parseInt(h.split(":")[0], 10))
      .sort((a, b) => a - b);

    // Début = première heure, Fin = dernière heure + 1h
    const startHour = sortedHours[0];
    const endHour = sortedHours[sortedHours.length - 1] + 1;

    const start = `${selectedDate} ${startHour
      .toString()
      .padStart(2, "0")}:00:00+00`;
    const end = `${selectedDate} ${endHour
      .toString()
      .padStart(2, "0")}:00:00+00`;

    const periodRange = `[${start},${end})`; // Format PostgreSQL valid range

    // Ajouter au panier
    addItem({
      id: `${serviceType}-${selectedDate}-${periodRange}`,
      title: label,
      price,
      quantity: 1,
    });

    // Enregistrer dans Supabase
    const { error } = await supabase.from("reservations").insert({
      reservation_date: selectedDate,
      reservation_type: serviceType,
      period: periodRange, // ✅ correctly formatted tstzrange
      price,
      status: "pending",
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Erreur Supabase :", error);
      alert("❌ Une erreur est survenue lors de l'enregistrement.");
      return;
    }

    alert(`✅ Réservation enregistrée : ${label} (${price}€)`);
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Choisir une date :
      </Text>
      <Calendar
        minDate={new Date().toISOString().split("T")[0]}
        onDayPress={(day) => {
          if (fullyBookedDates.includes(day.dateString)) return;
          setSelectedDate(day.dateString);
          setSelectedHours([]);
        }}
        markedDates={{
          ...markedDates,
          ...(selectedDate
            ? {
                [selectedDate]: {
                  selected: true,
                  disableTouchEvent: false,
                  selectedColor: "#5cb9bc",
                  selectedTextColor: "#fff",
                  customStyles: {
                    container: {
                      borderRadius: 8,
                      elevation: 2,
                    },
                    text: {
                      fontWeight: "bold",
                    },
                  },
                },
              }
            : {}),
        }}
        theme={{
          backgroundColor: "#f8f9fa",
          calendarBackground: "#f8f9fa",
          textSectionTitleColor: "#6c757d",
          textSectionTitleDisabledColor: "#d3d3d3",
          dayTextColor: "#212529",
          todayTextColor: "#5cb9bc",
          arrowColor: "#5cb9bc",
          arrowStyle: { padding: 10 },
          selectedDayBackgroundColor: "#5cb9bc",
          selectedDayTextColor: "#fff",
          textDisabledColor: "#d3d3d3",
          monthTextColor: "#212529",
          textMonthFontWeight: "bold",
          textMonthFontSize: 16,
          textDayHeaderFontWeight: "600",
          textDayHeaderFontSize: 12,
          dotColor: "#5cb9bc",
          selectedDotColor: "#fff",
          disabledDotColor: "#d3d3d3",
          todayButtonFontWeight: "bold",
        }}
        style={{
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 16,
          elevation: 3,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
        dayComponent={({ date, state, marking }) => {
          if (!date) return null; // Gestion du cas undefined

          return (
            <TouchableOpacity
              style={{
                width: 36,
                height: 36,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: marking?.selected ? "#5cb9bc" : "transparent",
                borderRadius: 8,
                margin: 2,
                opacity: state === "disabled" ? 0.3 : 1,
              }}
              disabled={
                state === "disabled" ||
                fullyBookedDates.includes(date.dateString)
              }
              onPress={() => {
                if (!fullyBookedDates.includes(date.dateString)) {
                  setSelectedDate(date.dateString);
                  setSelectedHours([]);
                }
              }}
            >
              <Text
                style={{
                  color: marking?.selected
                    ? "#fff"
                    : state === "disabled"
                    ? "#d3d3d3"
                    : marking?.marked
                    ? "#5cb9bc"
                    : "#212529",
                  fontWeight: marking?.selected ? "bold" : "normal",
                  fontSize: 14,
                }}
              >
                {date.day}
              </Text>
              {marking?.marked && !marking?.selected && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 4,
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: marking?.dotColor || "#5cb9bc",
                  }}
                />
              )}
            </TouchableOpacity>
          );
        }}
      />

      {selectedDate && (
        <View style={styles.infoContainer}>
          {fullyBookedDates.includes(selectedDate) ? (
            <Text style={styles.errorText}>
              ⚠️ Journée complètement réservée
            </Text>
          ) : partialBlocks[selectedDate] ? (
            <>
              {partialBlocks[selectedDate].morning && (
                <Text style={styles.warningText}>
                  ⏳ Matinée réservée (disponible l'après-midi)
                </Text>
              )}
              {partialBlocks[selectedDate].afternoon && (
                <Text style={styles.warningText}>
                  ⏳ Après-midi réservé (disponible le matin)
                </Text>
              )}
            </>
          ) : null}
        </View>
      )}

      {selectedDate ? (
        loading ? (
          <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
        ) : (
          <View style={{ marginVertical: 20 }}>
            {(isCoworking || (isFormation && selectedOption === "hour")) && (
              <ScrollView horizontal>
                {HOURS.map((hour) => {
                  const isDisabled = isHourDisabled(hour);
                  const isSelected = selectedHours.includes(hour);
                  return (
                    <TouchableOpacity
                      key={hour}
                      disabled={isDisabled}
                      onPress={() => toggleHour(hour)}
                      style={{
                        padding: 10,
                        margin: 5,
                        backgroundColor: isSelected
                          ? "#5cb9bc"
                          : isDisabled
                          ? "#ccc"
                          : "#eee",
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: isSelected
                            ? "#fff"
                            : isDisabled
                            ? "#888"
                            : "#000",
                        }}
                      >
                        {hour}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}

            {(isFormation || isBureau) && (
              <>
                <Text style={{ fontSize: 16, marginVertical: 10 }}>
                  Sélectionnez l'option :
                </Text>
                {(isFormation
                  ? ["hour", "halfDay", "fullDay"]
                  : ["halfDay", "fullDay"]
                ).map((opt) => {
                  const isFullDayOption = opt === "fullDay";
                  const isHalfDayOption = opt === "halfDay";

                  // Désactiver "Journée complète" si une partie est réservée
                  const isFullDayDisabled =
                    isFullDayOption &&
                    (partialBlocks[selectedDate]?.morning ||
                      partialBlocks[selectedDate]?.afternoon);

                  // Désactiver "Demi-journée" si la demi-journée correspondante est réservée
                  const isHalfDayDisabled =
                    isHalfDayOption &&
                    ((selectedHours[0] === "morning" &&
                      partialBlocks[selectedDate]?.morning) ||
                      (selectedHours[0] === "afternoon" &&
                        partialBlocks[selectedDate]?.afternoon));

                  return (
                    <TouchableOpacity
                      key={opt}
                      disabled={isFullDayDisabled || isHalfDayDisabled}
                      onPress={() => {
                        setSelectedOption(opt as any);
                        setSelectedHours([]);
                      }}
                      style={{
                        padding: 10,
                        marginVertical: 5,
                        backgroundColor:
                          selectedOption === opt ? "#5cb9bc" : "#eee",
                        opacity:
                          isFullDayDisabled || isHalfDayDisabled ? 0.5 : 1,
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: selectedOption === opt ? "#fff" : "#000",
                        }}
                      >
                        {opt === "hour"
                          ? "À l'heure"
                          : opt === "halfDay"
                          ? "Demi-journée"
                          : "Journée complète"}{" "}
                        (
                        {isFormation
                          ? FORMATION_PRICES[
                              opt as keyof typeof FORMATION_PRICES
                            ]
                          : BUREAU_PRICES[opt as keyof typeof BUREAU_PRICES]}
                        €)
                        {isFullDayDisabled && " (Indisponible)"}
                        {isHalfDayDisabled && " (Déjà réservé)"}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

                {selectedOption === "halfDay" && (
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>
                      Matin ou après-midi :
                    </Text>
                    {["morning", "afternoon"].map((period) => {
                      const isBlocked =
                        partialBlocks[selectedDate]?.[
                          period as "morning" | "afternoon"
                        ] ?? false;
                      const isSelected = selectedHours.includes(period);

                      return (
                        <TouchableOpacity
                          key={period}
                          disabled={isBlocked}
                          onPress={() => setSelectedHours([period])}
                          style={{
                            padding: 10,
                            marginVertical: 5,
                            backgroundColor: isSelected
                              ? "#5cb9bc"
                              : isBlocked
                              ? "#ccc"
                              : "#eee",
                            borderRadius: 8,
                          }}
                        >
                          <Text
                            style={{
                              color: isSelected
                                ? "#fff"
                                : isBlocked
                                ? "#888"
                                : "#000",
                            }}
                          >
                            {period === "morning"
                              ? "Matin (9h-12h)"
                              : "Après-midi (13h-16h)"}
                            {isBlocked && " (Déjà réservé)"}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </>
            )}

            <Text style={{ marginTop: 15, fontSize: 16 }}>
              Total : {calculatePrice()} €
            </Text>
            {/* <TouchableOpacity
              onPress={handleReservation}
              disabled={
                !selectedDate ||
                ((isCoworking || (isFormation && selectedOption === "hour")) &&
                  selectedHours.length === 0) ||
                ((isFormation || isBureau) &&
                  selectedOption === "halfDay" &&
                  selectedHours.length === 0)
              }
              style={{
                backgroundColor:
                  !selectedDate ||
                  ((isCoworking ||
                    (isFormation && selectedOption === "hour")) &&
                    selectedHours.length === 0) ||
                  ((isFormation || isBureau) &&
                    selectedOption === "halfDay" &&
                    selectedHours.length === 0)
                    ? "#aaa"
                    : "#5cb9bc",
                padding: 15,
                borderRadius: 8,
                marginTop: 20,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Ajouter au panier
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                if (!session) {
                  router.push("/(tabs)/Login" as any);
                  return;
                }
                handleReservation();
              }}
              disabled={
                !session ||
                !selectedDate ||
                ((isCoworking || (isFormation && selectedOption === "hour")) &&
                  selectedHours.length === 0) ||
                ((isFormation || isBureau) &&
                  selectedOption === "halfDay" &&
                  selectedHours.length === 0)
              }
              style={{
                backgroundColor:
                  !session ||
                  !selectedDate ||
                  ((isCoworking ||
                    (isFormation && selectedOption === "hour")) &&
                    selectedHours.length === 0) ||
                  ((isFormation || isBureau) &&
                    selectedOption === "halfDay" &&
                    selectedHours.length === 0)
                    ? "#aaa"
                    : "#5cb9bc",
                padding: 15,
                borderRadius: 8,
                marginTop: 20,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                {session ? "Ajouter au panier" : "Connectez-vous"}
              </Text>
            </TouchableOpacity>
          </View>
        )
      ) : (
        <Text style={{ marginTop: 10, color: "#555" }}>
          Sélectionnez d'abord une date pour voir les options.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: "#f8f9fa",
  },
  errorText: {
    color: "#dc3545",
    fontWeight: "bold",
  },
  warningText: {
    color: "#ffc107",
    fontWeight: "500",
  },
});
function generateSundayMarks() {
  const result: Record<string, any> = {};
  const today = new Date();
  const futureLimit = new Date();
  futureLimit.setMonth(futureLimit.getMonth() + 6);

  for (let d = new Date(today); d <= futureLimit; d.setDate(d.getDate() + 1)) {
    if (d.getDay() === 0) {
      const dateString = d.toISOString().split("T")[0];
      result[dateString] = {
        disabled: true,
        disableTouchEvent: true,
        marked: true,
        dotColor: "gray",
      };
    }
  }

  return result;
}
