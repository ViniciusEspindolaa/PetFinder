// index.tsx
import * as Location from 'expo-location';
import { Check, MapPin, Navigation, X } from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { styles } from './styles';

type LocationData = { lat: number; lng: number; address: string };

interface MapLocationPickerProps {
  onLocationSelect: (location: LocationData) => void;
  children: React.ReactNode;
  currentLocation?: LocationData;
}

const SAO_PAULO_REGION: Region = {
  latitude: -23.55052,
  longitude: -46.633308,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export function MapLocationPicker({ onLocationSelect, children, currentLocation }: MapLocationPickerProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(currentLocation || null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const mapRef = useRef<MapView>(null);

  const getAddressFromCoordinates = useCallback(async (lat: number, lng: number): Promise<string> => {
    setIsLoadingAddress(true);
    try {
      const result = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
      if (result.length > 0) {
        const { street, streetNumber, district, city, region, postalCode } = result[0];
        return `${street || ''} ${streetNumber || ''}, ${district || ''}, ${city || ''} - ${region || ''}`;
      }
      return 'Endereço não encontrado';
    } catch (error) {
      return 'Localização selecionada';
    } finally {
      setIsLoadingAddress(false);
    }
  }, []);

  const handleUseCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Para usar esta função, por favor, habilite o acesso à localização nas configurações.');
      return;
    }
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const address = await getAddressFromCoordinates(latitude, longitude);
      setSelectedLocation({ lat: latitude, lng: longitude, address });
      mapRef.current?.animateToRegion({ ...SAO_PAULO_REGION, latitude, longitude }, 1000);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter sua localização.');
    }
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
      setModalVisible(false);
    }
  };

  const handleCancel = () => {
    setSelectedLocation(currentLocation || null);
    setModalVisible(false);
  };
  
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {children}
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={handleCancel}>
        <Pressable style={styles.modalBackdrop} onPress={handleCancel}>
          <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <MapPin size={22} color={styles.currentLocationButtonText.color} />
              <Text style={styles.modalTitle}>Selecionar Localização</Text>
            </View>

            <TouchableOpacity style={[styles.button, styles.currentLocationButton]} onPress={handleUseCurrentLocation}>
              <Navigation size={16} color={styles.currentLocationButtonText.color} />
              <Text style={styles.currentLocationButtonText}>Usar Minha Localização Atual</Text>
            </TouchableOpacity>

            <View style={styles.mapContainer}>
              <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={SAO_PAULO_REGION}
                onPress={async (e) => {
                    const { latitude, longitude } = e.nativeEvent.coordinate;
                    const address = await getAddressFromCoordinates(latitude, longitude);
                    setSelectedLocation({ lat: latitude, lng: longitude, address });
                }}
              >
                {selectedLocation && (
                  <Marker coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} />
                )}
              </MapView>
            </View>

            {selectedLocation && (
              <View style={styles.infoCard}>
                <View style={styles.infoCardContent}>
                  <MapPin size={20} color={styles.currentLocationButtonText.color} />
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoTitle}>Localização Selecionada</Text>
                    {isLoadingAddress ? (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color={styles.currentLocationButtonText.color} />
                        <Text style={styles.infoAddress}>Obtendo endereço...</Text>
                      </View>
                    ) : (
                      <>
                        <Text style={styles.infoAddress}>{selectedLocation.address}</Text>
                        <Text style={styles.infoCoords}>
                          Lat: {selectedLocation.lat.toFixed(4)}, Lng: {selectedLocation.lng.toFixed(4)}
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </View>
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, styles.outlineButton, styles.flexButton]} onPress={handleCancel}>
                <X size={16} color={styles.outlineButtonText.color} /><Text style={styles.outlineButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.primaryButton, styles.flexButton]} onPress={handleConfirm} disabled={!selectedLocation}>
                <Check size={16} color={styles.primaryButtonText.color} /><Text style={styles.primaryButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}