import React, { useState, useEffect } from "react";
import { TextInput, Button} from "react-native-paper";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import albumLogo from "../assets/albumLogo.png";

const FormProduct = () => {
  const [productTitle, setProductTitle] = useState("");
  const [whereToFind, setWhereToFind] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
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

  const handleSubmit = () => {
    console.log("Product Title:", productTitle);
    console.log("Where can I find?:", whereToFind);
    console.log("Price:", price);
    console.log("Description:", description);
    if (image) {
      console.log("Selected Image URI:", image);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.products}>Add Product</Text>
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
              <Text style={styles.choosePhoto}>Add Photo</Text>
            </View>
          )}
        </Pressable>
        <TextInput
          label="Product Title"
          value={productTitle}
          onChangeText={(text) => setProductTitle(text)}
          style={styles.input}
        />
        <TextInput
          label="Where can I find?"
          value={whereToFind}
          onChangeText={(text) => setWhereToFind(text)}
          style={styles.input}
        />
        <TextInput
          label="Price"
          value={price}
          onChangeText={(text) => setPrice(text)}
          style={styles.input}
          keyboardType="numeric" // Limit to numeric input
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
          style={[styles.input, styles.descriptionInput]}
        />
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Submit
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
  topSection: {
    backgroundColor: "orange", 
    height: 80,
    flexDirection: "row",
    alignItems: "center", 
    paddingLeft: 50, 
    paddingTop: 30,
  },
  products: {
    fontSize: 20,
    color: "white",
  },
});

export default FormProduct;