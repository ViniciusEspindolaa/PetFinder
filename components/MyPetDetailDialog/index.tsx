// index.tsx
import { Calendar, Check, Edit, Gift, Heart, MapPin, Phone, Search, Share2, Trash2, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
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

interface MyPetDetailDialogProps {
  pet: Pet;
  children: React.ReactNode;
}

export function MyPetDetailDialog({ pet, children }: MyPetDetailDialogProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  const showInfoAlert = (message: string) => Alert.alert('Aviso', message);

  const handleShare = async () => {
    try {
      await Share.share({
        title: `${pet.status === 'lost' ? 'Animal Perdido' : 'Animal Encontrado'}: ${pet.name}`,
        message: `Ajude a encontrar ${pet.name}! Veja mais detalhes no app PetFinder. ${pet.description}`,
        // url: 'https://seusite.com/pet/123' // Em um app real, você colocaria o deep link aqui
      });
    } catch (error) {
      showInfoAlert('Compartilhamento cancelado.');
    }
  };

  const StatusIcon = pet.status === 'lost' ? Search : Heart;
  const statusText = pet.status === 'lost' ? 'Perdido' : 'Encontrado';
  const resolvedText = pet.status === 'lost' ? 'Marcar como Encontrado' : 'Marcar como Devolvido';

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {children}
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
            <ScrollView>
              {/* Imagem com Badges */}
              <ImageBackground source={{ uri: pet.image }} style={styles.imageContainer}>
                <View style={[styles.badge, styles.statusBadge, { backgroundColor: pet.status === 'lost' ? '#E74C3C' : '#F39C12' }]}>
                  <StatusIcon size={12} color="#FFFFFF" />
                  <Text style={styles.badgeText}>{statusText}</Text>
                </View>
                {pet.reward && (
                  <View style={[styles.badge, styles.rewardBadge, { backgroundColor: '#F39C12' }]}>
                    <Gift size={12} color="#FFFFFF" /><Text style={styles.badgeText}>R$ {pet.reward}</Text>
                  </View>
                )}
                <View style={[styles.badge, styles.myPostBadge]}><User size={12} color="#FFFFFF" /><Text style={styles.badgeText}>Meu Anúncio</Text></View>
              </ImageBackground>

              {/* Conteúdo Principal */}
              <View style={styles.contentContainer}>
                <View style={styles.header}>
                  <Text style={styles.petName}>{pet.name}</Text>
                  <Text style={styles.petBreed}>({pet.breed})</Text>
                </View>

                {/* Info Card */}
                <View style={styles.infoCard}>
                  <View style={styles.infoGrid}>
                    <View style={styles.infoItem}><Text style={styles.infoLabel}>Tipo</Text><Text style={styles.infoValue}>{pet.type === 'dog' ? 'Cão' : 'Gato'}</Text></View>
                    <View style={styles.infoItem}><Text style={styles.infoLabel}>Porte</Text><Text style={styles.infoValue}>{pet.size}</Text></View>
                    <View style={styles.infoItem}><Text style={styles.infoLabel}>Cor</Text><Text style={styles.infoValue}>{pet.color}</Text></View>
                    <View style={styles.infoItem}><Text style={styles.infoLabel}>Raça</Text><Text style={styles.infoValue}>{pet.breed}</Text></View>
                  </View>
                </View>
                
                {/* Local e Data */}
                <View style={{ gap: 12 }}>
                  <View style={styles.infoRow}>
                    <MapPin size={20} color={styles.primaryButton.backgroundColor} />
                    <View style={styles.infoRowTextContainer}><Text style={styles.infoLabel}>Local</Text><Text style={styles.infoValue}>{pet.location}</Text></View>
                  </View>
                  <View style={styles.infoRow}>
                    <Calendar size={20} color={styles.primaryButton.backgroundColor} />
                    <View style={styles.infoRowTextContainer}><Text style={styles.infoLabel}>{pet.status === 'lost' ? 'Visto pela última vez' : 'Data que foi encontrado'}</Text><Text style={styles.infoValue}>{pet.lastSeen}</Text></View>
                  </View>
                </View>

                <View style={styles.separator} />
                
                {/* Descrição e Contato */}
                <View style={{ gap: 16 }}>
                    <View><Text style={styles.infoLabel}>Descrição</Text><Text style={styles.infoValue}>{pet.description}</Text></View>
                    <View style={styles.infoRow}>
                        <User size={20} color={styles.primaryButton.backgroundColor} /><View><Text style={styles.infoLabel}>Responsável</Text><Text style={styles.infoValue}>{pet.contact.name}</Text></View>
                    </View>
                    <View style={styles.infoRow}>
                        <Phone size={20} color={styles.primaryButton.backgroundColor} /><View><Text style={styles.infoLabel}>Telefone</Text><Text style={styles.infoValue}>{pet.contact.phone}</Text></View>
                    </View>
                </View>

                {/* Botões de Ação */}
                <View style={styles.buttonGroup}>
                  <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => showInfoAlert(`${pet.name} marcado como resolvido!`)}>
                    <Check size={16} color="#FFFFFF" /><Text style={styles.primaryButtonText}>{resolvedText}</Text>
                  </TouchableOpacity>
                  <View style={styles.buttonGrid}>
                    <TouchableOpacity style={[styles.button, styles.gridButton, styles.editButton]} onPress={() => showInfoAlert('Edição em breve...')}>
                        <Edit size={16} color={styles.editButtonText.color} /><Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.gridButton, styles.shareButton]} onPress={handleShare}>
                        <Share2 size={16} color={styles.shareButtonText.color} /><Text style={styles.shareButtonText}>Compartilhar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.gridButton, styles.deleteButton]} onPress={() => showInfoAlert('Exclusão em breve...')}>
                        <Trash2 size={16} color={styles.deleteButtonText.color} /><Text style={styles.deleteButtonText}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
                {/* Ajuda */}
                <View style={styles.helpBox}><Text style={styles.helpText}>{pet.status === 'lost' ? 'Este é seu anúncio de animal perdido. Gerencie as informações ou marque como resolvido.' : 'Este é seu anúncio de animal encontrado. Gerencie as informações ou marque como resolvido.'}</Text></View>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}