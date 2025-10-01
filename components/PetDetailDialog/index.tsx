// index.tsx
import { Calendar, Flag, Gift, Heart, MapPin, MessageCircle, Phone, Search, Share2, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// Tipos e componentes precisam ser importados do seu local correto
import { Pet } from '../PetCard';
import { styles } from './styles';

interface PetDetailDialogProps {
  pet: Pet;
  children: React.ReactNode;
}

export function PetDetailDialog({ pet, children }: PetDetailDialogProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isContactModalVisible, setContactModalVisible] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        title: `${pet.status === 'lost' ? 'Animal Perdido' : 'Animal Encontrado'}: ${pet.name}`,
        message: `Ajude a encontrar ${pet.name}! Veja mais detalhes no app PetFinder. ${pet.description}`,
      });
    } catch (error) {
      Alert.alert('Aviso', 'Compartilhamento cancelado.');
    }
  };

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
  
  const StatusIcon = pet.status === 'lost' ? Search : Heart;
  const statusText = pet.status === 'lost' ? 'Perdido' : 'Encontrado';

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {children}
      </TouchableOpacity>

      {/* Modal Principal de Detalhes */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
            <ScrollView>
              <ImageBackground source={{ uri: pet.image }} style={styles.imageContainer}>
                <View style={[styles.badge, styles.statusBadge, { backgroundColor: pet.status === 'lost' ? '#E74C3C' : '#F39C12' }]}>
                  <StatusIcon size={12} color="#FFFFFF" />
                  <Text style={styles.badgeText}>{statusText}</Text>
                </View>
                {pet.reward && (
                  <View style={[styles.badge, styles.rewardBadge]}>
                    <Gift size={12} color="#FFFFFF" /><Text style={styles.badgeText}>R$ {pet.reward}</Text>
                  </View>
                )}
              </ImageBackground>

              <View style={styles.contentContainer}>
                <View style={styles.header}><Text style={styles.petName}>{pet.name}</Text><Text style={styles.petBreed}>({pet.breed})</Text></View>
                <View style={styles.infoCard}>{/* ... Conteúdo do infoCard ... */}</View>
                <View style={{ gap: 12 }}>
                    <View style={styles.infoRow}><MapPin size={20} color="#18BC9C" /><View style={styles.infoRowTextContainer}><Text style={styles.infoLabel}>Local</Text><Text style={styles.infoValue}>{pet.location}</Text></View></View>
                    <View style={styles.infoRow}><Calendar size={20} color="#18BC9C" /><View style={styles.infoRowTextContainer}><Text style={styles.infoLabel}>Visto em</Text><Text style={styles.infoValue}>{pet.lastSeen}</Text></View></View>
                </View>
                <View style={styles.separator} />
                <View><Text style={styles.infoLabel}>Descrição</Text><Text style={styles.infoValue}>{pet.description}</Text></View>
                <View style={styles.separator} />
                <View style={{ gap: 12 }}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>Informações de Contato</Text>
                    <View style={styles.infoRow}><User size={20} color="#18BC9C" /><View><Text style={styles.infoLabel}>Responsável</Text><Text style={styles.infoValue}>{pet.contact.name}</Text></View></View>
                    <View style={styles.infoRow}><Phone size={20} color="#18BC9C" /><View><Text style={styles.infoLabel}>Telefone</Text><Text style={styles.infoValue}>{pet.contact.phone}</Text></View></View>
                </View>

                <View style={styles.buttonGroup}>
                  <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => setContactModalVisible(true)}>
                    <MessageCircle size={16} color="#FFFFFF" /><Text style={styles.primaryButtonText}>Entrar em Contato</Text>
                  </TouchableOpacity>
                  <View style={styles.buttonGrid}>
                    <TouchableOpacity style={[styles.button, styles.gridButton, styles.shareButton]} onPress={handleShare}>
                        <Share2 size={16} color={styles.shareButtonText.color} /><Text style={styles.shareButtonText}>Compartilhar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.gridButton, styles.reportButton]} onPress={() => Alert.alert('Reportado', 'Seu reporte foi enviado para análise.')}>
                        <Flag size={16} color={styles.reportButtonText.color} /><Text style={styles.reportButtonText}>Reportar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.helpBox}><Text style={styles.helpText}>{pet.status === 'lost' ? 'Se você viu este animal, entre em contato imediatamente!' : 'Se este é seu animal, entre em contato para combinar a devolução!'}</Text></View>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Modal de Contato */}
      <Modal visible={isContactModalVisible} transparent={true} animationType="fade" onRequestClose={() => setContactModalVisible(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setContactModalVisible(false)}>
          <Pressable style={styles.contactModalContainer}>
            <User size={32} color={styles.contactModalTitle.color} />
            <Text style={styles.contactModalTitle}>Entrar em Contato</Text>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.contactName}>{pet.contact.name}</Text>
                <Text style={styles.contactPhone}>{pet.contact.phone}</Text>
            </View>
            <View style={styles.buttonGrid}>
              <TouchableOpacity style={[styles.button, {backgroundColor: '#2C3E50'}]} onPress={() => handleContactAction('call')}>
                <Phone size={16} color="#FFFFFF" /><Text style={{color: '#FFF', fontWeight: 'bold'}}>Ligar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {backgroundColor: '#25D366'}]} onPress={() => handleContactAction('whatsapp')}>
                <MessageCircle size={16} color="#FFFFFF" /><Text style={{color: '#FFF', fontWeight: 'bold'}}>WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}