import React from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Button, Header, Screen, Wallpaper } from "../../components"
import { spacing } from "../../theme"
import { styles } from "./style"

export const CategoriesScreen = observer(function CategoriesScreen() {
    const navigation = useNavigation()
    const tabBarHeight = useBottomTabBarHeight()

    const nextScreen = () => navigation.navigate("list")

    return (
        <Screen style={{ paddingBottom: tabBarHeight + spacing[4] }}>
            <Wallpaper />
            <Header headerTx={'categoriesScreen.title'} />
            <View style={styles.container}>
                <View />
                <SafeAreaView edges={["left", "right"]}>
                    <Button
                        testID="next-screen-button"
                        tx="welcomeScreen.continue"
                        onPress={nextScreen}
                    />
                </SafeAreaView>
            </View>
        </Screen>
    )
})