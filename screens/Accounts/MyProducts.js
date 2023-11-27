import React from "react";
import { StyleSheet, ScrollView, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../context/UserContext";

import MyProductCard from "../../components/MyProductCard";
import CustomButton from "../../components/CustomButton";
import Filterbar from "../../components/Filterbar";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const MyProduct = () => {
  const navigation = useNavigation();
  const { userData, products } = useUser();

  const userProducts = products.filter(product => product.sellerId === userData.id);

  return (
    <SafeAreaView>
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
          <View style={styles.mainContainer}>
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
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default MyProduct;

const styles = StyleSheet.create({
  mainContainer:{
    paddingBottom: 150,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttons: {
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 10,
  }
});
