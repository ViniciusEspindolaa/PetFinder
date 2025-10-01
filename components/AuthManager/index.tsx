// index.tsx
import { useState } from "react";
import { View } from "react-native";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { styles } from "./styles"; // Importando os estilos

// A interface User permanece a mesma
export interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
}

interface AuthManagerProps {
  onLogin: (user: User) => void;
}

export function AuthManager({ onLogin }: AuthManagerProps) {
  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  const handleLogin = (user: User) => {
    onLogin(user);
  };

  const handleRegister = (user: User) => {
    onLogin(user);
  };

  const switchToRegister = () => {
    setAuthView('register');
  };

  const switchToLogin = () => {
    setAuthView('login');
  };

  return (
    <View style={styles.container}>
      {authView === 'login' ? (
        <LoginPage 
          onLogin={handleLogin}
          onSwitchToRegister={switchToRegister}
        />
      ) : (
        <RegisterPage 
          onRegister={handleRegister}
          onSwitchToLogin={switchToLogin}
        />
      )}
    </View>
  );
}