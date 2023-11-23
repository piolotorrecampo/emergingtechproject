import { StyleSheet, ScrollView, View, Text } from "react-native";
import React, { useState, useEffect } from "react";

import ProductCard from "../components/ProductCard";
import ProductCardSpan from "../components/ProductCardSpan";
import Filterbar from "../components/Filterbar";
import { useUser } from '../context/UserContext';
import { SafeAreaView } from "react-native-safe-area-context";



const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [mostViewedProducts, setMostViewedProducts] = useState([]);
  const { userDataUpdated, userData, products } = useUser();

  useEffect(() => {
      if (userDataUpdated.favorites) {
        const productsNotInFavorites = products.filter(
          (product) => !userDataUpdated.favorites.includes(product.id) && product.sellerId !== userData.id
        );
        setAllProducts(productsNotInFavorites);
      } else {
        const userProductsExcluded = products.filter(
          (product) => product.sellerId !== userData.id
        );
        setAllProducts(userProductsExcluded);
      }
  }, [userData.id, userDataUpdated.favorites, products]);

  useEffect(() => {
    const sortedRecentProducts = [...allProducts]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);
    setRecentProducts(sortedRecentProducts);
  }, [allProducts]);
  
  useEffect(() => {
    const sortedMostViewedProducts = [...allProducts]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
    setMostViewedProducts(sortedMostViewedProducts);
  }, [allProducts]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Filterbar/>
      <ScrollView>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Most Viewed</Text>
          <ScrollView horizontal={true} style={styles.scrollContainer}>
          <View style={styles.container}>
            {mostViewedProducts && mostViewedProducts.map((product) => (
              <ProductCardSpan
                id={product.id} 
                image={product.image}
                title={product.name}
                reviews={product.ratings}
                price={product.price}
              />
            ))}
          </View>
        </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Posts</Text>
          <ScrollView horizontal={true} style={styles.scrollContainer}>
          <View style={styles.container}>
            {recentProducts && recentProducts.map((product) => (
              <ProductCardSpan
                id={product.id} 
                image={product.image}
                title={product.name}
                reviews={product.ratings}
                price={product.price}
              />
            ))}
          </View>
        </ScrollView>
        </View>
        <View style={styles.lastSectionContainer}>
          <Text style={styles.sectionTitle}>More Foods</Text>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.moreFoodsContainer}>
              {allProducts && allProducts.map((product) => (
                <ProductCard
                  id={product.id} 
                  image={product.image}
                  title={product.name}
                  reviews={product.ratings}
                  price={product.price}
                />
              ))}
            </View>
          </ScrollView>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  moreFoodsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  mainContainer: {
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scrollContainer: {
  },
  sectionTitle: {
    fontSize: 26,
    fontStyle: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  sectionContainer: {
    backgroundColor: 'white',
    marginVertical: 10, 
    paddingVertical: 10,
  },
  lastSectionContainer: {
    backgroundColor: 'white',
    marginVertical: 10, 
    paddingVertical: 10,
    marginBottom: 100,
  }
});
