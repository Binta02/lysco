// import { useCart } from "@/src/components/cart/CartContext";
// import { supabase } from "@/src/integrations/supabase/client";
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
//   const [loading, setLoading] = useState(false);
//   const { addItem } = useCart();

//   const isCoworking = serviceType === "coworking-space";
//   const isFormation = serviceType === "formation-room";
//   const isBureau = serviceType === "location-bureau";

//   useEffect(() => {
//     async function fetchDisabledHours() {
//       if (!selectedDate) return;
//       setLoading(true);

//       const { data, error } = await supabase
//         .from("reservations")
//         .select("period")
//         .eq("reservation_date", selectedDate)
//         .eq("reservation_type", serviceType);

//       if (error) {
//         console.error("Erreur Supabase (disabledHours) :", error);
//         setDisabledHours([]);
//       } else {
//         const reservedHours = data
//           .filter(
//             (d) => typeof d.period === "string" && d.period.includes("hour")
//           )
//           .map((d) => (d.period as string).split("-")[1]);
//         setDisabledHours(reservedHours);
//       }
//       setLoading(false);
//     }
//     fetchDisabledHours();
//   }, [selectedDate, serviceType]);

//   function toggleHour(hour: string) {
//     setSelectedHours((prev) =>
//       prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
//     );
//   }

//   function calculatePrice() {
//     if (isCoworking) {
//       return selectedHours.length * COWORKING_PRICE_PER_HOUR;
//     }
//     if (isFormation) {
//       if (selectedOption === "hour")
//         return selectedHours.length * FORMATION_PRICES.hour;
//       return FORMATION_PRICES[selectedOption];
//     }
//     if (isBureau) {
//       return BUREAU_PRICES[selectedOption as "halfDay" | "fullDay"];
//     }
//     return 0;
//   }

//   function handleReservation() {
//     if (!selectedDate) return alert("Sélectionnez une date.");
//     if (
//       (isCoworking || (isFormation && selectedOption === "hour")) &&
//       selectedHours.length === 0
//     )
//       return alert("Sélectionnez au moins une heure.");
//     if (
//       (isFormation || isBureau) &&
//       selectedOption === "halfDay" &&
//       selectedHours.length === 0
//     )
//       return alert("Sélectionnez matin ou après-midi.");

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
//       <Calendar
//         onDayPress={(day) => {
//           setSelectedDate(day.dateString);
//           setSelectedHours([]);
//         }}
//         markedDates={{
//           [selectedDate]: { selected: true, marked: true },
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
//                   ? (["hour", "halfDay", "fullDay"] as const)
//                   : (["halfDay", "fullDay"] as const)
//                 ).map((opt) => (
//                   <TouchableOpacity
//                     key={opt}
//                     onPress={() => {
//                       setSelectedOption(opt);
//                       setSelectedHours([]); // reset heures ou matin/aprem si on change d’option
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
//                         ? FORMATION_PRICES[opt]
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
//                 !selectedDate || // pas de date
//                 ((isCoworking || (isFormation && selectedOption === "hour")) &&
//                   selectedHours.length === 0) || // coworking ou formation à l’heure sans heures choisies
//                 ((isFormation || isBureau) &&
//                   selectedOption === "halfDay" &&
//                   selectedHours.length === 0) // formation ou bureau demi-journée sans matin/aprèm choisi
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
//                     ? "#aaa" // gris désactivé
//                     : "#5cb9bc", // vert actif
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

// ReservationForm.tsx complet avec blocage des dates pleines
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
  const [fullyBookedDates, setFullyBookedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  const isCoworking = serviceType === "coworking-space";
  const isFormation = serviceType === "formation-room";
  const isBureau = serviceType === "location-bureau";

  useEffect(() => {
    async function fetchDisabledDatesAndHours() {
      if (!selectedDate) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("reservations")
        .select("reservation_date, period")
        .eq("reservation_type", serviceType);

      if (error) {
        console.error("Erreur Supabase :", error);
        setDisabledHours([]);
        setFullyBookedDates([]);
      } else {
        const dateCounts: Record<string, Set<string>> = {};
        data.forEach((res) => {
          if (!dateCounts[res.reservation_date])
            dateCounts[res.reservation_date] = new Set();
          dateCounts[res.reservation_date].add(res.period);
        });

        const fullDates = Object.entries(dateCounts)
          .filter(([_, periods]) =>
            isCoworking
              ? periods.size >= HOURS.length
              : periods.has("fullDay") || periods.has("halfDay")
          )
          .map(([date]) => date);

        setFullyBookedDates(fullDates);

        const reservedHours = data
          .filter(
            (d) =>
              d.reservation_date === selectedDate &&
              typeof d.period === "string" &&
              d.period.includes("hour")
          )
          .map((d) => (d.period as string).split("-")[1]);
        setDisabledHours(reservedHours);
      }
      setLoading(false);
    }
    fetchDisabledDatesAndHours();
  }, [selectedDate, serviceType]);

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
    const label = `${serviceType} — ${selectedDate} ${
      isCoworking || (isFormation && selectedOption === "hour")
        ? selectedHours.join(", ")
        : selectedOption === "halfDay"
        ? selectedHours[0] === "morning"
          ? "Demi-journée matin"
          : "Demi-journée après-midi"
        : "Journée complète"
    }`;

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

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Choisir une date :
      </Text>
      <Calendar
        onDayPress={(day) => {
          if (fullyBookedDates.includes(day.dateString)) return;
          setSelectedDate(day.dateString);
          setSelectedHours([]);
        }}
        markedDates={Object.fromEntries(
          fullyBookedDates.map((d) => [
            d,
            {
              disabled: true,
              disableTouchEvent: true,
              marked: true,
              dotColor: "red",
            },
          ])
        )}
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
            {(isCoworking || (isFormation && selectedOption === "hour")) && (
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
                  ? ["hour", "halfDay", "fullDay"]
                  : ["halfDay", "fullDay"]
                ).map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    onPress={() => {
                      setSelectedOption(opt);
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
                        ? FORMATION_PRICES[opt]
                        : BUREAU_PRICES[opt as "halfDay" | "fullDay"]}{" "}
                      €)
                    </Text>
                  </TouchableOpacity>
                ))}
                {selectedOption === "halfDay" && (
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>
                      Matin ou après-midi :
                    </Text>
                    {["morning", "afternoon"].map((period) => (
                      <TouchableOpacity
                        key={period}
                        onPress={() => setSelectedHours([period])}
                        style={{
                          padding: 10,
                          marginVertical: 5,
                          backgroundColor: selectedHours.includes(period)
                            ? "#5cb9bc"
                            : "#eee",
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: selectedHours.includes(period)
                              ? "#fff"
                              : "#000",
                          }}
                        >
                          {period === "morning"
                            ? "Matin (9h-12h)"
                            : "Après-midi (13h-16h)"}
                        </Text>
                      </TouchableOpacity>
                    ))}
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
