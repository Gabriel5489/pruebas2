import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { formStyle } from "../../style";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { userApi, getUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";

export default function ChangeRFC() {
	const [loading, UseLoading] = useState(false);
	const [id, setId] = useState(null);
	const navigation = useNavigation();
	const { auth } = useAuth();
	const [label, setLabel] = useState("Agregar RFC");
	useFocusEffect(
		useCallback(() => {
			(async () => {
				const response = await getUserApi(auth.idUser);
				response.vchRFC && (await formik.setFieldValue("rfc", response.vchRFC));
				if (response.vchRFC != null) setLabel("RFC");
				response.id && setId(response.id);
			})();
		}, [])
	);

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			UseLoading(true);
			try {
				formData.id = id;
				await userApi(formData);
				navigation.goBack();
			} catch (error) {
				UseLoading(false);
			}
		},
	});

	return (
		<View style={styles.container}>
			<TextInput
				label={label}
				style={formStyle.input}
				onChangeText={(text) => formik.setFieldValue("rfc", text)}
				value={formik.values.rfc}
				error={formik.errors.rfc}
			/>
			<Button
				mode='contained'
				style={formStyle.btnSuccess}
				onPress={formik.handleSubmit}
				loading={loading}>
				Cambiar RFC
			</Button>
		</View>
	);
}
function initialValues() {
	return {
		rfc: "",
	};
}

function validationSchema() {
	return {
		rfc: Yup.string().min(11).max(13).required(true),
	};
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});
