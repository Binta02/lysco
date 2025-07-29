import { useCart } from "@/src/components/cart/CartContext";
import { supabase } from "@/src/integrations/supabase/client";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
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
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<
    "hour" | "halfDay" | "fullDay"
  >("hour");
  const [disabledHours, setDisabledHours] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  const isCoworking = serviceType === "coworking-space";
  const isFormation = serviceType === "formation-room";
  const isBureau = serviceType === "location-bureau";

  useEffect(() => {
    async function fetchDisabledHours() {
      if (!selectedDate) return;
      setLoading(true);

      const { data, error } = await supabase
        .from("reservations")
        .select("period")
        .eq("reservation_date", selectedDate)
        .eq("reservation_type", serviceType);

      if (error) {
        console.error("Erreur Supabase (disabledHours) :", error);
        setDisabledHours([]);
      } else {
        const reserved = data.map((d) => d.period);
        const reservedHours = data
          .filter(
            (d) => typeof d.period === "string" && d.period.includes("hour")
          )
          .map((d) => (d.period as string).split("-")[1]);

        setDisabledHours(reservedHours);
      }
      setLoading(false);
    }
    fetchDisabledHours();
  }, [selectedDate, serviceType]);

  function toggleHour(hour: string) {
    setSelectedHours((prev) =>
      prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
    );
  }

  function calculatePrice() {
    if (isCoworking) {
      return selectedHours.length * COWORKING_PRICE_PER_HOUR;
    }
    if (isFormation) {
      return FORMATION_PRICES[selectedOption];
    }
    if (isBureau) {
      const opt = selectedOption === "hour" ? "halfDay" : selectedOption;
      return BUREAU_PRICES[opt as "halfDay" | "fullDay"];
    }
    return 0;
  }

  function handleReservation() {
    if (!selectedDate) return alert("Sélectionnez une date.");
    if (isCoworking && selectedHours.length === 0)
      return alert("Sélectionnez au moins une heure.");

    const price = calculatePrice();
    const label = `${serviceType} — ${selectedDate} ${
      isCoworking ? selectedHours.join(", ") : selectedOption
    }`;

    addItem({
      id: `${serviceType}-${selectedDate}-${selectedOption}`,
      title: label,
      price,
      quantity: 1,
    });

    alert(`✅ Ajouté au panier : ${label} (${price}€)`);
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Choisir une date :
      </Text>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          setSelectedHours([]);
        }}
        markedDates={{
          [selectedDate]: { selected: true, marked: true },
        }}
        theme={{
          selectedDayBackgroundColor: "#5cb9bc",
          selectedDayTextColor: "#fff",
          todayTextColor: "#5cb9bc",
          arrowColor: "#5cb9bc",
        }}
      />

      {selectedDate ? (
        loading ? (
          <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
        ) : (
          <View style={{ marginVertical: 20 }}>
            {isCoworking && (
              <>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                  Sélectionnez les heures :
                </Text>
                <ScrollView horizontal>
                  {HOURS.map((hour) => {
                    const isDisabled = disabledHours.includes(hour);
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
              </>
            )}

            {(isFormation || isBureau) && (
              <>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                  Sélectionnez l’option :
                </Text>
                {(isFormation
                  ? (["hour", "halfDay", "fullDay"] as const)
                  : (["halfDay", "fullDay"] as const)
                ).map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    onPress={() => setSelectedOption(opt)}
                    style={{
                      padding: 10,
                      marginVertical: 5,
                      backgroundColor:
                        selectedOption === opt ? "#5cb9bc" : "#eee",
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
                        ? FORMATION_PRICES[opt]
                        : BUREAU_PRICES[opt as "halfDay" | "fullDay"]}{" "}
                      €)
                    </Text>
                  </TouchableOpacity>
                ))}
              </>
            )}

            <Text style={{ marginTop: 15, fontSize: 16 }}>
              Total : {calculatePrice()} €
            </Text>

            <TouchableOpacity
              onPress={handleReservation}
              style={{
                backgroundColor: "#5cb9bc",
                padding: 15,
                borderRadius: 8,
                marginTop: 20,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Ajouter au panier
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
