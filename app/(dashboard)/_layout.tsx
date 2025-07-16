import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import CustomHeader from '@/components/CustomHeader';

// Import components
import Dashboard from './dashboard/dashboard';
import Profile from './profile/profile';
import TimeTracking from './time-tracking/time-tracking';
import BiometricsAuthentication from './biometrics-authentication/biometrics-authentication';
import Holidays from './holidays';
import Download from './download/Download';

const Drawer = createDrawerNavigator();

function DrawerContent(props: any) {
  return (
    <View style={{ flex: 1 }}>
      <View style={drawerContentStyles.headerContainer}>
        <Image
          source={require('../../logo/dict-logo-slider.png')}
          style={drawerContentStyles.logo}
          resizeMode="contain"
        />
        <Text style={drawerContentStyles.title}>Biometrics Attendance System</Text>
      </View>
      <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop: 12}}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}

const drawerContentStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16, 
    paddingHorizontal: 16,
    paddingBottom: 2, // less space below header
    backgroundColor: '#f5f7fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    justifyContent: 'flex-start', 
    marginTop: 0, 
    paddingTop: 32, 
  },
  logo: {
    width: 50, //  logo size
    height: 50, //  logo size
    marginRight: 8, // less space between logo and text
  },
  title: {
    fontSize: 15, // smaller text
    fontWeight: 'bold',
    color: '#003366',
    flexShrink: 1,
  },
});

export default function DashboardLayout() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    // Clear token from storage using auth context
    await signOut();
    // Navigation will be handled by the auth context
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        header: () => <CustomHeader />,
        headerStyle: {
          height: 'auto', // Let the SafeAreaView handle the height
          backgroundColor: '#FFFFFF',
        },
        drawerActiveTintColor: '#003366',
        drawerInactiveTintColor: '#555',
        drawerLabelStyle: {
          fontWeight: '500',
        },
      })}
    >
      <Drawer.Screen 
        name="biometrics-authentication" 
        component={BiometricsAuthentication} 
        options={{ 
          drawerLabel: 'Authentication & Location',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="shield-checkmark-outline" size={size} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="time-tracking" 
        component={TimeTracking} 
        options={{ 
          drawerLabel: 'Time Tracking',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="access-time" size={size} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="dashboard" 
        component={Dashboard} 
        options={{ 
          drawerLabel: 'DTR',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-today" size={size} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="profile" 
        component={Profile} 
        options={{ 
          drawerLabel: 'Profile',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="holidays" 
        component={Holidays} 
        options={{ 
          drawerLabel: 'Holidays',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="event-available" size={size} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="download" 
        component={Download} 
        options={{ 
          drawerLabel: 'Download',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="file-download" size={size} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="logout" 
        component={Dashboard} // This doesn't matter as we'll handle the press
        options={{ 
          drawerLabel: 'Logout',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          drawerItemPress: (e) => {
            // Prevent default action
            e.preventDefault();
            handleLogout();
          },
        }}
      />
    </Drawer.Navigator>
  );
}
