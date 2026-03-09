import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function ScoresScreen({ navigation }) {
  const [scores, setScores] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadScores();
    }, [])
  );

  const loadScores = async () => {
    try {
      const data = await AsyncStorage.getItem('scores');
      if (data) {
        const parsed = JSON.parse(data);
        const sorted = parsed.sort((a, b) => b.score - a.score);
        setScores(sorted);
      } else {
        setScores([]);
      }
    } catch (e) {
      setScores([]);
    }
  };

  const handleClear = () => {
    Alert.alert('Clear All Scores', 'Are you sure you want to delete all saved scores?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('scores');
          setScores([]);
        },
      },
    ]);
  };

  const getMedal = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0faf4" />
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🏆</Text>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        {scores.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {scores.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📋</Text>
          <Text style={styles.emptyTitle}>No Scores Yet</Text>
          <Text style={styles.emptySubtitle}>Take a quiz and save your score to see it here!</Text>
          <TouchableOpacity
            style={styles.quizBtn}
            onPress={() => navigation.navigate('Quiz')}
            activeOpacity={0.85}
          >
            <Text style={styles.quizBtnText}>🧩 Take Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={scores}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          renderItem={({ item, index }) => (
            <View style={[styles.scoreCard, index === 0 && styles.topCard]}>
              <Text style={styles.medal}>{getMedal(index)}</Text>
              <View style={styles.scoreInfo}>
                <Text style={styles.scoreName}>{item.name}</Text>
                <Text style={styles.scoreDate}>{formatDate(item.date)}</Text>
              </View>
              <View style={styles.scoreRight}>
                <Text style={styles.scoreValue}>
                  {item.score}
                  <Text style={styles.scoreMax}>/{item.total}</Text>
                </Text>
                <Text style={styles.scorePercent}>
                  {Math.round((item.score / item.total) * 100)}%
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0faf4' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0f0e8',
  },
  headerIcon: { fontSize: 22 },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a4731',
    flex: 1,
  },
  clearBtn: {
    backgroundColor: '#fff0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  clearBtnText: { color: '#d62828', fontWeight: '700', fontSize: 13 },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyEmoji: { fontSize: 60, marginBottom: 16 },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1a4731',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  quizBtn: {
    backgroundColor: '#1a4731',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 36,
  },
  quizBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  scoreCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    
    elevation: 2,
  },
  topCard: {
    borderWidth: 2,
    borderColor: '#ffd700',
    backgroundColor: '#fffdf0',
  },
  medal: { fontSize: 26, width: 36, textAlign: 'center' },
  scoreInfo: { flex: 1 },
  scoreName: { fontSize: 16, fontWeight: '800', color: '#1a1a1a', marginBottom: 2 },
  scoreDate: { fontSize: 12, color: '#888' },
  scoreRight: { alignItems: 'flex-end' },
  scoreValue: { fontSize: 22, fontWeight: '900', color: '#1a4731' },
  scoreMax: { fontSize: 14, color: '#74c69d' },
  scorePercent: { fontSize: 12, color: '#74c69d', fontWeight: '700' },
});

