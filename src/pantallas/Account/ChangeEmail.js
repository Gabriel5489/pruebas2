import React, { useState, useCallback} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {TextInput, Button} from "react-native-paper"
import {formStyle} from '../../style'
import {useFormik} from "formik"
import * as Yup from "yup";
import {useFocusEffect, useNavigation} from "@react-navigation/native"
import {userApi, getUserApi} from "../../api/user"
import useAuth from '../../hooks/useAuth'

export default function ChangeEmail() {
    
    const [loading, UseLoading] = useState(false);
    const [id, setId] = useState(null)
    const navigation = useNavigation();
    const { auth } = useAuth();

    useFocusEffect(
        useCallback(() => {
            (async() =>{
                 const response = await getUserApi(auth.idUser);
                 response.email && await formik.setFieldValue("email", response.email);
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
                await userApi(formData )
                navigation.goBack();
            } catch (error) {
                UseLoading(false)
            }
        }

    })

    return (
        <View style={styles.container}>
            <TextInput
                label="Email"
                style= {formStyle.input}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                value={formik.values.email}
                error={formik.errors.email}
            />
            <Button
            mode="contained"
            style={formStyle.btnSuccess}
            onPress={formik.handleSubmit}
            loading ={loading}
            >
                Cambiar email
            </Button>
            
        </View>
    )
}
function initialValues() {
    return{
        email:""
    };
}

function validationSchema(){
   return{
       email: Yup.string().required(true)
   }
}


const styles = StyleSheet.create({
    container:{
        padding:20,

    }

})
