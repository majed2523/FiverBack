'use client';

import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/Card';
import { OrderCard } from '@/components/OrderCard';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '@/constants/theme';
import { AlertCircle } from 'lucide-react-native';

// Mock data for orders
const mockOrders = [
  {
    id: '1',
    client: 'Ahmed Benali',
    service: 'Conception de logo professionnel',
    price: '5000 DA',
    status: 'En cours',
    date: '15/04/2023',
  },
  {
    id: '2',
    client: 'Samira Lakhdar',
    service: 'Développement de site web',
    price: '25000 DA',
    status: 'En attente',
    date: '12/04/2023',
  },
  {
    id: '3',
    client: 'Karim Mansouri',
    service: 'Rédaction de contenu SEO',
    price: '3000 DA',
    status: 'Terminé',
    date: '08/04/2023',
  },
  {
    id: '4',
    client: 'Leila Hadj',
    service: 'Conception de logo professionnel',
    price: '5000 DA',
    status: 'Annulé',
    date: '05/04/2023',
  },
];

export default function ProviderOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Tous');

  useEffect(() => {
    // Simulate API call to fetch orders
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        Alert.alert('Erreur', 'Impossible de charger vos commandes');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getFilteredOrders = () => {
    if (activeFilter === 'Tous') {
      return orders;
    }
    return orders.filter((order) => order.status === activeFilter);
  };

  const filters = ['Tous', 'En attente', 'En cours', 'Terminé', 'Annulé'];

  const renderEmptyComponent = () => (
    <Card variant="outlined" style={styles.emptyState}>
      <AlertCircle size={40} color={COLORS.gray} />
      <ThemedText style={styles.emptyStateText}>
        Aucune commande{' '}
        {activeFilter !== 'Tous' ? activeFilter.toLowerCase() : ''} trouvée.
      </ThemedText>
    </Card>
  );

  return (
    <ThemedView style={styles.container}>
      <Header title="Mes Commandes" showBack />

      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          data={filters}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === item && styles.activeFilterButton,
              ]}
              onPress={() => setActiveFilter(item)}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  activeFilter === item && styles.activeFilterText,
                ]}
              >
                {item}
              </ThemedText>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={getFilteredOrders()}
          renderItem={({ item }) => (
            <OrderCard
              client={item.client}
              service={item.service}
              price={item.price}
              status={item.status as any}
              date={item.date}
              onPress={() =>
                router.push({
                  pathname: '/orders/details',
                  params: { id: item.id },
                } as any)
              }
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyComponent}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filtersList: {
    paddingHorizontal: SPACING.md,
  },
  filterButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.lightGray,
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    ...FONTS.body2,
    color: COLORS.text,
  },
  activeFilterText: {
    color: COLORS.white,
    fontWeight: '500',
  },
  listContainer: {
    padding: SPACING.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    margin: SPACING.md,
  },
  emptyStateText: {
    ...FONTS.body1,
    color: COLORS.gray,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
});
