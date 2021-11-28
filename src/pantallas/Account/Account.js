import React, {useState, useCallback} from 'react'
import { ScrollView, Text } from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import {getUserApi} from "../../api/user"
import Menu from "../../componentes/Account/Menu" 
import UserInfo from '../../componentes/Account/UserInfo'
import useAuth from '../../hooks/useAuth'

export default function Account() {
    const [dataUser, setUser] = useState(null);
    console.log(dataUser);
    const { auth } = useAuth();
    useFocusEffect(
        useCallback(() =>{
            (async() =>{
                const response = await getUserApi(auth.idUser);
                setUser(response);
            }) ();
        }, [])
    );



    return (
           <>
        <ScrollView>    
          <UserInfo user={dataUser}/>
          <Menu/>
        </ScrollView>
        </>
           
    );
}

