/** @format */

import * as Linking from "expo-linking";
import { Link } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { ImageViewer } from "../components/ImageViewer";

const PlaceholderImage = require("../assets/images/background-image.png");

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [isReady, setReady] = useState(false);
	const [data, setData] = useState<Linking.ParsedURL>();

	useEffect(() => {
		// Perform some sort of async data or asset fetching.
		setTimeout(() => {
			// When all loading is setup, unmount the splash screen component.
			SplashScreen.hideAsync();
			setReady(true);
		}, 10000);
	}, []);

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
			{/* <Text>
				{data ? JSON.stringify(data) : "App wasn't opened from deep link!"}
			</Text> */}
			<ImageViewer placeholderImageSource={PlaceholderImage} />
			<View style={styles.footerContainer}>
				<Link href='/settings' asChild>
					<Pressable style={styles.button}>
						<Text style={styles.buttonLabel}>Settings</Text>
					</Pressable>
				</Link>
				<Button theme='primary' label={"Cancel"} />
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
	buttonContainer: {
		width: 320,
		height: 68,
		marginHorizontal: 20,
		alignItems: "center",
		justifyContent: "center",
		padding: 3,
	},
	button: {
		borderRadius: 10,
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	buttonLabel: {
		color: "#fff",
		fontSize: 16,
	},
});
