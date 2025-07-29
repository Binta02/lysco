import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

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

  return (
    <View style={styles.wrapper}>
      <RNPickerSelect
        onValueChange={onValueChange}
        value={value}
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: "Sélectionnez un pays", value: null }}
        items={options}
        style={{
          inputIOS: styles.input,
          inputAndroid: styles.input,
          viewContainer: styles.container,
          placeholder: styles.placeholder,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  container: {
    borderWidth: 1,
    borderColor: "#5cb9bc",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  input: {
    fontSize: 16,
    color: "#000",
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
  },
  placeholder: {
    color: "#9ca3af",
    fontSize: 16,
  },
});

export default CountrySelect;
