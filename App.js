import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  useEffect(() => {
    requestUserPermission();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      const fcmToken = await messaging().getToken();
      console.log('tokenn---->', fcmToken);
      // AsyncStorage.setItem("Device_Token",fcmToken)
      messaging().onMessage(async remoteMessage => {
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
        );
      });
      messaging().setBackgroundMessageHandler(async remoteMessage => {});
    }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello App</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
