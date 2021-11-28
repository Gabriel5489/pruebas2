import { WEB_URL } from "../utils/constants";
export async function checkUserApi(correo){
    try {
        const url = `${WEB_URL}/api/checkuser`;
        const params = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                correo:correo
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
export async function sendSMS(cel){
    try {
        const url = `${WEB_URL}/api/sendverify`;
        const params = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cel:cel
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
export async function verify(cel,codigo){
    try {
        const url = `${WEB_URL}/api/verifycelular`;
        const params = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cel:cel,
                codigo:codigo
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