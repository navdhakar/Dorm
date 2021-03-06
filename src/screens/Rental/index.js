import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import {useTheme} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { serverURI } from '../../../config';

import ImagePicker from 'react-native-image-crop-picker';

const Rentalpost = () => {
  const user = auth().currentUser;
  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const {colors} = useTheme();
  const [no_guest, setno_guest] = useState('')
  const [description, setdescription] = useState('')
  const [price, setprice] = useState('')
  const [state, setstate] = useState('')
  const [city, setcity] = useState('')
  const [area, setarea] = useState('')
  const [address, setaddress] = useState('')
  const reference = storage().ref('rental.jpg');
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 900,
      height: 500,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path); 

      // this.bs.current.snapTo(1);
    });
  }
  const postrental = async () => {

    // uploads file
    await reference.putFile(image);
    const url = await storage().ref('rental.jpg').getDownloadURL();
    const post_rental_data = {
      name:"navdeep dhakar",
      contact:"6367018851",
      guest_no:no_guest,
      description:description,
      price:price,
      state:state,
      city:city,
      area:area,
      address:address,
      image:url
    }
    
    try {
      const response = await fetch(`${serverURI}/post/rent_stay/rental`, {
        method: "POST",
        body: JSON.stringify(post_rental_data),// *GET, POST, PUT, DELETE, etc.
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await response.json();
      console.log(json)
      return json;
       
    } catch (error) {
      console.error(error);
    }
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Pictures of Rooms</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: image,
                }}
                style={{height: 170, width: 400, }}
                imageStyle={{borderRadius: 15, marginTop:20, }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#000"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#000',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            Navdeep Dhakar
          </Text>
        </View>

        <View style={[styles.action, {marginTop:10}]}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
 
            placeholder="Number of Guest"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={newtext => {
              setno_guest(newtext);
            }}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="sort-desc" color={colors.text} size={20} />
          <TextInput
            
            placeholder="Description"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={newtext => {
              setdescription(newtext);
            }}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="rupee" color={colors.text} size={20} />
          <TextInput
            

            placeholder="Price"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={newtext => {
              setprice(newtext);
            }}
          />
        </View>
        
        <View style={styles.action}>
          <FontAwesome name="globe" color={colors.text} size={20} />
          <TextInput

            placeholder="State"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={newtext => {
              setstate(newtext);
            }}
          />
        </View>
        <View style={styles.action}>
          <Icon name="city" color={colors.text} size={20} />

          <TextInput

            
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={newtext => {
              setcity(newtext);
            }}
          />
        </View>
        <View style={styles.action}>
        <Icon name="map-marker-outline" color={colors.text} size={20} />

          <TextInput

            placeholder="Area"
            placeholderTextColor="#666666"
            
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={newtext => {
              setarea(newtext);
            }}
          />
        </View>
        <View style={styles.action}>
        <Icon name="map-marker-outline" color={colors.text} size={20} />

          <TextInput
        

            placeholder="Address"
            placeholderTextColor="#666666"
          
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={newtext => {
              setaddress(newtext);
            }}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={() => { postrental()}}>
          <Text style={styles.panelButtonTitle}>POST</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Rentalpost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#38d3ae',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#73A9AD',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});