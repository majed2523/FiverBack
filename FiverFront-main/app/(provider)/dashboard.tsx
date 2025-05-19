'use client';

import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatsCard } from '@/components/StatsCard';
import { OrderCard } from '@/components/OrderCard';
import { getCurrentUser } from '@/lib/api/auth';
import { COLORS, FONTS, SPACING, SHADOWS } from '@/constants/theme';
import {
  AlertCircle,
  BarChart2,
  Clock,
  DollarSign,
  MessageSquare,
  Star,
} from 'lucide-react-native';

export default function ProviderDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    setRefreshing(false);
  };

  // Mock data for the dashboard
  const stats = [
    {
      id: 1,
      title: 'Commandes en cours',
      value: '3',
      icon: <Clock size={24} color={COLORS.secondary} />,
    },
    {
      id: 2,
      title: 'Revenus du mois',
      value: '1250 DA',
      icon: <DollarSign size={24} color={COLORS.success} />,
    },
    {
      id: 3,
      title: 'Évaluation',
      value: '4.8',
      icon: <Star size={24} color={COLORS.accent} />,
    },
    {
      id: 4,
      title: 'Messages',
      value: '5',
      icon: <MessageSquare size={24} color="#9C27B0" />,
    },
  ];

  const recentOrders = [
    {
      id: 1,
      client: 'Ahmed B.',
      service: 'Conception de logo',
      status: 'En cours',
      date: '15/04/2023',
      price: '5000 DA',
    },
    {
      id: 2,
      client: 'Samira L.',
      service: 'Développement web',
      status: 'En attente',
      date: '12/04/2023',
      price: '25000 DA',
    },
    {
      id: 3,
      client: 'Karim M.',
      service: 'Design graphique',
      status: 'Terminé',
      date: '08/04/2023',
      price: '3000 DA',
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <Header title="Tableau de bord" showMenu />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
      >
        {/* Provider Profile Summary */}
        <Card variant="elevated" style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <ThemedText style={styles.profileName}>
                {user?.provider?.name || 'Prestataire'}
              </ThemedText>
              <ThemedText style={styles.profileBio} numberOfLines={2}>
                {user?.provider?.bio ||
                  'Votre bio professionnelle apparaîtra ici'}
              </ThemedText>
            </View>
          </View>
          <Button
            title="Modifier le profil"
            variant="outline"
            size="small"
            onPress={() => router.push('/profile' as any)}
            style={styles.editProfileButton}
          />
        </Card>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <StatsCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={
                  stat.id === 1
                    ? COLORS.secondary
                    : stat.id === 2
                    ? COLORS.success
                    : stat.id === 3
                    ? COLORS.accent
                    : '#9C27B0'
                }
              />
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Actions rapides</ThemedText>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/services' as any)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: `${COLORS.secondary}15` },
                ]}
              >
                <BarChart2 size={24} color={COLORS.secondary} />
              </View>
              <ThemedText style={styles.actionText}>Mes services</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/orders' as any)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: `${COLORS.success}15` },
                ]}
              >
                <DollarSign size={24} color={COLORS.success} />
              </View>
              <ThemedText style={styles.actionText}>Commandes</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/messages' as any)}
              activeOpacity={0.7}
            >
              <View
                style={[styles.actionIcon, { backgroundColor: '#9C27B015' }]}
              >
                <MessageSquare size={24} color="#9C27B0" />
              </View>
              <ThemedText style={styles.actionText}>Messages</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Commandes récentes
          </ThemedText>
          {recentOrders.length > 0 ? (
            <View style={styles.ordersContainer}>
              {recentOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  client={order.client}
                  service={order.service}
                  price={order.price}
                  status={order.status as any}
                  date={order.date}
                  onPress={() =>
                    router.push({
                      pathname: '/orders/details',
                      params: { id: order.id },
                    } as any)
                  }
                />
              ))}
            </View>
          ) : (
            <Card variant="outlined" style={styles.emptyState}>
              <AlertCircle size={40} color={COLORS.gray} />
              <ThemedText style={styles.emptyStateText}>
                Aucune commande récente
              </ThemedText>
            </Card>
          )}
        </View>

        {/* Add Service Button */}
        <Button
          title="+ Ajouter un nouveau service"
          variant="primary"
          fullWidth
          onPress={() => router.push('/services/new' as any)}
          style={styles.addServiceButton}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxxl,
  },
  profileCard: {
    marginBottom: SPACING.md,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: SPACING.md,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  profileBio: {
    ...FONTS.body2,
    color: COLORS.textLight,
  },
  editProfileButton: {
    alignSelf: 'flex-start',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  statCard: {
    width: '48%',
    marginBottom: SPACING.md,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    width: '30%',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  actionText: {
    ...FONTS.body2,
    color: COLORS.text,
    textAlign: 'center',
  },
  ordersContainer: {
    marginBottom: SPACING.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyStateText: {
    ...FONTS.body1,
    color: COLORS.gray,
    marginTop: SPACING.md,
  },
  addServiceButton: {
    marginTop: SPACING.md,
  },
});
