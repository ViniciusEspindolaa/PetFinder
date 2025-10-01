// index.tsx
import { MapPin, MessageCircle, Phone, Route, User, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Linking, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
// Assumindo que o tipo Pet existe e foi importado
import { Pet } from '../PetCard';
import { styles } from './styles';

// Defina ou importe o objeto COLORS conforme necessário
const COLORS = {
  primary: '#2980B9',
  secondary: '#F39C12',
  destructive: '#E74C3C',
  white: '#FFFFFF',
};

interface MapPageProps {
  pets: Pet[];
  initialSelectedPetId?: string | null;
}

// Coordenadas reais (mockadas) para São Paulo
const MOCK_COORDINATES: { [key: string]: { latitude: number; longitude: number } } = {
  "Parque Ibirapuera, São Paulo": { latitude: -23.588, longitude: -46.6588 },
  "Vila Madalena, São Paulo": { latitude: -23.553, longitude: -46.6995 },
  "Centro, São Paulo": { latitude: -23.5505, longitude: -46.6333 },
  "Jardins, São Paulo": { latitude: -23.5675, longitude: -46.668 },
};

const getCoordinatesForLocation = (location: string) => {
  return MOCK_COORDINATES[location] || MOCK_COORDINATES["Centro, São Paulo"];
};

const SAO_PAULO_REGION: Region = {
    latitude: -23.56,
    longitude: -46.66,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15,
};

const getAnimalEmoji = (type: Pet['type']) => {
  return type === 'dog' ? '🐕' : type === 'cat' ? '🐱' : '🐾';
};

// Componente para o card de detalhes, para manter o principal mais limpo
const SelectedPetCard = ({ pet, onClose, onContact }: { pet: Pet; onClose: () => void; onContact: () => void; }) => (
    <View style={[styles.card, styles.selectedPetCard]}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: pet.image }} style={styles.petImage} />
            <View style={styles.imageOverlay}>
                <View style={[styles.badge, { backgroundColor: pet.status === 'lost' ? '#E74C3C' : '#F39C12' }]}>
                    <Text style={styles.badgeText}>{pet.status === 'lost' ? 'Perdido' : 'Encontrado'}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}><X size={18} color="#2C3E50" /></TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
            <Text style={styles.petName}>{pet.name}</Text>
            {/* ... outros detalhes do pet podem ser adicionados aqui ... */}
            <View style={styles.actionButtons}>
                <TouchableOpacity style={[styles.flexButton, styles.button, { backgroundColor: '#2980B9' }]} onPress={onContact}>
                    <User size={16} color="#FFFFFF" /><Text style={{ color: '#FFF', fontWeight: 'bold' }}>Contato</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.flexButton, styles.button, { backgroundColor: '#F39C12' }]} onPress={() => Alert.alert('Em breve', 'Função de rota em desenvolvimento.')}>
                    <Route size={16} color="#FFFFFF" /><Text style={{ color: '#FFF', fontWeight: 'bold' }}>Como Chegar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

export function MapPage({ pets, initialSelectedPetId }: MapPageProps) {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all');
  const [isContactModalVisible, setContactModalVisible] = useState(false);

  const filteredPets = pets.filter(p => filter === 'all' || p.status === filter);

  useEffect(() => {
    if (initialSelectedPetId) {
      const pet = pets.find(p => p.id === initialSelectedPetId);
      if (pet) setSelectedPet(pet);
    }
  }, [initialSelectedPetId, pets]);

  const handleContactAction = (type: 'call' | 'whatsapp') => {
    if (!selectedPet) return;
    const { phone } = selectedPet.contact;
    let url = '';
    if (type === 'call') {
      url = `tel:${phone}`;
    } else {
      const message = `Olá! Vi o anúncio sobre ${selectedPet.name} no PetFinder.`;
      url = `https://wa.me/55${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    }
    Linking.openURL(url).catch(() => Alert.alert('Erro', 'Não foi possível completar a ação.'));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.card, styles.headerCard]}>
          <View style={styles.titleContainer}><MapPin size={22} color={COLORS.secondary} /><Text style={styles.title}>Mapa de Localização</Text></View>
          <Text style={styles.description}>Veja onde os animais foram perdidos ou encontrados.</Text>
        </View>

        {/* Filtros */}
        <View style={styles.filtersContainer}>
            <TouchableOpacity style={[styles.filterButton, filter === 'all' && styles.activeFilterAll]} onPress={() => setFilter('all')}>
                <Text style={[styles.filterButtonText, filter === 'all' && styles.activeFilterText]}>Todos ({pets.length})</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, filter === 'lost' && styles.activeFilterLost]} onPress={() => setFilter('lost')}>
                <Text style={[styles.filterButtonText, filter === 'lost' && styles.activeFilterText]}>Perdidos ({pets.filter(p => p.status === 'lost').length})</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, filter === 'found' && styles.activeFilterFound]} onPress={() => setFilter('found')}>
                <Text style={[styles.filterButtonText, filter === 'found' && styles.activeFilterText]}>Encontrados ({pets.filter(p => p.status === 'found').length})</Text>
            </TouchableOpacity>
        </View>
        
        {/* Mapa */}
        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={SAO_PAULO_REGION}>
            {filteredPets.map(pet => (
              <Marker
                key={pet.id}
                coordinate={getCoordinatesForLocation(pet.location)}
                onPress={() => setSelectedPet(pet)}
              >
                <View style={[styles.marker, { backgroundColor: pet.status === 'lost' ? COLORS.destructive : COLORS.secondary }, selectedPet?.id === pet.id && styles.selectedMarker]}>
                  <Text style={styles.markerText}>{getAnimalEmoji(pet.type)}</Text>
                </View>
              </Marker>
            ))}
          </MapView>
        </View>

        {/* Card do Pet Selecionado */}
        {selectedPet && <SelectedPetCard pet={selectedPet} onClose={() => setSelectedPet(null)} onContact={() => setContactModalVisible(true)} />}
      </View>

      {/* Modal de Contato */}
      {selectedPet && (
          <Modal visible={isContactModalVisible} transparent={true} animationType="fade" onRequestClose={() => setContactModalVisible(false)}>
              <Pressable style={styles.modalBackdrop} onPress={() => setContactModalVisible(false)}>
                  <Pressable style={styles.modalContainer} onPress={() => {}}>
                      <User size={32} color={COLORS.primary} />
                      <Text style={styles.contactName}>{selectedPet.contact.name}</Text>
                      <Text style={styles.contactPhone}>{selectedPet.contact.phone}</Text>
                      <View style={styles.actionButtons}>
                          <TouchableOpacity style={[styles.flexButton, styles.button, { backgroundColor: COLORS.primary }]} onPress={() => handleContactAction('call')}>
                              <Phone size={16} color={COLORS.white} /><Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Ligar</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={[styles.flexButton, styles.button, { backgroundColor: '#25D366' }]} onPress={() => handleContactAction('whatsapp')}>
                              <MessageCircle size={16} color={COLORS.white} /><Text style={{ color: COLORS.white, fontWeight: 'bold' }}>WhatsApp</Text>
                          </TouchableOpacity>
                      </View>
                  </Pressable>
              </Pressable>
          </Modal>
      )}
    </ScrollView>
  );
}