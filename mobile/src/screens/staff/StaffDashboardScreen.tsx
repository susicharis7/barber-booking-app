import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import type { StaffDashboardOverview } from '../../types';
import { getStaffDashboardOverview } from '../../services/staff-service';

const initialOverview: StaffDashboardOverview = {
  users_total: 0,
  customers_total: 0,
  barbers_total: 0,
  admins_total: 0,
  staff_total: 0,
  appointments_today: 0,
  upcoming_confirmed: 0,
  waiting_list_active: 0,
};

export default function StaffDashboardScreen() {
  const [overview, setOverview] = useState<StaffDashboardOverview>(initialOverview);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOverview = useCallback(async () => {
    try {
      setError(null);
      const data = await getStaffDashboardOverview();
      setOverview(data);
    } catch (err) {
      setError('Failed to load dashboard.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Dashboard</Text>
      <Text>Users total: {overview.users_total}</Text>
      <Text>Customers: {overview.customers_total}</Text>
      <Text>Barbers: {overview.barbers_total}</Text>
      <Text>Staff total: {overview.staff_total}</Text>
    </View>
  );
}
