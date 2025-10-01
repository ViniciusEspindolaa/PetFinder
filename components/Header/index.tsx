// index.tsx
import { Bell, Clock, Heart, Home, Map, MapPin, PawPrint, Search, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
// Tipos Pet e User precisam ser importados do seu local correto
// import { Pet } from './PetCard'; 
// import { User } from './AuthManager';
import { styles } from './styles';

// Assumindo que o tipo Pet existe em algum lugar
type Pet = { id: string; status: 'lost' | 'found'; type: 'dog' | 'cat'; breed: string; location: string; };

type HeaderProps = {
  activeTab: string;
  onTabChange: (tabName: string) => void;
  pets: Pet[];
};

type Notification = {
  id: string;
  type: 'lost' | 'found';
  title: string;
  message: string;
  location: string;
  time: string;
  distance: string;
  read: boolean;
};

const generateNotifications = (pets: Pet[]): Notification[] => {
  const notifications: Notification[] = [];
  const lostPets = pets.filter((pet: Pet) => pet.status === "lost");
  lostPets.slice(0, 2).forEach((pet, index) => {
    const distances = ["800m", "1.2km"]; const times = ["5 min", "15 min"];
    notifications.push({ id: `lost-${pet.id}`, type: "lost", title: "Novo animal perdido próximo", message: `${pet.type === "dog" ? "Cão" : "Gato"} ${pet.breed} perdido a ${distances[index]}`, location: pet.location.split(",")[0], time: times[index], distance: distances[index], read: index > 0 });
  });
  const foundPets = pets.filter(pet => pet.status === "found");
  foundPets.slice(0, 1).forEach((pet) => {
    notifications.push({ id: `found-${pet.id}`, type: "found", title: "Animal encontrado na região", message: `${pet.type === "dog" ? "Cão" : "Gato"} ${pet.breed} encontrado a 1.2km`, location: pet.location.split(",")[0], time: '30 min', distance: '1.2km', read: false });
  });
  return notifications.sort((a, b) => (!a.read ? 1 : 0) - (!b.read ? 1 : 0)); // Unread first
};

const TABS = [
    { name: 'home', label: 'Início', icon: Home },
    { name: 'search', label: 'Buscar', icon: Search },
    { name: 'adoption', label: 'Adoção', icon: PawPrint },
    { name: 'map', label: 'Mapa', icon: Map },
    { name: 'profile', label: 'Perfil', icon: User },
];

export function Header({ activeTab, onTabChange, pets }: HeaderProps) {
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const notifications = generateNotifications(pets);
  const unreadCount = notifications.filter(n => !n.read).length;

  const renderNotification = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.notificationItem, !item.read && styles.notificationItemUnread]}>
        <View style={[ styles.notificationIconContainer, { backgroundColor: item.type === 'lost' ? 'rgba(231, 76, 60, 0.1)' : 'rgba(243, 156, 18, 0.1)'} ]}>
            {item.type === 'lost' ? <Search size={16} color="#E74C3C" /> : <Heart size={16} color="#F39C12" />}
        </View>
        <View style={styles.notificationContent}>
            <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                {!item.read && <View style={styles.unreadIndicator} />}
            </View>
            <Text style={styles.notificationMessage}>{item.message}</Text>
            <View style={styles.notificationMeta}>
                <View style={styles.metaItem}><MapPin size={12} color={styles.metaText.color} /><Text style={styles.metaText}>{item.location}</Text></View>
                <View style={styles.metaItem}><Text>📍</Text><Text style={styles.metaText}>{item.distance}</Text></View>
                <View style={styles.metaItem}><Clock size={12} color={styles.metaText.color} /><Text style={styles.metaText}>{item.time}</Text></View>
            </View>
        </View>
    </TouchableOpacity>
  );

  return (
    <>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.logoContainer}>
          <Heart size={24} color={styles.logoText.color} />
          <Text style={styles.logoText}>PetFinder</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton} onPress={() => setPopoverVisible(true)}>
          <Bell size={22} color={styles.logoText.color} />
          {unreadCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Notifications Popover */}
      <Modal visible={isPopoverVisible} transparent={true} animationType="fade" onRequestClose={() => setPopoverVisible(false)}>
        <Pressable style={styles.popoverBackdrop} onPress={() => setPopoverVisible(false)}>
            <Pressable style={styles.popoverContainer} onPress={(e) => e.stopPropagation()}>
                <View style={styles.popoverHeader}>
                    <Text style={styles.popoverHeaderText}>Notificações</Text>
                    {unreadCount > 0 && <Text style={{color: '#7f8c8d'}}>{unreadCount} novas</Text>}
                </View>
                <FlatList
                    data={notifications}
                    renderItem={renderNotification}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyNotifications}>
                            <Bell size={32} color={styles.emptyNotificationsText.color} />
                            <Text style={styles.emptyNotificationsText}>Nenhuma notificação</Text>
                        </View>
                    )}
                />
            </Pressable>
        </Pressable>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {TABS.map((tab) => {
            const isActive = activeTab === tab.name;
            const Icon = tab.icon;
            const color = isActive ? styles.tabLabelActive.color : styles.tabLabel.color;
            return (
                <TouchableOpacity
                    key={tab.name}
                    style={[styles.tabButton, isActive && styles.tabButtonActive]}
                    onPress={() => onTabChange(tab.name)}
                >
                    <Icon size={24} color={color} />
                    <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            );
        })}
      </View>
    </>
  );
}