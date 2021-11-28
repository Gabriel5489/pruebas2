import React, {useState} from 'react';
import { StyleSheet, ScrollView, Image, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import RegisterForm from "../componentes/Auth/RegisterForm";
import  LoginForm from "../componentes/Auth/LoginForm";
import logo from "../../assets/Logo.jpeg";
import {layoutStyle} from "../style";

export default function Auth() {
    const [showLogin, setShowLogin] = useState(true);

    const changeForm = () => setShowLogin(!showLogin);


    return (
        <SafeAreaView style={showLogin ? layoutStyle.container : (styles.container,layoutStyle.container)}>
            <Image style={styles.logo} source={logo} />
            {showLogin ?(
             <LoginForm changeForm={changeForm}/>
             ) : <RegisterForm changeForm ={changeForm}/>}   
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop:100
    },
   logo: {
       width: "100%",
       height: 250,
       resizeMode: "contain",
       marginBottom: 20,
   },
});