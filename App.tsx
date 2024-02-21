/** @format */

import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function App() {
	const [data, setData] = useState<Linking.ParsedURL>();

	function handleDeepLink(event: { url: string }) {
		let data = Linking.parse(event.url);
		setData(data);
	}

	useEffect(() => {
		async function getInitialURL() {
			const getInitialURL = await Linking.getInitialURL();
			if (getInitialURL) {
				let parsedUrl = Linking.parse(getInitialURL);
				setData(parsedUrl);
			}
		}

		const subscription = Linking.addEventListener("url", handleDeepLink);
    Linking.addEventListener("url", handleDeepLink);
    
		if (!data) {
			getInitialURL();
    }

		return () => {
			subscription.remove();
		};
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Text>
				{data ? JSON.stringify(data) : "App wasn't opened from deep link!"}
			</Text>
			<StatusBar style='auto' />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 20,
	},
});
