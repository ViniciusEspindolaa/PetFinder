// index.tsx
import { ChevronDown, Filter, Search, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  LayoutAnimation,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { styles } from './styles';

// Habilitar LayoutAnimation no Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Componente Auxiliar CustomPicker ---
const CustomPicker = ({ label, options, selectedValue, onValueChange, placeholder }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedLabel = options.find((opt: any) => opt.value === selectedValue)?.label;
  return (
    <View style={styles.pickerGroup}>
      <Text style={styles.pickerLabel}>{label}</Text>
      <TouchableOpacity style={styles.pickerButton} onPress={() => setModalVisible(true)}>
        <Text style={[styles.pickerButtonText, !selectedValue && styles.pickerPlaceholder]}>
          {selectedLabel || placeholder}
        </Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={() => setModalVisible(false)} activeOpacity={1}>
          <View style={styles.pickerModalContainer}>
            <ScrollView>
              {options.map((opt: any) => (
                <TouchableOpacity key={opt.value} style={styles.pickerOption} onPress={() => { onValueChange(opt.value); setModalVisible(false); }}>
                  <Text style={styles.pickerOptionText}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// --- Componente Principal SearchFilters ---
interface SearchFiltersProps {
  searchQuery: string; onSearchChange: (query: string) => void;
  typeFilter: string; onTypeFilterChange: (type: string) => void;
  sizeFilter: string; onSizeFilterChange: (size: string) => void;
  locationFilter: string; onLocationFilterChange: (location: string) => void;
  onClearFilters: () => void;
}

export function SearchFilters({
  searchQuery, onSearchChange, typeFilter, onTypeFilterChange,
  sizeFilter, onSizeFilterChange, locationFilter, onLocationFilterChange, onClearFilters
}: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rotation = useSharedValue(0);

  const hasActiveFilters = typeFilter !== 'all' || sizeFilter !== 'all' || locationFilter !== 'all';

  const toggleFilters = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
    rotation.value = withTiming(isOpen ? 0 : 180);
  };

  const animatedChevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      {/* Barra de Busca */}
      <View style={styles.searchBarContainer}>
        <Search style={styles.searchIcon} size={18} color={styles.pickerPlaceholder.color} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome, raça..."
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>

      {/* Gatilho dos Filtros */}
      <TouchableOpacity style={styles.filterButton} onPress={toggleFilters} activeOpacity={0.8}>
        <View style={styles.filterButtonContent}>
          <Filter size={16} color={styles.filterButtonText.color} />
          <Text style={styles.filterButtonText}>Filtros</Text>
          {hasActiveFilters && <View style={styles.activeFilterDot} />}
        </View>
        <Animated.View style={animatedChevronStyle}>
          <ChevronDown size={18} color={styles.filterButtonText.color} />
        </Animated.View>
      </TouchableOpacity>
      
      {/* Conteúdo dos Filtros (Collapsible) */}
      {isOpen && (
        <View style={styles.filtersContent}>
          {hasActiveFilters && (
            <View style={styles.clearButtonContainer}>
              <TouchableOpacity style={styles.clearButton} onPress={onClearFilters}>
                <X size={16} color={styles.clearButtonText.color} />
                <Text style={styles.clearButtonText}>Limpar filtros</Text>
              </TouchableOpacity>
            </View>
          )}

          <CustomPicker
            label="Tipo de Animal"
            selectedValue={typeFilter}
            onValueChange={onTypeFilterChange}
            placeholder="Todos os tipos"
            options={[
              { label: 'Todos os tipos', value: 'all' },
              { label: 'Cão', value: 'dog' },
              { label: 'Gato', value: 'cat' },
              { label: 'Outro', value: 'other' },
            ]}
          />
          <CustomPicker
            label="Tamanho"
            selectedValue={sizeFilter}
            onValueChange={onSizeFilterChange}
            placeholder="Todos os tamanhos"
            options={[
              { label: 'Todos os tamanhos', value: 'all' },
              { label: 'Pequeno', value: 'small' },
              { label: 'Médio', value: 'medium' },
              { label: 'Grande', value: 'large' },
            ]}
          />
          <CustomPicker
            label="Região"
            selectedValue={locationFilter}
            onValueChange={onLocationFilterChange}
            placeholder="Todas as regiões"
            options={[
              { label: 'Todas as regiões', value: 'all' },
              { label: 'Centro', value: 'centro' },
              { label: 'Zona Norte', value: 'zona-norte' },
              { label: 'Zona Sul', value: 'zona-sul' },
            ]}
          />
        </View>
      )}
    </View>
  );
}