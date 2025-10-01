import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';

// Importando TODOS os componentes que convertemos
import { AuthManager, User } from './components/AuthManager';
import { FloatingActionButton } from './components/FloatingActionButton';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { MapPage } from './components/MapPage';
import { Pet } from './components/PetCard';
import { PetList } from './components/PetList';
import { ProfilePage } from './components/ProfilePage';
import { SearchPage } from './components/SearchPage';

// --- Dados Mockados (permanecem os mesmos) ---
const mockPets: Pet[] = [
    // ... (Seu array de mockPets completo aqui)
    { id: "1", name: "Rex", type: "dog", breed: "Labrador", color: "Dourado", size: "large", status: "lost", location: "Parque Ibirapuera, São Paulo", lastSeen: "15/09/2025", description: "Cão muito dócil, usando coleira azul.", contact: { name: "Maria Silva", phone: "(11) 99999-1111" }, image: "https://images.unsplash.com/photo-1583334506575-bd01c6b92e57?w=400&h=300&fit=crop", reward: 500 },
    { id: "2", name: "Mia", type: "cat", breed: "Siamês", color: "Branco e marrom", size: "small", status: "found", location: "Vila Madalena, São Paulo", lastSeen: "16/09/2025", description: "Gata encontrada na rua, muito carinhosa.", contact: { name: "João Santos", phone: "(11) 99999-2222" }, image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop" },
    // ... adicione o resto dos seus pets
];


export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [pets, setPets] = useState<Pet[]>(mockPets);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Handlers de Lógica (adaptados para AsyncStorage) ---

  const handleLogin = async (userData: User) => {
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  const handleUpdateUser = async (userData: User) => {
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
    setActiveTab("home");
  };

  const handlePetReport = (newPet: Pet) => {
    const petWithUserContact = {
      ...newPet,
      contact: {
        name: user?.name || newPet.contact.name,
        phone: user?.phone || newPet.contact.phone,
      },
    };
    setPets((prev) => [petWithUserContact, ...prev]);
    if (newPet.status === "lost" || newPet.status === "found") {
      setActiveTab("search");
    } else if (newPet.status === "adoption") {
      setActiveTab("adoption");
    }
  };

  const handleViewPetOnMap = (petId: string) => {
    setSelectedPetId(petId);
    setActiveTab("map");
  };
  
  const handleTabChange = (tab: string) => {
    if (tab !== "map") {
      setSelectedPetId(null);
    }
    setActiveTab(tab);
  };

  // Efeito para carregar dados iniciais e verificar o login
  useEffect(() => {
    const bootstrapApp = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error("Failed to load user from storage", e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapApp();
  }, []);

  // --- Renderização ---

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <AuthManager onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage pets={pets} onTabChange={setActiveTab} onViewPetOnMap={handleViewPetOnMap} />;
      case "search":
        return <SearchPage pets={pets} onTabChange={setActiveTab} onViewPetOnMap={handleViewPetOnMap} />;
      case "adoption":
        return <PetList pets={pets} status="adoption" onTabChange={setActiveTab} onViewPetOnMap={handleViewPetOnMap} />;
      case "map":
        return <MapPage pets={pets} initialSelectedPetId={selectedPetId} />;
      case "profile":
        return <ProfilePage pets={pets} user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />;
      default:
        return <HomePage pets={pets} onTabChange={setActiveTab} onViewPetOnMap={handleViewPetOnMap} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        pets={pets.filter(p => p.status === 'lost' || p.status === 'found') as any}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderContent()}
      </ScrollView>
      <FloatingActionButton
        onSubmit={handlePetReport}
        user={user}
      />
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Cor de fundo geral do app
  },
  scrollContent: {
    paddingBottom: 80, // Espaço extra no final para não ser coberto pelo FAB
  },
});