import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormTextInput } from '../../components/FormTextInput';
import CustomButton from '../../components/CustomButton';
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from "expo-image-picker";


const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

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

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.title}>Add Product</Text>
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
                    onChangeText={setProductName}
                />
                <FormTextInput 
                    title="Location"
                    value={location}
                    onChangeText={setLocation}
                />
                <FormTextInput 
                    title="Price"
                    value={price}
                    onChangeText={setPrice}
                />
                <FormTextInput 
                    title="Description"
                    value={description}
                    onChangeText={setDescription}
                />
            </View>
            <CustomButton
                title='Add Product'
            />
        </View>
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