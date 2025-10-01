import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const headerBackgroundColor = colorScheme === 'dark' ? '#1D3D47' : '#A1CEDC';

  return (
    <ParallaxScrollView
      headerBackgroundColor={headerBackgroundColor}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      {/* CORRIGIDO: Usando View e Text padrão */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <HelloWave />
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.subtitle}>Passo 1: Experimente</Text>
        <Text style={styles.text}>
          Edite <Text style={styles.boldText}>app/(tabs)/index.tsx</Text> para ver as mudanças. Pressione{' '}
          <Text style={styles.boldText}>
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </Text>{' '}
          para abrir as ferramentas de desenvolvedor.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        {/* CORRIGIDO: Link simplificado para navegação nativa */}
        <Link href="/modal" asChild>
          <TouchableOpacity>
            <Text style={styles.subtitle}>Passo 2: Explore</Text>
          </TouchableOpacity>
        </Link>
        <Text style={styles.text}>
          Toque na aba "Explore" para aprender mais sobre o que está incluído neste app inicial.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.subtitle}>Passo 3: Comece do zero</Text>
        <Text style={styles.text}>
          Quando estiver pronto, rode{' '}
          <Text style={styles.boldText}>npm run reset-project</Text> para obter um diretório{' '}
          <Text style={styles.boldText}>app</Text> limpo.
        </Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  boldText: {
    fontWeight: '600',
  },
});