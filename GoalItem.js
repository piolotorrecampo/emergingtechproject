import { StyleSheet, View, Text} from "react-native";

function GoalItem(props) {
    return(
    <View style={styles.goalItems}>
        <Text style={styles.goalText}>{props.text}</Text>
    </View>
    )
};

export default GoalItem;

const styles = StyleSheet.create({
 goalItems: {
  flex: 1,
 },
 goalText: {
  backgroundColor: '#ECBC24',
  color: 'black',
    padding: 30,
    borderRadius: 10,
    marginTop: 1,
    flex: 1,
  },
})