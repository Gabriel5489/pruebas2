import { API_URL, WEB_URL} from "../utils/constants";
import axios from 'axios';

export async function registerApi(formData){
    const nombre = formData.nombre;
    const apaterno = formData.apaterno;
    const amaterno = formData.amaterno;
    const email = formData.email;
    const pass = formData.password;
    const tipo = 1;
    const nomcom = nombre + " " + apaterno + " " + amaterno;
    try {
        const url = `${API_URL}/Huasteca/apilibro/`;
        console.log(url);
        // const params =  {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"

        //     },
        //     body: JSON.stringify(formData),
        // };
        // const response = await fetch(url, params);
        // const result = await response.json();
        const obj = {nomcom, email, pass}
        const respuesta = await axios.post(url, obj);
        console.log(respuesta);
        return respuesta;
    } catch (error) {
        console.log(error);
        return null;
    }

}

export async function loginApi(formData){
    const email = formData.email;
    const pass = formData.password;
    try {
        const url = `${API_URL}/Huasteca/apilibro/login.php`;
        // const params = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(formData),
        // };
        // const response = await fetch(url, params);
        // const result = await response.json();
         
        // return result;
        const obj = {email, pass}
        const respuesta = await axios.post(url, obj)
        console.log(respuesta.data);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getMeApi(token){
    try {
        const url=`${API_URL}/Huasteca/apilibro/userdata.php`;
        // const params ={
        //     headers:{
        //         "Content-Type":"application/json",
        //         Authorization: `Bearer ${token}`,
        //     },

        // };
        // const response = await fetch(url, params);
        // const result = await response.json();
        //eturn result;
        const obj = {token}
        const respuesta = await axios.post(url, obj)
        console.log(respuesta);
        return respuesta;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function userApi(formData){
    try {
        const url=`${WEB_URL}/api/usuario`;
        const params={
            method: "POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify(formData),
        };
        const response = await fetch(url, params);
        const result=await response.json();
        return result;

    } catch (error) {
        console.log(error);
        return error;
    }
}
export async function getUserApi(id){
    try {
        const url=`${WEB_URL}/api/usuarioShow`;
        const params={
            method: "POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({id:id})
        };
        const response = await fetch(url, params);
        const result=await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}