import { Dimensions } from "react-native"

/**
 * Determine if the screen is in Portrait mode.
 * 
 * @returns true if the screen height is bigger than screen width.
 */
export function isPortrait() {
    const dim = Dimensions.get("screen")
    return dim.height >= dim.width
}

/**
 * Determine if the screen is in Landscape mode.
 * 
 * @returns true if the screen width is bigger than screen height.
 */
export function isLandscape() {
    const dim = Dimensions.get("screen")
    return dim.width >= dim.height
}

/**
 * Calculate the required image container height given the width of container and image size.
 * 
 * @param containerWidth The length of container. Can be Dimensions.get("screen").width as well.
 * @param imageWidth Original image width.
 * @param imageHeight Original image height.
 * 
 * @returns The scaled height that is needed to keep the aspect ratio.
 */
export function calculateContainerHeight(containerWidth: number, imageWidth: number, imageHeight: number) {
    const ratio = containerWidth / imageWidth
    let height = imageHeight * ratio
    
    if (imageWidth < 0) { height *= -1 }
    
    if (isNaN(height)) { height = 0 }

    return height
}