// index.tsx
import { Check, Eye, EyeOff, Heart, Lock, Mail, Phone, User } from 'lucide-react-native';
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
import { styles } from './styles';

interface RegisterPageProps {
  onRegister: (user: { name: string; email: string }) => void;
  onSwitchToLogin: () => void;
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
    <Svg height={18} width={18} viewBox="0 0 24 24">
        <Path
            fill="#000000"
            d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07-.03 0-.06 0-.09-.01-.09-1.03.93-2.07 2.07-2.07.03 0 .06 0 .09.01zm3.56 4.42c-1.13-1.34-2.7-1.42-3.34-1.42-.79 0-1.54.29-2.09.29-.55 0-1.43-.28-2.36-.28-1.21 0-2.33.7-2.96 1.79-1.27 2.2-.33 5.45.91 7.23.6.89 1.32 1.89 2.27 1.85.9-.04 1.24-.6 2.33-.6 1.09 0 1.39.6 2.33.58.96-.02 1.57-.9 2.16-1.79.68-.99.96-1.95.97-2 .02-.01-1.87-.72-1.89-2.85-.02-1.79 1.46-2.64 1.53-2.68zm-3.03-2.7c.39-.47.65-1.13.58-1.79-.56.02-1.24.37-1.64.84-.36.42-.68 1.09-.56 1.73.6.05 1.22-.31 1.62-.78z"
        />
    </Svg>
);

// Componente Checkbox customizado
const CustomCheckbox = ({ value, onValueChange, children }: { value: boolean, onValueChange: (newValue: boolean) => void, children: React.ReactNode }) => (
    <View style={styles.termsContainer}>
        <TouchableOpacity onPress={() => onValueChange(!value)} style={[styles.checkbox, value && styles.checkboxChecked]}>
            {value && <Check size={14} color="#FFFFFF" />}
        </TouchableOpacity>
        <View style={styles.termsTextContainer}>{children}</View>
    </View>
);

export function RegisterPage({ onRegister, onSwitchToLogin }: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });

  const handleSubmit = async () => {
    // Validações
    if (!formData.name || !formData.email || !formData.password) {
        Alert.alert('Erro', 'Por favor, preencha os campos de nome, email e senha.'); return;
    }
    if (formData.password !== formData.confirmPassword) {
        Alert.alert('Erro', 'As senhas não coincidem.'); return;
    }
    if (formData.password.length < 6) {
        Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.'); return;
    }
    if (!acceptTerms) {
        Alert.alert('Erro', 'Você deve aceitar os termos de uso para continuar.'); return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const user = { name: formData.name, email: formData.email };
      Alert.alert('Sucesso!', 'Conta criada com sucesso! Bem-vindo ao PetFinder! 🎉');
      onRegister(user);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar sua conta. Tente novamente.');
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
          <View style={styles.headerContainer}>{/* ... JSX do Header aqui, igual ao da LoginPage ... */}</View>

          {/* Formulário */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Criar Conta</Text>
              <Text style={styles.cardDescription}>Preencha seus dados para começar</Text>
            </View>

            <View>
              {/* Inputs */}
              <View style={styles.inputGroup}><Text style={styles.label}>Nome completo</Text><View style={styles.inputContainer}><User style={styles.inputIcon} size={16} color="rgba(52, 73, 94, 0.6)" /><TextInput style={styles.textInput} placeholder="Seu nome completo" value={formData.name} onChangeText={t => setFormData(p => ({...p, name: t}))} /></View></View>
              <View style={styles.inputGroup}><Text style={styles.label}>Email</Text><View style={styles.inputContainer}><Mail style={styles.inputIcon} size={16} color="rgba(52, 73, 94, 0.6)" /><TextInput style={styles.textInput} placeholder="seu@email.com" keyboardType="email-address" value={formData.email} onChangeText={t => setFormData(p => ({...p, email: t}))} /></View></View>
              <View style={styles.inputGroup}><Text style={styles.label}>Telefone (opcional)</Text><View style={styles.inputContainer}><Phone style={styles.inputIcon} size={16} color="rgba(52, 73, 94, 0.6)" /><TextInput style={styles.textInput} placeholder="(11) 99999-9999" keyboardType="phone-pad" value={formData.phone} onChangeText={t => setFormData(p => ({...p, phone: t}))} /></View></View>
              <View style={styles.inputGroup}><Text style={styles.label}>Senha</Text><View style={styles.inputContainer}><Lock style={styles.inputIcon} size={16} color="rgba(52, 73, 94, 0.6)" /><TextInput style={styles.textInput} placeholder="Mín. 6 caracteres" secureTextEntry={!showPassword} value={formData.password} onChangeText={t => setFormData(p => ({...p, password: t}))} /><TouchableOpacity style={styles.passwordToggle} onPress={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</TouchableOpacity></View></View>
              <View style={styles.inputGroup}><Text style={styles.label}>Confirmar senha</Text><View style={styles.inputContainer}><Lock style={styles.inputIcon} size={16} color="rgba(52, 73, 94, 0.6)" /><TextInput style={styles.textInput} placeholder="Confirme sua senha" secureTextEntry={!showConfirmPassword} value={formData.confirmPassword} onChangeText={t => setFormData(p => ({...p, confirmPassword: t}))} /><TouchableOpacity style={styles.passwordToggle} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</TouchableOpacity></View></View>

              {/* Termos de Uso */}
              <CustomCheckbox value={acceptTerms} onValueChange={setAcceptTerms}>
                <Text style={styles.termsText}>
                    Aceito os termos e condições:{' '}
                    <Text style={{color: '#18BC9C', textDecorationLine: 'underline'}}>Termos de Uso</Text> e{' '}
                    <Text style={{color: '#18BC9C', textDecorationLine: 'underline'}}>Política de Privacidade</Text>.
                </Text>
              </CustomCheckbox>
              
              <TouchableOpacity style={[styles.button, styles.primaryButton, {marginTop: 16}]} onPress={handleSubmit} disabled={isLoading}>
                {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Criar conta gratuita</Text>}
              </TouchableOpacity>
            </View>

            {/* Separador e Social */}
            <View style={styles.separatorContainer}><View style={styles.separatorLine} /><Text style={styles.separatorText}>ou</Text><View style={styles.separatorLine} /></View>
            <View style={{gap: 12}}>
              <TouchableOpacity style={[styles.button, styles.socialButton]} onPress={() => showInfoAlert('Registro com Google')}><GoogleIcon /><Text style={styles.socialButtonText}>Continuar com Google</Text></TouchableOpacity>
              {Platform.OS === 'ios' && <TouchableOpacity style={[styles.button, styles.appleButton]} onPress={() => showInfoAlert('Registro com Apple')}><AppleIcon /><Text style={styles.appleButtonText}>Continuar com Apple</Text></TouchableOpacity>}
            </View>

            {/* Link para Login */}
            <View style={[styles.footer, { marginTop: 24 }]}>
              <Text style={styles.footerText}>
                Já tem uma conta?{' '}
                <Text style={styles.footerLink} onPress={onSwitchToLogin}>Fazer login</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}