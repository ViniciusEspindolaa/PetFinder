import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  useWindowDimensions,
  View,
  ViewProps,
} from 'react-native';

// --- Tipos e Contexto ---
type CarouselContextProps = {
  orientation: 'horizontal' | 'vertical';
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }
  return context;
}

// --- Componentes ---
type CarouselProps = {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
};

function Carousel({ orientation = 'horizontal', children }: CarouselProps) {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Calcula se pode rolar
  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < totalItems - 1;

  // Funções de rolagem
  const scrollPrev = useCallback(() => {
    if (canScrollPrev) flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
  }, [canScrollPrev, currentIndex]);

  const scrollNext = useCallback(() => {
    if (canScrollNext) flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
  }, [canScrollNext, currentIndex]);

  // Atualiza o índice atual com base na posição do scroll
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const layoutMeasurement = event.nativeEvent.layoutMeasurement;
    
    let index;
    if (orientation === 'horizontal') {
      index = Math.round(contentOffset.x / layoutMeasurement.width);
    } else {
      index = Math.round(contentOffset.y / layoutMeasurement.height);
    }
    setCurrentIndex(index);
  };
  
  // Clona os filhos para passar props necessárias
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === CarouselContent) {
      setTotalItems(
        React.Children.count(
          (child as React.ReactElement<{ children: React.ReactNode }>).props.children
        )
      );
      return React.cloneElement(child, {
        ref: flatListRef,
      } as any);
    }
    return child;
  });

  return (
    <CarouselContext.Provider
      value={{ orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext, handleScroll }}
    >
      <View style={styles.carouselContainer}>{childrenWithProps}</View>
    </CarouselContext.Provider>
  );
}

const CarouselContent = React.forwardRef<
  FlatList,
  { children: React.ReactNode }
>(({ children }, ref) => {
  const { orientation, handleScroll } = useCarousel();
  const data = React.Children.toArray(children);

  return (
    <FlatList
      ref={ref}
      data={data}
      renderItem={({ item }) => item}
      keyExtractor={(_, index) => index.toString()}
      horizontal={orientation === 'horizontal'}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    />
  );
});
CarouselContent.displayName = "CarouselContent"

function CarouselItem({ style, ...props }: ViewProps) {
  const { width } = useWindowDimensions();
  // Cada item do carrossel ocupa a largura total da tela
  return <View style={[styles.itemContainer, { width }, style]} {...props} />;
}

function CarouselPrevious(props: TouchableOpacityProps) {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <TouchableOpacity
      style={[styles.navButton, styles.prevButton, !canScrollPrev && styles.navButtonDisabled]}
      onPress={scrollPrev}
      disabled={!canScrollPrev}
      {...props}
    >
      <ArrowLeft size={18} color="#2C3E50" />
    </TouchableOpacity>
  );
}

function CarouselNext(props: TouchableOpacityProps) {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <TouchableOpacity
      style={[styles.navButton, styles.nextButton, !canScrollNext && styles.navButtonDisabled]}
      onPress={scrollNext}
      disabled={!canScrollNext}
      {...props}
    >
      <ArrowRight size={18} color="#2C3E50" />
    </TouchableOpacity>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  carouselContainer: {
    position: 'relative',
    width: '100%',
  },
  itemContainer: {
    flex: 1,
    paddingHorizontal: 16, // Espaçamento entre os itens
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -16 }], // Metade da altura do botão
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  prevButton: {
    left: -16,
  },
  nextButton: {
    right: -16,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
});

// --- Exportações ---
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};