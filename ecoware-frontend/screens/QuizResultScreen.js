import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QUIZ_DATA = require('../data/quiz.json');

export default function QuizResultScreen({ route, navigation }) {
  const { finalScore, total } = route.params;
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getTitle = () => {
    if (finalScore === total) return '🌍 Perfect Score! True EcoHero!';
    if (finalScore >= total * 0.8) return '🌿 Excellent! Eco Champion!';
    if (finalScore >= total * 0.6) return '♻️ Good Job! Keep Learning!';
    if (finalScore >= total * 0.4) return '🌱 Nice Try! Keep Growing!';
    return '📚 Keep Studying! You Can Do It!';
  };

  const getSubtitle = () => {
    if (finalScore === total) return `You answered all ${total} questions correctly. Our planet thanks you!`;
    if (finalScore >= total * 0.8) return `You answered ${finalScore} out of ${total} correctly. Great knowledge!`;
    if (finalScore >= total * 0.6) return `You got ${finalScore} out of ${total}. Keep exploring eco topics!`;
    return `You scored ${finalScore} out of ${total}. Every bit of learning helps!`;
  };

  const handleSaveScore = async () => {
    if (!name.trim()) {
      Alert.alert('Name Required', 'Please enter your name to save your score.');
      return;
    }
    try {
      const existing = await AsyncStorage.getItem('scores');
      const scores = existing ? JSON.parse(existing) : [];
      scores.push({
        name: name.trim(),
        score: finalScore,
        total,
        date: new Date().toISOString(),
      });
      await AsyncStorage.setItem('scores', JSON.stringify(scores));
      setSaved(true);
      Alert.alert('Score Saved! 🏆', `${name.trim()}'s score of ${finalScore}/${total} has been saved!`);
    } catch (e) {
      Alert.alert('Error', 'Could not save score. Please try again.');
    }
  };

  const percentage = Math.round((finalScore / total) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0faf4" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* Confetti emoji */}
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Text style={styles.celebrationEmoji}>🎉</Text>
          </Animated.View>

          {/* Score Circle */}
          <Animated.View style={[styles.scoreCircle, { opacity: fadeAnim }]}>
            <Text style={styles.scoreNumber}>{finalScore}</Text>
            <Text style={styles.scoreTotal}>/{total}</Text>
          </Animated.View>

          {/* Title & Subtitle */}
          <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
            <Text style={styles.resultTitle}>{getTitle()}</Text>
            <Text style={styles.resultSubtitle}>{getSubtitle()}</Text>
          </Animated.View>

          {/* Save Score */}
          {!saved ? (
            <View style={styles.saveContainer}>
              <TextInput
                style={styles.nameInput}
                placeholder="Your name..."
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
                maxLength={30}
              />
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveScore} activeOpacity={0.85}>
                <Text style={styles.saveBtnText}>🏆 Save Score</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.savedBadge}>
              <Text style={styles.savedText}>✅ Score Saved!</Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.retryBtn}
              onPress={() => navigation.replace('Main', { screen: 'Quiz' })}
              activeOpacity={0.85}
            >
              <Text style={styles.retryBtnText}>🔄 Try Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeBtn}
              onPress={() => navigation.navigate('Main', { screen: 'Home' })}
              activeOpacity={0.85}
            >
              <Text style={styles.homeBtnText}>🏠 Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0faf4' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    gap: 16,
  },
  celebrationEmoji: { fontSize: 70 },
  scoreCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#52b788',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#52b788',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  scoreNumber: {
    fontSize: 38,
    fontWeight: '900',
    color: '#1a4731',
  },
  scoreTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#74c69d',
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1a4731',
    textAlign: 'center',
    marginBottom: 6,
  },
  resultSubtitle: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
  },
  saveContainer: {
    width: '100%',
    gap: 10,
    marginTop: 8,
  },
  nameInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: '#222',
    borderWidth: 1.5,
    borderColor: '#d8f3dc',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  saveBtn: {
    backgroundColor: '#40916c',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  savedBadge: {
    backgroundColor: '#f0fff4',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#74c69d',
  },
  savedText: { color: '#2d6a4f', fontWeight: '800', fontSize: 15 },
  actions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  retryBtn: {
    flex: 1,
    backgroundColor: '#1a4731',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  retryBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  homeBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d8f3dc',
  },
  homeBtnText: { color: '#1a4731', fontWeight: '800', fontSize: 15 },
});
