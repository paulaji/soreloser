import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function SoreLoser() {
  return (
    <View style={styles.titleContainer}>
      <Text>
        <Text style={{ color: 'white', fontWeight: '100', fontSize: 50 }}>
          Sore
        </Text>
        <Text
          style={{
            color: 'red',
            fontWeight: '900',
            fontSize: 50,
            fontStyle: 'italic',
          }}
        >
          LOSER
        </Text>
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'black', fontSize: 20 }}>
          I am ready to lose!{' '}
          <Text
            style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }}
          >
            Let's Go
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'col',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'black',
  },
  welcomeText: {
    color: 'red',
    fontSize: 30,
    fontWeight: '300',
  },
});
