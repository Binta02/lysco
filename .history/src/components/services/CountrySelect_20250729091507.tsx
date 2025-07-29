import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CountryOption = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  onValueChange: (val: string) => void;
};

const CountrySelect = ({ value, onValueChange }: Props) => {
  const [options, setOptions] = useState<CountryOption[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setOptions([
      { value: "FR", label: "France" },
      { value: "BE", label: "Belgique" },
      { value: "CH", label: "Suisse" },
    ]);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "Sélectionnez un pays";

  const handleSelect = (val: string) => {
    onValueChange(val);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setModalVisible(true)}
      >
        <Text style={value ? styles.selectText : styles.placeholder}>
          {selectedLabel}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choisissez un pays</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
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
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
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
