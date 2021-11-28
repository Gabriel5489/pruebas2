import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import colors from '../../style/colors';

export default function UserInfo(props) {
    const {user} = props;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido </Text>
             <Text style={styles.titleName}> 
            {user?.name}  </Text>
            <Text style={styles.titleName}> 
            {user?.email}  </Text> 
        </View>
    )
}
 const styles = StyleSheet.create({
     container:{
         height:100,
         justifyContent: "center",
         padding:20,
         top:10,
     },
     title:{
         fontSize:25,
         color: colors.dark2z,
         fontWeight:"bold",
     },
     titleName:{
         marginTop:10,
         fontSize:20,
         fontWeight: "bold",
     }
 })