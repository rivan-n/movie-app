/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { ViewStyle } from "react-native";
import { createStackNavigator } from "@react-navigation/stack"
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from "@react-native-community/blur";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { MovieDetailsScreen, WatchListScreen, CategoriesScreen, MoviesScreen } from "../screens"
import { translate } from "../i18n";
import { color } from "../theme";

const BLUR_VIEW: ViewStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0
}

const TAB_BAR: ViewStyle = {
  backgroundColor: "transparent",
}

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

export type CategoriesParamList = {
  categories: undefined
  list: undefined
}

const CategoriesStack = createStackNavigator<CategoriesParamList>()

function CategoriesNavigator() {
  return (
    <CategoriesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CategoriesStack.Screen name="categories" component={CategoriesScreen} />
      <CategoriesStack.Screen name="list" component={MoviesScreen} />
    </CategoriesStack.Navigator>
  )
}

export type HomeParamList = {
  movies: undefined
  watchList: undefined
}

const HomeTab = createBottomTabNavigator<HomeParamList>()

function MyTab(props) {
  return (
    <BlurView
      style={BLUR_VIEW}
      blurType="dark"
      overlayColor=""
    >
      <BottomTabBar {...props} />
    </BlurView>
  )
}

function HomeNavigator() {
  return (
    <HomeTab.Navigator
      tabBarOptions={{
        style: TAB_BAR,
        activeTintColor: color.text
      }}
      tabBar={props => <MyTab {...props} />}
    >
      <HomeTab.Screen name="movies" component={CategoriesNavigator} options={{ tabBarLabel: translate("homeScreen.moviesTab"), tabBarIcon: (props) => (<MaterialIcons name="local-movies" color={props.color} size={props.size} />) }} />
      <HomeTab.Screen name="watchList" component={WatchListScreen} options={{ tabBarLabel: translate("homeScreen.watchListTab"), tabBarIcon: (props) => (<MaterialIcons name="playlist-play" color={props.color} size={props.size} />) }} />
    </HomeTab.Navigator>
  )
}

export type PrimaryParamList = {
  home: undefined
  details: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={HomeNavigator} />
      <Stack.Screen name="details" component={MovieDetailsScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
