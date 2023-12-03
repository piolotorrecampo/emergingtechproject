import { StyleSheet, Text, ScrollView, View, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ProductCard from '../components/ProductCard';
import { useUser } from '../context/UserContext';
import { db } from "../services/firebase";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove} from '@firebase/firestore';
import Header from '../components/Header';

const profilePhoto = require('../assets/userPhoto.png');

const FoodDetail = ({ route }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [sellerName, setSellerName] = useState('');
  const [sellerImage, setSellerImage] = useState('');
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
            setSellerImage(sellerData.image);
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
        <Header
            title='Details'
        />
        <ScrollView>
            <View style={styles.productDetailsContainer}>
                {productDetails &&
                    <Details 
                        productId={productDetails.id}
                        userImage={sellerImage.length <= 0 ? profilePhoto : sellerImage}
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
        <Text style={styles.moreFoodsText}>Other seller items</Text>
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
            <View style={styles.commentContainer}> 
                <Text style={styles.commentTitle}>Fellow foodies say</Text>
                <View style={styles.userCommentContainer}>
                    <ScrollView horizontal={true}>
                        <View style={styles.commentBoxContainer}>
                            { commentsData ? commentsData.map((data) => (
                                <View style={styles.commentBox} key={data.id}>
                                    <Text style={styles.commentText}>{data.description}</Text>
                                    <View style={styles.footerUserDetails}>
                                        <Text style={styles.commentUsername}>{data.username}  |</Text>
                                        <Text style={styles.commentTimestamp}>{data.formattedTimestamp}</Text>
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
                    <TextInput onChangeText={(value) => setComment(value)} value={comment} style={styles.commentInput} placeholder='Write a comment' placeholderTextColor="black" />
                    <Pressable onPress={() => handleAddComment()}>
                        <MaterialCommunityIcons name="send" size={24} color="black" />
                    </Pressable>
                </View>
            </View>
    )
}

const Details = (props) => {
    const { userData } = useUser();
    const [pressed, setPressed] = useState(null);

    useEffect(() => {
        const checkIfProductInFavorites = async () => {
            try {
                const userDocRef = doc(db, 'users', userData.id);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                const currentFavorites = userDoc.data().favorites || [];
                const newFavorite = props.productId;

                // Check if the product is in favorites
                const productInFavorites = currentFavorites.includes(newFavorite);
                console.log(productInFavorites);
                setPressed(productInFavorites);
                } else {
                console.log('User document not found.');
                }
            } catch (error) {
                console.error('Error checking if product is in favorites:', error);
            }
        };

        checkIfProductInFavorites()
    }, [])

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

    const handleDelete = async (userId, favoriteId) => {
        try {
        const userDocRef = doc(db, 'users', userData.id);
    
        await updateDoc(userDocRef, {
            favorites: arrayRemove(props.productId),
        });
    
        console.log('Favorite deleted successfully');
        } catch (error) {
        console.error('Error deleting favorite: ', error);
        }
    };

    const handlePress = () => {
        setPressed(!pressed);
        if(pressed) {
            handleDelete();
        }else{
            handleAddToFavorites();
        }
    } 

    return (
        <SafeAreaView style={styles.detailsContainer}>
            <View style={styles.sellerInfo}>
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.userImage}
                        source={{ uri : props.userImage} }
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.sellerNameText}>{props.userName}</Text>
                        <Text  style={styles.productTimestamp}>{props.timestamp}</Text>
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
                    <View style={styles.stats}>
                        <Text style={styles.priceText}>₱{props.price}</Text>
                        <View style={styles.favoritesCount}>
                            <MaterialCommunityIcons name="eye" size={20} color="black" />
                            <Text>{props.views}</Text>
                        </View>
                        <View style={styles.favoritesCount}>
                            <MaterialCommunityIcons name="bookmark" size={20} color="black" />
                            <Text>{props.favoritesCount}</Text>
                        </View>
                    </View>
                </View>
                {pressed ?
                    <Pressable onPress={() => handlePress()} style={styles.heartIcon}>
                        <MaterialCommunityIcons name="bookmark" size={40} color="black" />
                    </Pressable>
                : 
                    <Pressable onPress={() => handlePress()} style={styles.heartIcon}>
                        <MaterialCommunityIcons name="bookmark-outline" size={40} color="black" />
                    </Pressable>
                }
                
            </View>
            <View style={styles.containerDescription}>
                <Text style={styles.descriptionText}>Description</Text>
                <Text style={styles.productDescription}>{props.productDescription}</Text>
            </View>
        </SafeAreaView>
    )   
}
 
const styles = StyleSheet.create({
    commentTimestamp: {
        color: 'black',
        fontSize: 11,
        fontFamily: 'poppinsLight'
    },
    commentUsername:{
        color: 'black',
        fontSize: 11,
        fontFamily: 'poppinsLight',
    },
    lineDivider: {
        borderBottomColor: 'black',
        backgroundColor: '#ECBC24',
        borderWidth: 2,
        width: 100
    },
    descriptionText: {
        fontSize: 17,
        fontFamily: 'poppinsSemiBold',
    },
    sellerNameText: {
        fontFamily: 'poppinsBold',
    },
    productTimestamp: {
        fontFamily: 'poppinsLight',
    },
    stats: {
        flexDirection: 'row',
        gap: 20,
        backgroundColor: '#ECBC24',
        alignItems: 'center',
        width: '95%',
    },
    views: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    favoritesCount: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    productDetailsContainer: {
        flex: 1,
    },
    detailsContainer: {
        alignItems: 'center',
    },  
    sellerInfo: {
        flexDirection: 'row', 
        backgroundColor: '#ECBC24',
        padding: 10,
        width: '95%',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },
    profileContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    profileInfo: {
        flexDirection: 'column',
    },
    userImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 1,
    },
    productImage: {
        width: '95%',
        height: 300,
    },
    foodDetails: {
        backgroundColor: "#ECBC24",
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    foodTitle: {
        fontSize: 30,
        fontFamily: 'poppinsBold',
        maxWidth: 310,
    },
    topDescription: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    priceText: {
        fontSize: 20,
        fontFamily: 'poppinsRegular',
    },
    heartIcon: {
        flexDirection: 'row',
        padding: 15,
        gap: 7,
        alignItems: 'center',
    },
    containerDescription: {
        backgroundColor: "#ECBC24",
        width: '95%',
        paddingBottom: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
    },
    productDescription: {
        textAlign: 'justify',
        fontSize: 14,
        lineHeight:  20,
    },
    commentContainer: {
        backgroundColor: 'white',
        marginBottom: 10,
    },
    commentText: {
        textAlign: 'justify',
        lineHeight: 20,
        fontFamily: 'poppinsSemiBold',
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
    },
    commentTitle: {
        fontSize: 25,
        marginHorizontal: 13,
        paddingVertical: 10,
        color: 'black',
        fontFamily:'poppinsSemiBold'
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
        marginVertical: 10,
        color: 'black',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        padding: 10,
        borderRadius: 7, 
    },
    commentBoxContainer: {
        flexDirection: 'row-reverse'
    },
    moreFoodsContainer: {
        paddingVertical: 10,
        backgroundColor: 'white',
        marginBottom: 100,
    },
    foodCards: {
        flexDirection: 'row',
        margin: 10,
        gap: 10,
    },
    moreFoodsText: {
        color: 'black',
        fontSize: 25,
        fontFamily: 'poppinsSemiBold',
        marginHorizontal: 14,
    }
})