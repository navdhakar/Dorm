import React, {useState, useEffect} from "react";
import { View, Text, ScrollView } from "react-native";
import DetailedPost from '../../components/DetailedPost';
import {useRoute} from '@react-navigation/native';
import Post from "../../components/Post"
import places from '../../../assets/data/feed';
import PostCarouselItem from "../../components/PostCarouselItem"

const PostScreen = ({rental_data}) => {
  const route = useRoute();
  // const [render_rental_data, setrender_rental_data] = useState([])
  const render_rental_data = rental_data


  const post = places[0]
  const post1 = places[1]
  const post2 = places[2]

   console.log("postscreen") 
   console.log(render_rental_data)
  return (
    <View style={{backgroundColor: 'white'}}>
      <ScrollView>
        {
         render_rental_data.map(( data) => {
         
       return <Post key={data._id} post={data} />

         })
        }
      {/* <Post post={post} />
      <Post post={post1} />
      <Post post={post2} /> */}
    </ScrollView>
    </View>
  );
};

export default PostScreen;
