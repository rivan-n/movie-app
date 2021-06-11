import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import FastImage from "react-native-fast-image";
import { Screen, Text, Wallpaper } from "../../components"
import { spacing } from "../../theme"
import { useStores } from "../../models";
import { Movie } from "../../models/movie/movie";
import { isPortrait } from "../../utils/screen";
import { translate } from "../../i18n";
import { styles } from "./style"

export const CategoriesScreen = observer(function CategoriesScreen() {
    const navigation = useNavigation()
    const tabBarHeight = useBottomTabBarHeight()

    const nextScreen = (item) => navigation.navigate("details", { movie: item as Movie })

    const { movieStore } = useStores()
    const {
        topRatedMovies,
        upcomingMovies,
        nowPlayingMovies,
        popularMovies
    } = movieStore

    useEffect(() => {
        async function fetchData() {
            await movieStore.getTopRatedMovies()
            await movieStore.getUpcomingMovies()
            await movieStore.getNowPlayingMovies()
            await movieStore.getPopularMovies()
        }

        fetchData()
    }, [])

    //TODO: Pull imageBaseUrl from configuration service
    const imageBaseUrl = "https://image.tmdb.org/t/p/w185"

    const categories = [
        {
            id: 1,
            title: translate("categories.topRatedMovies"),
            data: topRatedMovies
        },
        {
            id: 2,
            title: translate("categories.upcomingMovies"),
            data: upcomingMovies
        },
        {
            id: 3,
            title: translate("categories.nowPlayingMovies"),
            data: nowPlayingMovies
        },
        {
            id: 4,
            title: translate("categories.popularMovies"),
            data: popularMovies
        },
    ]

    //TODO: Extract this as a component
    const GetRow = ({ category }) => (
        <View>
            <Text preset="header">{category.title}</Text>
            <OptimizedFlatList
                data={category.data}
                keyExtractor={(item) => String(item.id)}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { nextScreen(item) }}>
                        <FastImage
                            style={{ width: 185, height: 278 }}
                            resizeMode="contain"
                            source={{ uri: `${imageBaseUrl}${item.poster_path}` }}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    )

    return (
        <Screen unsafe={true}>
            <Wallpaper />
            <View style={styles.container}>
                <OptimizedFlatList
                    data={categories}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: isPortrait() ? spacing[7] : 0,
                        paddingBottom: tabBarHeight + spacing[4]
                    }}
                    renderItem={({ item }) => (
                        <GetRow category={item} />
                    )}
                />
            </View>
        </Screen>
    )
})