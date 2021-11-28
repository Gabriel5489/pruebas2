import { WEB_URL } from "../utils/constants";
export async function AddInvoiceApi(products, idventa, cliente) {
	try {
		const url = `${WEB_URL}/api/invoice`;
		const params = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				products,
				idventa: idventa,
				cliente: cliente,
			}),
		};
		const response = await fetch(url, params);
		const result = response.json();
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
}
export async function GetInvoiceApi(id) {
	try {
		const url = `${WEB_URL}/api/invoice?id=${id}`;
		const params = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(url, params);
		const result = await response.json();
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
}
