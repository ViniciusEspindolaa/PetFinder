// index.tsx
import { Heart, MapPin, Search, Trophy, Users } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// Assumindo que o componente PetCard e o tipo Pet já foram convertidos para React Native
import { Pet, PetCard } from '../PetCard';
import { styles } from './styles';

interface HomePageProps {
  pets: Pet[];
  onTabChange: (tab: string) => void;
  onViewPetOnMap?: (petId: string) => void;
}

const stats = [
  { icon: Search, label: 'Animais Perdidos', value: (pets: Pet[]) => pets.filter(p => p.status === 'lost').length, color: '#E74C3C' },
  { icon: Heart, label: 'Encontrados', value: (pets: Pet[]) => pets.filter(p => p.status === 'found').length, color: '#F39C12' },
  { icon: Users, label: 'Famílias Reunidas', value: () => '15+', color: '#2C3E50' },
];

export function HomePage({ pets, onTabChange, onViewPetOnMap }: HomePageProps) {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const recentPets = pets.slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentStat = stats[currentStatIndex];
  const StatIcon = currentStat.icon;

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Seção Hero */}
        <View style={styles.heroContainer}>
          <View style={styles.logoContainer}>
            <Heart size={32} color={styles.title.color} />
            <Text style={styles.title}>PetFinder</Text>
          </View>
          <Text style={styles.subtitle}>Encontre seu amigo</Text>
        </View>

        {/* Card de Estatísticas */}
        <View style={styles.statsSection}>
          <View style={styles.dotsContainer}>
            {stats.map((_, index) => (
              <View key={index} style={[styles.dot, index === currentStatIndex && styles.dotActive]} />
            ))}
          </View>
          <TouchableOpacity 
            style={styles.statCard} 
            activeOpacity={0.8}
            onPress={() => setCurrentStatIndex((prev) => (prev + 1) % stats.length)}
          >
            <View style={styles.statCardContent}>
              <View style={styles.statInfo}>
                <StatIcon size={22} color={currentStat.color} />
                <Text style={styles.statLabel}>{currentStat.label}</Text>
              </View>
              <Text style={styles.statValue}>{currentStat.value(pets)}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Casos Recentes */}
        <View>
          <View style={styles.recentCasesHeader}>
            <Text style={styles.sectionTitle}>Casos Recentes</Text>
            <TouchableOpacity onPress={() => onTabChange('search')}>
              <Text style={styles.seeAllButtonText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.petCardsContainer}>
            {recentPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onViewMap={() => onViewPetOnMap ? onViewPetOnMap(pet.id) : onTabChange('map')} />
            ))}
          </View>
        </View>

        {/* Como Funciona */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}><Text style={styles.infoCardTitle}>Como Funciona</Text></View>
          <View style={styles.infoCardContent}>
            <View style={styles.step}>
              <View style={[styles.stepNumberContainer, {backgroundColor: '#2980B9'}]}><Text style={styles.stepNumberText}>1</Text></View>
              <View style={styles.stepTextContainer}>
                <Text style={styles.stepTitle}>Reporte um animal</Text>
                <Text style={styles.stepDescription}>Perdeu ou encontrou um pet? Crie um report com fotos e detalhes.</Text>
              </View>
            </View>
            <View style={styles.step}>
                <View style={[styles.stepNumberContainer, {backgroundColor: '#F39C12'}]}><Text style={styles.stepNumberText}>2</Text></View>
                <View style={styles.stepTextContainer}>
                    <Text style={styles.stepTitle}>A comunidade ajuda</Text>
                    <Text style={styles.stepDescription}>Outros usuários podem visualizar e entrar em contato.</Text>
                </View>
            </View>
            <View style={styles.step}>
                <View style={[styles.stepNumberContainer, {backgroundColor: '#2C3E50'}]}><Text style={styles.stepNumberText}>3</Text></View>
                <View style={styles.stepTextContainer}>
                    <Text style={styles.stepTitle}>Famílias reunidas</Text>
                    <Text style={styles.stepDescription}>Ajudamos a conectar animais com suas famílias.</Text>
                </View>
            </View>
          </View>
        </View>
        
        {/* Busca por Região */}
        <View style={[styles.infoCard, {borderColor: 'rgba(243, 156, 18, 0.2)', backgroundColor: 'rgba(243, 156, 18, 0.05)'}]}>
            <View style={styles.infoCardContent}>
                <View style={styles.themedCardContent}>
                    <MapPin size={20} color="#F39C12" />
                    <View style={styles.themedCardTextContainer}>
                        <Text style={styles.themedCardTitle}>Busca por Região</Text>
                        <Text style={styles.themedCardDescription}>Use os filtros para encontrar animais na sua região e aumentar as chances de sucesso.</Text>
                        <TouchableOpacity style={styles.locationButton} onPress={() => onTabChange('search')}>
                            <Text style={styles.locationButtonText}>Buscar na Minha Região</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        
        {/* Histórias de Sucesso */}
        <View style={[styles.infoCard, {borderColor: 'rgba(44, 62, 80, 0.2)', backgroundColor: 'rgba(44, 62, 80, 0.05)'}]}>
            <View style={styles.infoCardContent}>
                <View style={styles.themedCardContent}>
                    <Trophy size={20} color="#2C3E50" />
                    <View style={styles.themedCardTextContainer}>
                        <Text style={styles.themedCardTitle}>Histórias de Sucesso</Text>
                        <Text style={styles.themedCardDescription}>"Encontrei minha gata Mimi depois de 3 dias graças ao PetFinder!" - Ana S.</Text>
                        <View style={styles.successBadge}>
                            <Heart size={12} color={styles.successBadgeText.color} />
                            <Text style={styles.successBadgeText}>15+ reuniões este mês</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
      </View>
    </ScrollView>
  );
}