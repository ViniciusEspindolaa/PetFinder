import { Link } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// Importando o CustomText que criamos, se você o salvou
// import { CustomText } from '@/components/CustomText';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      {/* Usando o CustomText que criamos antes */}
      {/* <CustomText type="title">Isto é um modal</CustomText> */}
      
      {/* Ou usando Text padrão com estilo manual */}
      <Text style={styles.title}>Isto é um modal</Text>

      <Link href="/" asChild>
        <TouchableOpacity style={styles.link}>
            {/* <CustomText type="link">Voltar para a tela inicial</CustomText> */}
            <Text style={styles.linkText}>Voltar para a tela inicial</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
      fontSize: 16,
      color: '#0a7ea4',
  }
});