import { View } from "react-native";
import PlacesList from "../components/Places/PlacesList";

const AllPlaces = ({ places }) => {
  return <PlacesList places={places} />;
};

export default AllPlaces;
