import React, { useState, useEffect } from "react";
import { TextInput, Button, View } from "react-native-paper";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import albumLogo from "./image.png";

const UpdateProduct = () => {
  const [productTitle, setProductTitle] = useState("");
  const [whereToFind, setWhereToFind] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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

  const handleUpdate = () => {
    console.log("Update Product Title:", productTitle);
    console.log("Update Where can I find?:", whereToFind);
    console.log("Update Price:", price);
    console.log("Update Description:", description);
    if (image) {
      console.log("Selected Update Image URI:", image);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top section for "Update Product" */}
      <View style={styles.topSection}>
        <Text style={styles.products}>Update Product</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable style={styles.logoContainer} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.selectedImage} />
          ) : (
            <View>
              <Image source={albumLogo} style={styles.logo} />
              <Text style={styles.choosePhoto}>Update Photo</Text>
            </View>
          )}
        </Pressable>
        <TextInput
          label="Update Product Title"
          value={productTitle}
          onChangeText={(text) => setProductTitle(text)}
          style={styles.input}
        />
        <TextInput
          label="Update Where can I find?"
          value={whereToFind}
          onChangeText={(text) => setWhereToFind(text)}
          style={styles.input}
        />
        <TextInput
          label="Update Price"
          value={price}
          onChangeText={(text) => setPrice(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          label="Update Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
          style={[styles.input, styles.descriptionInput]}
        />
        <Button mode="contained" onPress={handleUpdate} style={styles.button}>
          Update
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topSection: {
    backgroundColor: "orange",
    height: 80,
    paddingLeft: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    padding: 16,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  choosePhoto: {
    textAlign: "center",
    fontSize: 18,
    color: "blue",
  },
  selectedImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  descriptionInput: {
    height: 100,
  },
  button: {
    backgroundColor: "orange",
    borderRadius: 8,
  },
  products: {
    fontSize: 20,
    color: "white",
  },
});

export default UpdateProduct;
