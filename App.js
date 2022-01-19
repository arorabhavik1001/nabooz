import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import LoginScreen from './Screens/LoginScreen'
import Loading from './Screens/Loading'
import Home from './Screens/Home';
import Chat from './Screens/Chat'
import Hobbies from './Screens/Hobbies'
import Profile from './Screens/Profile'
import Profilelse from "./Screens/Profilelse";
import Messages from "./Screens/Messages";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const [location, setLocation] = useState("krishna");
  const [errorMsg, setErrorMsg] = useState(null);
  const [distance, setDistance] = useState(null)


  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // radius of earth 
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    setDistance(d.toFixed(1))
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }


  const Stack = createNativeStackNavigator();

  const globalScreenOptions = {
    headerStyle: { backgroundColor: "#095b93" },
    headerTitleStyle: { color: "white", textAlign: "center" },
    headerTintColor: "white",
    headerTitleAlign: "center",
    // headerShown: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Hobbies" component={Hobbies} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Profilelse" component={Profilelse} />
        <Stack.Screen name="Messages" component={Messages} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
    padding: 10
  },
});
