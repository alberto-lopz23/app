// Suggested code may be subject to a license. Learn more: ~LicenseLog:4279719218.
import { View, StyleSheet } from 'react-native';
import  ButtonGeneral  from './ButtonGeneral';


const Header = () =>{ 
    return (
        <View style={style.container}>
            <ButtonGeneral title="P" to="Message" />
            <ButtonGeneral title="M" />
        </View>
    
    )
}


export default Header;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: '',
        justifyContent:'space-between',
        flexDirection:"row",
        padding: 10,
        marginBottom: 30,
        borderBottomWidth: 2,
        borderBottomColor: 'black'
    }
})