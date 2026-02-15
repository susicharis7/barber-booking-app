import type { NavigatorScreenParams } from '@react-navigation/native';

import type { Barber, ServicesAndPriceList } from '../types';

export type ServicesStackParamList = {
  ServiceMain: undefined;
  ServicesAndPriceList: {
    employee: {
      id: number;
      name: string;
      title: string;
      avatar: string | null;
    };
  };
  Calendar: {
    employee: {
      id: number;
      name: string;
      title: string;
      avatar: string | null;
    };
    service: ServicesAndPriceList;
  };
  Information: {
    employee: {
      id: number;
      name: string;
      title: string;
      avatar: string | null;
    };
    service: ServicesAndPriceList;
    date: string;
    time: string;
    note?: string;
  };
  JoinWaitingListScreen: {
    employee: {
      id: number;
      name: string;
      title: string;
      avatar: string | null;
    };
    service?: ServicesAndPriceList | null;
    date: string;
    nextAvailableDate?: string | null;
  };
};

export type SettingsStackParamList = {
  SettingsMain: undefined;
  UserProfile: undefined;
  MyAccount: undefined;
  AboutApp: undefined;
  TermsOfUse: undefined;
  PrivacyPolicy: undefined;
  WaitingList: undefined;
  NotificationsScreen: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Services: NavigatorScreenParams<ServicesStackParamList> | undefined;
  Dashboard: undefined;
  Appointments: undefined;
  Notifications: undefined;
  Settings: NavigatorScreenParams<SettingsStackParamList> | undefined;
};

export type AppStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
};

export type RootStackParamList = AuthStackParamList & AppStackParamList;

/* Shared helper types for local screen params */
export type SelectedEmployee = {
  id: number;
  name: string;
  title: string;
  avatar: string | null;
};

export type SelectedBarber = Barber;
