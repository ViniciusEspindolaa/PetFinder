import React, { createContext, useContext } from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';

// --- Componente Raiz: Form ---
// Apenas um apelido para o FormProvider do react-hook-form
const Form = FormProvider;

// --- Contexto para o Campo ---
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

// --- Componente de Campo: FormField ---
// Adaptado para usar a prop 'render', o padrão do React Native
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ ...props }: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

// --- Hook customizado para acessar o estado do campo ---
const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error('useFormField must be used within a <FormField>');
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    name: fieldContext.name,
    ...fieldState,
  };
};

// --- Componente de Item de Formulário: FormItem ---
function FormItem({ style, ...props }: ViewProps) {
  return <View style={[styles.item, style]} {...props} />;
}

// --- Rótulo do Campo: FormLabel ---
function FormLabel({ children }: { children: React.ReactNode }) {
  const { error } = useFormField();
  return <Text style={[styles.label, error && styles.labelError]}>{children}</Text>;
}

// --- Descrição do Campo: FormDescription ---
function FormDescription({ children }: { children: React.ReactNode }) {
  return <Text style={styles.description}>{children}</Text>;
}

// --- Mensagem de Erro do Campo: FormMessage ---
function FormMessage() {
  const { error } = useFormField();
  const body = error ? String(error?.message) : null;

  if (!body) {
    return null;
  }

  return <Text style={styles.message}>{body}</Text>;
}


// --- Estilos ---
const COLORS = {
  text: '#111827',
  mutedForeground: '#6B7280',
  destructive: '#EF4444',
};

const styles = StyleSheet.create({
  item: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  labelError: {
    color: COLORS.destructive,
  },
  description: {
    fontSize: 12,
    color: COLORS.mutedForeground,
  },
  message: {
    fontSize: 12,
    color: COLORS.destructive,
    fontWeight: '500',
  },
});


// --- Exportações ---
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  // FormControl foi removido
  FormDescription,
  FormMessage,
  FormField,
};