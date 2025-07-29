// // ReservationForm.tsx complet avec blocage des dates pleines
// import { useCart } from "@/src/components/cart/CartContext";
// import { supabase } from "@/src/integrations/supabase/client";
// import "@/src/utils/calendarLocale";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Calendar } from "react-native-calendars";

// const HOURS = [
//   "09:00",
//   "10:00",
//   "11:00",
//   "12:00",
//   "13:00",
//   "14:00",
//   "15:00",
//   "16:00",
// ];
// const FORMATION_PRICES = { hour: 10, halfDay: 25, fullDay: 45 };
// const BUREAU_PRICES = { halfDay: 125, fullDay: 250 };
// const COWORKING_PRICE_PER_HOUR = 5;

// export default function ReservationForm({
//   serviceType,
// }: {
//   serviceType: string;
// }) {
//   const [selectedDate, setSelectedDate] = useState<string>("");
//   const [selectedHours, setSelectedHours] = useState<string[]>([]);
//   const [selectedOption, setSelectedOption] = useState<
//     "hour" | "halfDay" | "fullDay"
//   >("hour");
//   const [disabledHours, setDisabledHours] = useState<string[]>([]);
//   const [fullyBookedDates, setFullyBookedDates] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const { addItem } = useCart();

//   const isCoworking = serviceType === "coworking-space";
//   const isFormation = serviceType === "formation-room";
//   const isBureau = serviceType === "location-bureau";

//   useEffect(() => {
//     async function fetchDisabledDatesAndHours() {
//       if (!selectedDate) return;
//       setLoading(true);
//       const { data, error } = await supabase
//         .from("reservations")
//         .select("reservation_date, period")
//         .eq("reservation_type", serviceType);

//       if (error) {
//         console.error("Erreur Supabase :", error);
//         setDisabledHours([]);
//         setFullyBookedDates([]);
//       } else {
//         const dateCounts: Record<string, Set<string>> = {};
//         data.forEach((res) => {
//           if (!dateCounts[res.reservation_date])
//             dateCounts[res.reservation_date] = new Set();
//           dateCounts[res.reservation_date].add(String(res.period));
//         });

//         const fullDates = Object.entries(dateCounts)
//           .filter(([_, periods]) =>
//             isCoworking
//               ? periods.size >= HOURS.length
//               : periods.has("fullDay") || periods.has("halfDay")
//           )
//           .map(([date]) => date);

//         setFullyBookedDates(fullDates);

//         const reservedHours = data
//           .filter(
//             (d) =>
//               d.reservation_date === selectedDate &&
//               typeof d.period === "string" &&
//               d.period.includes("hour")
//           )
//           .map((d) => (d.period as string).split("-")[1]);
//         setDisabledHours(reservedHours);
//       }
//       setLoading(false);
//     }
//     fetchDisabledDatesAndHours();
//   }, [selectedDate, serviceType]);

//   function toggleHour(hour: string) {
//     setSelectedHours((prev) =>
//       prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
//     );
//   }

//   function calculatePrice() {
//     if (isCoworking) return selectedHours.length * COWORKING_PRICE_PER_HOUR;
//     if (isFormation)
//       return selectedOption === "hour"
//         ? selectedHours.length * FORMATION_PRICES.hour
//         : FORMATION_PRICES[selectedOption];
//     if (isBureau) return BUREAU_PRICES[selectedOption as "halfDay" | "fullDay"];
//     return 0;
//   }

//   function handleReservation() {
//     const price = calculatePrice();
//     const label = `${serviceType} — ${selectedDate} ${
//       isCoworking || (isFormation && selectedOption === "hour")
//         ? selectedHours.join(", ")
//         : selectedOption === "halfDay"
//         ? selectedHours[0] === "morning"
//           ? "Demi-journée matin"
//           : "Demi-journée après-midi"
//         : "Journée complète"
//     }`;

