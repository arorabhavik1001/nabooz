import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Platform,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  Button,
} from "react-native";
import { Avatar, ListItem, Icon, Input } from "react-native-elements";
import { db } from "../firebase";
import {
  MaterialCommunityIcons,
  AntDesign,
  SimpleLineIcons,
  Feather,
  Ionicons,
  FontAwesome5,
  Entypo
} from "@expo/vector-icons";

const Hobbies = ({navigation, route}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) =>
      setUsers(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  const { finalArray, hobby, sender, senderPhoto, senderEmail } = route.params;
  
    useLayoutEffect(() => {
      navigation.setOptions({
        title: hobby,
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: 80,
            }}
          >
            <TouchableOpacity>
              <Entypo
                name="chat"
                size={24}
                color="white"
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate("Messages")}
              />
            </TouchableOpacity>
          </View>
        ),
      });
    }, []);

    const enterChat = (
      chatName,
      url,
      sender,
      senderPhoto,
      reviews,
      email,
      hobbies,
      senderEmail
    ) => {
      let obj = users.find((o) => o.email === email);

      console.log("objo", obj);

      navigation.navigate("Profilelse", {
        name: chatName,
        profilePicture: url,
        sender: sender,
        senderPhoto: senderPhoto,
        reviews: reviews,
        email: email,
        hobbies: hobbies,
        senderEmail: senderEmail,
        showReviewInput: obj.showReviewInput,
      });
    };

    const takeToProfilelse = () => {
      navigation.navigate("Profilelse", {
        name: route.params.name,
        profilePicture: route.params.profilePicture,
        email: route.params.email,
        reviews: route.params.reviews,
        hobbies: route.params.hobbies,
        sender: route.params.sender,
        senderPhoto: route.params.senderPhoto,
        senderEmail: route.params.senderEmail,
        showReviewInput: obj.showReviewInput,
      });
    };

    
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap:"wrap",
          // justifyContent: "space-around",
        }}
      >
        {finalArray.map((data) => (
          <View>
            {data[4].includes(hobby) ? (
              <TouchableOpacity onPress={() =>
                  enterChat(
                    data[1],
                    data[2],
                    sender,
                    senderPhoto,
                    data[5],
                    data[0],
                    data[4],
                    senderEmail
                  )
                }>
                <View>
                  <View style={{ position: "relative" }}>
                    <Image
                      source={{
                        uri: data[2],
                      }}
                      style={{ width: 130, height: 130 }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        // backgroundColor: "black",
                        bottom: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ color: "white" }}>{data[1]}</Text>
                      <Text style={{ color: "white" }}>{data?.[3]} km</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ) : // <TouchableOpacity>
            //   <View></View>
            //   <ListItem
            //     key={data[0]}
            //     onPress={() =>
            //       enterChat(
            //         data[1],
            //         data[2],
            //         sender,
            //         senderPhoto,
            //         data[5],
            //         data[0],
            //         data[4],
            //         senderEmail
            //       )
            //     }
            //     bottomDivider={true}
            //   >
            //     <Avatar
            //       rounded
            //       source={{
            //         uri:
            //           data?.[2] ||
            //           "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            //       }}
            //     />
            //     <ListItem.Content>
            //       <ListItem.Title style={{ fontWeight: "700" }}>
            //         {data[1]}
            //       </ListItem.Title>
            //       <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            //         {data?.[3]} km away
            //       </ListItem.Subtitle>
            //     </ListItem.Content>
            //   </ListItem>
            // </TouchableOpacity>
            null}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Hobbies;
