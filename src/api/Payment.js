import { WEB_URL } from "../utils/constants";
export async function PaymentApi(tokenStripe,idUser,addres,cart){
    try {
        const url = `${WEB_URL}/api/orders`;
        const params = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tokenStripe,
                idUser:idUser,
                addres,
                cart
            })
        }
        const response = await fetch(url,params);
        const result = response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}