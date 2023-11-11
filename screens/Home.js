import { StyleSheet, ScrollView, View, Image } from "react-native";
import React from "react";
import ProductCard from "../components/ProductCard";
import { SafeAreaView } from "react-native-safe-area-context";
import Filterbar from "../components/Filterbar";

const lechon = require('../assets/lechon.png')

const Home = () => {
  const data = [
  {
    image: lechon,
    title: 'Crispy Lechon Kawali',
    reviews: '4.6 Mekus Mekus',
    price: '200',
  },
  {
    image: lechon,
    title: 'Crispy Lechon Kawali',
    reviews: '4.6 Mekus Mekus',
    price: '200',
  },
  {
    image: lechon,
    title: 'Crispy Lechon Kawali',
    reviews: '4.6 Mekus Mekus',
    price: '200',
  },
  {
    image: lechon,
    title: 'Crispy Lechon Kawali',
    reviews: '4.6 Mekus Mekus',
    price: '200',
  },
  {
    image: lechon,
    title: 'Crispy Lechon Kawali',
    reviews: '4.6 Mekus Mekus',
    price: '200',
  },
  {
    image: lechon,
    title: 'Crispy Lechon Kawali',
    reviews: '4.6 Mekus Mekus',
    price: '200',
  },
  {
    image: lechon,
    title: 'Crispy Lechon Kawali',
    reviews: '4.6 Mekus Mekus',
    price: '200',
  },
  {
    image: lechon,
    title: 'Crispy Lechon Kawali',
    reviews: '4.6 Mekus Mekus',
    price: '200',
  },
  ];

  return (
    <View>
        <View>
          <Filterbar/>
        </View>
        <ScrollView>
          <View style={styles.container}>
          {data && data.map((product, index) => (
            <ProductCard
              key={index} 
              image={product.image}
              title={product.title}
              reviews={product.reviews}
              price={product.price}
            />
          ))}
          </View>
        </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
});
