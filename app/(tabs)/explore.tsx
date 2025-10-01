import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Nossos componentes nativos
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { UniversalIcon } from '@/components/universal-icon';

// Hooks e constantes
import { useColorScheme } from '@/hooks/use-color-scheme';
// import { Fonts } from '@/constants/theme'; // Descomente se você configurou fontes customizadas

export default function ExploreScreen() {
  const colorScheme = useColorScheme();

  const headerBackgroundColor = colorScheme === 'dark' ? '#353636' : '#D0D0D0';

  return (
    <ParallaxScrollView
      headerBackgroundColor={headerBackgroundColor}
      headerImage={
        // CORRIGIDO: Usando UniversalIcon para ser multiplataforma
        <UniversalIcon
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      {/* CORRIGIDO: Usando View e Text padrão */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Explore</Text>
      </View>

      <Text style={styles.text}>Este app inclui código de exemplo para te ajudar a começar.</Text>
      
      {/* CORRIGIDO: Usando a estrutura do nosso Collapsible nativo */}
      <Collapsible>
        <CollapsibleTrigger>
          <TouchableOpacity style={styles.collapsibleTrigger}>
            <Text style={styles.collapsibleTriggerText}>Roteamento por Arquivos</Text>
          </TouchableOpacity>
        </CollapsibleTrigger>
        <CollapsibleContent>
            <View style={styles.collapsibleContent}>
                <Text style={styles.text}>
                    Este app tem duas telas:{' '}
                    <Text style={styles.boldText}>app/(tabs)/index.tsx</Text> e{' '}
                    <Text style={styles.boldText}>app/(tabs)/explore.tsx</Text>
                </Text>
                <ExternalLink href="https://docs.expo.dev/router/introduction">
                    <Text style={styles.link}>Saiba mais</Text>
                </ExternalLink>
            </View>
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible>
        <CollapsibleTrigger>
          <TouchableOpacity style={styles.collapsibleTrigger}>
            <Text style={styles.collapsibleTriggerText}>Suporte Multiplataforma</Text>
          </TouchableOpacity>
        </CollapsibleTrigger>
        <CollapsibleContent>
            <View style={styles.collapsibleContent}>
                <Text style={styles.text}>
                    Você pode abrir este projeto no Android, iOS e na web. Para abrir a versão web, pressione{' '}
                    <Text style={styles.boldText}>w</Text> no terminal.
                </Text>
            </View>
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible>
        <CollapsibleTrigger>
            <TouchableOpacity style={styles.collapsibleTrigger}>
                <Text style={styles.collapsibleTriggerText}>Imagens</Text>
            </TouchableOpacity>
        </CollapsibleTrigger>
        <CollapsibleContent>
            <View style={styles.collapsibleContent}>
                <Image
                    source={require('@/assets/images/react-logo.png')}
                    style={{ width: 100, height: 100, alignSelf: 'center', marginVertical: 12 }}
                />
                <ExternalLink href="https://reactnative.dev/docs/images">
                    <Text style={styles.link}>Saiba mais</Text>
                </ExternalLink>
            </View>
        </CollapsibleContent>
      </Collapsible>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827', // Cor padrão para texto de título
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  boldText: {
    fontWeight: '600',
  },
  link: {
    color: '#0a7ea4',
    textDecorationLine: 'underline',
  },
  collapsibleTrigger: {
      backgroundColor: '#F1F5F9',
      padding: 12,
      borderRadius: 8,
      width: '100%',
  },
  collapsibleTriggerText: {
      fontSize: 16,
      fontWeight: '500',
  },
  collapsibleContent: {
      padding: 12,
      gap: 8,
  }
});