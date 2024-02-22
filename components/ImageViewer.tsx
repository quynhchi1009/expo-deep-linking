/** @format */

import { Image, ImageSourcePropType, StyleSheet } from "react-native";

interface ImageViewerProp {
	placeholderImageSource: ImageSourcePropType;
}

export const ImageViewer: React.FC<ImageViewerProp> = ({
	placeholderImageSource,
}) => {
	return <Image source={placeholderImageSource} style={styles.image} />;
};

const styles = StyleSheet.create({
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	},
});
