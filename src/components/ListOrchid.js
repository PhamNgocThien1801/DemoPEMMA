import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrchidList = ({ data }) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [listFavorites, setListFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      const list = JSON.parse(
        (await AsyncStorage.getItem("favoritesList")) || []
      );
      setListFavorites(list);
    };
    getFavorites();
  }, [isFocused]);

  const addToFavorites = async (item) => {
    const favoritesString = await AsyncStorage.getItem("favoritesList");
    const favorites = JSON.parse(favoritesString) || [];

    const existingOrchidIndex = favorites.findIndex(
      (f) => f.name === item.name
    );
    if (existingOrchidIndex > -1) {
      Alert.alert(
        "Remove from Favorites",
        "Are you sure you want to remove this orchid from your favorites?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => removeItemFromFavorites(existingOrchidIndex),
          },
        ]
      );
    } else {
      const updatedFavorites = [...listFavorites, item];
      setListFavorites(updatedFavorites);
      setIsFavorite(true);
      await AsyncStorage.setItem(
        "favoritesList",
        JSON.stringify(updatedFavorites)
      );
    }
  };

  const removeItemFromFavorites = async (index) => {
    const updatedFavorites = [...listFavorites];
    updatedFavorites.splice(index, 1);
    setListFavorites(updatedFavorites);
    setIsFavorite(false);
    await AsyncStorage.setItem(
      "favoritesList",
      JSON.stringify(updatedFavorites)
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.navigate("DetailScreen", { orchid: item })}
        >
          <View>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        </Pressable>
        <View style={styles.innerContainer}>
          <View>
            <Pressable
              onPress={() =>
                navigation.navigate("DetailScreen", { orchid: item })
              }
            >
              <Text style={styles.textTitle}>{item.name}</Text>
            </Pressable>
          </View>
          <View style={styles.inForContainer}>
            <View>
              <Text style={styles.text}>
                <Ionicons name="star" color="yellow" size={16} />
                {item.rating}
              </Text>
            </View>
            <View>
              <Text style={styles.text}> ${item.price}</Text>
            </View>
            <View>
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() => addToFavorites(item)}
              >
                {listFavorites.find((list) => list.name === item.name) ? (
                  <Ionicons name="heart" color="red" size={36} />
                ) : (
                  <Ionicons name="heart-outline" color="black" size={36} />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default OrchidList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    margin: 12,
    borderWidth: 2,
    padding: 8,
    borderRadius: 8,
  },
  innerContainer: {
    flexDirection: "column",
    width: "70%",
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 4,
  },
  inForContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.25,
  },
});
