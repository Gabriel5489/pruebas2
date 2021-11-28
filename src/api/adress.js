import { API_URL } from "../utils/constants";
import axios from "axios";

export async function getAddressesApi(auth) {
	const idUsuario = auth.idUser;
	try {
		const url = `${API_URL}/Huasteca/apilibro/adresses.php`;
		// const params = {
		//     headers:{
		//         "Content-Type": "application/json",
		//         Authorization: `Bearer ${auth.token}`,
		//     },
		// };
		// const response = await fetch(url, params);
		// const result = await response.json();
		const obj = { idUsuario };
		const respuesta = await axios.post(url, obj);
		console.log(respuesta.data);
		return respuesta.data;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function addAddressApi(auth, address) {
	const idUsuario = auth.idUser;
	const direccion = address.address;
	const title = address.title;
	const postal_code = address.postal_code;
	const city = address.city;
	const state = address.state;
	const country = address.country;
	const phone = address.phone;

	try {
		const url = `${API_URL}/Huasteca/apilibro/AddAddress.php`;
		//  const params ={
		//      method: "POST",
		//      headers:{
		//          "Content-Type": "application/json",
		//          Authorization: `Bearer ${auth.token}`,
		//      },
		//      body: JSON.stringify({user: auth.idUser.id, ...address}),
		//     };

		//  const response = await fetch(url, params);
		//  const result = response.json();
		//  return result;
		const obj = {
			title,
			idUsuario,
			direccion,
			postal_code,
			city,
			state,
			country,
			phone,
		};
		const respuesta = await axios.post(url, obj);
		console.log("Agregad dirección: " + respuesta);
		return respuesta;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function deleteAddressApi(auth, idAddress) {
	try {
		const url = `${API_URL}/Huasteca/apilibro/DelAddress.php`;
		//  const params = {
		//      method: "DELETE",
		//      headers:{
		//          "Content-Type": "application/json",
		//          Authorization: `Bearer ${auth.token}`,
		//      },
		//  };
		//  const response = await fetch(url, params);
		//  const result = await response.json();
		//  return result;
		const obj = { idAddress };
		const respuesta = await axios.post(url, obj);
		console.log(respuesta.data);
		return respuesta;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getAddressApi(auth, idAddress) {
	try {
		const url = `${API_URL}/Huasteca/apilibro/getAddress.php`;
		// const params = {
		//     headers:{
		//         "Content-Type": "application/json",
		//         Authorization: `Bearer ${auth.token}`,
		//     },
		// };
		// const response = await fetch(url, params);
		// const result = await response.json();

		// return result;
		const obj = { idAddress };
		const respuesta = await axios.post(url, obj);
		console.log(respuesta.data);
		return respuesta.data;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function updateAddressApi(auth, address) {
	const idAddress = address._id;
	const idUsuario = auth.idUser;
	const direccion = address.address;
	const title = address.title;
	const postal_code = address.postal_code;
	const city = address.city;
	const state = address.state;
	const country = address.country;
	const phone = address.phone;
	try {
		const url = `${API_URL}/Huasteca/apilibro/updateAddress.php`;
		//  const params = {
		//      method: "PUT",
		//      headers: {
		//          "Content-Type" : "application/json",
		//          Authorization: `Bearer ${auth.token}`,
		//      },
		//      body: JSON.stringify(address),
		//  };
		//  const response = await fetch(url, params);
		//  const result = await response.json();
		//  return result;
		const obj = {
			idAddress,
			title,
			idUsuario,
			direccion,
			postal_code,
			city,
			state,
			country,
			phone,
		};
		const respuesta = await axios.post(url, obj);
		console.log(respuesta.data);
		return respuesta;
	} catch (error) {
		console.log(error);
		return null;
	}
}
