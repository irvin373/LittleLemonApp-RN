import React, { useContext, useState, useEffect } from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import {getFilteredMenuItems} from '../utils/MenuData';
import { SettingsContext } from '../utils/MenuProvider';

const MenuList = () => {
  const { settings } = useContext(SettingsContext);
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    getFilteredMenuItems(settings.selectedCategories, settings.searchText)
      .then(data => setMenuData(data));
  }, [settings.selectedCategories, settings.searchText]);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.image}>
        {item.name === "Lemon Dessert" && <Image source={require('../images/Lemon_dessert.png')} style={styles.image} />}
        {item.name === "Grilled Fish" && <Image source={require('../images/Grilled_fish.png')} style={styles.image} />}
        {item.name !== "Lemon Dessert" && item.name !== "Grilled Fish" && <Image source={{uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`}} style={styles.image} />}
      </View>
    </View>
  );

  return (
    <View style={{flex: 0}}>
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        data={menuData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    paddingLeft: 8,
    backgroundColor: '#FFF',
  },
  title: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
  },
  price: {
    paddingVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
  },
  separator: {
    borderColor: '#DDDDDD',
    borderBottomWidth: 1,
  },
});

export default MenuList;
