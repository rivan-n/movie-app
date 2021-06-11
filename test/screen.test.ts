import { Dimensions } from "react-native"
import { isPortrait, isLandscape, calculateContainerHeight } from "../app/utils/screen"

describe("Screen Util", () => {
    test("Given screen is portrait, isPortrait() returns true", (done) => {
        const portrait = isPortrait()
        expect(portrait).toBeTruthy()
        done()
    })

    test("Given screen is portrait, isLandscape() returns false", (done) => {
        const landscape = isLandscape()
        expect(landscape).toBeFalsy()
        done()
    })
    
    test("Given container width equal to image width, calculateContainerHeight() returns same as image height", (done) => {
        const imageWidth = 1280
        const imageHeight = 720
        const containerWidth = imageWidth

        const height = calculateContainerHeight(containerWidth, imageWidth, imageHeight)
        expect(height).toEqual(imageHeight)
        done()
    })

    test("Given container width is half smaller than image width, calculateContainerHeight() returns half of image height", (done) => {
        const imageWidth = 1280
        const imageHeight = 720
        const containerWidth = imageWidth / 2

        const height = calculateContainerHeight(containerWidth, imageWidth, imageHeight)
        expect(height).toEqual(imageHeight / 2)
        done()
    })

    test("Given container width is twice bigger than image width, calculateContainerHeight() returns twice of image heights", (done) => {
        const imageWidth = 1280
        const imageHeight = 720
        const containerWidth = imageWidth * 2

        const height = calculateContainerHeight(containerWidth, imageWidth, imageHeight)
        expect(height).toEqual(imageHeight * 2)
        done()
    })

    test("Given container size retrieved from actual screen width, calculateContainerHeight() returns height scaled by screen width", (done) => {
        const imageWidth = 1280
        const imageHeight = 720
        const screenWidth = Dimensions.get("screen").width

        const height = calculateContainerHeight(screenWidth, imageWidth, imageHeight)
        expect(height).toEqual((screenWidth / imageWidth) * imageHeight)
        done()
    })

    test("Given image size is 0, calculateContainerHeight() returns 0 as well", (done) => {
        const imageWidth = 0
        const imageHeight = 0
        const containerWidth = 1280

        const height = calculateContainerHeight(containerWidth, imageWidth, imageHeight)
        expect(height).toEqual(0)
        done()
    })

    test("Given image size is negative, calculateContainerHeight() returns negative as well", (done) => {
        const imageWidth = -1280
        const imageHeight = -720
        const containerWidth = 1280

        const height = calculateContainerHeight(containerWidth, imageWidth, imageHeight)
        expect(height).toEqual(imageHeight)
        done()
    })
})