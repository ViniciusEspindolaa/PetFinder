// index.tsx
import * as ImagePicker from 'expo-image-picker';
import { Camera, Image as ImageIcon, Upload, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { styles } from './styles';

interface PhotoUploadProps {
  onPhotoSelect: (photoUri: string) => void;
  currentPhoto?: string;
  maxSize?: number; // em MB
}

export function PhotoUpload({ onPhotoSelect, currentPhoto, maxSize = 5 }: PhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  // Função genérica para lidar com a seleção de imagem
  const handleImagePick = async (source: 'camera' | 'gallery') => {
    // 1. Solicitar permissão
    const permission = source === 'camera' 
      ? await ImagePicker.requestCameraPermissionsAsync() 
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== 'granted') {
      Alert.alert('Permissão necessária', `Precisamos de permissão para acessar sua ${source === 'camera' ? 'câmera' : 'galeria'} para continuar.`);
      return;
    }

    // 2. Abrir o seletor de imagem
    const result = source === 'camera'
      ? await ImagePicker.launchCameraAsync({ quality: 0.8, allowsEditing: true, aspect: [4, 3] })
      : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8, allowsEditing: true, aspect: [4, 3] });

    if (result.canceled) return;

    // 3. Processar o resultado
    const asset = result.assets[0];
    const fileSizeInMB = (asset.fileSize || 0) / 1024 / 1024;

    if (fileSizeInMB > maxSize) {
      Alert.alert('Arquivo muito grande', `A imagem deve ter menos de ${maxSize}MB.`);
      return;
    }

    setIsUploading(true);
    // Simular um tempo de carregamento
    setTimeout(() => {
      onPhotoSelect(asset.uri);
      setIsUploading(false);
    }, 500);
  };

  const handleRemovePhoto = () => {
    onPhotoSelect('');
  };

  // Renderiza a área de upload quando não há foto
  const renderUploadArea = () => (
    <View style={styles.uploadContainer}>
      <View style={styles.uploadContent}>
        {isUploading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={styles.galleryButtonText.color} />
            <Text style={styles.loadingText}>Carregando foto...</Text>
          </View>
        ) : (
          <>
            <View style={styles.iconContainer}>
              <ImageIcon size={32} color="rgba(52, 73, 94, 0.4)" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Adicionar Foto do Animal</Text>
              <Text style={styles.subtitle}>Use os botões abaixo para começar</Text>
              <Text style={styles.sizeInfo}>Máximo {maxSize}MB • JPG, PNG</Text>
            </View>
            <View style={styles.buttonGrid}>
              <TouchableOpacity style={[styles.button, styles.cameraButton]} onPress={() => handleImagePick('camera')}>
                <Camera size={16} color={styles.cameraButtonText.color} />
                <Text style={styles.cameraButtonText}>Câmera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.galleryButton]} onPress={() => handleImagePick('gallery')}>
                <Upload size={16} color={styles.galleryButtonText.color} />
                <Text style={styles.galleryButtonText}>Galeria</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );

  // Renderiza a pré-visualização da foto
  const renderPreview = () => (
    <View style={styles.previewCard}>
      <View style={styles.previewContent}>
        <ImageBackground source={{ uri: currentPhoto }} style={styles.imageContainer} resizeMode="cover">
          <TouchableOpacity style={styles.removeButton} onPress={handleRemovePhoto}>
            <X size={16} color={styles.badgeText.color} />
          </TouchableOpacity>
          <View style={styles.successBadge}>
            <ImageIcon size={12} color={styles.badgeText.color} />
            <Text style={styles.badgeText}>Foto carregada</Text>
          </View>
        </ImageBackground>
        <View style={styles.buttonGrid}>
          <TouchableOpacity style={[styles.button, styles.previewCameraButton]} onPress={() => handleImagePick('camera')} disabled={isUploading}>
            <Camera size={16} color={styles.cameraButtonText.color} />
            <Text style={styles.cameraButtonText}>Nova Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.galleryButton]} onPress={() => handleImagePick('gallery')} disabled={isUploading}>
            <Upload size={16} color={styles.galleryButtonText.color} />
            <Text style={styles.galleryButtonText}>Galeria</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return currentPhoto ? renderPreview() : renderUploadArea();
}