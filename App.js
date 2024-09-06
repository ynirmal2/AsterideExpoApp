import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeList from './src/screens/HomeList';
import HomeDetails from './src/screens/HomeDetails';


import * as Notifications from 'expo-notifications';

import Constants from 'expo-constants';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { sendPushNotification } from './src/service/notificationService';
import { Button, Platform, Text, View } from 'react-native';
import * as Device from 'expo-device';

const Stack = createStackNavigator();


export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();


  useEffect(() => {
    // Configure notification handling
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);



  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
 
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
 
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
 
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  

  return (
    <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    }}>
    <Text>Your expo push token: {expoPushToken}</Text>
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>Notification Title: {notification && notification.request.content.title} </Text>
      <Text>Notification Body: {notification && notification.request.content.body}</Text>
      <Text>Notification Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
    </View>
    <Button
      title="Press to Send Notification"
      onPress={async () => {
        await sendPushNotification(expoPushToken);
      }}
    />
  </View>
  );

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="HomeList">
  //       <Stack.Screen name="HomeList" component={HomeList} />
  //       <Stack.Screen name="HomeDetails" component={HomeDetails} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}



const getProjectId = async () => {
  // Logic to get your project ID
  return '701293d0-ef74-4270-9868-d164082d37b0';
};

async function registerForPushNotificationsAsync() {
  let token;
  let projectId = await getProjectId()
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({projectId})).data;
    //  token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo push token:", token);
    
  } else {
    alert('Must use physical device for Push Notifications');
  }
 
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
 
  return token;
 }


// const registerForPushNotificationsAsync = async () => {
//   let token;
//   console.log(Constants.isDevice,"JJJJJJJJJJJJJJJ")
//   // if (Constants.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }

//     const projectId = await getProjectId();
//     // Get Expo push token
//     token = (await Notifications.getExpoPushTokenAsync({projectId})).data;
//     console.log('Push Token:', token);
//   // } else {
//   //   alert('Must use physical device for push notifications');
//   // }

//   return token;
// };