import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Header from '../components/Header';
import MenuList from '../components/MenuList';
import FilterCategories from '../components/FilterCategories';
import { writeMenuItems, menuitemsExist, getMenuItems } from '../utils/MenuData';
import { SettingsContext } from '../utils/MenuProvider';
import { fetchData } from '../utils/Utils';

export default function HomeScreen() {
  const { updateSetting } = useContext(SettingsContext);
  const [data, setData] = useState(null);
  const getAndPersistMenuItems = async () => {
    if (!await menuitemsExist()) {
      const data = await fetchData('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
      writeMenuItems(data.menu);
    }
  }
  useEffect(() => {       
    async function getData() {
      await getAndPersistMenuItems();
      const items = await getMenuItems();
      updateSetting("menuItems", items);
      setData(items);
    }
    getData();
  }, []);

  return (
    <>
      <Header />
      <FilterCategories />
      <SafeAreaView style={{flex: 1}}>
        <MenuList data={data} />
      </SafeAreaView>
    </>
  );
}
