import React, { useState, useCallback} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {TextInput, Button} from "react-native-paper"
import {formStyle} from '../../style'
import {useFormik} from "formik"
import * as Yup from "yup";
import {useFocusEffect, useNavigation} from "@react-navigation/native"
import {userApi, getUserApi} from "../../api/user"
import useAuth from '../../hooks/useAuth'
    
export default function ChangeUsername() {

    const [loading, UseLoading] = useState(false);
    const [id, setId] = useState(null)
    const { auth } = useAuth();
    const navigation = useNavigation();
    
    useFocusEffect(
        useCallback(() => {
            (async() =>{
                 const response = await getUserApi(auth.idUser);
                 response.id && setId(response.id);
            }) ()
        }, [] )
    )

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit:async (formData) =>{

            UseLoading(true);
            try {
                formData.id = id;
                await userApi(formData)
                navigation.goBack();
            } catch (error) {
                UseLoading(false)
            }
        }

    })
    
    return (
        <View style={styles.container} >
            
            <TextInput 
            label="Nueva contraseña" 
            style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("password", text)}
            value={formik.values.password}
            error={formik.errors.password}
            secureTextEntry
            />

           <TextInput
                label="Repetir contraseña"
                style={formStyle.input}
                onChangeText={(text) =>formik.setFieldValue("repeatPassword", text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
                secureTextEntry
           />

            <Button 
            mode="contained" 
            style={formStyle.btnSuccess}
            onPress={formik.handleSubmit}
            loading={loading}
            >
                Cambiar contraseña
            </Button>
        </View>

    )
}

function initialValues() {
    return{
        password:"",
        repeatPassword:"",

    };
}

function validationSchema(){
   return{
       password: Yup.string().min(4, true).required(true),
       repeatPassword: Yup.string().min(4,true).oneOf([Yup.ref("password")], true).required(true),
   };
}

const styles = StyleSheet.create({
   container:{
       padding: 20,
   }
   
})

