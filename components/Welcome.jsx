// Suggested code may be subject to a license. Learn more: ~LicenseLog:3684162121.
import { Image, StyleSheet, View} from 'react-native';

// Suggested code may be subject to a license. Learn more: ~LicenseLog:1451909201.
const Welcome = ()  => {

    return (
    <View style={style.container}>
        <Image source={require('../assets/images/welcomeImage.jpg')} style={style.image} />
    </View>

    )
}

export default Welcome;

const style = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: '#fff',
        width: "100%",
        height: "100%",

    },
    image: {
        flex: 1,
        justifyContent: "center",
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        alignItems: "center",
    },
});