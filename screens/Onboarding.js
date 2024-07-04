import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { setUserInfo } from '../utils/State';
import { useNavigation } from '@react-navigation/native';
import { isValidEmail } from '../utils/Utils';

export default function Onboarding() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setIsButtonDisabled(firstName === '' || !isValidEmail(email));
  }, [firstName, email]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../images/Logo.png')}
      />
      <Text style={styles.header}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={text => setFirstName(text.replace(/[^a-zA-Z]/g, ''))}
        defaultValue={firstName}
      />
      <Text style={styles.header}>Email</Text>
      <TextInput
        autoCapitalize='none'
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        defaultValue={email}
        keyboardType="email-address"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await setUserInfo(firstName, email);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
  },
  header: {
    fontSize: 16,
    marginBottom: 8,
  },
  logo: {
    marginVertical: 75,
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  input: {
    borderColor: '#e1e1e1',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 16,
  },
  button: {
    height: 50,
    backgroundColor: '#F4CE14', 
    borderColor: '#e1e1e1',
    borderWidth: 1,
    padding: 15,
    margin: 4,
    cursor: 'pointer',
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: '#1e1e1e',
  },
});
