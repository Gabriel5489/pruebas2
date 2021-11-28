import { WEB_URL } from "../utils/constants";

export async function GetShoppingApi(auth,signal){
    try {
        const url = `${WEB_URL}/api/orders?user=${auth.idUser}`;
        const params = { signal };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function GetOrderApi(idVenta, signal){
    try {
        const url = `${WEB_URL}/api/order?idVenta=${idVenta}`;
        const params = { signal };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}