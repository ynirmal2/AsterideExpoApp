import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import homesData from '../data/homes.json'; // Mock API data

import * as Notifications from 'expo-notifications';

const HomeList = ({ navigation }) => {
  const [homes, setHomes] = useState([]);

  const [notification, setNotification] = useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  useEffect(() => {
    // Configure notification handling
    Notifications.setNotificationHandler({
      handleNotification: async () => {
        return {
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        };
      },
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response, "<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>");
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    setHomes(homesData);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={homes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.homeItem}>
            <Image source={{
              uri: item.image
            }} style={styles.image} />
            <Text
              style={
                [styles.lineHeight, styles.paddingButtom10, styles.addText]
              }>{item.shortAdd}</Text>
            <Text
              style={
                [styles.lineHeight, styles.paddingButtom10, styles.addText]
              }
            >{item.description}</Text>
            <Button

              title="View Details"
              onPress={() => navigation.navigate('HomeDetails', { home: item })}

            />
          </View>
        )}
      />
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
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#BFBFBF',
    padding: 20,
    borderRadius: 10
  },
  image: {
    width: "90%",
    height: 200,
    borderRadius: 20
  },
  textLineHeight: {
    lineHeight: 10
  },
  addText: {
    fontSize: 16,
    textAlign: 'center'
  },
  paddingButtom10: {
    paddingBottom: 10
  }
});

export default HomeList;
