import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const OrchidList = ({ data }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
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
        </View>
      </View>
    </View>
  );
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
});
