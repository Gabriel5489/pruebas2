import React, { useState, useCallback } from "react";
import { ScrollView, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { GetOrderApi } from "../../api/Order";
import size from "lodash";
import Load from "../../componentes/Loading";
import NoFundOrders from "../../componentes/Order/NoFoundOrders";
import OrderList from "../../componentes/Order/OrderList";

export default function Order(props) {
	const {
		route: { params },
	} = props;
	const [order, setOrder] = useState(null);
	useFocusEffect(
		useCallback(() => {
			(async () => {
				let controller = new AbortController();
				let signal = controller.signal;
				const response = await GetOrderApi(params?.idVenta, signal);
				setOrder(response[0]);
				console.log(response[0]);
				controller.abort();
			})();
		}, [])
	);
	return (
		<>
			<ScrollView>
				{!order ? (
					<Load />
				) : size(order) === 0 ? (
					<NoFundOrders />
				) : (
					<OrderList order={order} />
				)}
			</ScrollView>
		</>
	);
}
