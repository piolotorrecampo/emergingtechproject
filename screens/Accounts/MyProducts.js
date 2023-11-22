import React from "react";
import { StyleSheet, ScrollView, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../context/UserContext";

import MyProductCard from "../../components/MyProductCard";
import CustomButton from "../../components/CustomButton";
import Filterbar from "../../components/Filterbar";
import Header from "../../components/Header";

const MyProduct = () => {
  const navigation = useNavigation();
  const { userData, products } = useUser();

  const userProducts = products.filter(product => product.sellerId === userData.id);

  return (
    <View>
      <Header
        title='My Products'
      />
        <View style={styles.buttons}>
          <CustomButton
            title="Add Products"
            onPress={() => navigation.navigate('AddProduct')}
          />
        </View>
        <ScrollView>  
          {userProducts && userProducts.map((product) => (
            <View style={styles.container}>
              <MyProductCard
                id={product.id} 
                image={product.image}
                title={product.name}
                reviews={product.ratings}
                price={product.price}
                description={product.description}
                type={product.type}
              />
            </View>
          ))}
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
    marginBottom: 10,
  },
  buttons: {
    marginBottom: 10,
    marginHorizontal: 10,
  }
});
