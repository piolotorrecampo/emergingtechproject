import { StyleSheet, Text, ScrollView, View, Image, TextInput } from 'react-native';
import React from 'react';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

import ProductCard from '../components/ProductCard';
const profilePhoto = require('../assets/userPhoto.png');
const lechon = require('../assets/lechon.png');

const FoodDetail = () => {

  products = [
    {
        userImage: profilePhoto,
        userName: 'Mekus Mekus',
        userLocation: '3rd Floor, Bldg 9',
        reviews: '4.7',
        price: '200',
        productDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        foodTitle: "Crispy Lechon Kawali"
    }
  ]

  return (
    <SafeAreaView>
        <ScrollView>
            <View style={styles.productDetailsContainer}>
                {products && products.map((data, index) => (
                    <Details 
                        userImage={data.userImage}
                        userName={data.userName}
                        userLocation={data.userLocation}
                        productImage={lechon}
                        reviews={data.reviews}
                        price={data.price}
                        foodTitle={data.foodTitle}
                        productDescription={data.productDescription}
                    />
                ))}
                <CommentSection/>
                <MoreFoods/>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default FoodDetail

const MoreFoods = () => {
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
    ]

    return(
      <View style={styles.moreFoodsContainer}>
        <Text style={styles.moreFoodsText}>Suggested Foods</Text>
        <ScrollView horizontal={true}>
            <View style={styles.foodCards}>
                {data && data.map((product, index) => (
                    <ProductCard
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
    )
}

const CommentSection = () => {
    comments = [
        {
            userComment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is...',
            userFirstName: 'Insan',
            timeUpload: '1 week ago',
        },
        {
            userComment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is...',
            userFirstName: 'Insan',
            timeUpload: '1 week ago',
        },
        {
            userComment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is...',
            userFirstName: 'Insan',
            timeUpload: '1 week ago',
        },
        {
            userComment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is...',
            userFirstName: 'Insan',
            timeUpload: '1 week ago',
        },
    ]

    return(
        <SafeAreaView>
            <View style={styles.commentContainer}> 
                <Text style={styles.commentTitle}>Fellow foodies say</Text>
                <View style={styles.userCommentContainer}>
                    <ScrollView horizontal={true}>
                        <View style={styles.commentBoxContainer}>
                            { comments && comments.map((data, index) => (
                                <View style={styles.commentBox}>
                                    <Text style={styles.commentText}>{data.userComment}</Text>
                                    <View style={styles.footerUserDetails}>
                                        <Text>{data.userFirstName}</Text>
                                        <Text> | </Text>
                                        <Text>{data.timeUpload}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.commentInputContainer}>
                    <TextInput style={styles.commentInput} placeholder='Write a comment' placeholderTextColor="#fff" />
                </View>
            </View>
        </SafeAreaView>
    )
}

const Details = (props) => {
    return (
        <SafeAreaView style={styles.detailsContainer}>
            <View style={styles.sellerInfo}>
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.userImage}
                        source={props.userImage}
                    />
                    <View style={styles.profileInfo}>
                        <Text>{props.userName}</Text>
                        <Text>{props.userLocation}</Text>
                    </View>
                </View>
                <Pressable>
                    <Text>More</Text>
                </Pressable>
            </View>
            <Image
                style={styles.productImage}
                source={props.productImage}
            />
            <View style={styles.foodDetails}>
                <Text style={styles.foodTitle}>{props.foodTitle}</Text>
                <View style={styles.topDescription}>
                    <Text style={styles.reviewsText}>{props.reviews}</Text>
                    <Text style={styles.priceText}>₱{props.price}</Text>
                </View>
                <Pressable style={styles.heartIcon}>
                    <AntDesign name="heart" size={18} color="black" />
                    <Text>Add to Favorites</Text>
                </Pressable>
            </View>
            <View style={styles.containerDescription}>
                <Text style={styles.productDescription}>{props.productDescription}</Text>
            </View>
        </SafeAreaView>
    )   
}
 
const styles = StyleSheet.create({
    productDetailsContainer: {
        flex: 1,
    },
    detailsContainer: {
        alignItems: 'center'
    },  
    sellerInfo: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        backgroundColor: '#ECBC24',
        padding: 6,
        width: '95%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfo: {
        flexDirection: 'column',
    },
    userImage: {
        height: 50,
        width: 50,
    },
    productImage: {
        width: '95%',
        height: 300,
    },
    foodDetails: {
        backgroundColor: "#ECBC24",
        width: '95%',
        padding: 10,
        gap: 5,
    },
    foodTitle: {
        fontSize: 20,
    },
    topDescription: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    priceText: {
        fontSize: 17,
    },
    heartIcon: {
        flexDirection: 'row',
        paddingVertical: 5,
        gap: 7,
        alignItems: 'center',
    },
    containerDescription: {
        backgroundColor: 'rgba(242, 189, 121, 0.5)',
        width: '95%',
        padding: 10,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    productDescription: {
        textAlign: 'justify',
        fontSize: 14,
        lineHeight:  20,
    },
    commentContainer: {
        backgroundColor: '#D1A50C',
        paddingVertical: 10,
    },
    commentText: {
        textAlign: 'justify',
        lineHeight: 20,
    },
    commentBox: {
        backgroundColor: '#FFC20F',
        margin: 10,
        padding: 10,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        gap: 30,
        width: 350,
    },
    commentTitle: {
        fontSize: 25,
        marginHorizontal: 10,
        color: 'white',
    },
    footerUserDetails: {
        flexDirection: 'row',
        gap: 8,
    },
    commentInputContainer: {
        marginHorizontal: 10,
        borderBottomWidth: 2,
        borderBlockColor: 'white'
    },
    commentInput: {
        margin: 10,
        color: 'white',
    },
    commentBoxContainer: {
        flexDirection: 'row'
    },
    moreFoodsContainer: {
        backgroundColor: '#D1A50C',
        paddingVertical: 10,
        marginVertical: 20,
    },
    foodCards: {
        flexDirection: 'row',
        margin: 10,
        gap: 10,
    },
    moreFoodsText: {
        fontSize: 25,
        marginHorizontal: 10,
        color: 'white',
    }
})