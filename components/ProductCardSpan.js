import { StyleSheet, Text, View, Image, Pressable, ImageBackground} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { db } from "../services/firebase";
import { doc, updateDoc, getDoc, arrayRemove } from '@firebase/firestore';
import { useUser } from '../context/UserContext';



const ProductCardSpan = (props) => {
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
    if (!pressed) {
        handleAddToFavorites();
    } else {
        handleDelete();
    }
  }

  return (
    <Pressable onPress={handlePress} key={id}>
        <View style={styles.container}>
            <ImageBackground
                style={styles.image}
                imageStyle={{ borderRadius: 7 }}
                source={{ uri : props.image }}
            >
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
            </ImageBackground>
        </View>
    </Pressable>
  )
}

export default ProductCardSpan;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        maxHeight: 220,
        width: 350,
        borderRadius: 10,
        margin: 5,
    },
    descriptionBox: {
        flexDirection: 'column',
    },
    descriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(236,188,36, 0.5)',
        width: '100%',
        maxWidth: 350,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 7,
        top: 100,
    },
    image: {
       width: 340,
       height: 180, 
       padding: 10,
    },
    titleText: {
       color: 'white',
       fontSize: 17,
      fontFamily: 'poppinsBold'
    },
    priceText: {
        fontSize: 13,
        color: 'white',
        fontFamily: 'poppinsLight'
    },
    bottomDescription: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})