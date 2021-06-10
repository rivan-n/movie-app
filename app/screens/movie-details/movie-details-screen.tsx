import React from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { Button, Header, Screen, Wallpaper } from "../../components"
import { styles } from "./style"

export const MovieDetailsScreen = observer(function MovieDetailsScreen() {
    const navigation = useNavigation()

    const goBack = () => navigation.goBack()

    return (
        <Screen style={styles.screen}>
            <Wallpaper />
            <Header headerTx={'movieDetailsScreen.title'} leftIcon="back" onLeftPress={goBack} />
            <View style={styles.container}>
                <View />
                <SafeAreaView edges={["left", "right", "bottom"]}>
                    <Button
                        testID="next-screen-button"
                        tx="welcomeScreen.continue"
                        onPress={goBack}
                    />
                </SafeAreaView>
            </View>
        </Screen>
    )
})