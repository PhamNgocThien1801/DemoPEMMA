import { Text, View, Image, StyleSheet, Pressable, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

function DetailScreen() {
  const route = useRoute();
  const orchid = route.params?.orchid;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  const checkFavoriteStatus = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem("favoritesOrchid");
      const favorites = JSON.parse(favoritesString) || [];
      const isFavorite = favorites.some((f) => f.name === orchid.name);
      setIsFavorite(isFavorite);
    } catch (error) {
      console.log("Error checking favorite status:", error);
    }
  };

  const confirmRemoveFromFavorites = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to remove this orchid from favorites?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: removeFromFavorites,
        },
      ]
    );
  };

  const removeFromFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem("favoritesOrchid");
      const favorites = JSON.parse(favoritesString) || [];

      const updatedFavorites = favorites.filter((f) => f.name !== orchid.name);
      setIsFavorite(false);

      await AsyncStorage.setItem(
        "favoritesOrchid",
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.log("Error removing orchid from favorites:", error);
    }
  };

  const addToFavorites = async () => {
    if (isFavorite) {
      confirmRemoveFromFavorites();
    } else {
      try {
        const favoritesString = await AsyncStorage.getItem("favoritesOrchid");
        const favorites = JSON.parse(favoritesString) || [];

        const existingOrchidIndex = favorites.findIndex(
          (f) => f.name === orchid.name
        );
        if (existingOrchidIndex > -1) {
          favorites.splice(existingOrchidIndex, 1);
          setIsFavorite(false);
        } else {
          favorites.push(orchid);
          setIsFavorite(true);
        }

        await AsyncStorage.setItem(
          "favoritesOrchid",
          JSON.stringify(favorites)
        );
      } catch (error) {
        console.log("Error adding/removing orchid from favorites:", error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={addToFavorites}
        >
          {isFavorite ? (
            <Ionicons name="heart" color="red" size={36} />
          ) : (
            <Ionicons name="heart-outline" color="black" size={36} />
          )}
        </Pressable>
      </View>
      <Image source={{ uri: orchid.image }} style={styles.image} />
      <Text>{orchid.name}</Text>
      <Text>Weight: {orchid.weight}</Text>
      <Text>Rating: {orchid.rating}</Text>
      <Text>Price: {orchid.price}</Text>
      <Text>Bonus: {orchid.bonus}</Text>
      <Text>Origin: {orchid.origin}</Text>
    </View>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 22,
    resizeMode: "cover",
  },
  pressed: {
    opacity: 0.25,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  icon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
});
