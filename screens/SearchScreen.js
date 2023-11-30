import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState, useEffect }from 'react'
import Header from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUser } from '../context/UserContext'
import ProductCard from '../components/ProductCard'
import { ScrollView } from 'react-native-gesture-handler'

const SearchScreen = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const { userDataUpdated, userData, products } = useUser();

  useEffect(() => {
    if (userDataUpdated.favorites) {
      const productsNotInFavorites = products.filter(
        (product) => !userDataUpdated.favorites.includes(product.id) && product.sellerId !== userData.id
      );
      setAllProducts(productsNotInFavorites);
    } else {
      const userProductsExcluded = products.filter(
        (product) => product.sellerId !== userData.id
      );
      setAllProducts(userProductsExcluded);
    }
  }, [userData.id, userDataUpdated.favorites, products]);

  const handleOnChange = (text) => {
    setSearchInput(text);
    const filteredProducts = allProducts.filter(
      (product) => product.name.toLowerCase().includes(text.toLowerCase())
    );
    setAllProducts(filteredProducts);
  };

  return (
    <SafeAreaView>
      <Header
        title='Search'
      />
      <View>
        <TextInput 
          style={styles.textInput} 
          placeholder='Search products'
          value={searchInput}
          onChangeText={handleOnChange}
        />
      </View>     
      <ScrollView>
      <View style={styles.moreFoodsContainer}>
              {allProducts && allProducts.length > 0 ? allProducts.map((product) => (
                <ProductCard
                  id={product.id} 
                  image={product.image}
                  title={product.name}
                  reviews={product.ratings}
                  price={product.price}
                />
              )) : (
                <View style={styles.noItemsAvailableContainer}>
                  <Text style={styles.noItemsAvailableText}>No items available.</Text>
                </View>
              )}
            </View>
          </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  textInput: {
    fontFamily: 'poppinsRegular',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 7,
    padding: 10,
    margin: 10,
  },
  moreFoodsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  noItemsAvailableContainer: {
    padding: 10,
  },
  noItemsAvailableText: {
    fontFamily: 'poppinsLight',
    textAlign: 'center',
  },
})