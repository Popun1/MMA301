import { View, Text, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";

const products: Record<string, { name: string; price: number; image: any }> = {
  "1": { name: "Noodles Ramen", price: 5.35, image: require("../../assets/images/ramen.webp") },
  "2": { name: "Dumplings", price: 3.27, image: require("../../assets/images/dumbling.webp") },
  "3": { name: "Pizza Sicilia", price: 6.50, image: require("../../assets/images/pizza.webp") },
  "4": { name: "Beef Burger", price: 4.21, image: require("../../assets/images/burger.webp") },
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const product = products[id as string]; // Ép kiểu `id` thành string

  if (!product) {
    return <View><Text>Product not found</Text></View>;
  }

  return (
    <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
      <Image source={product.image} style={{ width: 200, height: 200 }} />
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{product.name}</Text>
      <Text style={{ fontSize: 18, color: "green" }}>${product.price.toFixed(2)}</Text>
    </View>
  );
}
