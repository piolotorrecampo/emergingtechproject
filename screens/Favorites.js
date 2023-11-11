import { StyleSheet, ScrollView, View, Image } from "react-native";
import React from "react";
import FavoritesCard from "../components/FavoritesCard";
import { SafeAreaView } from "react-native-safe-area-context";
import Filterbar from "../components/Filterbar";

const lechon = require('../assets/lechon.png')

const Favorites = () => {
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
        <Filterbar/>
        <ScrollView>
          <View style={styles.container}>
          {data && data.map((product, index) => (
            <FavoritesCard
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

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
