import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { db } from "../firebase";

import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
const auth = getAuth();

const Loading = ({ navigation }) => {
//   const [users, setUsers] = useState([]);
//   console.log(users);
var users = []
  useEffect( async () => {
    await db.collection("users").onSnapshot((snapshot) =>{
      users = snapshot.docs.map((doc) => doc.data())

    checkIfLoggedIn();
    }
    );
  }, []);
  
    const checkIfLoggedIn = () => {
      auth.onAuthStateChanged((authUser) => {
        console.log("users", users);
        if (authUser) {
          let obj = users.find((o) => o.email === authUser.email);

          console.log('objo', obj);
          console.log(authUser)
        //   if (obj.firstTime == true) {
        //     navigation.replace("Profile", {
        //       name: authUser.displayName,
        //       profilePicture: authUser.photoURL,
        //       email: authUser.email,
        //     });
        //     console.log("take to profile page");
        //   } else {
            navigation.replace("Home", {
              name: authUser.displayName,
              profilePicture: authUser.photoURL,
              email: authUser.email,
              hobbies: obj.hobbies,
              reviews: obj.reviews,
              //   firstTime: obj.firstTime,
            });
            console.log("take to home page");
        //   }
        } else {
          navigation.replace("Login");
          console.log("take to login");
        }
      });
    };


  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
      {/* <Text>Krishna</Text> */}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
