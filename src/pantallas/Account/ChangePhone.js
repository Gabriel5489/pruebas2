import React, { useState, useCallback} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {TextInput, Button} from "react-native-paper"
import {formStyle} from '../../style'
import {useFormik} from "formik"
import * as Yup from "yup";
import {useFocusEffect, useNavigation} from "@react-navigation/native"
import {userApi, getUserApi} from "../../api/user"
import useAuth from '../../hooks/useAuth'
  
export default function ChangePhone() {
    
    const [loading, UseLoading] = useState(false);
    const [id, setId] = useState(null)
    const { auth } = useAuth();
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            (async() =>{
                 const response = await getUserApi(auth.idUser);
                 response.cel && await formik.setFieldValue("cel", response.cel);
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
            label="Numero de Telefono" 
            style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("cel", text)}
            value={formik.values.cel}
            error={formik.errors.cel}
            />
            <Button 
            mode="contained" 
            style={formStyle.btnSuccess}
            onPress={formik.handleSubmit}
            loading ={loading}
            >
                Cambiar numero de telefono 
            </Button>
        </View>

    )
}

function initialValues() {
    return{
        cel:""
    };
}

function validationSchema(){
   return{
       cel: Yup.string().required(true)
   }
}



const styles = StyleSheet.create({
   container:{
       padding: 20,
   }
   
})

