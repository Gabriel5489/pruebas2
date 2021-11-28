import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Keyboard, Animated, Text, } from 'react-native'
import { Searchbar } from "react-native-paper";
import {
    AnimatedIcon,
    inputAnimation,
    inputAnimationWidth,
    animatedTransition,
    animatedTransitionReset,
    ArrowAnimation
}
    from './SearchAnimatation';

import { updateSearchHistoryApi } from '../../api/Search';
import { useNavigation, } from '@react-navigation/native';
import colors from "../../style/colors"
export default function Search( props) {
    const { currentSearch } = props;
    const nav = useNavigation();
    const [searchQuery, setSearchQuery] = useState(currentSearch || "");
    const onChangeSearch = (query) => setSearchQuery(query);
    const openSearch = () => {
        nav.navigate("History");
        //animatedTransition.start();
    };
    const closeSearch = () => {
        //animatedTransitionReset.start();
        Keyboard.dismiss();
        
    };
    const onSearch = async () => {
        closeSearch();
        await updateSearchHistoryApi(searchQuery);
        nav.navigate("SearchProducts", { Search: searchQuery });
    }
    return (
        <View style={Styles.container} >
            <View style={Styles.containerInput}>
                <AnimatedIcon name="arrow-left" size={20} style={[Styles.backArrow, ArrowAnimation]}
                    onPress={closeSearch} />

                <Animated.View style={[inputAnimation, { width: inputAnimationWidth }]} >
                    <Searchbar placeholder="Producto" onFocus={openSearch}
                        onChangeText={onChangeSearch} onSubmitEditing={onSearch}
                        value={searchQuery}
                    />
                </Animated.View>
            </View>
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    containerInput: {
        position: "relative",
        alignItems: "flex-end"
    },
    backArrow: {
        position: "absolute",
        left: 0,
        top: 15,
        color: colors.success,
    },
})