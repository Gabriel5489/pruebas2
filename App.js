import React, {useState, useMemo, useEffect, useRef} from 'react';
 
import { View, Text, Button} from 'react-native';
import{ Provider as PaperProvider} from "react-native-paper";
import jwtDecode from "jwt-decode";
import AppNavigation from "./src/navigation/AppNavigation";
import AuthScreens from "./src/pantallas/Auth";
import AuthContext from "./src/context/AuthContext"; 
import { setTokenApi, getTokenApi, removeTokenApi} from "./src/api/token";
import { size } from 'lodash';
import { GetNotificationApi, DeleteNotificationApi, sendPushNotification, registerForPushNotificationsAsync } from "./src/api/Notification";
import * as Notifications from 'expo-notifications';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [auth, setAuth] = useState(undefined);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [noti, setNoti] = useState(null)
  const [visible, setVisible] = useState(false)
  const notificationListener = useRef();
  const responseListener = useRef();

useEffect(() => { 
 (async()=>{
    const token = await getTokenApi();
    if(token){
       
      setAuth({
        token,
        idUser:token,
      });
    }else{
      setAuth(null);
    }
    if(token)
      setInterval(() => {searchNoti(token)},10000);
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });      
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
 })()
}, []);

const login =(user) => {
 setTokenApi(user.intIdUsuario);
 setAuth({
   token: user.intIdUsuario,
   idUser: user.intIdUsuario,
 });
};

const logout = () => {
  if(auth){
    removeTokenApi();
    setAuth(null);
  }
}

  const authData = useMemo(
    () => ({
    auth,
    login,
    logout,
    }),
    [auth]
  );
  async function searchNoti(idUser)
  {
    let controller = new AbortController();
    let signal = controller.signal;
    let check = false, i = 0;
    const notifi = await GetNotificationApi(idUser,signal);
    controller.abort();
    if( notifi[0] != null )
    {
      console.log("entro");
      for(i = 0; i < size(notifi) ; i++){
        if(notifi[i].producto.intCant > 0){
          check = true;
        }
      }
      if(check){
        setNoti(notifi);
        setVisible(true);
        console.log(notifi);
      }
    }
  }
  if(visible)
  { 
    let i;
    console.log("checar nottiii");
    for (i = 0; i < noti.length; i++)
    {
      sendPushNotification(expoPushToken,noti[i].producto.vchProd);
      DeleteNotificationApi(noti[i].intIDNoti)
    }
    setVisible(false);
  };

  if(auth === undefined) return null;
  console.log(auth);
  return (
    <AuthContext.Provider value={authData}> 
    <PaperProvider>
    {auth ? (
       <AppNavigation/>
       )
     
     : (<AuthScreens />
     )}
   
    </PaperProvider>
    </AuthContext.Provider>
  );
}


    //  {auth ? (
    //    <AppNavigation/>
    //    )
     
    //  : (<AuthScreens />
    //  )}