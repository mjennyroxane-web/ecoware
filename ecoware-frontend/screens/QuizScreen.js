import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';

const QUIZ_DATA = require('../data/quiz.json');

export default function QuizScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const currentQuestion = QUIZ_DATA[currentIndex];

  const handleStart = () => setQuizStarted(true);

  const handleSelectAnswer = (optionKey) => {
    if (showFeedback) return;
    setSelectedAnswer(optionKey);
    setShowFeedback(true);

    const isCorrect = optionKey === currentQuestion.correctAnswer;
    if (isCorrect) setScore((s) => s + 1);
  };

  const handleNext = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
    ]).start(() => {
      if (currentIndex + 1 >= QUIZ_DATA.length) {
        navigation.navigate('QuizResult', { score: score + (selectedAnswer === currentQuestion.correctAnswer ? 0 : 0), finalScore: score, total: QUIZ_DATA.length });
      } else {
        setCurrentIndex((i) => i + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
      }
    });
  };

  const handleNextAfterResult = () => {
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
      if (currentIndex + 1 >= QUIZ_DATA.length) {
        navigation.navigate('QuizResult', { finalScore: score, total: QUIZ_DATA.length });
      } else {
        setCurrentIndex((i) => i + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
      }
    });
  };

  const getOptionStyle = (key) => {
    if (!showFeedback) {
      return selectedAnswer === key ? styles.optionSelected : styles.option;
    }
    if (key === currentQuestion.correctAnswer) return styles.optionCorrect;
    if (key === selectedAnswer && key !== currentQuestion.correctAnswer) return styles.optionWrong;
    return styles.option;
  };

  const getOptionIcon = (key) => {
    if (!showFeedback) return null;
    if (key === currentQuestion.correctAnswer) return '✅';
    if (key === selectedAnswer && key !== currentQuestion.correctAnswer) return '❌';
    return null;
  };

  if (!quizStarted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#f0faf4" />
        <View style={styles.startContainer}>
          <Text style={styles.startEmoji}>🧩</Text>
          <Text style={styles.startTitle}>Eco Quiz</Text>
          <Text style={styles.startSubtitle}>
            Test your knowledge on global sustainability with {QUIZ_DATA.length} questions.
          </Text>
          <View style={styles.startMeta}>
            <Text style={styles.startMetaText}>📋 {QUIZ_DATA.length} Questions</Text>
            <Text style={styles.startMetaText}>🏆 Score tracked</Text>
            <Text style={styles.startMetaText}>🌍 Multiple topics</Text>
          </View>
          <TouchableOpacity style={styles.startBtn} onPress={handleStart} activeOpacity={0.85}>
            <Text style={styles.startBtnText}>Start Quiz →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const progressPercent = ((currentIndex) / QUIZ_DATA.length) * 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a4731" />
      {/* Quiz Header */}
      <View style={styles.quizHeader}>
        <Text style={styles.quizHeaderText}>
          Question {currentIndex + 1} of {QUIZ_DATA.length}
        </Text>
        <Text style={styles.quizHeaderScore}>Score: {score}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
      </View>

      <Animated.ScrollView
        style={{ opacity: fadeAnim }}
        contentContainerStyle={styles.quizContent}
      >
        {/* Category label */}
        <Text style={styles.questionCategory}>
          QUESTION {currentIndex + 1} · {currentQuestion.category?.toUpperCase()}
        </Text>

        {/* Question */}
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <TouchableOpacity
              key={key}
              style={getOptionStyle(key)}
              onPress={() => handleSelectAnswer(key)}
              activeOpacity={0.8}
              disabled={showFeedback}
            >
              <View style={styles.optionInner}>
                <View style={styles.optionKeyCircle}>
                  <Text style={styles.optionKey}>{key.toUpperCase()}</Text>
                </View>
                <Text style={styles.optionValue}>{value}</Text>
                {getOptionIcon(key) && (
                  <Text style={styles.optionCheckIcon}>{getOptionIcon(key)}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback */}
        {showFeedback && (
          <View
            style={[
              styles.feedbackBox,
              selectedAnswer === currentQuestion.correctAnswer
                ? styles.feedbackCorrect
                : styles.feedbackWrong,
            ]}
          >
            <Text style={styles.feedbackText}>
              {selectedAnswer === currentQuestion.correctAnswer
                ? `✅ Correct! ${currentQuestion.explanation}`
                : `❌ ${currentQuestion.explanation}`}
            </Text>
          </View>
        )}

        {/* Next Button */}
        {showFeedback && (
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={handleNextAfterResult}
            activeOpacity={0.85}
          >
            <Text style={styles.nextBtnText}>
              {currentIndex + 1 >= QUIZ_DATA.length ? 'See Results 🏆' : 'Next Question →'}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0faf4' },
  startContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#f0faf4',
  },
  startEmoji: { fontSize: 70, marginBottom: 16 },
  startTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1a4731',
    marginBottom: 12,
  },
  startSubtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  startMeta: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    width: '100%',
    gap: 8,
    marginBottom: 28,
    
    elevation: 1,
  },
  startMetaText: { fontSize: 14, color: '#333', fontWeight: '600' },
  startBtn: {
    backgroundColor: '#1a4731',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 50,
  },
  startBtnText: { color: '#fff', fontSize: 17, fontWeight: '800' },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a4731',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  quizHeaderText: { color: '#b7e4c7', fontSize: 14, fontWeight: '700' },
  quizHeaderScore: { color: '#fff', fontSize: 15, fontWeight: '800' },
  progressTrack: {
    height: 4,
    backgroundColor: '#2d6a4f',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#52b788',
  },
  quizContent: {
    padding: 20,
    paddingBottom: 40,
  },
  questionCategory: {
    fontSize: 11,
    fontWeight: '800',
    color: '#888',
    letterSpacing: 1,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a1a',
    lineHeight: 26,
    marginBottom: 24,
  },
  optionsContainer: { gap: 10 },
  option: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#e8f5e9',
    padding: 14,
  },
  optionSelected: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#2d6a4f',
    padding: 14,
  },
  optionCorrect: {
    backgroundColor: '#f0fff4',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#40916c',
    padding: 14,
  },
  optionWrong: {
    backgroundColor: '#fff5f5',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#e63946',
    padding: 14,
  },
  optionInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionKeyCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0faf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionKey: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1a4731',
  },
  optionValue: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  optionCheckIcon: { fontSize: 16 },
  feedbackBox: {
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
  },
  feedbackCorrect: {
    backgroundColor: '#f0fff4',
    borderColor: '#74c69d',
  },
  feedbackWrong: {
    backgroundColor: '#fff5f5',
    borderColor: '#ffb3b3',
  },
  feedbackText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
  },
  nextBtn: {
    backgroundColor: '#1a4731',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});

