import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const FavoritesCard = (props) => {
    
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('FoodDetail'); 
    };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={props.image}
        />
        <View style={styles.descriptionBox}>
          <View style={styles.descriptionContainer}>
              <Text style={styles.titleText}>{props.title}</Text>
              <View style={styles.bottomDescription}>
                  <Text style={styles.reviewsText}>{props.reviews}</Text>
                  <Text style={styles.priceText}>₱{props.price}</Text>
              </View>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default FavoritesCard

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        alignItems: 'center',
        maxHeight: 220,
        maxWidth: '100%',
        borderRadius: 10,
    },
    descriptionContainer: {
        backgroundColor: '#ECBC24',
        width: '100%',
        maxWidth: '100%',
        padding: 9,
        gap: 5,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    image: {
       width: 380,
       height: 150, 
       borderTopRightRadius: 10,
       borderTopLeftRadius: 10,
    },
    titleText: {
       color: 'white',
       fontWeight: 'bold',
       fontSize: 15,
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