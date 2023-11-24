import { StyleSheet, ScrollView, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import FavoritesCard from "../components/FavoritesCard";
import Filterbar from "../components/Filterbar";
import { useUser } from "../context/UserContext";

import { db } from "../services/firebase";
import { getDocs, getDoc, doc, collection } from '@firebase/firestore';
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";



const Favorites = () => {
  const { userData, setUserData, products } = useUser();
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userDocRef = doc(collection(db, 'users'), userData.id);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const favorites = userDocSnapshot.data().favorites;
          const favoritesFiltered = products.filter((product) => favorites.includes(product.id));;
          setUserFavorites(favoritesFiltered);
        } else {
          console.log('User document does not exist');
        }
      } catch (error) {
        console.error(error);
      }
    };

    let timerId = setInterval(() => {
        fetchFavorites();
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);


  return (
    <SafeAreaView>
        <Header
          title='Favorites'
        /> 
        <ScrollView>
          <View style={styles.container}>
            {userFavorites && userFavorites.length > 0 ? userFavorites.map((product) => (
              <FavoritesCard
                id={product.id} 
                image={product.image}
                title={product.name}
                reviews={product.ratings}
                price={product.price}
              />
            )) : (
              <View style={styles.noFavoritesContainer}>
                <Text style={styles.noFavoritesText}>No favorites.</Text>
              </View>
            )}
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingLeft: 5,
    marginTop: 10,
    gap: 10,
    paddingBottom: 100,
  },
  noFavoritesContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  noFavoritesText: {
    fontSize: 18,
    fontFamily: 'poppinsSemiBold',
    textAlign: 'center'
  }
});
