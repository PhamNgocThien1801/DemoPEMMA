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

  const clearFavorites = () => {
    Alert.alert(
      "Clear Favorites",
      "Are you sure you want to clear all favorites?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("favoritesList");
              setFavorites([]);
            } catch (error) {
              console.log("Error clearing favorites:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View>
      {favorites.length > 0 ? (
        <OrchidList data={favorites} />
      ) : (
        <Text style={styles.text}> No Favorites Orchid here </Text>
      )}
    </View>
  );
}
export default FavoritesScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
