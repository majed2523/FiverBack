'use client';

import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { OrderCard } from '@/components/OrderCard';
import { getCurrentUser } from '@/lib/api/auth';
import {
  COLORS,
  FONTS,
  SPACING,
  SHADOWS,
  ANIMATION,
  SIZES,
} from '@/constants/theme';
import {
  AlertCircle,
  Clock,
  DollarSign,
  MessageSquare,
  Star,
  Wrench,
  Briefcase,
  User,
} from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  FadeInDown,
  SlideInRight,
  SlideInUp,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function ProviderDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const servicesScale = useSharedValue(1);
  const ordersScale = useSharedValue(1);
  const profileScale = useSharedValue(1);

  const servicesAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: servicesScale.value }],
    };
  });

  const ordersAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: ordersScale.value }],
    };
  });

  const profileAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: profileScale.value }],
    };
  });

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
      icon: <Clock size={24} color={COLORS.white} />,
    },
    {
      id: 2,
      title: 'Revenus du mois',
      value: '1250 DA',
      icon: <DollarSign size={24} color={COLORS.white} />,
    },
    {
      id: 3,
      title: 'Évaluation',
      value: '4.8',
      icon: <Star size={24} color={COLORS.white} />,
    },
    {
      id: 4,
      title: 'Messages',
      value: '5',
      icon: <MessageSquare size={24} color={COLORS.white} />,
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

  const servicesOnPressIn = () => {
    servicesScale.value = withTiming(0.95, {
      duration: ANIMATION.fast,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const servicesOnPressOut = () => {
    servicesScale.value = withTiming(1, {
      duration: ANIMATION.fast,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const ordersOnPressIn = () => {
    ordersScale.value = withTiming(0.95, {
      duration: ANIMATION.fast,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const ordersOnPressOut = () => {
    ordersScale.value = withTiming(1, {
      duration: ANIMATION.fast,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const profileOnPressIn = () => {
    profileScale.value = withTiming(0.95, {
      duration: ANIMATION.fast,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const profileOnPressOut = () => {
    profileScale.value = withTiming(1, {
      duration: ANIMATION.fast,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.View entering={SlideInUp.delay(100).duration(500)}>
        <Header showLogo showMenu />
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Welcome Banner */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <Card variant="elevated" style={styles.welcomeCard}>
            <View style={styles.welcomeContent}>
              <ThemedText style={styles.welcomeTitle}>
                Bienvenue, {user?.provider?.name || 'Prestataire'}!
              </ThemedText>
              <ThemedText style={styles.welcomeSubtitle}>
                Gérez vos services et commandes
              </ThemedText>
              <Button
                title="Voir mon profil"
                variant="outline"
                size="small"
                onPress={() => router.push('/profile' as any)}
                style={styles.welcomeButton}
              />
            </View>
            <View style={styles.welcomeImageContainer}>
              <Image
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/32.jpg',
                }}
                style={styles.welcomeImage}
              />
            </View>
          </Card>
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(500)}
          style={styles.statsGrid}
        >
          {stats.map((stat, index) => (
            <Animated.View
              key={stat.id}
              style={styles.statCard}
              entering={SlideInRight.delay(400 + index * 100).duration(500)}
            >
              <Card
                variant="elevated"
                style={[
                  styles.statCardInner,
                  {
                    backgroundColor:
                      index === 0
                        ? COLORS.secondary
                        : index === 1
                        ? COLORS.primary
                        : index === 2
                        ? COLORS.accent
                        : '#9C27B0',
                  },
                ]}
              >
                <View style={styles.statIcon}>{stat.icon}</View>
                <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
                <ThemedText style={styles.statTitle}>{stat.title}</ThemedText>
              </Card>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(500)}
          style={styles.section}
        >
          <ThemedText style={styles.sectionTitle}>Actions rapides</ThemedText>
          <View style={styles.quickActions}>
            <AnimatedTouchable
              style={[styles.actionButton, servicesAnimationStyle]}
              onPress={() => router.push('/services' as any)}
              onPressIn={servicesOnPressIn}
              onPressOut={servicesOnPressOut}
              activeOpacity={0.7}
            >
              <View
                style={[styles.actionIcon, { backgroundColor: COLORS.primary }]}
              >
                <Wrench size={24} color={COLORS.white} />
              </View>
              <ThemedText style={styles.actionText}>Mes services</ThemedText>
            </AnimatedTouchable>

            <AnimatedTouchable
              style={[styles.actionButton, ordersAnimationStyle]}
              onPress={() => router.push('/orders' as any)}
              onPressIn={ordersOnPressIn}
              onPressOut={ordersOnPressOut}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: COLORS.secondary },
                ]}
              >
                <Briefcase size={24} color={COLORS.white} />
              </View>
              <ThemedText style={styles.actionText}>Commandes</ThemedText>
            </AnimatedTouchable>

            <AnimatedTouchable
              style={[styles.actionButton, profileAnimationStyle]}
              onPress={() => router.push('/profile' as any)}
              onPressIn={profileOnPressIn}
              onPressOut={profileOnPressOut}
              activeOpacity={0.7}
            >
              <View
                style={[styles.actionIcon, { backgroundColor: COLORS.accent }]}
              >
                <User size={24} color={COLORS.white} />
              </View>
              <ThemedText style={styles.actionText}>Profil</ThemedText>
            </AnimatedTouchable>
          </View>
        </Animated.View>

        {/* Recent Orders */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(500)}
          style={styles.section}
        >
          <ThemedText style={styles.sectionTitle}>
            Commandes récentes
          </ThemedText>
          {recentOrders.length > 0 ? (
            <View style={styles.ordersContainer}>
              {recentOrders.map((order, index) => (
                <Animated.View
                  key={order.id}
                  entering={FadeInDown.delay(700 + index * 100).duration(500)}
                >
                  <OrderCard
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
                </Animated.View>
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
        </Animated.View>

        {/* Add Service Button */}
        <Animated.View entering={FadeInDown.delay(800).duration(500)}>
          <Button
            title="+ Ajouter un nouveau service"
            variant="primary"
            fullWidth
            onPress={() => router.push('/services/new' as any)}
            style={styles.addServiceButton}
          />
        </Animated.View>
      </ScrollView>
    </ThemedView>
  );
}

export default ProviderDashboard;

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
    paddingBottom: SIZES.xxxl,
  },
  welcomeCard: {
    marginBottom: SPACING.md,
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    padding: SPACING.lg,
  },
  welcomeContent: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeTitle: {
    ...FONTS.h3,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  welcomeSubtitle: {
    ...FONTS.body2,
    color: COLORS.white,
    opacity: 0.8,
    marginBottom: SPACING.md,
  },
  welcomeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: COLORS.white,
    alignSelf: 'flex-start',
  },
  welcomeImageContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: COLORS.white,
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
  statCardInner: {
    padding: SPACING.md,
    alignItems: 'center',
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statValue: {
    ...FONTS.h2,
    color: COLORS.white,
    marginBottom: 4,
  },
  statTitle: {
    ...FONTS.caption,
    color: COLORS.white,
    opacity: 0.8,
    textAlign: 'center',
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.secondary,
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
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    ...SHADOWS.medium,
  },
  actionText: {
    ...FONTS.body2,
    color: COLORS.secondary,
    textAlign: 'center',
    fontWeight: '500' as const,
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
