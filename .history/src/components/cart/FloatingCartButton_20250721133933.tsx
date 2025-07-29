import { useCart } from "@/src/components/cart/CartContext";
import { CartDrawer } from "@/src/components/cart/CartDrawer";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function FloatingCartButton() {
  const { items } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Floating Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        <Feather name="shopping-cart" size={28} color="#000" />
        {items.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{items.length}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Modal Drawer */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Votre panier</Text>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Feather name="x" size={24} />
            </TouchableOpacity>
          </View>
          <CartDrawer onCheckout={() => setOpen(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    right: 24,
    zIndex: 50,
  },
  fab: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#dc2626",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
});
