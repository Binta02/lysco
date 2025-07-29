// 📦 Imports
import { supabase } from "@/src/integrations/supabase/client";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";

export default function ReservationForm({
  serviceType,
}: {
  serviceType: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<
    "full-day" | "morning" | "afternoon"
  >();
  const [disabledDates, setDisabledDates] = useState<string[]>([]);
  const [availablePeriods, setAvailablePeriods] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  console.log("ReservationForm serviceType :", serviceType);

  // Fetch dates with full-day reservations on load
  useEffect(() => {
    async function fetchDisabledDates() {
      const { data, error } = await supabase
        .from("reservations")
        .select("reservation_date")
        .eq("period", "full-day")
        .eq("reservation_type", serviceType);

      //   if (error) console.error(error);
      //   else setDisabledDates(data.map((d) => d.reservation_date));
      if (error) console.error("Erreur Supabase (disabledDates) :", error);
      else {
        console.log("Dates full-day récupérées :", data);
        setDisabledDates(data.map((d) => d.reservation_date));
      }
    }
    fetchDisabledDates();
  }, [serviceType]);

  // Check period availability on date change
  useEffect(() => {
    async function fetchAvailablePeriods() {
      setLoading(true);
      const { data, error } = await supabase
        .from("reservations")
        .select("period")
        .eq("reservation_date", selectedDate.toISOString().split("T")[0])
        .eq("reservation_type", serviceType);

      if (error) console.error(error);
      else {
        const reservedPeriods = data.map((d) => d.period);
        const morningTaken =
          reservedPeriods.includes("morning") ||
          reservedPeriods.includes("full-day");
        const afternoonTaken =
          reservedPeriods.includes("afternoon") ||
          reservedPeriods.includes("full-day");

        if (morningTaken && afternoonTaken) setAvailablePeriods([]);
        else if (morningTaken) setAvailablePeriods(["afternoon"]);
        else if (afternoonTaken) setAvailablePeriods(["morning"]);
        else setAvailablePeriods(["morning", "afternoon", "full-day"]);
      }
      setLoading(false);
    }
    fetchAvailablePeriods();
  }, [selectedDate, serviceType]);

  function handleReservation() {
    if (!selectedPeriod) return alert("Sélectionnez une période.");
    // Enregistrement Supabase ici...
    console.log(
      `Réservation confirmée pour ${selectedDate.toDateString()} - ${selectedPeriod}`
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Choisir une date :
      </Text>
      <DatePicker
        date={selectedDate}
        onDateChange={setSelectedDate}
        minimumDate={new Date()}
        mode="date"
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : availablePeriods.length === 0 ? (
        <Text style={{ color: "red", marginVertical: 10 }}>
          Aucune disponibilité ce jour-là.
        </Text>
      ) : (
        <View style={{ marginVertical: 10 }}>
          <Text>Choisissez la période :</Text>
          {availablePeriods.map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => setSelectedPeriod(p as any)}
              style={{
                padding: 10,
                backgroundColor: selectedPeriod === p ? "#5cb9bc" : "#ddd",
                marginVertical: 5,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: selectedPeriod === p ? "white" : "black" }}>
                {p === "morning"
                  ? "Matinée"
                  : p === "afternoon"
                  ? "Après-midi"
                  : "Journée complète"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

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
  );
}
