import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

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

  useEffect(() => {
    setOptions([
      { value: "FR", label: "France" },
      { value: "BE", label: "Belgique" },
      { value: "CH", label: "Suisse" },
    ]);
  }, []);

  const handlePressDebug = () => {
    console.log("👉 Picker zone touched");
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressDebug}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>Pays</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => {
              console.log("✅ Picker changed:", itemValue);
              onValueChange(itemValue);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Sélectionnez un pays" value="" />
            {options.map((opt) => (
              <Picker.Item
                key={opt.value}
                label={opt.label}
                value={opt.value}
              />
            ))}
          </Picker>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#5cb9bc",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#000",
  },
});

export default CountrySelect;
