import { useState } from "react";
import { useCart } from "./context/CartContext";
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
const { width } = Dimensions.get("window");
const products = [
  { id: "1", name: "Noodles Ramen", price: 5.35, image: require("../assets/images/ramen.webp") },
  { id: "2", name: "Dumplings", price: 3.27, image: require("../assets/images/dumbling.webp") },
  { id: "3", name: "Pizza Sicilia", price: 6.50, image: require("../assets/images/pizza.webp") },
  { id: "4", name: "Beef Burger", price: 4.21, image: require("../assets/images/burger.webp") },
];

export default function HomeScreen() {
  const { cart, addToCart, removeFromCart, getTotalItems, getTotalPrice, products } = useCart();
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <TextInput
        style={styles.searchBar}
        placeholder="🔍 Search..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <Text style={styles.title}>🍽️ Menu</Text>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={require(item.image)} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.counterButton}>
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{cart[item.id] || 0}</Text>
              <TouchableOpacity onPress={() => addToCart(item.id)} style={styles.counterButton}>
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Thanh tổng hợp giỏ hàng */}
      {getTotalItems() > 0 && (
        <TouchableOpacity style={styles.cartSummary} onPress={() => router.push("/cart")}>
          <Text style={styles.cartText}>{getTotalItems()} Items selected</Text>
          <Text style={styles.cartText}>${getTotalPrice()}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 16,
  },
  searchBar: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  list: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 10,
    margin: 8,
    alignItems: "center",
    width: (width - 48) / 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "#FF6600",
    fontWeight: "bold",
    marginTop: 4,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  counterButton: {
    backgroundColor: "#FF6600",
    padding: 6,
    borderRadius: 8,
  },
  counterText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  counterValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  cartSummary: {
    backgroundColor: "#FF6600",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cartText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});