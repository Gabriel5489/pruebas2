import { Animated } from 'react-native'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export const AnimatedIcon = Animated.createAnimatedComponent(AwesomeIcon);
const animVal = new Animated.Value(0);
export const ArrowAnimation = {
    transform: [
        {
            translateX: animVal.interpolate({
                inputRange: [0, 1],
                outputRange: [-110, -30]
            })
        }
    ]
}
export const inputAnimationWidth = animVal.interpolate({
    inputRange: [1, 2],
    outputRange: ["115%", "100%"],
});
export const inputAnimation = {
    transform: [
        {
            translateX: animVal.interpolate({
                inputRange: [2, 4],
                outputRange: [30, 30],
            })
        }
    ]
}
export const animatedTransition = Animated.spring(animVal, {
    toValue: 1,
    useNativeDriver: false,
});
export const animatedTransitionReset = Animated.spring(animVal, {
    toValue: 0,
    useNativeDriver: false,
});