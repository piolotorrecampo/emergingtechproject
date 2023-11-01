import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import AddProduct from "./components/AddProduct";

const App = () => {
  return (
    <View style={styles.container}>
      {/* Top section with orange background */}


      {/* Rest of the content */}
      <SafeAreaView style={styles.content}>
        <AddProduct />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    backgroundColor: "white",
  },

});

export default App;
