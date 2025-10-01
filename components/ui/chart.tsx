import React, { createContext, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';

// --- Configuração e Contexto (Mantidos da API Original) ---
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color: string;
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = createContext<ChartContextProps | null>(null);

function useChart() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a <Chart />');
  }
  return context;
}

// --- Componente de Legenda Customizado ---
function ChartLegend() {
  const { config } = useChart();

  return (
    <View style={styles.legendContainer}>
      {Object.entries(config).map(([key, { label, color, icon: Icon }]) => (
        <View key={key} style={styles.legendItem}>
          {Icon ? <Icon /> : <View style={[styles.legendColor, { backgroundColor: color }]} />}
          <Text style={styles.legendLabel}>{label || key}</Text>
        </View>
      ))}
    </View>
  );
}

// --- Componente de Tooltip Customizado ---
function ChartTooltip({ item }: { item: any }) {
  const { config } = useChart();
  const dataKey = Object.keys(config).find(key => item[key]);
  if (!dataKey) return null;

  const value = item[dataKey];
  const { label, color, icon: Icon } = config[dataKey];

  return (
    <View style={styles.tooltipContainer}>
      <View style={styles.tooltipHeader}>
        <Text style={styles.tooltipLabel}>{item.label}</Text>
      </View>
      <View style={styles.tooltipItem}>
        <View style={styles.legendItem}>
          {Icon ? <Icon /> : <View style={[styles.legendColor, { backgroundColor: color }]} />}
          <Text style={[styles.legendLabel, { color: COLORS.mutedText }]}>{label || dataKey}</Text>
        </View>
        <Text style={styles.tooltipValue}>{value}</Text>
      </View>
    </View>
  );
}

// --- Componente Principal: Chart ---
type ChartProps = {
  data: any[];
  config: ChartConfig;
  type: 'bar' | 'line' | 'pie';
  // Adicione outras props específicas do gráfico aqui se necessário
  yAxisLabel?: string;
  xAxisLabelKey?: string;
};

function Chart({ data, config, type, yAxisLabel, xAxisLabelKey = 'label' }: ChartProps) {
  // Transforma os dados e a config para o formato do gifted-charts
  const chartData = data.map(item => ({
    ...item,
    label: item[xAxisLabelKey],
    // Adiciona props de tooltip para cada item
    customDataPoint: () => <View style={styles.customDataPoint} />,
    pointerConfig: {
      pointerComponent: () => <ChartTooltip item={item} />,
    },
  }));

  const renderChart = () => {
    switch (type) {
      case 'bar':
        const stackData = Object.keys(config).map(key => ({
            value: 0, // valor inicial
            stacks: data.map(item => ({ value: item[key] || 0, color: config[key].color })),
            label: '',
        }));
        // Reestrutura os dados para o formato de pilha
        const transformedStackData = data.map((item, index) => ({
            stacks: Object.keys(config).map(key => ({
                value: item[key] || 0,
                color: config[key].color,
            })),
            label: item[xAxisLabelKey],
        }));
        return <BarChart stackData={transformedStackData} yAxisTextStyle={styles.axisLabel} xAxisLabelTextStyle={styles.axisLabel} />;
      case 'line':
        // A biblioteca gifted-charts lida com múltiplas linhas nativamente
        return <LineChart data={chartData} yAxisTextStyle={styles.axisLabel} xAxisLabelTextStyle={styles.axisLabel} />;
      case 'pie':
        const pieData = Object.keys(config).map(key => ({
          value: data.reduce((sum, item) => sum + (item[key] || 0), 0),
          color: config[key].color,
          text: `${data.reduce((sum, item) => sum + (item[key] || 0), 0)}`,
        }));
        return <PieChart data={pieData} donut />;
      default:
        return <Text>Tipo de gráfico inválido</Text>;
    }
  };

  return (
    <ChartContext.Provider value={{ config }}>
      <View style={styles.container}>
        {renderChart()}
        <ChartLegend />
      </View>
    </ChartContext.Provider>
  );
}


// --- Estilos ---
const COLORS = {
  background: '#FFFFFF',
  text: '#111827',
  mutedText: '#6B7280',
  border: '#E5E7EB',
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    gap: 16,
  },
  axisLabel: {
    color: COLORS.mutedText,
  },
  // Legenda
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 12,
    color: COLORS.text,
  },
  // Tooltip
  tooltipContainer: {
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tooltipHeader: {
    marginBottom: 8,
  },
  tooltipLabel: {
    fontWeight: 'bold',
    color: COLORS.text,
  },
  tooltipItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tooltipValue: {
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 16,
  },
  customDataPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
});


// --- Exportações ---
export { Chart };