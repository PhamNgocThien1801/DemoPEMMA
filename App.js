import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";
import DetailSceen from "./src/screens/DetailScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const MainTabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailScreen" component={DetailSceen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
//  chu y cai asyn store khi thay data moi thi nen doi ten asyn store
