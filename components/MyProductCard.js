import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { db } from "../services/firebase";
import { doc, deleteDoc, collection } from 'firebase/firestore';


const MyProductCard = (props) => {
  const id = props.id;
  const description = props.description;
  const navigation = useNavigation();

  
  const handleUpdate = () => {
    navigation.navigate('UpdateProduct', { ...props });
  };

  const handleDelete = async (productId) => {
    const productsRef = collection(db, 'products');
    const productDoc = doc(productsRef, productId);

    console.log('product', productId);

    try {
      await deleteDoc(productDoc);
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error deleting document: ', error.message);
    }
  }

  return (
      <Pressable onPress={handleUpdate}>
        <View style={styles.descriptionBox}>
          <View style={styles.rightSide}>
            <View>
              <Image
                style={styles.image}
                source={{ uri : props.image }}
              />
            </View>
            <View>
              <Text style={styles.titleText}>{props.title}</Text>
              <Text style={styles.priceText}>₱{props.price}</Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Pressable onPress={() => handleUpdate()}>
              <MaterialCommunityIcons name="store-edit" size={24} color="white" />
            </Pressable>
            <Pressable onPress={() => handleDelete(userData.id, id)}>
              <MaterialCommunityIcons name="delete-outline" size={24} color="white" />
            </Pressable>
          </View>     
        </View>
    </Pressable>
  )
}

export default MyProductCard;

const styles = StyleSheet.create({
  rightSide: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
  },
  descriptionBox: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: 10,
      height: 120,
      backgroundColor: '#ECBC24',
      borderRadius: 7,
      width: 400,
  },
  descriptionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      gap: 15,
  },
  image: {
     width: 100,
     height: 100, 
     borderRadius: 7,
  },
  titleText: {
     color: 'white',
     fontWeight: 'bold',
     fontSize: 17,
  },
  reviewsText: {  
      color: 'white',
      fontSize: 11,
  },
  priceText: {
      color: 'white',
      fontWeight: 'bold',
  },
  bottomDescription: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  }
})