//     addItem({
//       id: `${serviceType}-${selectedDate}-${selectedOption}-${selectedHours.join(
//         ","
//       )}`,
//       title: label,
//       price,
//       quantity: 1,
//     });

//     alert(`✅ Ajouté au panier : ${label} (${price}€)`);
//   }

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
//         Choisir une date :
//       </Text>
//       {/* <Calendar
//         onDayPress={(day) => {
//           if (fullyBookedDates.includes(day.dateString)) return;
//           setSelectedDate(day.dateString);
//           setSelectedHours([]);
//         }}
//         markedDates={Object.fromEntries(
//           fullyBookedDates.map((d) => [
//             d,
//             {
//               disabled: true,
//               disableTouchEvent: true,
//               marked: true,
//               dotColor: "red",
//             },
//           ])
//         )}
//         theme={{
//           selectedDayBackgroundColor: "#5cb9bc",
//           selectedDayTextColor: "#fff",
//           todayTextColor: "#5cb9bc",
//           arrowColor: "#5cb9bc",
//         }}
//       /> */}
//       <Calendar
//         minDate={new Date().toISOString().split("T")[0]} // 🔒 bloque les dates passées
//         onDayPress={(day) => {
//           const isSunday = new Date(day.dateString).getDay() === 0;
//           if (
//             fullyBookedDates.includes(day.dateString) ||
//             isSunday ||
//             new Date(day.dateString) < new Date(new Date().toDateString())
//           ) {
//             return;
//           }
//           setSelectedDate(day.dateString);
//           setSelectedHours([]);
//         }}
//         markedDates={{
//           ...Object.fromEntries(
//             fullyBookedDates.map((d) => [
//               d,
//               {
//                 disabled: true,
//                 disableTouchEvent: true,
//                 marked: true,
//                 dotColor: "red",
//               },
//             ])
//           ),
//           ...generateSundayMarks(),
//         }}
//         theme={{
//           selectedDayBackgroundColor: "#5cb9bc",
//           selectedDayTextColor: "#fff",
//           todayTextColor: "#5cb9bc",
//           arrowColor: "#5cb9bc",
//         }}
//       />

//       {selectedDate ? (
//         loading ? (
//           <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
//         ) : (
//           <View style={{ marginVertical: 20 }}>
//             {(isCoworking || (isFormation && selectedOption === "hour")) && (
//               <>
//                 <Text style={{ fontSize: 16, marginBottom: 10 }}>
//                   Sélectionnez les heures :
//                 </Text>
//                 <ScrollView horizontal>
//                   {HOURS.map((hour) => {
//                     const isDisabled = disabledHours.includes(hour);
//                     const isSelected = selectedHours.includes(hour);
//                     return (
//                       <TouchableOpacity
//                         key={hour}
//                         disabled={isDisabled}
//                         onPress={() => toggleHour(hour)}
//                         style={{
//                           padding: 10,
//                           margin: 5,
//                           backgroundColor: isSelected
//                             ? "#5cb9bc"
//                             : isDisabled
//                             ? "#ccc"
//                             : "#eee",
//                           borderRadius: 8,
//                         }}
//                       >
//                         <Text
//                           style={{
//                             color: isSelected
//                               ? "#fff"
//                               : isDisabled
//                               ? "#888"
//                               : "#000",
//                           }}
//                         >
//                           {hour}
//                         </Text>
//                       </TouchableOpacity>
//                     );
//                   })}
//                 </ScrollView>
//               </>
//             )}

