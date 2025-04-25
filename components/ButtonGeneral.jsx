import { TouchableOpacity, Text, StyleSheet,  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ButtonGeneral = ({ title, to }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(to)}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,

  }
});

export default ButtonGeneral;