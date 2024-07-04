import React, { useEffect, useState, useContext } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from 'react-native';
import { SettingsContext } from '../utils/MenuProvider';

const Category = ({ name, selected, updateSelected }) => {
  return (
    <TouchableOpacity onPress={() => updateSelected(name)} style={!selected ? styles.selectedButton : styles.button}>
      <Text style={selected ? styles.textStyleSelected : styles.textStyle}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
    </TouchableOpacity>
  );
};

const FilterCategories = () => {
  const [initialized, setInitialized] = useState(false);
  const { settings, updateSetting } = useContext(SettingsContext);
  const [categories, setCategories] = useState([]);

  const updateSelected = (name) => {    
    let updatedCategories = [...categories];
    updatedCategories = updatedCategories.map(category => {
      if (category.name === name) {
        return { ...category, selected: !category.selected };
      }
      return category;
    });
    setCategories(updatedCategories);
    updateSetting('selectedCategories', updatedCategories);
  };

  useEffect(() => {
    if (!initialized) {
      if (settings.menuItems && settings.menuItems.length > 0){
        const uniqueCategories = [...new Set(settings.menuItems.map(item => item.category))];
        const categoriesWithSelected = uniqueCategories.map(category => ({ name: category, selected: true }));
        setCategories(categoriesWithSelected);
        setInitialized(true);  
      }
    }
  }, [settings.menuItems]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories && categories.length > 0 && categories.map((category, index) => (
          <Category key={index} name={category.name} selected={category.selected} updateSelected={updateSelected} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  button: {
    borderRadius: 16,
    backgroundColor: '#F3F4F4',
    borderWidth: 1,
    borderColor: '#F3F4F4',
    padding: 10,
    margin: 10,
  },
  selectedButton: {
    borderRadius: 16,
    backgroundColor: '#495E57',
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textStyleSelected: {    
    color: '#495E57',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterCategories;
