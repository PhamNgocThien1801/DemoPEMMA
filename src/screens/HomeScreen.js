import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Categories } from "../data/db";
import OrchidList from "../components/ListOrchid";

function HomeScreen() {
  const allItems = [];
  Categories.forEach((category) => {
    category.items.forEach((item) => {
      allItems.push(item);
    });
  });

  return (
    <View style={styles.container}>
      <OrchidList data={allItems} />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
});
