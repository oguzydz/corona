import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
import Colors from './Colors';
const { width, height } = Dimensions.get('window');

const styles = {
    light: {
        container: {
            width: width,
            height: height - 30,
            position: "absolute",
            zIndex: 3,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            justifyContent: "center",
            alignItems: "center"
        },
        box: {
            width: width - 60,
            height: height - 200,
            backgroundColor: "white",
            borderRadius: 20,
            flexDirection: "column"
        },
        countryBox: {
            flexDirection: "row",
            justifyContent: "flex-start",
            backgroundColor: Colors.white,
            paddingBottom: 10,
            paddingTop: 10,
            borderBottomColor: "gray",
            borderBottomWidth: 0.5
        }
    },
    dark: {
        container: {
            width: width,
            height: height - 30,
            position: "absolute",
            zIndex: 3,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            justifyContent: "center",
            alignItems: "center"
        },
        box: {
            width: width - 60,
            height: height - 200,
            backgroundColor: "gray",
            borderRadius: 20,
            flexDirection: "column"
        },
        countryBox: {
            flexDirection: "row",
            justifyContent: "flex-start",
            backgroundColor: Colors.darkGray,
            paddingBottom: 10,
            paddingTop: 10,
            borderBottomColor: "gray",
            borderBottomWidth: 0.5
        }
    }
}

export default styles;