//             {(isFormation || isBureau) && (
//               <>
//                 <Text style={{ fontSize: 16, marginBottom: 10 }}>
//                   Sélectionnez l’option :
//                 </Text>
//                 {(isFormation
//                   ? ["hour", "halfDay", "fullDay"]
//                   : ["halfDay", "fullDay"]
//                 ).map((opt) => (
//                   <TouchableOpacity
//                     key={opt}
//                     onPress={() => {
//                       const options: ("hour" | "halfDay" | "fullDay")[] = [
//                         "hour",
//                         "halfDay",
//                         "fullDay",
//                       ];
//                       setSelectedHours([]);
//                     }}
//                     style={{
//                       padding: 10,
//                       marginVertical: 5,
//                       backgroundColor:
//                         selectedOption === opt ? "#5cb9bc" : "#eee",
//                       borderRadius: 8,
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color: selectedOption === opt ? "#fff" : "#000",
//                       }}
//                     >
//                       {opt === "hour"
//                         ? "À l'heure"
//                         : opt === "halfDay"
//                         ? "Demi-journée"
//                         : "Journée complète"}{" "}
//                       (
//                       {isFormation
//                         ? FORMATION_PRICES[
//                             opt as "hour" | "halfDay" | "fullDay"
//                           ]
//                         : BUREAU_PRICES[opt as "halfDay" | "fullDay"]}{" "}
//                       €)
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//                 {selectedOption === "halfDay" && (
//                   <View style={{ marginTop: 10 }}>
//                     <Text style={{ fontSize: 16, marginBottom: 10 }}>
//                       Matin ou après-midi :
//                     </Text>
//                     {["morning", "afternoon"].map((period) => (
//                       <TouchableOpacity
//                         key={period}
//                         onPress={() => setSelectedHours([period])}
//                         style={{
//                           padding: 10,
//                           marginVertical: 5,
//                           backgroundColor: selectedHours.includes(period)
//                             ? "#5cb9bc"
//                             : "#eee",
//                           borderRadius: 8,
//                         }}
//                       >
//                         <Text
//                           style={{
//                             color: selectedHours.includes(period)
//                               ? "#fff"
//                               : "#000",
//                           }}
//                         >
//                           {period === "morning"
//                             ? "Matin (9h-12h)"
//                             : "Après-midi (13h-16h)"}
//                         </Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 )}
//               </>
//             )}

//             <Text style={{ marginTop: 15, fontSize: 16 }}>
//               Total : {calculatePrice()} €
//             </Text>
//             <TouchableOpacity
//               onPress={handleReservation}
//               disabled={
//                 !selectedDate ||
//                 ((isCoworking || (isFormation && selectedOption === "hour")) &&
//                   selectedHours.length === 0) ||
//                 ((isFormation || isBureau) &&
//                   selectedOption === "halfDay" &&
//                   selectedHours.length === 0)
//               }
//               style={{
//                 backgroundColor:
//                   !selectedDate ||
//                   ((isCoworking ||
//                     (isFormation && selectedOption === "hour")) &&
//                     selectedHours.length === 0) ||
//                   ((isFormation || isBureau) &&
//                     selectedOption === "halfDay" &&
//                     selectedHours.length === 0)
//                     ? "#aaa"
//                     : "#5cb9bc",
//                 padding: 15,
//                 borderRadius: 8,
//                 marginTop: 20,
//               }}
//             >
//               <Text style={{ color: "white", textAlign: "center" }}>
//                 Ajouter au panier
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )
//       ) : (
//         <Text style={{ marginTop: 10, color: "#555" }}>
//           Sélectionnez d'abord une date pour voir les options.
//         </Text>
//       )}
//     </View>
//   );
// }

// function generateSundayMarks() {
//   const result: Record<string, any> = {};
//   const today = new Date();
//   const futureLimit = new Date();
//   futureLimit.setMonth(futureLimit.getMonth() + 6); // 🔒 jusqu'à 6 mois plus tard

//   for (let d = new Date(today); d <= futureLimit; d.setDate(d.getDate() + 1)) {
//     const isSunday = d.getDay() === 0;
//     const dateString = d.toISOString().split("T")[0];
//     if (isSunday) {
//       result[dateString] = {
//         disabled: true,
//         disableTouchEvent: true,
//         marked: true,
//         dotColor: "gray",
//       };
//     }
//   }

//   return result;
// }

