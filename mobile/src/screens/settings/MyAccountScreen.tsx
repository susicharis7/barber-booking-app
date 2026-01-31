import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/myaccount-styles';

const bgImage = require('../../../assets/images/myAcc-bg.png');

export default function MyAccountScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* TOP IMAGE (30%) */}
      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backRow}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
            <Text style={styles.backText}>Nazad</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroTitleWrap}>
          <Text style={styles.heroBadge}>ACCOUNT</Text>
          <Text style={styles.heroTitle}>Moj račun</Text>
        </View>
      </ImageBackground>

      {/* FADE TRANSITION */}
      <View style={styles.fade} />

      {/* BLACK CONTENT */}
      <View style={styles.content}>
        <TouchableOpacity style={styles.item} activeOpacity={0.7}>
          <Ionicons name="lock-closed-outline" size={22} color="#000000" />
          <Text style={styles.itemText}>Pravila privatnosti</Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} activeOpacity={0.7}>
          <Ionicons name="document-text-outline" size={22} color="#000000" />
          <Text style={styles.itemText}>Uvjeti korištenja</Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} activeOpacity={0.7}>
          <Ionicons name="information-circle-outline" size={22} color="#000000" />
          <Text style={styles.itemText}>O aplikaciji</Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.item, styles.dangerItem]}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={22} color="#ff4d4d" />
          <Text style={[styles.itemText, styles.dangerText]}>
            Obriši moj račun
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
}



