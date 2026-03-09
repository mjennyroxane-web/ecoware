import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const severityColors = {
  CRITICAL: { bg: '#fff0f0', text: '#d62828', border: '#fbb' },
  HIGH: { bg: '#fff8e1', text: '#e67e22', border: '#f5d080' },
  MEDIUM: { bg: '#e8f5e9', text: '#2d6a4f', border: '#a5d6a7' },
  LOW: { bg: '#e3f2fd', text: '#1565c0', border: '#90caf9' },
};

export default function IssueDetailScreen({ route, navigation }) {
  const { issue } = route.params;
  const severity = severityColors[issue.severity] || severityColors.MEDIUM;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0faf4" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#1a4731" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {issue.title}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Icon & Title */}
        <View style={styles.heroCard}>
          <Text style={styles.heroIcon}>{issue.icon}</Text>
          <Text style={styles.heroTitle}>{issue.title}</Text>
          <Text style={styles.heroCategory}>{issue.category}</Text>
          <View style={[styles.badge, { backgroundColor: severity.bg, borderColor: severity.border }]}>
            <Text style={[styles.badgeText, { color: severity.text }]}>{issue.severity}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.sectionBody}>{issue.description}</Text>
        </View>

        {/* Key Facts */}
        {issue.facts && issue.facts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Facts</Text>
            {issue.facts.map((fact, i) => (
              <View key={i} style={styles.factRow}>
                <Text style={styles.factBullet}>🔹</Text>
                <Text style={styles.factText}>{fact}</Text>
              </View>
            ))}
          </View>
        )}

        {/* What You Can Do */}
        {issue.actions && issue.actions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What You Can Do</Text>
            {issue.actions.map((action, i) => (
              <View key={i} style={styles.factRow}>
                <Text style={styles.factBullet}>✅</Text>
                <Text style={styles.factText}>{action}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.quizBtn}
          onPress={() => navigation.navigate('Quiz')}
          activeOpacity={0.85}
        >
          <Text style={styles.quizBtnText}>🧩 Test Your Knowledge</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0faf4' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0f0e8',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0faf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1a4731',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  content: { padding: 16, paddingBottom: 40 },
  heroCard: {
    backgroundColor: '#1a4731',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  heroIcon: { fontSize: 54, marginBottom: 12 },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 4,
  },
  heroCategory: {
    fontSize: 13,
    color: '#b7e4c7',
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1a4731',
    marginBottom: 10,
  },
  sectionBody: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
  factRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  factBullet: { fontSize: 14, marginTop: 2 },
  factText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  quizBtn: {
    backgroundColor: '#1a4731',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  quizBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});
