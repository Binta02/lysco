import { useCart } from "@/components/cart/CartContext";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export function CartDrawer({ onCheckout }) {
  const { items, removeItem, updateQuantity, total, subtotal, tax } = useCart();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <Text style={styles.emptyText}>Votre panier est vide</Text>
      ) : (
        <>
          <ScrollView style={styles.scrollArea} contentContainerStyle={{ paddingBottom: 150 }}>
            {items.map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.itemPrice}>{item.price} €</Text>
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Feather name="minus" size={16} />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Feather name="plus" size={16} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.iconButton, { backgroundColor: "#fee2e2" }]}
                    onPress={() => removeItem(item.id)}
                  >
                    <Feather name="trash" size={16} color="#dc2626" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.bottomBar}>
            <View style={styles.row}>
              <Text>Sous-total</Text>
              <Text>{subtotal.toFixed(2)} €</Text>
            </View>
            <View style={styles.row}>
              <Text>TVA (20%)</Text>
              <Text>{tax.toFixed(2)} €</Text>
            </View>
            <View style={[styles.row, styles.totalRow]}>
              <Text style={{ fontWeight: "bold" }}>Total</Text>
              <Text style={{ fontWeight: "bold" }}>{total.toFixed(2)} €</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => {
                onCheckout && onCheckout();
                router.push("/checkout");
              }}
            >
              <Text style={styles.checkoutText}>Passer la commande</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 24,
    fontSize: 14,
  },
  scrollArea: {
    paddingHorizontal: 12,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    paddingVertical: 12,
  },
  itemInfo: {
    flex: 1,
    minWidth: 120,
    marginRight: 8,
  },
  itemTitle: {
    fontWeight: "500",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 12,
    color: "#6b7280",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 6,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 4,
    marginHorizontal: 2,
  },
  quantity: {
    width: 24,
    textAlign: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  totalRow: {
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    paddingTop: 6,
    marginTop: 6,
  },
  checkoutButton: {
    backgroundColor: "#5cb9bc",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 12,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
