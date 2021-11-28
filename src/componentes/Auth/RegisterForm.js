import React, {useState}from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import {TextInput, Button} from "react-native-paper";
import { useFormik} from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import {registerApi} from "../../api/user";
import {formStyle} from "../../style";

export default function RegisterForm(props) {
    const {changeForm} = props;

   const [loading,setLoading]= useState(false);

    const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object(validationSchema()),
      onSubmit: async (formData) => {
          setLoading(true);
          try {
              await registerApi(formData);
            changeForm();
          } catch (error) {
              setLoading(false);
              Toast.show("Error al registrar el usuario",{
                position: Toast.positions.CENTER,
            });
              
          }
      },
    })

    return (
        <ScrollView>
        <SafeAreaView >
            <TextInput label ="Nombre" style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("nombre", text)}
           value={formik.values.nombre}
           error={formik.errors.nombre}
           />
           <TextInput label ="Apellido Paterno" style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("apaterno", text)}
           value={formik.values.apaterno}
           error={formik.errors.apaterno}
           />
           <TextInput label ="Apellido Materno" style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("amaterno", text)}
           value={formik.values.amaterno}
           error={formik.errors.amaterno}
           />
            <TextInput label ="Email" style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("email", text)}
           value={formik.values.email}
           error={formik.errors.email}
           />
            <TextInput label ="Contraseña" style={formStyle.input} secureTextEntry
            onChangeText={(text) => formik.setFieldValue("password", text)}
            value={formik.values.password}
           error={formik.errors.password}
            />
            <TextInput label ="Repetir Contraseña" style={formStyle.input} secureTextEntry
            onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
            value={formik.values.repeatPassword}
           error={formik.errors.repeatPassword}
            />
            
            <Button mode="contained" style={formStyle.btnSuccess} onPress={formik.handleSubmit}
            loading={loading}
            >Registrarse</Button>
            <Button mode="text" style={formStyle.btnText} labelStyle={formStyle.btnTextLabel} onPress={changeForm}>
                Iniciar sesion
            </Button>
        </SafeAreaView>
        </ScrollView>
    )
}

function initialValues(){
    return{
        nombre: "",
        apaterno: "",
        amaterno: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
}

function validationSchema(){
    return{
        nombre: Yup.string().required(true),
        apaterno: Yup.string().required(true),
        amaterno: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true),
        repeatPassword: Yup.string().required(true).oneOf([Yup.ref("password")],true),
    }
}
