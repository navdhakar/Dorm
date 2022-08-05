import React from 'react';
import {View, SafeAreaView, StyleSheet,Linking} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Share from "react-native-share";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import Share from 'react-native-share';

// import files from '../assets/filesBase64';
const url = "https://oneroomrentals.vercel.app/";
const title = "OneRoom app";
const message = "Hey check this awesome place to find and rent pg and rooms.Check this link to download OneRoom";
const options = {
  title,
  url,
  message,
};

const ProfileScreen = () => {
  const user = auth().currentUser;
  const share = async (customOptions = options) => {
    try {
      await Share.open(customOptions);
    } catch (err) {
      console.log(err);
    }
  };
  

  // const myCustomShare = async() => {
  //   const shareOptions = {
  //     message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
  //     url: files.appLogo,
  //     // urls: [files.image1, files.image2]
  //   }

  //   try {
  //     const ShareResponse = await Share.open(shareOptions);
  //     console.log(JSON.stringify(ShareResponse));
  //   } catch(error) {
  //     console.log('Error => ', error);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: user.photoURL,
            }}
            size={80}
            style={{backgroundColor:"#38d3ae"}}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{user.displayName}</Title>
            <Caption style={styles.caption}>{user.email}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Jaipur, India</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{user.phoneNumber ? user.phoneNumber : "not provided"}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹0.0</Title>
            <Caption>Earned</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>0</Title>
            <Caption>Successful rentals</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={async () => {
          await share();
        }}>
          <View style={styles.menuItem}>
            <Icon name="share-variant" color="#38d3ae" size={25}/>
            <Text style={styles.menuItemText}>Share</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#38d3ae" size={25}/>
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        {/* <TouchableRipple onPress={myCustomShare}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple> */}
        
        <TouchableRipple onPress={() => {
                        auth()
                        .signOut()
                        .then(() => console.log('User signed out!'));
                        }}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#38d3ae" size={25}/>
            <Text style={styles.menuItemText}>Signout</Text>
          </View>
        </TouchableRipple>
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="settings-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple> */}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});