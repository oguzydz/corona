import Colors from './Colors';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


const styles = {
    light: {
        activeColorBg: Colors.white,
        activeTintColor: Colors.white,
        inactiveTintColor: Colors.tint,
        inactiveBackgroundColor: Colors.white,
        boxIcon: {
            padding: 5,
            paddingBottom: 2,
            borderRadius: 50,
            backgroundColor: Colors.base 
        }

    },
    dark: {
        activeColorBg: Colors.gray,
        activeTintColor: Colors.white,
        inactiveTintColor: Colors.darkGray,
        inactiveBackgroundColor: Colors.gray
    }
}

export default styles;