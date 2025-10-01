// index.tsx
import { Heart, Search } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// Tipos e componentes precisam ser importados de seus locais corretos
import { Pet, PetCard } from '../PetCard';
import { SearchFilters } from '../SearchFilters';
import { styles } from './styles';

interface SearchPageProps {
  pets: Pet[];
  onTabChange?: (tab: string) => void;
  onViewPetOnMap?: (petId: string) => void;
}

export function SearchPage({ pets, onTabChange, onViewPetOnMap }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [activeFilter, setActiveFilter] = useState<'all' | 'lost' | 'found'>('all');
  
  // Memoize para evitar recalcular a cada renderização
  const lostAndFoundPets = useMemo(() => pets.filter(pet => pet.status === 'lost' || pet.status === 'found'), [pets]);
  
  const displayPets = useMemo(() => {
    let results = lostAndFoundPets;

    // 1. Aplicar filtro de status (Perdido/Encontrado)
    if (activeFilter !== 'all') {
      results = results.filter(pet => pet.status === activeFilter);
    }
    // 2. Aplicar busca por texto
    if (searchQuery) {
        results = results.filter(pet => 
            pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    // 3. Aplicar filtros avançados
    if (typeFilter !== 'all') results = results.filter(pet => pet.type === typeFilter);
    if (sizeFilter !== 'all') results = results.filter(pet => pet.size === sizeFilter);
    if (locationFilter !== 'all') { /* Adicionar lógica de filtro de localização se necessário */ }
    
    return results;
  }, [lostAndFoundPets, activeFilter, searchQuery, typeFilter, sizeFilter, locationFilter]);

  const lostCount = lostAndFoundPets.filter(pet => pet.status === 'lost').length;
  const foundCount = lostAndFoundPets.filter(pet => pet.status === 'found').length;
  
  const clearFilters = () => {
      setSearchQuery('');
      setTypeFilter('all');
      setSizeFilter('all');
      setLocationFilter('all');
  };

  const renderEmptyList = () => {
    const Icon = activeFilter === 'found' ? Heart : Search;
    return (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
                <Icon size={48} color="rgba(127, 140, 141, 0.5)" />
            </View>
            <Text style={styles.emptyText}>Nenhum resultado encontrado</Text>
            <Text style={styles.emptySubtext}>Tente ajustar os filtros de busca</Text>
        </View>
    );
  };
  
  const renderListHeader = () => (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Buscar Animais</Text>
        <Text style={styles.description}>Encontre perdidos ou ajude animais encontrados</Text>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer} style={styles.filtersScrollView}>
        <TouchableOpacity style={[styles.filterButton, activeFilter === 'all' && styles.activeFilterAll]} onPress={() => setActiveFilter('all')}><Text style={[styles.filterButtonText, activeFilter === 'all' && styles.activeFilterText]}>Todos ({lostCount + foundCount})</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, activeFilter === 'lost' && styles.activeFilterLost]} onPress={() => setActiveFilter('lost')}><Search size={14} color={activeFilter === 'lost' ? '#FFF' : styles.filterButtonText.color} /><Text style={[styles.filterButtonText, activeFilter === 'lost' && styles.activeFilterText]}>Perdidos ({lostCount})</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, activeFilter === 'found' && styles.activeFilterFound]} onPress={() => setActiveFilter('found')}><Heart size={14} color={activeFilter === 'found' ? '#FFF' : styles.filterButtonText.color} /><Text style={[styles.filterButtonText, activeFilter === 'found' && styles.activeFilterText]}>Encontrados ({foundCount})</Text></TouchableOpacity>
      </ScrollView>

      <SearchFilters 
        searchQuery={searchQuery} onSearchChange={setSearchQuery}
        typeFilter={typeFilter} onTypeFilterChange={setTypeFilter}
        sizeFilter={sizeFilter} onSizeFilterChange={setSizeFilter}
        locationFilter={locationFilter} onLocationFilterChange={setLocationFilter}
        onClearFilters={clearFilters}
      />
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