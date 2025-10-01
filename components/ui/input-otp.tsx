import { Minus } from 'lucide-react-native';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewProps,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

// --- Tipos e Contexto ---
type OTPContextType = {
  value: string;
  isFocused: boolean;
  maxLength: number;
};

const OTPContext = createContext<OTPContextType | null>(null);

// --- Componente Raiz: InputOTP ---
type InputOTPProps = {
  maxLength: number;
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
};

function InputOTP({ maxLength, value, onValueChange, children }: InputOTPProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };
  
  // Garante que o valor não exceda o maxLength
  const sanitizedValue = value.slice(0, maxLength);

  return (
    <OTPContext.Provider value={{ value: sanitizedValue, isFocused, maxLength }}>
      <View style={styles.rootContainer}>
        <Pressable style={styles.pressableContainer} onPress={handlePress}>
          {children}
        </Pressable>
        {/* TextInput invisível que lida com toda a lógica de input */}
        <TextInput
          ref={inputRef}
          style={styles.hiddenInput}
          value={sanitizedValue}
          onChangeText={onValueChange}
          maxLength={maxLength}
          keyboardType="number-pad"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </OTPContext.Provider>
  );
}

// --- Componente Grupo ---
function InputOTPGroup({ style, ...props }: ViewProps) {
  return <View style={[styles.group, style]} {...props} />;
}

// --- Componente Slot (cada dígito) ---
function InputOTPSlot({ index, style }: ViewProps & { index: number }) {
  const context = useContext(OTPContext);
  if (!context) throw new Error('InputOTPSlot must be used within an InputOTP');

  const { value, isFocused, maxLength } = context;
  const char = value[index];
  const hasChar = !!char;
  const isActive = isFocused && value.length === index;

  // Animação do cursor
  const caretOpacity = useSharedValue(0);
  useEffect(() => {
    if (isActive) {
      caretOpacity.value = withRepeat(
        withSequence(withTiming(1, { duration: 0 }), withTiming(0, { duration: 1000 })),
        -1 // Repetição infinita
      );
    } else {
      caretOpacity.value = 0;
    }
  }, [isActive, caretOpacity]);

  const animatedCaretStyle = useAnimatedStyle(() => ({
    opacity: caretOpacity.value,
  }));

  return (
    <View style={[styles.slot, isActive && styles.slotActive, style]}>
      <Text style={styles.slotText}>{char}</Text>
      {isActive && (
        <View style={styles.caretContainer}>
          <Animated.View style={[styles.caret, animatedCaretStyle]} />
        </View>
      )}
    </View>
  );
}

// --- Componente Separador ---
function InputOTPSeparator() {
  return (
    <View style={styles.separator}>
      <Minus size={16} color={COLORS.text} />
    </View>
  );
}

// --- Estilos ---
const COLORS = {
  primary: '#2C3E50',
  border: '#CBD5E1',
  ring: '#18BC9C',
  background: '#FFFFFF',
  text: '#111827',
};

const styles = StyleSheet.create({
  rootContainer: {
    position: 'relative',
  },
  pressableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
    color: 'transparent',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  slot: {
    width: 44,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.background,
  },
  slotActive: {
    borderColor: COLORS.ring,
    shadowColor: COLORS.ring,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  slotText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  separator: {
    paddingHorizontal: 4,
  },
  caretContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caret: {
    width: 1.5,
    height: 20,
    backgroundColor: COLORS.text,
  },
});

// --- Exportações ---
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };