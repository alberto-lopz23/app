import { TouchableOpacity, Text, StyleSheet,  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ButtonGeneral = ({ title, to }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(to)}>
{/* Suggested code may be subject to a license. Learn more: ~LicenseLog:2167005006. */}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default ButtonGeneral;