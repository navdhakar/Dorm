import React, {useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import styles from './styles.js';
import { useNavigation } from '@react-navigation/native';

const days = 7;

const Post = ({post}) => {


  console.log("post")
  // console.log(post)
  const navigation = useNavigation();

  const goToPostPage = () => {
    navigation.navigate('Post', {postId: post.id});
  }

  return (
    <Pressable onPress={goToPostPage} style={styles.container}>
      {/* Image  */}
      <Image
        style={styles.image}
        source={{uri: post.image}}
      />

      {/* Bed & Bedroom  */}
      <Text style={styles.bedrooms}>
         Contact: {post.contact}
      </Text>

      {/* Type & Description */}
      <Text >
       <Text style={{color:'#5b5b5b',backgroundColor:"#48dcb6", borderRadius:20,}}>{post.guest_no} guests</Text><Text style={styles.description} numberOfLines={2}> {post.description}</Text>
      </Text>

      {/*  Old price & new price */}
      <Text style={styles.prices}>
        <Text style={styles.oldPrice}>₹{post.price}</Text>
        <Text style={styles.price}>  ₹{post.price} </Text>
        / month
      </Text>

      {/*  Total price */}
      <Text style={styles.totalPrice}>address: {post.address}</Text>
    </Pressable>
  );
};

export default Post;
