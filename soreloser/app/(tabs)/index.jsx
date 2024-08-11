import { Image, StyleSheet, Platform, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.WelcomeText}>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  WelcomeText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
