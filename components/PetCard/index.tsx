// index.tsx
import { Calendar, Expand, MapPin, MessageCircle, Phone, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Linking, Modal, Pressable, Text, TouchableOpacity, View, Alert } from 'react-native';
import { styles } from './styles';

// A interface Pet pode ser movida para um arquivo de tipos global
export interface Pet {
  id: string; name: string; type: 'dog' | 'cat' | 'other'; breed: string; color: string;
  size: 'small' | 'medium' | 'large'; status: 'lost' | 'found' | 'adoption';
  location: string; lastSeen: string; description: string;
  contact: { name: string; phone: string; };
  image: string; reward?: number;
}

interface PetCardProps {
  pet: Pet;
  onViewMap?: (petId: string) => void;
}

const statusMap = {
  lost: { text: 'Perdido', color: '#E74C3C' },
  found: { text: 'Encontrado', color: '#F39C12' },
  adoption: { text: 'Adoção', color: '#2980B9' },
};

const sizeLabels = { small: 'Pequeno', medium: 'Médio', large: 'Grande' };
const typeLabels = { dog: 'Cão', cat: 'Gato', other: 'Outro' };

export function PetCard({ pet, onViewMap }: PetCardProps) {
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isContactModalVisible, setContactModalVisible] = useState(false);

  const handleContactAction = (type: 'call' | 'whatsapp') => {
    let url = '';
    if (type === 'call') {
      url = `tel:${pet.contact.phone}`;
    } else {
      const message = `Olá! Vi o anúncio sobre ${pet.name} no PetFinder.`;
      url = `https://wa.me/55${pet.contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    }
    Linking.openURL(url).catch(() => Alert.alert('Erro', 'Não foi possível completar a ação.'));
    setContactModalVisible(false);
  };

  const statusInfo = statusMap[pet.status];

  return (
    <>
      <View style={styles.card}>
        {/* Imagem */}
        <TouchableOpacity onPress={() => setImageModalVisible(true)}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: pet.image }} style={styles.image} resizeMode="cover" />
            <View style={[styles.badge, styles.statusBadge, { backgroundColor: statusInfo.color }]}>
              <Text style={styles.badgeText}>{statusInfo.text}</Text>
            </View>
            {pet.reward && (
              <View style={[styles.badge, styles.rewardBadge]}>
                <Text style={styles.badgeText}>R$ {pet.reward}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Conteúdo */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.petName}>{pet.name}</Text>
            <View style={styles.smallBadgesContainer}>
              <View style={[styles.badge, styles.outlineBadge]}><Text style={styles.outlineBadgeText}>{typeLabels[pet.type]}</Text></View>
              <View style={[styles.badge, styles.outlineBadge]}><Text style={styles.outlineBadgeText}>{sizeLabels[pet.size]}</Text></View>
            </View>
          </View>
          
          <View style={styles.infoGrid}>
              <Text style={styles.infoText}>
                  <Text style={{fontWeight: 'bold'}}>Raça:</Text> {pet.breed}
              </Text>
              <Text style={styles.infoText}>
                  <Text style={{fontWeight: 'bold'}}>Cor:</Text> {pet.color}
              </Text>
          </View>

          <View style={styles.infoRow}>
            <MapPin size={12} color={styles.infoText.color} /><Text style={styles.infoText}>{pet.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Calendar size={12} color={styles.infoText.color} /><Text style={styles.infoText}>{pet.lastSeen}</Text>
          </View>

          {pet.description && (
            <Text style={styles.description} numberOfLines={2}>{pet.description}</Text>
          )}

          <View style={styles.contactInfo}>
            <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Contato:</Text> {pet.contact.name}</Text>
            <View style={styles.actionsContainer}>
              {pet.status !== 'adoption' && onViewMap && (
                <TouchableOpacity style={[styles.button, styles.mapButton]} onPress={() => onViewMap(pet.id)}>
                  <MapPin size={14} color={styles.mapButtonText.color} /><Text style={[styles.buttonText, styles.mapButtonText]}>Mapa</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={[styles.button, styles.contactButton]} onPress={() => setContactModalVisible(true)}>
                <User size={14} color={styles.contactButtonText.color} /><Text style={[styles.buttonText, styles.contactButtonText]}>Contato</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      
      {/* Modal da Imagem */}
      <Modal visible={isImageModalVisible} transparent={true} animationType="fade" onRequestClose={() => setImageModalVisible(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setImageModalVisible(false)}>
          <View style={styles.imageModalContent}>
              <Image source={{ uri: pet.image }} style={styles.modalImage} resizeMode="contain" />
          </View>
        </Pressable>
      </Modal>

            {/* Modal de Contato */}
            <Modal visible={isContactModalVisible} transparent={true} animationType="fade" onRequestClose={() => setContactModalVisible(false)}>
              <Pressable style={styles.modalBackdrop} onPress={() => setContactModalVisible(false)}>
                <Pressable style={styles.contactModalContainer} onPress={() => {}}>
                  <User size={28} color={styles.contactModalTitle.color} />
                  <Text style={styles.contactModalTitle}>Entrar em Contato</Text>
                </Pressable>
              </Pressable>
            </Modal>
          </>
        );
      }