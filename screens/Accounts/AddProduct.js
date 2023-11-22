import { StyleSheet, Text, View, Pressable, Image, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormTextInput } from '../../components/FormTextInput';
import CustomButton from '../../components/CustomButton';
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from "expo-image-picker";
import { useUser } from '../../context/UserContext';

import { db, storage } from "../../services/firebase";
import { addDoc, collection } from '@firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const { userData } = useUser();
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString();
    const likes = 0; 

    useEffect(() => {
      (async () => {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work.");
        }
          })();
    }, []);
  
    const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri)
      } else {
        alert('You did not select any image.');
      }
    }
    

  const handleAddProduct = async () => {
    try {
      const storageRef = ref(storage, 'productImages/' + Math.random().toString(36).substring(2));
      const response = await fetch(image);
      const imageBlob = await response.blob();
      await uploadBytes(storageRef, imageBlob);
      const imageUrl = await getDownloadURL(storageRef);

      const productsRef = collection(db, 'products');
      const newProductDoc = await addDoc(productsRef, {
        image: imageUrl,
        sellerId: userData.id,
        name: productName,
        price: price,
        type: type,
        description: description,
        likes: likes,
        timestamp: formattedDateTime
      });

      console.log(imageUrl);

      console.log('Product added successfully with ID:', newProductDoc.id);

      Alert.alert('Successful', 'Product added successfully.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);

      setProductName('');
      setPrice('');
      setType('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
            <Text style={styles.title}>Add Product</Text>
            <View>
                <Pressable style={styles.logoContainer} onPress={pickImageAsync}>
                    {image ? (
                      <Image source={{ uri: image.uri }} style={styles.selectedImage} />
                    ) : (
                      <View style={styles.chooseImageContainer}>
                        <Ionicons name="md-image-outline" size={24} color="white" />
                        <Text style={styles.choosePhoto}>Add Photo</Text>
                      </View>
                    )}
                </Pressable>
            </View>
            <View style={styles.inputContainer}>
                <FormTextInput 
                    title="Product Name"
                    value={productName}
                    onChangeText={(value) => setProductName(value)}
                />
                <FormTextInput 
                    title="Price"
                    value={price}
                    onChangeText={(value) => setPrice(value)}
                />
                <FormTextInput 
                    title="Food Category (eg. dessert, breakfast...)"
                    value={type}
                    onChangeText={(value) => setType(value)}
                />
                <FormTextInput 
                    title="Description"
                    value={description}
                    onChangeText={(value) => setDescription(value)}
                />
            </View>
            <CustomButton
                title='Add Product'
                onPress={() => handleAddProduct(userData.username, productName, price, type, description)}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddProduct

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#D1A50C",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        gap: 10,
    },
    title: {
        fontSize: 25, 
        color: 'white'
    },
    inputContainer: {
        gap: 10,
    },
    logoContainer: {
        alignItems: "center",
    },
    choosePhoto: {
        textAlign: "center",
        fontSize: 18,
        color: "white",
    },
    chooseImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 200,
        backgroundColor: '#FFC20F',
        borderRadius: 10,
    },
    selectedImage: {
        width: 200,
        height: 200,
        alignSelf: "center",
        marginBottom: 16,
    },
})