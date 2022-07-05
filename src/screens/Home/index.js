import React, {useState, useEffect} from 'react';
import {View, ImageBackground, Text, Pressable, ScrollView, StatusBar,Dimensions} from 'react-native';
import styles from './styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation, useRoute} from '@react-navigation/native';
import PostScreen from '../PostScreen';
import places from '../../../assets/data/feed';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { data_state, data_city, data_area } from '../../../assets/data/dropdown';
import { serverURI } from '../../../config';
const HomeScreen = (props) => {
  console.log(serverURI)
  const navigation = useNavigation();
  const route  = useRoute()
  const [value, setValue] = useState(null);
  const [rental_data, setrental_data] = useState([]);
  const [state, setstate] = useState(null);
  const [city, setcity] = useState(null);
  const [area, setarea] = useState(null);
  const [search, setsearch] = useState(false)
  console.log(process.env.NODE_ENV)
  const renderItem = (item) => {

    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  
  const getcustomrentaldata = async () => {
    const location_data = {
      state:state,
      city:city,
      area:area
    }
    console.log(location_data)
    try {
      const response = await fetch(`${serverURI}/post/rent_stay/rental_local`, {
        method: "POST",
        body: JSON.stringify(location_data),// *GET, POST, PUT, DELETE, etc.
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await response.json();
      console.log(json)
      setrental_data([])
      setrental_data(json)
      setsearch(!search)
      console.log(rental_data)
      return json;
       
    } catch (error) {
      console.error(error);
    }
  };
  const getglobalrentaldata = async () => {
    try {
      const response = await fetch(
        `${serverURI}/post/rent_stay/rental_all`
      );
      const json = await response.json();

      return json;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
  const initial_rental_data =  getglobalrentaldata();
  //  const rental_data_arr = JSON.parse(initial_rental_data)
  console.log(initial_rental_data)
  setrental_data(places)
  }, []);
  useEffect(() => {
    setrental_data(rental_data)
    }, [search]);
  return (
    <View>
      <StatusBar animated={true} backgroundColor="#38d3ae" />
      <ScrollView>
      
     
{/* <Pressable
        style={styles.searchButton}
        onPress={() => navigation.navigate('Destination Search')}>
        <Fontisto name="search" size={25} color={'#38d3ae'} style={{marginLeft:20}} />
        <Text style={styles.searchButtonText}>Where are you going?</Text>
      </Pressable> */}
      <ImageBackground
        source={require('../../../assets/images/wallpaper.jpg')}
        style={styles.image}>
      <View style={{}}>
      
      <Dropdown
        style={[styles.dropdown,]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data_state}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="State"
        searchPlaceholder="Search..."
        value={state}
        onChange={item => {
          setstate(item.value);
        }}
        // renderLeftIcon={() => (
        //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        // )}

        renderItem={renderItem}
      />
      <Dropdown
        style={[styles.dropdown,]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data_city}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="City"
        searchPlaceholder="Search..."
        value={city}
        onChange={item => {
          setcity(item.value);
        }}
        // renderLeftIcon={() => (
        //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        // )}
        renderItem={renderItem}
      />
      <Dropdown
        style={[styles.dropdown,]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data_area}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Area"
        searchPlaceholder="Search..."
        value={area}
        onChange={item => {
          setarea(item.value);
        }}
        // renderLeftIcon={() => (
        //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        // )}
        renderItem={renderItem}
      />
      </View>
      <Pressable
          style={[styles.button]}
          onPress={() => getcustomrentaldata()}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
        <Text style={styles.title}>Rental Near you</Text>

        
      </ImageBackground>
      <PostScreen rental_data = {rental_data} />
      
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
