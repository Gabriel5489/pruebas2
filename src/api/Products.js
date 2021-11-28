import { API_URL, WEB_URL } from "../utils/constants";
import axios from 'axios'; 

import {size} from "lodash";

export async function getProductsApi() {
    try {
        const url = `${WEB_URL}/api/products`;
        const response = await fetch(url);
        console.log(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function getProductApi(id) {
    try {
        const url = `${WEB_URL}/api/products/${id}`;
        const response = await fetch(url);
        const result = response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function addCart(data, auth, cantidad){
    const idUser = auth.idUser;
    const precio = data.fltPrecio;
    const idprod = data.intIDProd;
    try {
        const url = `${API_URL}/Huasteca/apilibro/addCart.php`;
        //const response = await fetch(url);
        const obj = {idUser, precio, idprod, cantidad}
        const response = await axios.post(url, obj);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteProdApi(idCarrito){
    console.log(idCarrito);
    try {
        const url = `${API_URL}/Huasteca/apilibro/delCart.php`;
        //const response = await fetch(url);
        const obj = {idCarrito}
        const response = await axios.post(url, obj);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function cartUser(auth){
    const idUser = auth.idUser;
    console.log(idUser);
    try {
        const url = `${API_URL}/Huasteca/apilibro/cartUser.php`;
        //const response = await fetch(url);
        const obj = {idUser}
        const response = await axios.post(url, obj);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function addFavorito(data, auth){
    const idUser = auth.idUser;
    const idprod = data.intIDProd;
    try {
        const url = `${API_URL}/Huasteca/apilibro/addFavorito.php`;
        //const response = await fetch(url);
        const obj = {idUser, idprod}
        const response = await axios.post(url, obj);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteFavApi(idFavorito){
    console.log("idFavorite: " + idFavorito);
    try {
        const url = `${API_URL}/Huasteca/apilibro/delFav.php`;
        //const response = await fetch(url);
        const obj = {idFavorito}
        const response = await axios.post(url, obj);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function favUser(auth){
    const idUser = auth.idUser;
    console.log(idUser);
    try {
        const url = `${API_URL}/Huasteca/apilibro/favUser.php`;
        //const response = await fetch(url);
        const obj = {idUser}
        const response = await axios.post(url, obj);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
        return null;
    }
}