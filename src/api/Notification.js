import { WEB_URL } from "../utils/constants";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

export async function AddNotificationApi(idUser, idProd){
    try{
        const url = `${WEB_URL}/api/add/notifications`;
        const params = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idUser:idUser, idProd: idProd})
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    }catch(error){
        console.log(error);
        return null;
    }
}
export async function GetNotificationApi(idUser,signal){
    try {
        const url = `${WEB_URL}/api/notifications`;
        const params = {
            signal,
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idUser:idUser
            })
        }
        const response = await fetch(url,params);
        const result = response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function DeleteNotificationApi(idNoti){
    try {
        const url = `${WEB_URL}/api/del/notifications/${idNoti}`;
        const params = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
        }
        const response = await fetch(url,params);
        const result = response.json();
        return result
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
export async function sendPushNotification(expoPushToken , title) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: `${title}`,
        body: '¡Entra para comprar!',
        data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}
export async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
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
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
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
  