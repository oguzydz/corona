import Colors from '../../components/Colors';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = {
    light: {
        bg: {
            backgroundColor: Colors.base,
            flex: 1
        },

        container: {
            flex: 1,
            backgroundColor: Colors.base,
            alignItems: "center",
            paddingTop: 0
        },
        row: {
            width: width - 20,
            flexDirection: "row",
            marginBottom: 20,
        },
        box: {
            flex: 1,
            backgroundColor: Colors.tint,
            borderRadius: 20,
            marginLeft: 10,
            marginRight: 10,
            flexDirection: "column",
            shadowColor: Colors.dark,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 5,
            padding: 20
        },
        boxTitle: {
            fontSize: 16,
            fontWeight: "bold",
            color: Colors.white,
            textAlign: 'center',
        },
        boxValue: {
            fontSize: 25,
            fontWeight: "bold",
            color: Colors.white,
            textAlign: 'center',
        },
        lastUpdate: {
            backgroundColor: Colors.tint,
            padding: 10,
            marginBottom: 0,
            paddingLeft: 20,
            flexDirection: "row"
        },
        bannerBg: {
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 20
        }
    },
    dark: {
        bg: {
            flex: 1,
            backgroundColor: Colors.black,
        },
        container: {
            flex: 1,
            backgroundColor: Colors.black,
            alignItems: "center",
        },
        row: {
            width: width - 20,
            flexDirection: "row",
            marginBottom: 20,
        },
        box: {
            flex: 1,
            backgroundColor: Colors.gray,
            borderRadius: 20,
            marginRight: 10,
            marginLeft: 10,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: Colors.dark,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 5,
            padding: 20

        },
        boxTitle: {
            fontSize: 16,
            fontWeight: "bold",
            color: Colors.white,
            textAlign: 'center',

        },
        boxValue: {
            fontSize: 25,
            fontWeight: "bold",
            color: Colors.white,
            textAlign: 'center',

        },
        lastUpdate: {
            backgroundColor: Colors.gray,
            padding: 10,
            marginBottom: 0,
            paddingLeft: 20,
            flexDirection: "row"
        },
        bannerBg: {
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 20
        }
    },
}

export default styles