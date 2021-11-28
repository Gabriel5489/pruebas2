import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Keyboard, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper';
import { getSearchHistoryApi, deleteSearchHistoryApi } from '../api/Search';
import { map } from "lodash"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import colors from '../style/colors';
export default function History() {
    const nav = useNavigation();
    const [history, setHistory] = useState(null)
    useEffect(() => {
        (async () => {
            const response = await getSearchHistoryApi();
            setHistory(response);
        })();
    }, []);

    const deleteSearch = async (position) => {
        await deleteSearchHistoryApi(position);
        const response = await getSearchHistoryApi();
        setHistory(response);
    }
    const onSearch = (itemQuery) => {
        Keyboard.dismiss();
        nav.navigate("SearchProducts", { Search: itemQuery });
    }
    return (
        <View style={ Styles.history} >
            {history && (
                map(history, (item, index) => (
                    <TouchableOpacity key={index} onPress={() => onSearch(item.query)} >
                        <View style={Styles.itemHistory} >
                            <Text style={Styles.text}>
                                {item.query}
                                <MaterialCommunityIcons name="arrow-right" size={20} />
                            </Text>
                            <Button onPress={() => { deleteSearch(index) }} >X</Button>
                        </View>

                    </TouchableOpacity>

                ))
            )}
            
        </View>
    )
}
const Styles = StyleSheet.create({

    history: {
        backgroundColor: colors.bgLight,
    },
    itemHistory: {
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 0.2,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        width: "100%",
    },
    text: {
        fontWeight: "bold",
        fontSize: 16

    },


})