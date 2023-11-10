import React, { useState } from 'react';
import { Pressable, StyleSheet, View, TextInput, Text } from 'react-native';

function GoalInput(props) {
  const [enteredGoalText, setEnteredText] = useState('');

  function goalInputHandler(enteredText) {
    setEnteredText(enteredText);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoalText);
    setEnteredText('');
  }

  return (      
    <View style={styles.container}> 
            <Text style={styles.containerfodies}>Fellow Foodies Say</Text> 
      <View style={styles.inputContainerLine}>
        <TextInput
          style={styles.textInput}
          placeholder="Write a comment"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <Pressable onPressIn={addGoalHandler} 
          unstable_pressDelay="100" 
          style={styles.click}>

          {({ pressed }) => (
            <Text style={styles.text}>
            {pressed ? 'Comment Added!' : 'Add Comment'}</Text>
          )}
        </Pressable>
      </View>
      <View style={styles.containerfooter}>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECBC24',
    height: 150,
  },
  containerfodies: {
    marginTop: 10,
    marginLeft: 10,
    textAlign: 'justified',
    color: 'white',
    fontWeight: 'bold',
  },

  ContainerffText: {
    textAlign: 'justified',
    color: 'white',
    fontWeight: 'bold',
  },
  textInput: {
    marginBottom: 5,
    margintop: 5,
    width: '70%',
    borderColor: 'black',
    borderWidth: 1, //kapal to ng border bobo mo mark//
    height: 100,
    marginLeft: 7,
    color: 'black',
    borderRadius: 10,
    fontSize: 15,
  },

  inputContainerLine: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
  },
  text: {
    fontSize: 12,
    color: 'black',
  },

  click: {
    backgroundColor: '#ECBC24',
    alignments: 'center',
    flexDirection: 'column',
    borderRadius: 5,
    padding: 10,
    marginLeft: 5,
    borderWidth: 1, 
  },
});

export default GoalInput;