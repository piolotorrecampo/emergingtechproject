import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormTextInput } from '../../components/FormTextInput';
import CustomButton from '../../components/CustomButton';
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from "expo-image-picker";

import { db, storage } from "../../services/firebase";
import { doc, updateDoc } from '@firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';



const UpdateProduct = ({ route }) => {
    const [productName, setProductName] = useState(route.params.title);
    const [productId, setProductId] = useState(route.params.id)
    const [price, setPrice] = useState(route.params.price);
    const [description, setDescription] = useState(route.params.description);
    const [image, setImage] = useState(route.params.image);
    const [type, setType] = useState(route.params.type);

    console.log(productId);
    console.log(productName);
    console.log(price);
    console.log(description);
    console.log(image);
    console.log(type);

    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString();

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work.");
      }
        })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleUpdate = async () => {
    try {
      const storageRef = ref(storage, 'productImages/' + Math.random().toString(36).substring(2));
      const response = await fetch(image);
      const imageBlob = await response.blob();
      await uploadBytes(storageRef, imageBlob);
      const imageUrl = await getDownloadURL(storageRef);
      
      const productRef = doc(db, 'products', productId);
  
      await updateDoc(productRef, {
        name: productName,
        price: price,
        image: imageUrl,
        description: description,
        type: type,
        timestamp: formattedDateTime,
      });
  
      console.log('Update successful');
    } catch (error) {
      console.error('Error during update:', error.message);
    }
  };

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.title}>Update Product</Text>
            <View>
                <Pressable style={styles.logoContainer} onPress={pickImage}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.selectedImage} />
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
                    title="Type"
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
                onPress={() => handleUpdate()}
                title='Update Product'
            />
        </View>
    </SafeAreaView>
  )
}

export default UpdateProduct;

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