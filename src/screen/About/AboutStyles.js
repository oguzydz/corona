import Colors from '../../components/Colors';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


const styles = {
    light: {
        bannerBg: {
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 20
        },
        container: {
            flex: 1,
            backgroundColor: Colors.base,
        },
        boxView: {
            flexDirection: "column",
            backgroundColor: Colors.white,
            marginBottom: 10
        },
        boxTitle: {
            padding: 19,
            paddingBottom: 5
        },
        boxText: {
            paddingTop: 5,
            padding: 20
        },

        title: {
            color: Colors.base,
            fontSize: 20,
            fontWeight: "600"
        },
        text: {
            color: Colors.base
        },
        changeLang: {
            backgroundColor: Colors.tint,
            padding: 10,
            marginBottom: 0,
            paddingLeft: 20,
            marginBottom: 10,
            flexDirection: "row",
        }
    },
    dark: {
        container: {
            flex: 1,
            backgroundColor: Colors.black,
        },
        boxView: {
            flexDirection: "column",
            backgroundColor: Colors.gray,
            marginBottom: 10
        },
        boxTitle: {
            padding: 19,
            paddingBottom: 5
        },
        boxText: {
            paddingTop: 5,
            padding: 20
        },

        title: {
            color: Colors.white,
            fontSize: 20,
            fontWeight: "600"
        },
        text: {
            color: Colors.white
        },
        bannerBg: {
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 20
        },
        changeLang: {
            backgroundColor: Colors.gray,
            padding: 10,
            marginBottom: 10,
            paddingLeft: 20,
            flexDirection: "row"
        }
    }
}


export default styles