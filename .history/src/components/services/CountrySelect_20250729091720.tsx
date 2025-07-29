import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type CountryOption = {
  value: string;
  label: string;
  flag: string;
};

type Props = {
  value: string;
  onValueChange: (val: string) => void;
};

const allCountries: CountryOption[] = [
  { value: "FR", label: "France", flag: "🇫🇷" },
  { value: "BE", label: "Belgique", flag: "🇧🇪" },
  { value: "CH", label: "Suisse", flag: "🇨🇭" },
  { value: "US", label: "États-Unis", flag: "🇺🇸" },
  { value: "GB", label: "Royaume-Uni", flag: "🇬🇧" },
  { value: "DE", label: "Allemagne", flag: "🇩🇪" },
  { value: "ES", label: "Espagne", flag: "🇪🇸" },
  { value: "IT", label: "Italie", flag: "🇮🇹" },
  { value: "MA", label: "Maroc", flag: "🇲🇦" },
  { value: "DZ", label: "Algérie", flag: "🇩🇿" },
  { value: "TN", label: "Tunisie", flag: "🇹🇳" },
  // Tu peux en ajouter d'autres ici
];

const CountrySelect = ({ value, onValueChange }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(allCountries);

  useEffect(() => {
    setFilteredCountries(
      allCountries.filter((c) =>
        c.label.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const selected = allCountries.find((c) => c.value === value);
  const displayLabel = selected
    ? `${selected.flag} ${selected.label}`
    : "Sélectionnez un pays";

  const handleSelect = (val: string) => {
    onValueChange(val);
    setModalVisible(false);
    setSearch("");
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setModalVisible(true)}
      >
        <Text style={value ? styles.selectText : styles.placeholder}>
          {displayLabel}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSearch("");
        }}
      >
        <Pressable
          style={styles.backdrop}
          onPressOut={() => {
            setModalVisible(false);
            setSearch("");
          }}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choisissez un pays</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher..."
              value={search}
              onChangeText={setSearch}
              autoFocus
            />
            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.value}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.itemText}>
                    {item.flag} {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selectBox: {
    borderWidth: 1,
    borderColor: "#5cb9bc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
  },
  selectText: {
    fontSize: 16,
    color: "#000",
  },
  placeholder: {
    fontSize: 16,
    color: "#9ca3af",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemText: {
    fontSize: 16,
  },
});

export default CountrySelect;
