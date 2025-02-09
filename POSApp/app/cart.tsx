import { useCart, products } from "../app/context/CartContext";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

// Map ảnh để ánh xạ từ tên file sang `require()`
const imageMap: Record<string, any> = {
  "ramen.webp": require("../assets/images/ramen.webp"),
  "dumbling.webp": require("../assets/images/dumbling.webp"),
  "pizza.webp": require("../assets/images/pizza.webp"),
  "burger.webp": require("../assets/images/burger.webp"),
};
export default function CartScreen() {
  const { cart, getTotalPrice } = useCart();
  const router = useRouter();

  const cartItems = Object.keys(cart)
    .map((id) => {
      const item = products.find((p: { id: string }) => p.id === id); // FIXED: Xác định kiểu của `p`
      return item ? { ...item, quantity: cart[id] } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null); // Lọc bỏ null

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Ordered Menu</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={imageMap[item.image]} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
            <Text style={styles.quantity}>x{item.quantity}</Text>
          </View>
        )}
      />

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total: ${getTotalPrice()}</Text>
      </View>

      <TouchableOpacity style={styles.processButton} onPress={() => Alert.alert("Processing Order", "Order placed!")}>
        <Text style={styles.processText}>Process Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8", padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  item: { flexDirection: "row", backgroundColor: "#FFF", padding: 10, borderRadius: 10, marginBottom: 10, alignItems: "center" },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  name: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, color: "#FF6600" },
  quantity: { fontSize: 16, fontWeight: "bold", marginLeft: 10 },
  summary: { backgroundColor: "#FFF", padding: 16, borderRadius: 10, marginBottom: 20 },
  summaryText: { fontSize: 16, marginBottom: 4 },
  total: { fontSize: 18, fontWeight: "bold", color: "#FF6600" },
  processButton: { backgroundColor: "#FF6600", padding: 16, borderRadius: 10, alignItems: "center" },
  processText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContainer: { width: 300, backgroundColor: "#FFF", padding: 20, borderRadius: 10, alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  paymentButton: { backgroundColor: "#FF6600", padding: 10, borderRadius: 10, width: "100%", alignItems: "center", marginBottom: 10 },
  paymentText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  cancelText: { fontSize: 16, color: "#FF6600", marginTop: 10 },
});