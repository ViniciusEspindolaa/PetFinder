// index.tsx
import { Eye, EyeOff, Heart, Lock, Mail } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { styles } from './Styles';

interface LoginPageProps {
  onLogin: (user: { name: string; email: string }) => void;
  onSwitchToRegister: () => void;
}

// Componentes SVG para os ícones sociais
const GoogleIcon = () => (
  <Svg height={18} width={18} viewBox="0 0 24 24">
    <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <Path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </Svg>
);

const AppleIcon = () => (
    <Svg height={20} width={20} fill="#FFFFFF" viewBox="0 0 24 24">
        <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </Svg>
);

export function LoginPage({ onLogin, onSwitchToRegister }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const user = { name: formData.email.split('@')[0], email: formData.email };
      Alert.alert('Sucesso!', 'Login realizado com sucesso! 🎉');
      onLogin(user);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const showInfoAlert = (message: string) => Alert.alert('Aviso', `${message} em breve...`);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <View style={styles.logoRow}>
              <View style={styles.logoWrapper}><Heart size={48} color="#FFFFFF" fill="#FFFFFF" /></View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>PetFinder</Text>
                <Text style={styles.subtitle}>Encontre seu amigo</Text>
              </View>
            </View>
            <Text style={styles.welcomeText}>Bem-vindo! Acesse sua conta para continuar ajudando pets.</Text>
          </View>

          {/* Formulário */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Login</Text>
              <Text style={styles.cardDescription}>Digite suas credenciais para continuar</Text>
            </View>

            <View>
              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                  <Mail style={styles.inputIcon} size={16} color="rgba(52, 73, 94, 0.6)" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="seu@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                  />
                </View>
              </View>
              {/* Senha */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Senha</Text>
                <View style={styles.inputContainer}>
                  <Lock style={styles.inputIcon} size={16} color="rgba(52, 73, 94, 0.6)" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Digite sua senha"
                    secureTextEntry={!showPassword}
                    value={formData.password}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                  />
                  <TouchableOpacity style={styles.passwordToggle} onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} color="rgba(52, 73, 94, 0.6)" /> : <Eye size={18} color="rgba(52, 73, 94, 0.6)" />}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.forgotPasswordContainer}>
                  <TouchableOpacity onPress={() => showInfoAlert('Link de recuperação')}>
                      <Text style={styles.linkButtonText}>Esqueci minha senha</Text>
                  </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleSubmit} disabled={isLoading}>
                {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Entrar</Text>}
              </TouchableOpacity>
            </View>

            {/* Separador */}
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>ou</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Login Social */}
            <View style={{gap: 12}}>
              <TouchableOpacity style={[styles.button, styles.socialButton]} onPress={() => showInfoAlert('Login com Google')}>
                <GoogleIcon />
                <Text style={styles.socialButtonText}>Continuar com Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.appleButton]} onPress={() => showInfoAlert('Login com Apple')}>
                <AppleIcon />
                <Text style={styles.appleButtonText}>Continuar com Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Link para Registro */}
            <View style={[styles.footer, { marginTop: 24 }]}>
              <Text style={styles.footerText}>
                Não tem uma conta?{' '}
                <Text style={styles.footerLink} onPress={onSwitchToRegister}>Criar conta gratuita</Text>
              </Text>
            </View>
          </View>

          {/* Rodapé */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, {fontSize: 12, textAlign: 'center'}]}>
              Ao fazer login, você concorda com nossos{' '}
              <Text style={styles.footerLink}>Termos de Uso</Text> e{' '}
              <Text style={styles.footerLink}>Política de Privacidade</Text>.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}