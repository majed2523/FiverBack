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
import { getCurrentUser } from '@/lib/api/auth';
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
      icon: <Clock size={24} color="#0066FF" />,
    },
    {
      id: 2,
      title: 'Revenus du mois',
      value: '1250 DA',
      icon: <DollarSign size={24} color="#4CAF50" />,
    },
    {
      id: 3,
      title: 'Évaluation',
      value: '4.8',
      icon: <Star size={24} color="#FFC107" />,
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
    },
    {
      id: 2,
      client: 'Samira L.',
      service: 'Développement web',
      status: 'En attente',
      date: '12/04/2023',
    },
    {
      id: 3,
      client: 'Karim M.',
      service: 'Design graphique',
      status: 'Terminé',
      date: '08/04/2023',
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <Header title="Tableau de bord" showMenu />

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Provider Profile Summary */}
        <View style={styles.profileSummary}>
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
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() => router.push('/profile' as any)}
            >
              <ThemedText style={styles.editProfileText}>
                Modifier le profil
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <View style={styles.statIconContainer}>{stat.icon}</View>
              <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
              <ThemedText style={styles.statTitle}>{stat.title}</ThemedText>
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
            >
              <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
                <BarChart2 size={24} color="#0066FF" />
              </View>
              <ThemedText style={styles.actionText}>Mes services</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/orders' as any)}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
                <DollarSign size={24} color="#4CAF50" />
              </View>
              <ThemedText style={styles.actionText}>Commandes</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/messages' as any)}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#F3E5F5' }]}>
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
                <View key={order.id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <ThemedText style={styles.orderClient}>
                      {order.client}
                    </ThemedText>
                    <ThemedText
                      style={[
                        styles.orderStatus,
                        {
                          color:
                            order.status === 'En cours'
                              ? '#0066FF'
                              : order.status === 'En attente'
                              ? '#FFC107'
                              : '#4CAF50',
                        },
                      ]}
                    >
                      {order.status}
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.orderService}>
                    {order.service}
                  </ThemedText>
                  <ThemedText style={styles.orderDate}>{order.date}</ThemedText>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <AlertCircle size={40} color="#757575" />
              <ThemedText style={styles.emptyStateText}>
                Aucune commande récente
              </ThemedText>
            </View>
          )}
        </View>

        {/* Add Service Button */}
        <TouchableOpacity
          style={styles.addServiceButton}
          onPress={() => router.push('/services/new' as any)}
        >
          <ThemedText style={styles.addServiceText}>
            + Ajouter un nouveau service
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  profileSummary: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileBio: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  editProfileButton: {
    alignSelf: 'flex-start',
  },
  editProfileText: {
    color: '#0066FF',
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    textAlign: 'center',
  },
  ordersContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  orderClient: {
    fontWeight: '600',
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  orderService: {
    fontSize: 14,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: '#666666',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 24,
  },
  emptyStateText: {
    marginTop: 16,
    color: '#757575',
  },
  addServiceButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    margin: 16,
  },
  addServiceText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
