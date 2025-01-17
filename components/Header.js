import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { SettingsContext } from '../utils/MenuProvider';

export default function Header() {
  const navigation = useNavigation();
  const { updateSetting } = useContext(SettingsContext);
  const [searchText, setSearchText] = useState('');
  const [debounceSearch, setDebounceSearch] = useState(null);
  
  const handleSearch = (calledText) => {
    if (searchText == calledText) {
      updateSetting('searchText', searchText);
    }
  };
  
  useEffect(() => {
    if (debounceSearch) {
      clearTimeout(debounceSearch);
    }
    setDebounceSearch(setTimeout(() => {
      handleSearch(searchText);
    }, 500));
    
  }, [searchText]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Little Lemon</Text>
      <View style={styles.row}>
        <View style={styles.flexOne}>
          <Text style={styles.city}>Chicago</Text>
          <Text style={styles.description}>
            We are a family owned Mediterranean restaurant, focused on traditional recipes server with a modern twist.
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../images/Hero_image.png')} style={styles.image} />
        </View>
      </View>
      <View style={styles.margin}>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#000000"
            value={searchText}
            onChangeText={text => setSearchText(text)}
            onPress={() => navigation.navigate('Search')}
          />
        </View>
      </View>
      <View style={styles.margin} />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#495E57', 
    margin: 0
  },
  title: {
    color: '#F4CE14', 
    fontSize: 42,
    textAlign: 'left', 
    margin: 12,
    marginBottom: 0,
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginLeft: 8,
  },
  flexOne: {
    flex: 1
  },
  city: {
    color: '#EDEFEE', 
    fontSize: 28, 
  },
  description: {
    color: '#EDEFEE', 
    fontSize: 16,
    marginTop: 12,
  },
  imageContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  image: {
    width: 100, 
    height: 100, 
    borderRadius: 25
  },
  margin: {
    margin: 10
  },
  searchContainer: {
    flexDirection: 'row', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 10, 
    padding: 10
  },
  input: {
    flex: 1, 
    marginLeft: 10, 
    borderWidth: 0
  },
});