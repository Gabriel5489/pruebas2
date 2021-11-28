import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native';
import {TextInput, Button} from "react-native-paper";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useFormik} from "formik";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";
import {addAddressApi, getAddressApi, updateAddressApi} from "../api/adress";
import {formStyle} from "../style";
import {useNavigation} from "@react-navigation/native";

export default function AddAddress(props) {
    const { route: { params },} = props;
    const [loading, setLoading] = useState(false);
    const [newAddress, setNewAddress] = useState(true);
    const {auth} = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
         (async () => {
             if(params?.idAddress){
                setNewAddress(false);
                navigation.setOptions({title: "Actualizar direccion"});
                 const response = await getAddressApi(auth, params.idAddress);
                 await formik.setFieldValue("_id", response._id);
                 await formik.setFieldValue("title", response.title);
                 await formik.setFieldValue("address", response.address);
                 await formik.setFieldValue("postal_code", response.postal_code);
                 await formik.setFieldValue("city", response.city);
                 await formik.setFieldValue("state", response.state);
                 await formik.setFieldValue("country", response.country);
                 await formik.setFieldValue("phone", response.phone);
               
             }
         })();
    }, [params]);
     
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);

             try {
                 
             if(newAddress) await addAddressApi(auth, formData); 
              else  await updateAddressApi(auth, formData)
               navigation.goBack();
             } catch (error) {
                 console.log(error);
                 setLoading(false);
            }
            
        },
    });
    return (
        <KeyboardAwareScrollView extraScrollHeight={25}>
            <View style={styles.container}>
            <Text style={styles.title}>Nueva direccion</Text>
            <TextInput label="Titulo" style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("title", text)}
            value={formik.values.title}
            error={formik.errors.title}
            />
            <TextInput label="Direccion" style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("address", text)}
            value={formik.values.address}
            error={formik.errors.address}
            /> 
            <TextInput label="Codigo Postal" style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("postal_code", text)}
            value={formik.values.postal_code}
            error={formik.errors.postal_code}
            /> 
            <TextInput label="Poblacion" style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("city", text)}
            value={formik.values.city}
            error={formik.errors.city}
            /> 
            <TextInput label="Estado" style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("state", text)}
            value={formik.values.state}
            error={formik.errors.state}
            /> 
            <TextInput label="Pais" style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("country", text)}
            value={formik.values.country}
            error={formik.errors.country}
            /> 
            <TextInput label="Telefono" style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("phone", text)}
            value={formik.values.phone}
            error={formik.errors.phone}
            /> 
            <Button mode="contained"
            style={[formStyle.btnSuccess, styles.btnSucces]}
            onPress={formik.handleSubmit}
            loading={loading}
            >
            {newAddress ? "Crear direccion" : "Actualizar direccion"}
            </Button>
            </View>
        </KeyboardAwareScrollView>
    );
}

function validationSchema(){
    return{
        title:Yup.string().required(),
        address:Yup.string().required(),
        postal_code:Yup.string().required(),
        city:Yup.string().required(),
        state:Yup.string().required(),
        country:Yup.string().required(),
        phone:Yup.string().required(),
    }
}

function initialValues(){
    return{
        title: "",
        address: "",
        postal_code: "",
        city: "",
        state: "",
        country: "",
        phone: "",
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
    },
    title:{
        fontSize:20,
        paddingVertical:20,
    },
    btnSucces:{
        marginBottom:20,
    },
});