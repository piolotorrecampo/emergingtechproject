import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { db } from "../services/firebase";
import { doc, updateDoc, arrayRemove, collection } from 'firebase/firestore';

const FavoritesCard = (props) => {
  const { userData } = useUser();

  const navigation = useNavigation();
  const id = props.id

  const handlePress = () => {
      navigation.navigate('FoodDetail', { id }); 
  };

  const handleDelete = async (userId, favoriteId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
  
      await updateDoc(userDocRef, {
        favorites: arrayRemove(favoriteId),
      });
  
      console.log('Favorite deleted successfully');
    } catch (error) {
      console.error('Error deleting favorite: ', error);
    }
  };
  
  return (
    <Pressable onPress={handlePress}>
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
            <Pressable onPress={() => handleDelete(userData.id, id)}>
              <MaterialCommunityIcons name="delete-outline" size={24} color="white" />
            </Pressable>
          </View>     
        </View>
  </Pressable>
  )
}

export default FavoritesCard;

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
        padding: 15,
        gap: 20,
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
       width: 210,
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