// ReservationForm.tsx avec blocage intelligent des dates/heures
import { useCart } from "@/src/components/cart/CartContext";
import { supabase } from "@/src/integrations/supabase/client";
import "@/src/utils/calendarLocale";
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

  // useEffect(() => {
  //   async function fetchDisabledDatesAndHours() {
  //     setLoading(true);
  //     console.log("🔄 Fetching reservations for:", serviceType);
  //     const { data, error } = await supabase
  //       .from("reservations")
  //       .select("reservation_date, period")
  //       .ilike("reservation_type", `%${serviceType}%`);

  //     if (error) {
  //       console.error("❌ Supabase error:", error);
  //       setDisabledHours([]);
  //       setFullyBookedDates([]);
  //       setPartialBlocks({});
  //       setLoading(false);
  //       return;
  //     }

  //     console.log("✅ Data received:", data);
  //     const reservedHours: string[] = [];
  //     const fullDates: string[] = [];
  //     const partials: Record<string, { morning: boolean; afternoon: boolean }> =
  //       {};

  //     data.forEach(({ reservation_date, period }) => {
  //       const date = reservation_date;
  //       const p = period as string;

  //       console.log("📅 Processing:", { date, period });

  //       if (!partials[date]) {
  //         partials[date] = { morning: false, afternoon: false };
  //       }

  //       if (p === "fullDay") {
  //         fullDates.push(date);
  //         console.log("🔴 Full day blocked:", date);
  //       } else if (p === "morning") {
  //         partials[date].morning = true;
  //         console.log("☀️ Morning blocked:", date);
  //       } else if (p === "afternoon") {
  //         partials[date].afternoon = true;
  //         console.log("🌙 Afternoon blocked:", date);
  //       } else if (p.startsWith("hour-")) {
  //         const h = p.split("-")[1];
  //         reservedHours.push(h);
  //         console.log("⏰ Hour blocked:", h, "on", date);
  //         if (["09:00", "10:00", "11:00", "12:00"].includes(h))
  //           partials[date].morning = true;
  //         if (["13:00", "14:00", "15:00", "16:00"].includes(h))
  //           partials[date].afternoon = true;
  //       } else if (p.includes('["')) {
  //         const regex = /\"(\d{4}-\d{2}-\d{2}) (\d{2}):(\d{2})/g;
  //         const matches = Array.from(p.matchAll(regex));
  //         console.log("📦 Match results:", matches);

  //         if (matches.length >= 2) {
  //           const startHour = parseInt(matches[0][2], 10);
  //           const endHour = parseInt(matches[1][2], 10);
  //           console.log("⏳ Time range:", startHour, "->", endHour);

  //           if (startHour === 9 && endHour === 16) {
  //             fullDates.push(date);
  //             console.log("🔴 Full day via range:", date);
  //           } else if (startHour >= 9 && endHour <= 12) {
  //             partials[date].morning = true;
  //             console.log("☀️ Morning via range:", date);
  //           } else if (startHour >= 13 && endHour <= 16) {
  //             partials[date].afternoon = true;
  //             console.log("🌙 Afternoon via range:", date);
  //           }

  //           for (let h = startHour; h < endHour; h++) {
  //             const hh = h.toString().padStart(2, "0") + ":00";
  //             reservedHours.push(hh);
  //             console.log("⏰ Hour via range:", hh);
  //             if (["09:00", "10:00", "11:00", "12:00"].includes(hh))
  //               partials[date].morning = true;
  //             if (["13:00", "14:00", "15:00", "16:00"].includes(hh))
  //               partials[date].afternoon = true;
  //           }
  //         }
  //       }
  //     });

  //     console.log("📌 Final reserved hours:", reservedHours);
  //     console.log("📌 Final full dates:", fullDates);
  //     console.log("📌 Final partial blocks:", partials);

  //     setDisabledHours(reservedHours);
  //     setFullyBookedDates(fullDates);
  //     setPartialBlocks(partials);
  //     setLoading(false);
  //   }

  //   if (selectedDate) fetchDisabledDatesAndHours();
  // }, [selectedDate, serviceType]);

  // const markedDates = {
  //   ...Object.fromEntries(
  //     fullyBookedDates.map((d) => [
  //       d,
  //       {
  //         disabled: true,
  //         disableTouchEvent: true,
  //         marked: true,
  //         customStyles: { container: { backgroundColor: "#f9c" } },
  //       },
  //     ])
  //   ),
  //   ...generateSundayMarks(),
  // };

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

          // Si c'est une heure du matin, on bloque toute la matinée
          if (["09:00", "10:00", "11:00", "12:00"].includes(h)) {
            partials[date].morning = true;
          }
          // Si c'est une heure de l'après-midi, on bloque tout l'après-midi
          if (["13:00", "14:00", "15:00", "16:00"].includes(h)) {
            partials[date].afternoon = true;
          }
        }
        // 4. Gestion des plages horaires (format JSON)
        else if (p.includes('["')) {
          const regex = /\"(\d{4}-\d{2}-\d{2}) (\d{2}):(\d{2})/g;
          const matches = Array.from(p.matchAll(regex));

          if (matches.length >= 2) {
            const startHour = parseInt(matches[0][2], 10);
            const endHour = parseInt(matches[1][2], 10);

            // Si la plage couvre toute la journée (9h-16h)
            if (startHour <= 9 && endHour >= 16) {
              fullDates.push(date);
              partials[date].morning = true;
              partials[date].afternoon = true;
            }
            // Si la plage couvre le matin (entre 9h et 12h)
            else if (startHour >= 9 && endHour <= 12) {
              partials[date].morning = true;
            }
            // Si la plage couvre l'après-midi (entre 13h et 16h)
            else if (startHour >= 13 && endHour <= 16) {
              partials[date].afternoon = true;
            }

            // Ajout des heures spécifiques
            for (let h = startHour; h < endHour; h++) {
              const hh = h.toString().padStart(2, "0") + ":00";
              reservedHours.push(`${date}-${hh}`);
            }
          }
        }
      });

      // Bloquer la journée complète si les deux demi-journées sont réservées
      Object.entries(partials).forEach(([date, { morning, afternoon }]) => {
        if (morning && afternoon && !fullDates.includes(date)) {
          fullDates.push(date);
        }
      });

      setDisabledHours(reservedHours);
      setFullyBookedDates(fullDates);
      setPartialBlocks(partials);
      setLoading(false);
    }

    if (selectedDate) fetchDisabledDatesAndHours();
  }, [selectedDate, serviceType]);

  const markedDates = {
    // 1. Dates complètement bloquées (rose et non cliquable)
    ...Object.fromEntries(
      fullyBookedDates.map((d) => [
        d,
        {
          disabled: true,
          disableTouchEvent: true,
          marked: true,
          customStyles: {
            container: {
              backgroundColor: "#FFC0CB", // Rose clair
              opacity: 0.7,
            },
          },
        },
      ])
    ),
    // 2. Dates avec demi-journées bloquées
    ...Object.fromEntries(
      Object.entries(partialBlocks)
        .filter(([date]) => !fullyBookedDates.includes(date))
        .map(([date, { morning, afternoon }]) => [
          date,
          {
            disabled: false, // Reste cliquable
            marked: true,
            dotColor: "orange",
            customStyles: {
              container: {
                borderColor: "#FFA500", // Orange
                borderWidth: 2,
                borderRadius: 3,
              },
            },
          },
        ])
    ),
    ...generateSundayMarks(), // Vos autres marquages
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

  function handleReservation() {
    const price = calculatePrice();
    const label =
      `${serviceType} — ${selectedDate} ` +
      (isCoworking || (isFormation && selectedOption === "hour")
        ? selectedHours.join(", ")
        : selectedOption === "halfDay"
        ? selectedHours[0] === "morning"
          ? "Demi-journée matin"
          : "Demi-journée après-midi"
        : "Journée complète");

    addItem({
      id: `${serviceType}-${selectedDate}-${selectedOption}-${selectedHours.join(
        ","
      )}`,
      title: label,
      price,
      quantity: 1,
    });

    alert(`✅ Ajouté au panier : ${label} (${price}€)`);
  }

  // return (
  //   <View style={{ padding: 20 }}>
  //     <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
  //       Choisir une date :
  //     </Text>
  //     <Calendar
  //       minDate={new Date().toISOString().split("T")[0]}
  //       onDayPress={(day) => {
  //         if (fullyBookedDates.includes(day.dateString)) return;
  //         setSelectedDate(day.dateString);
  //         setSelectedHours([]);
  //       }}
  //       markedDates={markedDates}
  //       theme={{
  //         selectedDayBackgroundColor: "#5cb9bc",
  //         selectedDayTextColor: "#fff",
  //         todayTextColor: "#5cb9bc",
  //         arrowColor: "#5cb9bc",
  //       }}
  //     />

  //     {selectedDate ? (
  //       loading ? (
  //         <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
  //       ) : (
  //         <View style={{ marginVertical: 20 }}>
  //           {(isCoworking || (isFormation && selectedOption === "hour")) && (
  //             <ScrollView horizontal>
  //               {HOURS.map((hour) => {
  //                 const isDisabled = disabledHours.includes(hour);
  //                 const isSelected = selectedHours.includes(hour);
  //                 return (
  //                   <TouchableOpacity
  //                     key={hour}
  //                     disabled={isDisabled}
  //                     onPress={() => toggleHour(hour)}
  //                     style={{
  //                       padding: 10,
  //                       margin: 5,
  //                       backgroundColor: isSelected
  //                         ? "#5cb9bc"
  //                         : isDisabled
  //                         ? "#ccc"
  //                         : "#eee",
  //                       borderRadius: 8,
  //                     }}
  //                   >
  //                     <Text
  //                       style={{
  //                         color: isSelected
  //                           ? "#fff"
  //                           : isDisabled
  //                           ? "#888"
  //                           : "#000",
  //                       }}
  //                     >
  //                       {hour}
  //                     </Text>
  //                   </TouchableOpacity>
  //                 );
  //               })}
  //             </ScrollView>
  //           )}

  //           {(isFormation || isBureau) && (
  //             <>
  //               <Text style={{ fontSize: 16, marginVertical: 10 }}>
  //                 Sélectionnez l’option :
  //               </Text>
  //               {(isFormation
  //                 ? ["hour", "halfDay", "fullDay"]
  //                 : ["halfDay", "fullDay"]
  //               ).map((opt) => (
  //                 <TouchableOpacity
  //                   key={opt}
  //                   onPress={() => {
  //                     setSelectedOption(opt as any);
  //                     setSelectedHours([]);
  //                   }}
  //                   style={{
  //                     padding: 10,
  //                     marginVertical: 5,
  //                     backgroundColor:
  //                       selectedOption === opt ? "#5cb9bc" : "#eee",
  //                     borderRadius: 8,
  //                   }}
  //                 >
  //                   <Text
  //                     style={{
  //                       color: selectedOption === opt ? "#fff" : "#000",
  //                     }}
  //                   >
  //                     {opt === "hour"
  //                       ? "À l'heure"
  //                       : opt === "halfDay"
  //                       ? "Demi-journée"
  //                       : "Journée complète"}{" "}
  //                     (
  //                     {isFormation
  //                       ? FORMATION_PRICES[opt as keyof typeof FORMATION_PRICES]
  //                       : BUREAU_PRICES[opt as keyof typeof BUREAU_PRICES]}
  //                     €)
  //                   </Text>
  //                 </TouchableOpacity>
  //               ))}

  //               {selectedOption === "halfDay" && (
  //                 <View style={{ marginTop: 10 }}>
  //                   <Text style={{ fontSize: 16, marginBottom: 10 }}>
  //                     Matin ou après-midi :
  //                   </Text>
  //                   {["morning", "afternoon"].map((period) => {
  //                     const isBlocked =
  //                       partialBlocks[selectedDate]?.[
  //                         period as "morning" | "afternoon"
  //                       ] ?? false;
  //                     return (
  //                       <TouchableOpacity
  //                         key={period}
  //                         disabled={isBlocked}
  //                         onPress={() => setSelectedHours([period])}
  //                         style={{
  //                           padding: 10,
  //                           marginVertical: 5,
  //                           backgroundColor: selectedHours.includes(period)
  //                             ? "#5cb9bc"
  //                             : isBlocked
  //                             ? "#ccc"
  //                             : "#eee",
  //                           borderRadius: 8,
  //                         }}
  //                       >
  //                         <Text
  //                           style={{
  //                             color: selectedHours.includes(period)
  //                               ? "#fff"
  //                               : isBlocked
  //                               ? "#888"
  //                               : "#000",
  //                           }}
  //                         >
  //                           {period === "morning"
  //                             ? "Matin (9h-12h)"
  //                             : "Après-midi (13h-16h)"}
  //                         </Text>
  //                       </TouchableOpacity>
  //                     );
  //                   })}
  //                 </View>
  //               )}
  //             </>
  //           )}

  //           <Text style={{ marginTop: 15, fontSize: 16 }}>
  //             Total : {calculatePrice()} €
  //           </Text>
  //           <TouchableOpacity
  //             onPress={handleReservation}
  //             disabled={
  //               !selectedDate ||
  //               ((isCoworking || (isFormation && selectedOption === "hour")) &&
  //                 selectedHours.length === 0) ||
  //               ((isFormation || isBureau) &&
  //                 selectedOption === "halfDay" &&
  //                 selectedHours.length === 0)
  //             }
  //             style={{
  //               backgroundColor:
  //                 !selectedDate ||
  //                 ((isCoworking ||
  //                   (isFormation && selectedOption === "hour")) &&
  //                   selectedHours.length === 0) ||
  //                 ((isFormation || isBureau) &&
  //                   selectedOption === "halfDay" &&
  //                   selectedHours.length === 0)
  //                   ? "#aaa"
  //                   : "#5cb9bc",
  //               padding: 15,
  //               borderRadius: 8,
  //               marginTop: 20,
  //             }}
  //           >
  //             <Text style={{ color: "white", textAlign: "center" }}>
  //               Ajouter au panier
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       )
  //     ) : (
  //       <Text style={{ marginTop: 10, color: "#555" }}>
  //         Sélectionnez d'abord une date pour voir les options.
  //       </Text>
  //     )}
  //   </View>
  // );
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
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: "#5cb9bc",
          selectedDayTextColor: "#fff",
          todayTextColor: "#5cb9bc",
          arrowColor: "#5cb9bc",
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
                ).map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    onPress={() => {
                      setSelectedOption(opt as any);
                      setSelectedHours([]);
                    }}
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
                        ? FORMATION_PRICES[opt as keyof typeof FORMATION_PRICES]
                        : BUREAU_PRICES[opt as keyof typeof BUREAU_PRICES]}
                      €)
                    </Text>
                  </TouchableOpacity>
                ))}

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
                      return (
                        <TouchableOpacity
                          key={period}
                          disabled={isBlocked}
                          onPress={() => setSelectedHours([period])}
                          style={{
                            padding: 10,
                            marginVertical: 5,
                            backgroundColor: selectedHours.includes(period)
                              ? "#5cb9bc"
                              : isBlocked
                              ? "#ccc"
                              : "#eee",
                            borderRadius: 8,
                          }}
                        >
                          <Text
                            style={{
                              color: selectedHours.includes(period)
                                ? "#fff"
                                : isBlocked
                                ? "#888"
                                : "#000",
                            }}
                          >
                            {period === "morning"
                              ? "Matin (9h-12h)"
                              : "Après-midi (13h-16h)"}
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
            <TouchableOpacity
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
