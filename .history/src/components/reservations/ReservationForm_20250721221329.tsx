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
const PRICE_PER_HOUR = 5; // €5 / heure pour coworking

export default function ReservationForm({
  serviceType,
}: {
  serviceType: string;
}) {
  const [selectedDate, setSelectedDate] = useState<string>(""); // yyyy-MM-dd
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [disabledHours, setDisabledHours] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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
        const reservedHours = data
          .filter((d) => d.period.includes("hour"))
          .map((d) => d.period.split("-")[1]); // ex: 'hour-09:00' → '09:00'
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

  function handleReservation() {
    if (!selectedDate || selectedHours.length === 0) {
      alert("Sélectionnez une date et au moins une heure.");
      return;
    }

    const price = selectedHours.length * PRICE_PER_HOUR;
    console.log(
      `✅ Réservation confirmée : ${selectedDate} ${selectedHours.join(
        ", "
      )} → Total: ${price}€`
    );

    // TODO : brancher à useCart() ici si dispo
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Choisir une date :
      </Text>
      <Calendar
        onDayPress={(day) => {
          console.log("Date sélectionnée", day.dateString);
          setSelectedDate(day.dateString);
          setSelectedHours([]); // reset heures quand on change de date
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
                        fontWeight: isSelected ? "bold" : "normal",
                      }}
                    >
                      {hour}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text style={{ marginTop: 15, fontSize: 16 }}>
              Total : {selectedHours.length * PRICE_PER_HOUR} €
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
                Confirmer la réservation
              </Text>
            </TouchableOpacity>
          </View>
        )
      ) : (
        <Text style={{ marginTop: 10, color: "#555" }}>
          Sélectionnez d'abord une date pour voir les heures disponibles.
        </Text>
      )}
    </View>
  );
}
