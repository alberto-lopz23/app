import { View, StyleSheet } from 'react-native';
import ButtonGeneral from './ButtonGeneral';

const Header = () => { 
  return (
    <View style={styles.container}>
      <ButtonGeneral title="P" to="Perfil" />
      <ButtonGeneral title="S" to="Search" />
      <ButtonGeneral title="M" to="Message" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",  // Alinea los elementos verticalmente al centro
    justifyContent: "space-between", // Espacia los botones en los extremos
    padding: 10,
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    backgroundColor: '#7B2CBF',
  },
  
});
