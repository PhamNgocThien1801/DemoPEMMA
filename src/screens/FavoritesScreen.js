import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import OrchidList from "../components/ListOrchid";

function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    loadFavorites();
  }, [isFocused]);

  const loadFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem("favoritesList");
      const favoritesData = JSON.parse(favoritesString) || [];
      setFavorites(favoritesData);
      loadFavorites();
    } catch (error) {
      console.log("Error loading favorites:", error);
    }
  };
  return (
    <View>
      <OrchidList data={favorites} />
    </View>
  );
}
export default FavoritesScreen;
