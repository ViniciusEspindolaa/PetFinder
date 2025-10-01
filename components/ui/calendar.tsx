import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar as RNC_Calendar, CalendarProps, LocaleConfig } from 'react-native-calendars';
import { DateData } from 'react-native-calendars/src/types';

// --- Configuração de Localização para Português ---
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ],
  monthNamesShort: [
    'Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.',
    'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.',
  ],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: "Hoje",
};
LocaleConfig.defaultLocale = 'pt-br';


// --- Componente Principal: Calendar ---
// Usamos as props da biblioteca original e adicionamos as nossas
interface CustomCalendarProps extends CalendarProps {
  // Adicionamos um estado inicial para a data selecionada
  initialDate?: string; 
  onDateSelect: (date: DateData) => void;
}

function Calendar({ initialDate, onDateSelect, ...props }: CustomCalendarProps) {
  const [selected, setSelected] = useState(initialDate || '');

  const handleDayPress = (day: DateData) => {
    setSelected(day.dateString);
    if (onDateSelect) {
      onDateSelect(day);
    }
  };

  return (
    <View style={styles.container}>
      <RNC_Calendar
        // Estilo e Tema
        style={styles.calendar}
        theme={calendarTheme}
        
        // Marcação de Datas
        onDayPress={handleDayPress}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: COLORS.primary,
            selectedTextColor: COLORS.primaryForeground,
          },
        }}

        // Componentes Customizados
        renderArrow={(direction) =>
          direction === 'left' ? (
            <ChevronLeft size={20} color={COLORS.primary} />
          ) : (
            <ChevronRight size={20} color={COLORS.primary} />
          )
        }
        {...props}
      />
    </View>
  );
}


// --- Estilos e Tema ---
const COLORS = {
  primary: '#2C3E50',
  primaryForeground: '#FFFFFF',
  accent: '#ECF0F1',
  accentForeground: '#2C3E50',
  text: '#111827',
  mutedText: '#6B7280',
  background: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 8,
    // Adicione sombra se desejar
  },
  calendar: {
    // Estilos para o container do calendário se necessário
  },
});

// Objeto de tema para react-native-calendars
const calendarTheme = {
  backgroundColor: COLORS.background,
  calendarBackground: COLORS.background,
  textSectionTitleColor: COLORS.mutedText,
  selectedDayBackgroundColor: COLORS.primary,
  selectedDayTextColor: COLORS.primaryForeground,
  todayTextColor: COLORS.accentForeground,
  todayBackgroundColor: COLORS.accent,
  dayTextColor: COLORS.text,
  textDisabledColor: '#d9e1e8',
  dotColor: COLORS.primary,
  selectedDotColor: COLORS.primaryForeground,
  arrowColor: COLORS.primary,
  disabledArrowColor: '#d9e1e8',
  monthTextColor: COLORS.primary,
  indicatorColor: 'blue',
  textDayFontWeight: '400' as '400',
  textMonthFontWeight: 'bold' as 'bold',
  textDayHeaderFontWeight: '500' as '500',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 14,
};


// --- Exportações ---
export { Calendar };