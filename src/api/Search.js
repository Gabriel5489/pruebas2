import AsyncStorage from "@react-native-async-storage/async-storage";
import { SEARCH_HISTORY } from "../utils/constants";
import { sortArrayByDay } from "../utils/funtions";
import { WEB_URL } from "../utils/constants";
import axios from "axios"
export async function getSearchHistoryApi(){
    try {
        const history = await AsyncStorage.getItem(SEARCH_HISTORY);
        if(!history) return[];
        return sortArrayByDay(JSON.parse(history));
    } catch (error) {
        console.log(error);
        return[];
    }
}
export async function updateSearchHistoryApi(query){
    const history = await getSearchHistoryApi();
    history.push({ query , Date: new Date() });
    await AsyncStorage.setItem( SEARCH_HISTORY, JSON.stringify(history) );
}
export async function deleteSearchHistoryApi(position){
    const history = await getSearchHistoryApi();
    history.splice(position,1);
    await AsyncStorage.setItem( SEARCH_HISTORY, JSON.stringify(history) );
}
export async function searchProductsApi(query) {
    try {
        //const url = `${API_URL}/api/product?p=${query}`;
        const url = `${WEB_URL}/api/product`;
        console.log(url);
        params = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({p:query})
        }
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
