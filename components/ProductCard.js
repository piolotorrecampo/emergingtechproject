import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { db } from "../services/firebase";
import { doc, updateDoc, getDoc, arrayRemove } from '@firebase/firestore';
import { useUser } from '../context/UserContext';



const ProductCard = (props) => {
    const [pressed, setPressed] = useState(false);
    const navigation = useNavigation();
    const id = props.id;
    const { userData } = useUser();

    const handlePress = async () => {
        navigation.navigate('FoodDetailScreen', { id }); 

        const productRef = doc(db, 'products', id);
        const productDoc = await getDoc(productRef);

        if (productDoc.exists()) {
            const currentViewsCount = productDoc.data().views || 0;

            await updateDoc(productRef, {
                views: currentViewsCount + 1,
            });

            console.log('Product section updated successfully!');
        } else {
            console.log('Product document not found.');
        }
    };

    const handleDelete = async () => {
        try {
        const userDocRef = doc(db, 'users', userData.id);
    
        // Update the user document in Firestore using arrayRemove
        await updateDoc(userDocRef, {
            favorites: arrayRemove(id),
        });
    
        console.log('Favorite deleted successfully');
        } catch (error) {
        console.error('Error deleting favorite: ', error);
        }
    };


    const handleAddToFavorites = async () => {
        try {
            const newFavorite = props.id;
            const userDocRef = doc(db, 'users', userData.id);

            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
            const currentFavorites = userDoc.data().favorites || [];

            // Check if the product is already in favorites
            if (!currentFavorites.includes(newFavorite)) {
                const updatedFavorites = [...currentFavorites, newFavorite];

                await updateDoc(userDocRef, {
                    favorites: updatedFavorites,
                });

                console.log('Product added to favorites successfully!');

                // Now, update the product section
                const productRef = doc(db, 'products', props.id);
                const productDoc = await getDoc(productRef);

                if (productDoc.exists()) {
                const currentFavoritesCount = productDoc.data().favoritesCount || 0;

                // Update the product section
                await updateDoc(productRef, {
                    favoritesCount: currentFavoritesCount + 1,
                });

                    console.log('Product section updated successfully!');
                    setPressed(!pressed);
                } else {
                    console.log('Product document not found.');
                }
                
            } else {
                console.log('Product is already in favorites.');
            }
                    } else {
                    console.log('User document not found.');
                    }
                } catch (error) {
                    console.error('Error adding product to favorites:', error);
                }
            }

  const handlePullUp = () => {
    setPressed(!pressed);
    handleAddToFavorites();
  }
  

  return (
    <Pressable onPress={handlePress} key={props.id}>
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri : props.image }}
            />
            <View style={styles.descriptionContainer}>
                <View style={styles.descriptionBox}>
                    <Text style={styles.titleText}>{props.title}</Text>
                    <Text style={styles.priceText}>₱{props.price}</Text>
                </View>
                <Pressable onPress={() => handlePullUp()}>
                    { pressed ? 
                        <MaterialCommunityIcons name="bookmark" size={24} color="white" />
                      : 
                        <MaterialCommunityIcons name="bookmark-outline" size={24} color="white" />
                    }
                </Pressable>
            </View>
        </View>
    </Pressable>
  )
}

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        maxHeight: 300,
        maxWidth: 190,
        borderRadius: 7,
        margin: 4
    },
    descriptionBox: {
        flexDirection: 'column',
    },
    descriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ECBC24',
        width: '100%',
        maxWidth: 200,
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 5,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
    },
    image: {
       width: 190,
       height: 220, 
       borderTopRightRadius: 7,
       borderTopLeftRadius: 7,
    },
    titleText: {
       color: 'white',
       fontWeight: 'bold',
       fontSize: 16,
       maxWidth: 140,
    },
    priceText: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
    },
    bottomDescription: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})