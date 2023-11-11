import { StyleSheet, ScrollView, View, Image } from "react-native";
import React from "react";
import MyProductCard from "../../components/MyProductCard";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import Filterbar from "../../components/Filterbar";

const lechon = require('../../assets/lechon.png')

const MyProduct = () => {

  const navigation = useNavigation();

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
        <View style={styles.buttons}>
          <CustomButton
            title="Add Products"
            onPress={() => navigation.navigate('AddProduct')}
          />
        </View>
        <ScrollView>
          <View style={styles.container}>
          {data && data.map((product, index) => (
            <MyProductCard
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

export default MyProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttons: {
    marginBottom: 10,
    marginHorizontal: 10,
  }
});
