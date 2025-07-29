import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type Variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type Size = "default" | "sm" | "lg" | "icon";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  loading = false,
  onPress,
  children,
}) => {
  const variantStyle = variantStyles[variant] || {};
  const sizeStyle = sizeStyles[size] || {};

  return (
    <TouchableOpacity
      style={[styles.button, variantStyle, sizeStyle]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const variantStyles: Record<Variant, object> = {
  default: { backgroundColor: "#4f46e5" }, // Indigo 600
  destructive: { backgroundColor: "#dc2626" }, // Red 600
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#4f46e5",
  },
  secondary: { backgroundColor: "#6b7280" }, // Gray 500
  ghost: { backgroundColor: "transparent" },
  link: { backgroundColor: "transparent" },
};

const sizeStyles: Record<Size, object> = {
  default: { height: 40, paddingHorizontal: 16 },
  sm: { height: 36, paddingHorizontal: 12 },
  lg: { height: 48, paddingHorizontal: 24 },
  icon: { height: 40, width: 40 },
};
