import React from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import FastImage from "react-native-fast-image"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { calculateContainerHeight } from "../../utils/screen"
import { styles } from "./style"

export const MovieDetailsScreen = observer(function MovieDetailsScreen({ route }) {
    const navigation = useNavigation()

    const goBack = () => navigation.goBack()

    const { movie } = route.params

    //TODO: Pull imageBaseUrl from configuration service
    const imageBaseUrl = "https://image.tmdb.org/t/p/w1280"

    const screenWidth = Dimensions.get("screen").width
    const height = calculateContainerHeight(screenWidth, 1280, 720)

    const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : null

    return (
        <Screen style={styles.screen}>
            <Wallpaper />
            <Header leftIcon="back" onLeftPress={goBack} />
            <View style={styles.container}>
                <FastImage
                    style={{ width: screenWidth, height: height }}
                    resizeMode="contain"
                    source={{ uri: `${imageBaseUrl}${movie.backdrop_path}` }}
                />
                <Text preset="header">{movie.title} <Text preset="fieldLabel">{releaseYear ? `(${releaseYear})` : null}</Text></Text>
                <Text>{movie.overview}</Text>
                <View />
                <SafeAreaView edges={["left", "right", "bottom"]}>
                    <Button
                        testID="add-to-watch-list-button"
                        children={(
                            <Text preset="bold">
                                <MaterialIcons name="playlist-add" size={15} /> <Text tx={"movieDetailsScreen.addToWatchList"} />
                            </Text>
                        )}
                        onPress={goBack}
                    />
                </SafeAreaView>
            </View>
        </Screen>
    )
})