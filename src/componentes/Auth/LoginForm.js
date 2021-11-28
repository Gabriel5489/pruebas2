import React, {useState} from 'react'
import { View, StyleSheet, Alert } from 'react-native';
import {TextInput, Button} from "react-native-paper";
import {useFormik} from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { loginApi } from "../../api/user";
import { formStyle } from "../../style";
import { checkUserApi, sendSMS, verify } from '../../api/LoginCel';
import Message from '../Message';
let cel = '', cad = '';

export default function LoginForm(props) {
    const { changeForm}= props;
    const [loading, setloading] = useState(false);
    const [loading2, setloading2] = useState(false);
    const [verifyStatus, setVerifyStatus] = useState(undefined);
    const [msg, setMsg] = useState(false);
    const [user, setUser] = useState(undefined);
    const [visible, setVisible] = useState(false);
    const [visibleSMS, setVisibleSMS] = useState(false);
    const [codigo, setCodigo] = useState('');
    const onChangeCodigo = (cod) => setCodigo(cod);
    const onToggleSnackBar = (dato) => { 
        setVisible(!visible) 
        setMsg(dato);
    };
    const onDismissSnackBar = () => setVisible(false);
    const {login} = useAuth();
 
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setloading(true);
            try {
                const response = await loginApi(formData);
                if(response==0) throw "Error en el usuario o contraseña"; 
                login(response);
            } catch (error) {
                Toast.show(error,{
                    position: Toast.positions.CENTER,
                });
                setloading(false);
            }
        },
    });
    const sendverify = async() => {
        console.log(user);
        const status = await sendSMS(cad);
        setVerifyStatus(status);
        setVisibleSMS(true);
    }
    
    const send = () => {
        Alert.alert(
            "Enviar SMS de verificacion","¿Enviar al numero ******"+cel+"?",
            [
                { text: "No", },
                { text: "Si", onPress: sendverify, },
            ],
            { cancelable:false }
        )
    }
    const check = async() => {
        if(!formik.errors.email){
            const response = await checkUserApi(formik.values.email);
            console.log(response);
            if(response?.errors != null){
                const dato = "No se encuentra registrado";
                onToggleSnackBar(dato);
            }else{
                response.intIdUsuario = `${response.id}`;
                setUser(response);
                send();
            }
        }else{
            const dato = "Email no valido";
            onToggleSnackBar(dato);
        }
    };
    const verifyCode = async() => {
        setloading2(true);
        if(verifyStatus?.message==='pending'){
            console.log("dale");
            console.log(formik.values.codigo);
           const result = await verify(cad,formik.values.codigo);
           console.log(result);
           if(result?.message==='echo'){
                console.log(user);
                login(user);
                setloading2(false);
           }else{
                const dato = "Codigo incorrecto";
                onToggleSnackBar(dato);
                setloading2(false);
           }
        }else{
            const dato = "Error al enviar codigo";
            onToggleSnackBar(dato);
            setloading2(false);
        }
    }
    if(user?.cel) {
        cel = '';
        cad='';
        cad += user.cel;
        cel += cad.substr(-4);
    }
    const onCorreo = () => {
        setVisibleSMS(false);
    }
    console.log(codigo);
    return (
        <View>
            {!visibleSMS ? (
                <View>
                <TextInput
                label="Email" style={formStyle.input}
                onChangeText={(text)=> formik.setFieldValue("email", text)}
                value={formik.values.email}
                error={formik.errors.email}
                />
                <TextInput
                label="Contraseña" style={formStyle.input}
                onChangeText={(text)=> formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
                secureTextEntry
                />

                <Button mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
                >
                    Entrar
                </Button>

                <Button mode="contained" icon="cellphone-key" 
                    style={[formStyle.btnSuccess,Styles.b]}
                    onPress={check}
                >
                    Loguear con celular
                </Button>

                
                <Button mode="text" style={formStyle.btnText} labelStyle={formStyle.btnTextLabel}
                onPress={changeForm}
                >
                    Registrarse
                </Button>
                </View>
            ) : (
                <View>
                <TextInput
                label="Codigo" style={formStyle.input}
                placeholder="********"
                onChangeText={(text)=> formik.setFieldValue("codigo", text)}
                value={formik.values.codigo}                
                maxLength={8}
                />
                <Button mode="contained" icon="login"
                    style={formStyle.btnSuccess}
                    onPress={verifyCode}
                    loading={loading2}
                >
                    Entrar
                </Button>
                <Button mode="text"
                    style={[formStyle.btnText, Styles.b]}
                    labelStyle={formStyle.btnTextLabel}
                    onPress={onCorreo}
                >
                    Loguear con correo
                </Button>
                </View>
            )}
            <Message visible={visible} onDismissSnackBar={onDismissSnackBar} msg={msg} />
        </View>
    )
}

function initialValues(){
    return{
        email: "",
        password: "",
        codigo: "",
    }
}

function validationSchema(){
    return{
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true),
        codigo: Yup.string(),
    };
}
const Styles = StyleSheet.create({
    b:{
        marginTop:10
    }
});