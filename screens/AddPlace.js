import { View } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = (place) => {
    navigation.navigate("AllPlaces", {
      place: place,
    });
  };

  return (
    <View>
      <PlaceForm onCreatePlace={createPlaceHandler} />
    </View>
  );
};

export default AddPlace;
