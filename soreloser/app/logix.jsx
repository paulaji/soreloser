import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SoreLoser() {
  const [smokingChecked, setSmokingChecked] = useState(-1);
  const [workoutChecked, setWorkoutChecked] = useState(-1);
  const [smokingButtonDisabled, setSmokingButtonDisabled] = useState(false);
  const [workoutButtonDisabled, setWorkoutButtonDisabled] = useState(false);

  // Function to handle check button press
  const handleCheckButtonPress = async (section) => {
    const today = new Date();
    try {
      if (section === 'smoking') {
        if (!smokingButtonDisabled) {
          setSmokingButtonDisabled(true);
          await AsyncStorage.setItem('smokingDate', today.toISOString());
          await AsyncStorage.setItem('smokingCheckedIndex', '0'); // Set first index as checked
          setSmokingChecked(0);
          Alert.alert('Success', 'Smoking habit recorded!');
        }
      } else if (section === 'workout') {
        if (!workoutButtonDisabled) {
          setWorkoutButtonDisabled(true);
          await AsyncStorage.setItem('workoutDate', today.toISOString());
          await AsyncStorage.setItem('workoutCheckedIndex', '0'); // Set first index as checked
          setWorkoutChecked(0);
          Alert.alert('Success', 'Workout recorded!');
        }
      }
    } catch (error) {
      console.error('Error storing date:', error);
    }
  };

  // Check if button should be disabled and set initial state
  useEffect(() => {
    const checkButtonStatus = async () => {
      const today = new Date();
      try {
        const storedSmokingDate = await AsyncStorage.getItem('smokingDate');
        const storedWorkoutDate = await AsyncStorage.getItem('workoutDate');

        const smokingDate = storedSmokingDate ? new Date(storedSmokingDate) : null;
        const workoutDate = storedWorkoutDate ? new Date(storedWorkoutDate) : null;

        if (smokingDate) {
          const smokingDaysPassed = Math.floor((today - smokingDate) / (1000 * 60 * 60 * 24));
          if (smokingDaysPassed < 19) {
            setSmokingButtonDisabled(true);
            const checkedIndex = await AsyncStorage.getItem('smokingCheckedIndex');
            setSmokingChecked(parseInt(checkedIndex, 10));
          } else {
            setSmokingButtonDisabled(false);
            setSmokingChecked(-1);
            await AsyncStorage.removeItem('smokingDate');
            await AsyncStorage.removeItem('smokingCheckedIndex');
          }
        }

        if (workoutDate) {
          const workoutDaysPassed = Math.floor((today - workoutDate) / (1000 * 60 * 60 * 24));
          if (workoutDaysPassed < 19) {
            setWorkoutButtonDisabled(true);
            const checkedIndex = await AsyncStorage.getItem('workoutCheckedIndex');
            setWorkoutChecked(parseInt(checkedIndex, 10));
          } else {
            setWorkoutButtonDisabled(false);
            setWorkoutChecked(-1);
            await AsyncStorage.removeItem('workoutDate');
            await AsyncStorage.removeItem('workoutCheckedIndex');
          }
        }
      } catch (error) {
        console.error('Error retrieving date:', error);
      }
    };

    checkButtonStatus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Smoking</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[...Array(19)].map((_, index) => (
            <View key={`smoking-${index}`} style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[styles.checkbox, smokingChecked === index && styles.checked]}
                onPress={() => handleCheckButtonPress('smoking', index)}
                disabled={smokingButtonDisabled}
              />
              <Text style={styles.dayLabel}>Day {index + 1}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.checkButton, smokingButtonDisabled && styles.disabledButton]}
            onPress={() => handleCheckButtonPress('smoking')}
            disabled={smokingButtonDisabled}
          >
            <Text>Check</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Workout</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[...Array(19)].map((_, index) => (
            <View key={`workout-${index}`} style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[styles.checkbox, workoutChecked === index && styles.checked]}
                onPress={() => handleCheckButtonPress('workout', index)}
                disabled={workoutButtonDisabled}
              />
              <Text style={styles.dayLabel}>Day {index + 1}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.checkButton, workoutButtonDisabled && styles.disabledButton]}
            onPress={() => handleCheckButtonPress('workout')}
            disabled={workoutButtonDisabled}
          >
            <Text>Check</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  checkboxContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  checkbox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
  },
  checked: {
    backgroundColor: 'green',
  },
  dayLabel: {
    marginTop: 5,
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  checkButton: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: 'grey',
  },
  separator: {
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
});
