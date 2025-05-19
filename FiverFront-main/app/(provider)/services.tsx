'use client';

import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ServiceCard } from '@/components/ServiceCard';
import { COLORS, FONTS, SPACING } from '@/constants/theme';
import { AlertCircle, Plus } from 'lucide-react-native';

// Mock data for services
const mockServices = [
  {
    id: '1',
    title: 'Conception de logo professionnel',
    description:
      'Je crée des logos uniques et mémorables pour votre entreprise',
    price: '5000 DA',
    category: 'Design graphique',
    image:
      'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '2',
    title: 'Développement de site web',
    description: 'Création de sites web modernes et responsives',
    price: '25000 DA',
    category: 'Développement web',
    image:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '3',
    title: 'Rédaction de contenu SEO',
    description: "Rédaction d'articles optimisés pour les moteurs de recherche",
    price: '3000 DA',
    category: 'Marketing',
    image:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29udGVudCUyMHdyaXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  },
];

export default function ProviderServices() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch services
    const fetchServices = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setServices(mockServices);
      } catch (error) {
        console.error('Error fetching services:', error);
        Alert.alert('Erreur', 'Impossible de charger vos services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDeleteService = (id: string) => {
    Alert.alert(
      'Supprimer le service',
      'Êtes-vous sûr de vouloir supprimer ce service ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            // Filter out the deleted service
            setServices(services.filter((service) => service.id !== id));
          },
        },
      ]
    );
  };

  const handleEditService = (id: string) => {
    router.push({ pathname: '/services/edit', params: { id } } as any);
  };

  const renderEmptyComponent = () => (
    <Card variant="outlined" style={styles.emptyState}>
      <AlertCircle size={40} color={COLORS.gray} />
      <ThemedText style={styles.emptyStateText}>
        Vous n'avez pas encore ajouté de services.
      </ThemedText>
      <Button
        title="Ajouter un service"
        variant="primary"
        onPress={() => router.push('/services/new' as any)}
        style={styles.emptyStateButton}
      />
    </Card>
  );

  return (
    <ThemedView style={styles.container}>
      <Header title="Mes Services" showBack />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <>
          <FlatList
            data={services}
            renderItem={({ item }) => (
              <ServiceCard
                id={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                category={item.category}
                image={item.image}
                onEdit={handleEditService}
                onDelete={handleDeleteService}
                onPress={() =>
                  router.push({
                    pathname: '/services/details',
                    params: { id: item.id },
                  } as any)
                }
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={renderEmptyComponent}
          />

          <View style={styles.fabContainer}>
            <Button
              title="Ajouter"
              variant="primary"
              icon={<Plus size={20} color={COLORS.white} />}
              onPress={() => router.push('/services/new' as any)}
              style={styles.fab}
            />
          </View>
        </>
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
  listContainer: {
    padding: SPACING.md,
    paddingBottom: 80, // Space for FAB
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
    marginVertical: SPACING.md,
    textAlign: 'center',
  },
  emptyStateButton: {
    marginTop: SPACING.md,
  },
  fabContainer: {
    position: 'absolute',
    bottom: SPACING.lg,
    right: SPACING.lg,
  },
  fab: {
    borderRadius: 30,
    paddingHorizontal: SPACING.md,
  },
});
