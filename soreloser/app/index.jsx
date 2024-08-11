import { StyleSheet, Image, Platform, View, Text } from 'react-native';

export default function SoreLoser() {
  return (
  <View style={styles.titleContainer}>
    <Text style={styles.welcomeText}>Sugham Veno</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  welcomeText: {
    color: 'green',
    fontSize: 22,
    fontWeight: 'bold'
  }
});
