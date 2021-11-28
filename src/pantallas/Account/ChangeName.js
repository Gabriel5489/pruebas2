import React, { useState, useCallback} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {TextInput, Button} from "react-native-paper"
import {formStyle} from '../../style'
import {useFormik} from "formik"
import * as Yup from "yup";
import {useFocusEffect, useNavigation} from "@react-navigation/native"
import {userApi, getUserApi} from "../../api/user"
import useAuth from '../../hooks/useAuth'
  
export default function ChangeName() {

    const [loading, UseLoading] = useState(false);
    const [id, setId] = useState(null)
    const { auth } = useAuth();
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            (async() =>{
                 const response = await getUserApi(auth.idUser);
                 response.name && await formik.setFieldValue("name", response.name);
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
            label ="Nombre"
            style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("name", text)}
            value={formik.values.name}
            error={formik.errors.name}
            />

            <Button
            mode="contained"
            style={formStyle.btnSuccess}
            onPress={formik.handleSubmit}
            loading ={loading}
            >
                Cambiar nombre y apellidos
            </Button>
        </View>
    )
}

function initialValues() {
    return{
        name:""
    };
}

function validationSchema(){
   return{
       name: Yup.string().required(true)
   }
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
    }
    
})


