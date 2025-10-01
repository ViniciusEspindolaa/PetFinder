// index.tsx
import { Camera, MapPin, Phone, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { User as UserType } from '../AuthManager';
import { MapLocationPicker } from '../MapLocationPicker';
import { PhotoUpload } from '../PhotoUpload/PhotoUpload';
import { styles } from './styles';

// Tipos
type PetStatus = 'lost' | 'found' | 'adoption';
type LocationData = { lat: number; lng: number; address: string };

// Componente Auxiliar para o Picker/Select
interface CustomPickerProps {
  label: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}

const CustomPicker = ({ label, options, selectedValue, onValueChange, placeholder }: CustomPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedLabel = options.find(opt => opt.value === selectedValue)?.label;

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.pickerButton} onPress={() => setModalVisible(true)}>
        <Text style={[styles.pickerButtonText, !selectedValue && styles.pickerPlaceholder]}>
          {selectedLabel || placeholder}
        </Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={() => setModalVisible(false)} activeOpacity={1}>
          <View style={styles.pickerModalContainer}>
            <ScrollView>
              {options.map(opt => (
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

// Componente Principal
interface PetReportFormProps {
  onSubmit: (pet: any) => void;
  onCancel?: () => void;
  user?: UserType;
  defaultStatus?: PetStatus;
}

export function PetReportForm({ onSubmit, onCancel, user, defaultStatus = 'lost' }: PetReportFormProps) {
  const [formData, setFormData] = useState({
    name: '', type: '', breed: '', color: '', size: '', status: defaultStatus,
    location: '', lastSeen: '', description: '', contactName: user?.name || '',
    contactPhone: user?.phone || '', reward: '', photo: '', coordinates: null as any,
  });

  const handleSubmit = () => {
    // Validação
    if (!formData.name || !formData.type || !formData.location || !formData.contactName || !formData.contactPhone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios (*)');
      return;
    }
    // Lógica de submit (permanece a mesma, só trocamos e.preventDefault por validação)
    const newPet = { id: Date.now().toString(), ...formData };
    onSubmit(newPet);
    Alert.alert('Sucesso!', 'Animal reportado com sucesso!');
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const FormContent = () => (
    <View style={styles.cardContent}>
      {/* Informações Básicas */}
      <View style={styles.section}>
        <View style={styles.inputGroup}><Text style={styles.label}>Nome do Animal *</Text><TextInput style={styles.input} placeholder="Ex: Rex, Mia" value={formData.name} onChangeText={(v) => updateFormData('name', v)} /></View>
        <View style={styles.grid}>
          <View style={styles.gridItem}><CustomPicker label="Tipo *" options={[{ label: 'Cão', value: 'dog' }, { label: 'Gato', value: 'cat' }, { label: 'Outro', value: 'other' }]} selectedValue={formData.type} onValueChange={(v) => updateFormData('type', v)} placeholder="Escolha" /></View>
          <View style={styles.gridItem}><CustomPicker label="Porte" options={[{ label: 'Pequeno', value: 'small' }, { label: 'Médio', value: 'medium' }, { label: 'Grande', value: 'large' }]} selectedValue={formData.size} onValueChange={(v) => updateFormData('size', v)} placeholder="Escolha" /></View>
        </View>
        <View style={styles.grid}>
          <View style={styles.gridItem}><View style={styles.inputGroup}><Text style={styles.label}>Raça</Text><TextInput style={styles.input} placeholder="Ex: Labrador, SRD" value={formData.breed} onChangeText={(v) => updateFormData('breed', v)} /></View></View>
          <View style={styles.gridItem}><View style={styles.inputGroup}><Text style={styles.label}>Cor</Text><TextInput style={styles.input} placeholder="Ex: Marrom" value={formData.color} onChangeText={(v) => updateFormData('color', v)} /></View></View>
        </View>
      </View>

      {/* Upload de Foto */}
      <PhotoUpload onPhotoSelect={(url) => updateFormData('photo', url)} />

      {/* Localização e Data */}
      <View style={styles.section}>
        <View style={styles.inputGroup}>
            <Text style={styles.label}><MapPin size={16} />Localização *</Text>
            <TextInput style={styles.input} placeholder="Ex: Parque Ibirapuera, São Paulo" value={formData.location} onChangeText={(v) => updateFormData('location', v)} />
            <MapLocationPicker onLocationSelect={(loc: LocationData) => { updateFormData('location', loc.address); updateFormData('coordinates', { lat: loc.lat, lng: loc.lng }); }}>
                <Text style={styles.mapPickerLink}>Ou selecione no mapa</Text>
            </MapLocationPicker>
        </View>
        <View style={styles.inputGroup}><Text style={styles.label}>Data do ocorrido</Text><TextInput style={styles.input} placeholder="Ex: 25/09/2025" value={formData.lastSeen} onChangeText={(v) => updateFormData('lastSeen', v)} /></View>
      </View>
      
      {/* Descrição e Contato */}
      <View style={styles.section}>
        <View style={styles.inputGroup}><Text style={styles.label}>Descrição</Text><TextInput style={[styles.input, styles.textArea]} multiline placeholder="Descreva características do animal, comportamento, etc." value={formData.description} onChangeText={(v) => updateFormData('description', v)} /></View>
        <View style={styles.inputGroup}><Text style={styles.label}><User size={16} />Seu Nome *</Text><TextInput style={styles.input} value={formData.contactName} onChangeText={(v) => updateFormData('contactName', v)} /></View>
        <View style={styles.inputGroup}><Text style={styles.label}><Phone size={16} />Seu Telefone/WhatsApp *</Text><TextInput style={styles.input} keyboardType="phone-pad" value={formData.contactPhone} onChangeText={(v) => updateFormData('contactPhone', v)} /></View>
      </View>
      
      {/* Botões Finais */}
      <View style={onCancel ? styles.buttonRow : {}}>
        {onCancel && <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={onCancel}><Text style={styles.outlineButtonText}>Cancelar</Text></TouchableOpacity>}
        <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleSubmit}><Text style={styles.primaryButtonText}>Reportar Animal</Text></TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <ScrollView style={styles.container}>
            {onCancel ? ( // Modo Dialog/Modal
                <FormContent />
            ) : ( // Modo Página Inteira
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardTitleContainer}><Camera size={22} color={styles.cardTitle.color} /><Text style={styles.cardTitle}>Reportar Animal</Text></View>
                    </View>
                    <FormContent />
                </View>
            )}
        </ScrollView>
    </KeyboardAvoidingView>
  );
}