import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type InputProps = TextInputProps & {
  // tu peux ajouter ici d'autres props spécifiques si besoin
};

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ style, ...props }, ref) => {
    return <TextInput ref={ref} style={[styles.input, style]} {...props} />;
  }
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  input: {
    height: 40, // comme h-10
    width: "100%",
    borderRadius: 8, // rounded-md
    borderWidth: 1,
    borderColor: "#d1d5db", // border-input, gris clair
    backgroundColor: "#fff", // bg-background
    paddingHorizontal: 12, // px-3
    paddingVertical: 8, // py-2
    fontSize: 16, // text-base
  },
});
