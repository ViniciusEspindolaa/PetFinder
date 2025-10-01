// index.tsx
import { Camera, Eye, EyeOff, Mail, MapPin, Phone, User as UserIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import {  ActivityIndicator,  Alert,  Modal,  Pressable,  ScrollView,  Text,  TextInput,  TouchableOpacity,  View } from 'react-native';
import { User } from '../AuthManager'; // Ajuste o caminho se necessário
import { styles } from './styles';

interface EditProfileModalProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  trigger: React.ReactNode; // O componente que vai abrir o modal
}

export function EditProfileModal({ user, onUpdateUser, trigger }: EditProfileModalProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    address: user.address || '',
    bio: user.bio || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const showToast = (title: string, message: string) => Alert.alert(title, message);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Validações
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        showToast('Erro', 'As senhas não coincidem');
        return;
      }
      if (formData.newPassword && formData.newPassword.length < 6) {
        showToast('Erro', 'A nova senha deve ter pelo menos 6 caracteres');
        return;
      }
      if (formData.newPassword && !formData.currentPassword) {
        showToast('Erro', 'Digite sua senha atual para alterar a senha');
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedUser: User = {
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        bio: formData.bio,
      };
      
      onUpdateUser(updatedUser);
      showToast('Sucesso!', 'Perfil atualizado com sucesso! 🎉');
      setModalVisible(false);
      
      // Limpar campos de senha
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      
    } catch (error) {
      showToast('Erro', 'Não foi possível atualizar o perfil. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reseta o formulário para o estado inicial do usuário
    setFormData({
      name: user.name, email: user.email, phone: user.phone || '', address: user.address || '',
      bio: user.bio || '', currentPassword: '', newPassword: '', confirmPassword: '',
    });
    setModalVisible(false);
  };

  const renderInputWithIcon = (
    Icon: React.ElementType, 
    value: string, 
    onChangeText: (text: string) => void, 
    placeholder: string,
    keyboardType: 'default' | 'email-address' | 'phone-pad' = 'default',
  ) => (
    <View style={styles.inputContainer}>
      <Icon style={styles.inputIcon} color="#34495E99" size={16} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );

  const renderPasswordInput = (
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    isVisible: boolean,
    toggleVisibility: () => void,
  ) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!isVisible}
      />
      <TouchableOpacity style={styles.passwordToggle} onPress={toggleVisibility}>
        {isVisible ? <EyeOff color="#34495E" size={16} /> : <Eye color="#34495E99" size={16} />}
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {trigger}
      </TouchableOpacity>
      
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <Pressable style={styles.modalBackdrop} onPress={handleCancel}>
          <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.titleContainer}>
                  <UserIcon color={styles.title.color} size={20} />
                  <Text style={styles.title}>Editar Perfil</Text>
                </View>
                <Text style={styles.description}>
                  Atualize suas informações e configurações
                </Text>
              </View>

              {/* Foto do Perfil */}
              <View style={styles.profilePicSection}>
                <View>
                  <View style={styles.avatarContainer}>
                    <UserIcon color={styles.submitButtonText.color} size={40} />
                  </View>
                  <TouchableOpacity 
                    style={styles.cameraButton} 
                    onPress={() => showToast('Aviso', 'Upload de foto em breve!')}
                  >
                    <Camera color={styles.submitButtonText.color} size={16} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.profilePicText}>
                  Toque na câmera para alterar sua foto
                </Text>
              </View>

              {/* Informações Básicas */}
              <View>
                <Text style={styles.sectionTitle}>Informações Básicas</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nome completo</Text>
                  {renderInputWithIcon(UserIcon, formData.name, (text) => setFormData(prev => ({...prev, name: text})), "Seu nome completo")}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  {renderInputWithIcon(Mail, formData.email, (text) => setFormData(prev => ({...prev, email: text})), "seu@email.com", "email-address")}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Telefone</Text>
                  {renderInputWithIcon(Phone, formData.phone, (text) => setFormData(prev => ({...prev, phone: text})), "(11) 99999-9999", "phone-pad")}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Endereço</Text>
                  {renderInputWithIcon(MapPin, formData.address, (text) => setFormData(prev => ({...prev, address: text})), "Sua cidade, bairro")}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Sobre você</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={formData.bio}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, bio: text }))}
                    placeholder="Conte um pouco sobre você..."
                    multiline
                  />
                </View>
              </View>

              {/* Alterar Senha */}
              <View>
                <Text style={styles.sectionTitle}>Alterar Senha (opcional)</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Senha atual</Text>
                  {renderPasswordInput(formData.currentPassword, (text) => setFormData(prev => ({...prev, currentPassword: text})), "Sua senha atual", showCurrentPassword, () => setShowCurrentPassword(!showCurrentPassword))}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nova senha</Text>
                  {renderPasswordInput(formData.newPassword, (text) => setFormData(prev => ({...prev, newPassword: text})), "Mínimo de 6 caracteres", showNewPassword, () => setShowNewPassword(!showNewPassword))}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Confirmar nova senha</Text>
                  {renderPasswordInput(formData.confirmPassword, (text) => setFormData(prev => ({...prev, confirmPassword: text})), "Confirme a nova senha", showConfirmPassword, () => setShowConfirmPassword(!showConfirmPassword))}
                </View>
              </View>

              {/* Botões */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel} disabled={isLoading}>
                  <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit} disabled={isLoading}>
                  {isLoading ? 
                    <ActivityIndicator color={styles.submitButtonText.color} /> :
                    <Text style={[styles.buttonText, styles.submitButtonText]}>Salvar</Text>
                  }
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}