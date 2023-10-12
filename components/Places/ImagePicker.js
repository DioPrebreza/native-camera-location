import { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";

import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";

const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermission = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insuficcient Permissions! You need to grand permission to use this app, bitch."
      );

      return false;
    }

    return true;
  };

  //TRIED TO MAKE image VARIABLE GLOBAL BUT DIDN'T WORK
  //   let image;

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    // THE ERROR IS THAT THE IMAGE URI FROM image IS UNDEFINED AND THUS CAN'T BE DISPLAYED

    // console.log(image.uri);
    // console.log(image);
    // console.log(image.assets.uri);
    // console.log(pickedImage);
    // console.log(pickedImage.uri);

    // const imageUri = image.uri;

    // THIS CODE IS FOR SETTING STATE OF THE PICKED IMAGE
    // setPickedImage(imageUri);

    //CODE FOR SIMULATING THE PICKED IMAGE
    setPickedImage(image);
    // console.log(image.assets.uri);
    // console.log(pickedImage);
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  //CODE FOR SIMULATING THE PICKED IMAGE
  if (pickedImage) {
    // console.log(pickedImage);
    imagePreview = (
      <Image
        style={styles.image}
        source={require("../../images/placeholder-image.png")}
      />
    );
  }

  //CODE FOR OUTPUTTING THE IMAGE FROM THE STATE
  //   if (pickedImage) {
  //     imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  //   }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
