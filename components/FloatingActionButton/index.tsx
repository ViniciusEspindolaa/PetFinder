// index.tsx
import { Heart, PawPrint, Plus, Search } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { User } from '../AuthManager'; // Ajuste o caminho se necessário
import { Pet } from '../PetCard'; // Ajuste o caminho se necessário
import { PetReportForm } from '../PetReportForm/PetReportForm'; // Ajuste o caminho se necessário
import { styles } from './styles';

interface FloatingActionButtonProps {
  onSubmit: (pet: Pet) => void;
  user: User;
}

export function FloatingActionButton({ onSubmit, user }: FloatingActionButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'lost' | 'found' | 'adoption' | null>(null);

  // Animações
  const rotation = useRef(new Animated.Value(0)).current;
  const menuOptionsAnim = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;

  useEffect(() => {
    const toValue = isMenuOpen ? 1 : 0;
    const animations = menuOptionsAnim.map(anim => Animated.spring(anim, { toValue, useNativeDriver: true }));

    Animated.parallel([
      Animated.spring(rotation, { toValue, useNativeDriver: true }),
      Animated.stagger(100, isMenuOpen ? animations : animations.reverse()),
    ]).start();
  }, [isMenuOpen, rotation, menuOptionsAnim]);
  
  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  const handleOptionSelect = (type: 'lost' | 'found' | 'adoption') => {
    setSelectedType(type);
    setIsMenuOpen(false);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (pet: Pet) => {
    onSubmit(pet);
    setIsFormOpen(false);
    setSelectedType(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedType(null);
  };

  const options = [
    { type: 'lost' as const, label: 'Animal Perdido', icon: Search, style: styles.optionButtonLost },
    { type: 'found' as const, label: 'Animal Encontrado', icon: PawPrint, style: styles.optionButtonFound },
    { type: 'adoption' as const, label: 'Para Adoção', icon: Heart, style: styles.optionButtonAdoption },
  ];

  const animatedRotation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <>
      {isMenuOpen && <Pressable style={styles.backdrop} onPress={handleMenuToggle} />}

      <View style={styles.container}>
        {/* Menu de Opções */}
        <View style={styles.menuContainer}>
          {options.map((option, index) => {
            const Icon = option.icon;
            const animStyle = {
              opacity: menuOptionsAnim[index],
              transform: [{
                translateY: menuOptionsAnim[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0], // Inicia 50px para baixo
                }),
              }],
            };
            return (
              <Animated.View key={option.type} style={[styles.menuOptionRow, animStyle]}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>{option.label}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.optionButton, option.style]}
                  onPress={() => handleOptionSelect(option.type)}
                >
                  <Icon color="#FFFFFF" size={22} />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Botão FAB Principal */}
        <TouchableOpacity
          style={[styles.fab, isMenuOpen ? styles.fabMuted : styles.fabPrimary]}
          onPress={handleMenuToggle}
          activeOpacity={0.8}
        >
          <Animated.View style={{ transform: [{ rotate: animatedRotation }] }}>
            <Plus color="#FFFFFF" size={28} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Modal do Formulário */}
      <Modal visible={isFormOpen} transparent={true} animationType="fade" onRequestClose={handleFormCancel}>
        <Pressable style={styles.modalBackdrop} onPress={handleFormCancel}>
            <Pressable style={styles.modalContainer} onPress={() => {}}>
                {selectedType && (
                    <>
                        <View style={styles.modalHeader}>
                            <View style={styles.modalTitleContainer}>
                                {selectedType === 'lost' && <Search size={22} color={styles.optionButtonLost.backgroundColor} />}
                                {selectedType === 'found' && <PawPrint size={22} color={styles.optionButtonFound.backgroundColor} />}
                                {selectedType === 'adoption' && <Heart size={22} color={styles.optionButtonAdoption.backgroundColor} />}
                                <Text style={styles.modalTitle}>{options.find(o => o.type === selectedType)?.label}</Text>
                            </View>
                            <Text style={styles.modalDescription}>
                                {selectedType === 'lost' && 'Preencha as informações do animal perdido para ajudar na busca.'}
                                {selectedType === 'found' && 'Forneça detalhes do animal encontrado para o reunir com sua família.'}
                                {selectedType === 'adoption' && 'Cadastre um animal disponível para uma adoção responsável.'}
                            </Text>
                        </View>
                        <PetReportForm
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormCancel}
                            user={user}
                            defaultStatus={selectedType}
                        />
                    </>
                )}
            </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}