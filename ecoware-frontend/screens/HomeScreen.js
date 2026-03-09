import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ISSUES_DATA = require('../data/issues.json');
const QUIZ_DATA = require('../data/quiz.json');
const VIDEOS_DATA = require('../data/videos.json');

export default function HomeScreen({ navigation }) {
  const [topScore, setTopScore] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadScore);
    loadScore();
    return unsubscribe;
  }, [navigation]);

  const loadScore = async () => {
    try {
      const scores = await AsyncStorage.getItem('scores');
      if (scores) {
        const parsed = JSON.parse(scores);
        if (parsed.length > 0) {
          const max = Math.max(...parsed.map((s) => s.score));
          setTopScore(max);
        }
      }
    } catch (e) {}
  };

  const menuItems = [
    {
      label: 'Issues',
      icon: '🌍',
      onPress: () => navigation.navigate('Issues'),
    },
    {
      label: 'Take Quiz',
      icon: '🧩',
      onPress: () => navigation.navigate('Quiz'),
    },
    {
      label: 'Videos',
      icon: '🎬',
      onPress: () => navigation.navigate('Videos'),
    },
    {
      label: 'Scores',
      icon: '🏆',
      onPress: () => navigation.navigate('Scores'),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0faf4" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerIcon}>🌿</Text>
            <Text style={styles.headerTitle}>EcoAware</Text>
          </View>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreText}>Score: {topScore}</Text>
          </View>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroPill}>
            <Text style={styles.heroPillText}>🌱 For Our Planet</Text>
          </View>
          <Text style={styles.heroTitle}>
            Learn. Quiz.{'\n'}Make a Difference.
          </Text>
          <Text style={styles.heroSubtitle}>Explore global sustainability challenges.</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{ISSUES_DATA.length}</Text>
            <Text style={styles.statLabel}>Issues</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{QUIZ_DATA.length}</Text>
            <Text style={styles.statLabel}>Questions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{VIDEOS_DATA.length}</Text>
            <Text style={styles.statLabel}>Videos</Text>
          </View>
        </View>

        {/* Menu Grid */}
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.menuCard}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0faf4',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0faf4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0f0e8',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerIcon: { fontSize: 20 },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a4731',
  },
  scoreBadge: {
    backgroundColor: '#1a4731',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  scoreText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  heroBanner: {
    margin: 16,
    backgroundColor: '#1a4731',
    borderRadius: 18,
    padding: 22,
  },
  heroPill: {
    backgroundColor: '#2d6a4f',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
  },
  heroPillText: {
    color: '#74c69d',
    fontWeight: '700',
    fontSize: 12,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    lineHeight: 32,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#b7e4c7',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 16,
    
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1a4731',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e8f5e9',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  menuCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'flex-start',
    
    elevation: 2,
  },
  menuIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a4731',
  },
});

