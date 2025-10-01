// index.tsx
import { Bell, Calendar, Edit, Heart, LogOut, Mail, MapPin, Phone, Search, Settings, Shield, Trophy, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
// Tipos e componentes precisam ser importados de seus locais corretos
import { User as UserType } from '../AuthManager';
import { EditProfileModal } from '../EditProfileDialog';
import { MyPetDetailDialog } from '../MyPetDetailDialog';
import { Pet } from '../PetCard';
import { styles } from './styles';

interface ProfilePageProps {
  pets: Pet[];
  user?: UserType;
  onLogout?: () => void;
  onUpdateUser?: (user: UserType) => void;
}

const mockUser = { name: 'Maria Silva', phone: '(11) 99999-1111', email: 'maria.silva@email.com', address: 'São Paulo, SP' };

// Componente para a linha de configuração com Switch
const SettingSwitchRow = ({ icon: Icon, title, description, initialValue }: any) => {
    const [isEnabled, setIsEnabled] = useState(initialValue);
    return (
        <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
                <Text style={styles.settingLabel}><Icon size={16} color={styles.settingLabel.color} /> {title}</Text>
                <Text style={styles.settingDescription}>{description}</Text>
            </View>
            <Switch value={isEnabled} onValueChange={setIsEnabled} trackColor={{ false: "#767577", true: "#18BC9C" }} thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"} />
        </View>
    );
};


export function ProfilePage({ pets, user, onLogout, onUpdateUser }: ProfilePageProps) {
  const currentUser = user || mockUser;
  const userInitials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();

  const userReports = pets.filter(p => p.contact.name === currentUser.name || p.contact.phone === currentUser.phone);
  const lostReports = userReports.filter(p => p.status === "lost");
  const foundReports = userReports.filter(p => p.status === "found");

  const stats = [
    { icon: Search, label: "Reportes de Perdidos", value: lostReports.length, color: "#E74C3C" },
    { icon: Heart, label: "Animais Encontrados", value: foundReports.length, color: "#F39C12" },
    { icon: Trophy, label: "Reuniões Bem-sucedidas", value: "2", color: "#2C3E50" },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Profile Header */}
        <View style={[styles.card, styles.cardContent]}>
          <View style={styles.profileHeaderContainer}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{userInitials}</Text></View>
            <View style={styles.profileInfo}>
              <View style={styles.profileNameRow}>
                <Text style={styles.profileName}>{currentUser.name}</Text>
                {user && onUpdateUser && (
                  <EditProfileModal 
                    user={user} 
                    onUpdateUser={onUpdateUser}
                    trigger={<View style={styles.editButton}><Edit size={16} /><Text style={styles.editButtonText}>Editar</Text></View>}
                  />
                )}
              </View>
              <View style={styles.contactInfoContainer}>
                <View style={styles.infoRow}><Phone size={14} color={styles.infoText.color} /><Text style={styles.infoText}>{currentUser.phone || "Não informado"}</Text></View>
                <View style={styles.infoRow}><Mail size={14} color={styles.infoText.color} /><Text style={styles.infoText}>{currentUser.email}</Text></View>
                <View style={styles.infoRow}><MapPin size={14} color={styles.infoText.color} /><Text style={styles.infoText}>{currentUser.address || "Não informado"}</Text></View>
                <View style={styles.infoRow}><Calendar size={14} color={styles.infoText.color} /><Text style={styles.infoText}>Membro desde Janeiro 2025</Text></View>
              </View>
            </View>
          </View>
        </View>
        
        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <View key={index} style={[styles.card, styles.statCard]}>
                <Icon size={24} color={stat.color} style={{ marginBottom: 8 }} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>

        {/* My Reports */}
        <View style={styles.card}>
          <View style={styles.cardHeader}><View style={styles.cardTitleContainer}><Search size={20} color={styles.cardTitle.color} /><Text style={styles.cardTitle}>Meus Reportes</Text></View></View>
          <View style={styles.cardContent}>
            {userReports.length === 0 ? (
              <View style={styles.emptyState}><Search size={40} color={styles.infoText.color} /><Text style={styles.infoText}>Você ainda não fez nenhum reporte.</Text></View>
            ) : (
              userReports.map(pet => (
                <View key={pet.id} style={styles.reportItem}>
                  <View style={styles.reportIconContainer}>{pet.status === 'lost' ? <Search size={24} color="#E74C3C" /> : <Heart size={24} color="#F39C12" />}</View>
                  <View style={styles.reportInfo}><Text style={styles.reportName}>{pet.name}</Text><Text style={styles.reportLocation}>{pet.location}</Text></View>
                  <MyPetDetailDialog pet={pet}><Text style={{ color: '#18BC9C' }}>Ver</Text></MyPetDetailDialog>
                </View>
              ))
            )}
          </View>
        </View>
        
        {/* Settings */}
        <View style={styles.card}>
            <View style={styles.cardHeader}><View style={styles.cardTitleContainer}><Settings size={20} color={styles.cardTitle.color} /><Text style={styles.cardTitle}>Configurações</Text></View></View>
            <View style={styles.cardContent}>
                <SettingSwitchRow icon={Bell} title="Notificações Push" description="Receba alertas sobre animais na sua região" initialValue={true} />
                <View style={styles.separator} />
                <SettingSwitchRow icon={MapPin} title="Localização" description="Permitir acesso para busca próxima" initialValue={true} />
                <View style={styles.separator} />
                <SettingSwitchRow icon={Shield} title="Privacidade" description="Mostrar apenas iniciais do nome" initialValue={false} />
            </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.card} onPress={onLogout}>
          <View style={styles.logoutButton}>
            <LogOut size={22} color={styles.logoutTitle.color} />
            <View style={styles.logoutTextContainer}>
              <Text style={styles.logoutTitle}>Sair da conta</Text>
              <Text style={styles.logoutSubtitle}>Desconectar do PetFinder</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}