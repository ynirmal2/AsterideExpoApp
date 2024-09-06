import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { sendPushNotification } from '../service/notificationService';
import { registerForPushNotificationsAsync } from '../../App';

const HomeDetails = ({ route }) => {
  const { home } = route.params;
  const [location, setLocation] = useState(null);
  const [unlocked, setUnlocked] = useState(false);
  const [showUnlockBtn, setShowUnlockBtn] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [loader, setLoader] = useState(true);


  useEffect(() => {

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  }, []);



  useEffect(() => {
    (async () => {
      setLoader(true)
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      let token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);
      const distance = getDistance(
        { latitude: 40.748900, longitude: -73.985500 },
        { latitude: home.latitude, longitude: home.longitude }
      );

      if (distance <= 30) {
        setShowUnlockBtn(true)
      } else {
        setShowUnlockBtn(false)
      }
      setLoader(false)
    })();
  }, []);



  const handleUnlock = async () => {
    if (location) {
      // const distance = getDistance(
      //   { latitude: location.coords.latitude, longitude: location.coords.longitude },
      //   { latitude: home.latitude, longitude: home.longitude }
      // );

      const distance = getDistance(
        { latitude: 40.748900, longitude: -73.985500 },
        { latitude: home.latitude, longitude: home.longitude }
      );

      if (distance <= 30) {
        setUnlocked(true);
        await sendPushNotification(expoPushToken, "Home Unlocked", `You've successfully unlocked ${home.address}.`);
        Alert.alert('Success', 'Home unlocked!');
      } else {
        Alert.alert('Error', 'You are too far from the home.');
      }
    }
  };

  return (
    <View style={
      styles.container
    }>
      {
        loader ? <ActivityIndicator size={'large'} style={styles.loaderStyle} /> :
          <View style={
            styles.container
          }>

            <View style={styles.homeItem}>
              <Image source={{
                uri: home.image
              }} style={styles.image} />

              <View style={{
                paddingTop: 10
              }}>
                <Text
                  style={
                    [styles.lineHeight, styles.paddingButtom10, styles.addText]
                  }>{home.address}</Text>
                <Text
                  style={
                    [styles.lineHeight, styles.paddingButtom10, styles.addText]
                  }
                >{home.description}</Text>
                <View>
                  <Text
                    style={
                      [styles.addText]
                    }
                  >{"Price: "}
                    <Text
                      style={
                        styles.boldText
                      }
                    >{"₹"}{home.price}</Text>
                  </Text>

                  <Text
                    style={
                      [styles.addText]
                    }
                  >{"Area: "}
                    <Text
                      style={
                        styles.boldText

                      }
                    >{home.floorspace}{' sq.'}</Text>
                  </Text>
                </View>


              </View>


            </View>

            {unlocked ? (
              <Text style={[styles.lineHeight,
              styles.paddingButtom10,
              styles.addText, styles.greenColor]}>Home is already unlocked</Text>
            ) :


              (
                <>
                  {
                    showUnlockBtn ? <TouchableOpacity
                      style={
                        styles.unlockBtn
                      }
                      onPress={handleUnlock}>
                      <Text style={
                        styles.btnText
                      } >
                        Unlock
                      </Text>
                    </TouchableOpacity>
                      : <Text style={[styles.lineHeight,
                      styles.paddingButtom10,
                      styles.addText, styles.redColor, styles.boldText]}>You are too far from the home.</Text>
                  }
                </>



              )

            }
          </View>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  homeItem: {
    height: '95%',
    padding: 10,
  },
  image: {
    height: '45%',
    borderRadius: 20
  },
  paddingButtom10: {
    paddingBottom: 10
  },
  unlockBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2196F3',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '500'
  },
  addText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold'
  },
  loaderStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  redColor: {
    color: "red",
  },
  greenColor: {
    color: "green",
  },
});

export default HomeDetails;
