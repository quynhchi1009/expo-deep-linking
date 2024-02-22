/** @format */

import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "./components/Button";
import { ImageViewer } from "./components/ImageViewer";

const PlaceholderImage = require("./assets/images/background-image.png");

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
			<ImageViewer placeholderImageSource={PlaceholderImage} />
			<View style={styles.footerContainer}>
				<Button label={"Choose a photo"} />
				<Button label='Use this photo' />
			</View>
			<StatusBar style='auto' />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 20,
	},
	imageContainer: {
		flex: 1,
		paddingTop: 58,
	},
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: "center",
	},
});
