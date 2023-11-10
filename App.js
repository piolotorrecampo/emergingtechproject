import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, key: currentCourseGoals.length + 1 },
    ]);
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>
      </View>
      <View style={styles.headerContainer}>
        <Image
         source={require('./Icon.png')} 
          style={styles.imageStyleLogo} 
        />
      </View>


      <View style={styles.ContainerLechon}>

        <Image
          source={require('./lechon.png')} //image of food//
          style={styles.imageStyle}
        />
        <Text style={styles.ContainerLechonText}>Lechon Kawali</Text> <Text style={styles.ContainerLechonPrice}>₱200</Text>

      </View>
      <View style={styles.container3rd}>
      </View>

      <GoalInput onAddGoal={addGoalHandler} />
      <View style={styles.goalsListContainer}>
        <FlatList data={courseGoals} renderItem={(itemData) => {
          return (
            <GoalItem text={itemData.item.text} />
          );
        }} />
        <View style={styles.footerContainer}>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#ECBC24',
    alignItems: 'center',
    justifyContent: 'space-between', // Updated to space-between
    width: '100%',
    height: 50, // Change the height as needed
    marginBottom: 10,
    paddingLeft: '80%', // Add some right padding to separate the logo from the right edge
  },

  appContainer: {
    flex: 1,
    padding: 0,
    paddingHorizontal: 0,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    borderRadius: 10,
  },

  ContainerLechon: {
    width: 230, // Adjust the width as needed
    height: 300,
    backgroundColor: '#ECBC24',
    borderTopLeftRadius: 10,
    alignSelf: 'center',
    borderTopRightRadius: 10,
    },

  imageStyle: {
    width: 230, 
    height: 230, 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

  },
  imageStyleLogo: {
    width: 60, // Adjust the width as needed
    height: 30,
  },
  
  ContainerLechonText: {
    textAlign: 'justified',
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },

  ContainerLechonPrice: {
    textAlign: 'justified',
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },

  flexContainer: {
    flex: 1, // Change length to flex
    backgroundColor: '#ECBC24',
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
    width: 230,
    height: 100,
  },

  container3rd: {
    marginBottom: 10,
    backgroundColor: 'bisque',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 230, // Adjust the width as needed
    height: 100,
    alignSelf: 'center',

  },

  footerContainer: {
    marginTop: 10,
    backgroundColor: '#ECBC24',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    height: 50, // Change the height as needed
  },
});
