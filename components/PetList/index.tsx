// index.tsx
import { PawPrint } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
// Tipos e componentes precisam ser importados de seus locais corretos
import { Pet, PetCard } from '../PetCard';
import { SearchFilters } from '../SearchFilters';
import { styles } from './styles';

interface PetListProps {
  pets: Pet[];
  status: 'lost' | 'found' | 'adoption';
  onTabChange?: (tab: string) => void;
  onViewPetOnMap?: (petId: string) => void;
}

// Funções de ajuda permanecem as mesmas
const getStatusText = (status: string) => {
  switch (status) {
    case 'lost': return 'perdido';
    case 'found': return 'encontrado';
    case 'adoption': return 'para adoção';
    default: return '';
  }
};

const getHeaderInfo = (status: string) => {
  switch (status) {
    case 'adoption': return { title: 'Animais para Adoção', description: 'Encontre seu novo melhor amigo' };
    case 'lost': return { title: 'Animais Perdidos', description: 'Ajude a reunir famílias' };
    case 'found': return { title: 'Animais Encontrados', description: 'Animais aguardando seus donos' };
    default: return { title: 'Animais', description: '' };
  }
};

export function PetList({ pets, status, onTabChange, onViewPetOnMap }: PetListProps) {
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  
  // A lógica de filtragem é a mesma
  const displayPets = filteredPets.length > 0
    ? filteredPets.filter(pet => pet.status === status)
    : pets.filter(pet => pet.status === status);

  const headerInfo = getHeaderInfo(status);

  // Componente para a mensagem de lista vazia
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <PawPrint size={48} color="rgba(127, 140, 141, 0.5)" />
      </View>
      <Text style={styles.emptyText}>Nenhum animal {getStatusText(status)} encontrado</Text>
      <Text style={styles.emptySubtext}>Tente ajustar os filtros de busca</Text>
    </View>
  );
  
  // Componente para o cabeçalho da lista
  const renderListHeader = () => (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{headerInfo.title}</Text>
        <Text style={styles.description}>{headerInfo.description}</Text>
      </View>
      <SearchFilters pets={pets.filter(pet => pet.status === status)} onFilter={setFilteredPets} />
    </>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContentContainer}
      data={displayPets}
      renderItem={({ item }) => <PetCard pet={item} onViewMap={onViewPetOnMap} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderListHeader}
      ListEmptyComponent={renderEmptyList}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}