// Suggested code may be subject to a license. Learn more: ~LicenseLog:1202040385.
import { StyleSheet, Text, View } from 'react-native';


const Secrets = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.nameUser}>
            @unaBanana
        </Text>
      </View>
    </View>
  )
}

export default Secrets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});