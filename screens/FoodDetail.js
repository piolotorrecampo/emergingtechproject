import { StyleSheet, Text, ScrollView, View, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ProductCard from '../components/ProductCard';
import { useUser } from '../context/UserContext';
import { db } from "../services/firebase";
import { doc, getDoc, updateDoc, arrayUnion, } from '@firebase/firestore';

const profilePhoto = require('../assets/userPhoto.png');

const FoodDetail = ({ route }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [sellerName, setSellerName] = useState('');
  const productId = route.params.id; 
  const { products } = useUser();

 useEffect(() => {
    const details = products.find(product => product.id === productId);
    setProductDetails(details);
  }, [productId, products]);

  useEffect(() => {
    // Check if productDetails is not empty before fetching seller name
    if (productDetails && productDetails.sellerId) {
      const fetchSellerName = async () => {
        try {
          const sellerDocRef = doc(db, 'users', productDetails.sellerId);
          const sellerDocSnapshot = await getDoc(sellerDocRef);

          if (sellerDocSnapshot.exists()) {
            const sellerData = sellerDocSnapshot.data();
            setSellerName(sellerData.username);
          } else {
            console.log('Seller not found.');
          }
        } catch (error) {
          console.error('Error fetching seller data:', error.message);
        }
      };

      fetchSellerName();
    }
  }, [productDetails]);

  return (
    <SafeAreaView>
        <ScrollView>
            <View style={styles.productDetailsContainer}>
                {productDetails &&
                    <Details 
                        productId={productDetails.id}
                        userImage={profilePhoto}
                        userName={sellerName}
                        productImage={productDetails.image}
                        reviews={productDetails.ratings}
                        price={productDetails.price}
                        foodTitle={productDetails.name}
                        productDescription={productDetails.description}
                        views={productDetails.views}
                        favoritesCount={productDetails.favoritesCount}
                        timestamp={productDetails.timestamp}
                    />
                }
                <CommentSection
                    id={productId}
                />
                {productDetails &&
                    <MoreFoods
                        sellerId={productDetails.sellerId}
                        productId={productDetails.id}
                    />
                }
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default FoodDetail;

const MoreFoods = (props) => {
    const { products } = useUser();
    const [data, setData] = useState([]);
    const sellerId = props.sellerId
    const currentProductId = props.productId
    
    useEffect(() => {
        const productFiltered = products.filter((item) => item.sellerId === sellerId && item.id !== currentProductId);
        setData(productFiltered); 
    }, [])

    return(
      <View style={styles.moreFoodsContainer}>
        <Text style={styles.moreFoodsText}>More Foods..</Text>
        <ScrollView horizontal={true}>
            <View style={styles.foodCards}>
                {data && data.map((product) => (
                    <ProductCard
                        id={product.id} 
                        image={product.image}
                        title={product.name}
                        reviews={product.ratings}
                        price={product.price}
                    />
                ))}
            </View>
        </ScrollView>        
      </View>  
    )
}

const CommentSection = (props) => {
    const [comment, setComment] = useState('');
    const [commentsData, setCommentsData] = useState([]);
    const { userData, products } = useUser(); 

    const productId = props.id;

    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString();

    useEffect(() => {
        const productFiltered = products.find((item) => item.id === productId);
        setCommentsData(productFiltered.comments);
    
        const timerId = setInterval(async () => {
          try {
            const updatedProduct = products.find((item) => item.id === productId);
            setCommentsData(updatedProduct.comments);
          } catch (error) {
            console.error('Error updating comments:', error.message);
          }
        }, 2000);
    
        return () => {
          clearInterval(timerId);
        };
      }, [productId, products]);

    const handleAddComment = async () => {
        try {
          if (comment.trim() === '') {
            console.log('Invalid Input: Please fill in all fields.');
            return;
          }
      
          const productDocRef = doc(db, 'products', productId);
      
          await updateDoc(productDocRef, {
            comments: arrayUnion({
              description: comment,
              username: userData.username,
              formattedTimestamp: formattedDateTime,
              timestamp: formattedDateTime,
            }),
          });
      
          console.log('Comment added successfully!');
          setComment('');
        } catch (error) {
          console.error('Error adding comment:', error.message);
        }
      };

    return(
        <SafeAreaView>
            <View style={styles.commentContainer}> 
                <Text style={styles.commentTitle}>Fellow foodies say</Text>
                <View style={styles.userCommentContainer}>
                    <ScrollView horizontal={true}>
                        <View style={styles.commentBoxContainer}>
                            { commentsData ? commentsData.map((data) => (
                                <View style={styles.commentBox} key={data.id}>
                                    <Text style={styles.commentText}>{data.description}</Text>
                                    <View style={styles.footerUserDetails}>
                                        <Text>{data.username}</Text>
                                        <Text> | </Text>
                                        <Text>{data.formattedTimestamp}</Text>
                                    </View>
                                </View>
                            )) : 
                                <View style={styles.commentBox}>
                                    <Text style={styles.commentText}>No comments</Text>
                                </View>
                            }
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.commentInputContainer}>
                    <TextInput onChangeText={(value) => setComment(value)} value={comment} style={styles.commentInput} placeholder='Write a comment' placeholderTextColor="#fff" />
                    <Pressable onPress={() => handleAddComment()}>
                        <MaterialCommunityIcons name="send" size={24} color="white" />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const Details = (props) => {
    const { userData } = useUser();

    const handleAddToFavorites = async () => {
        try {
    const newFavorite = props.productId;
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
        const productRef = doc(db, 'products', props.productId);
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
                        <Text>{props.timestamp}</Text>
                    </View>
                </View>
            </View>
            <Image
                style={styles.productImage}
                source={{ uri : props.productImage }}
            />
            <View style={styles.foodDetails}>
                <View style={styles.productMainInfo}>
                    <Text style={styles.foodTitle}>{props.foodTitle}</Text>
                    <Text style={styles.priceText}>₱{props.price}</Text>
                </View>
                <Pressable onPress={() => handleAddToFavorites()} style={styles.heartIcon}>
                    <MaterialCommunityIcons name="bookmark" size={25} color="black" />
                    <Text>Add to Favorites</Text>
                </Pressable>
            </View>
            <View style={styles.stats}>
                <View style={styles.views}>
                    <MaterialCommunityIcons name="bookmark" size={50} color="black" />
                    <Text>{props.views} Views</Text>
                </View>
                <View style={styles.favoritesCount}>
                    <MaterialCommunityIcons name="bookmark" size={50} color="black" />
                    <Text>{props.favoritesCount} Favorites Count</Text>
                </View>
            </View>
            <View style={styles.containerDescription}>
                <Text style={styles.productDescription}>{props.productDescription}</Text>
            </View>
        </SafeAreaView>
    )   
}
 
const styles = StyleSheet.create({
    stats: {
        flexDirection: 'row',
        gap: 40,
        padding: 10,
        backgroundColor: '#D1A50C',
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
    },
    views: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    favoritesCount: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        padding: 10,
        width: '95%',
        alignItems: 'center',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
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
    productMainInfo: {
        gap: 5,
    },
    foodDetails: {
        backgroundColor: "#ECBC24",
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        padding: 20,
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
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
    },
    productDescription: {
        textAlign: 'justify',
        fontSize: 14,
        lineHeight:  20,
    },
    commentContainer: {
        backgroundColor: '#D1A50C',
    },
    commentText: {
        textAlign: 'justify',
        lineHeight: 20,
    },
    commentBox: {
        backgroundColor: '#FFC20F',
        marginLeft: 10,
        padding: 10,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        gap:20,
        width: 350,
        marginVertical: 20,
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        gap: 5,
    },
    commentInput: {
        width: 360,
        height: 40,
        color: 'white',
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 10,
        padding: 10,
        borderRadius: 7, 
    },
    commentBoxContainer: {
        flexDirection: 'row-reverse'
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