import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const ISSUES_DATA = require('../data/issues.json');

const severityColors = {
  CRITICAL: { bg: '#fff0f0', text: '#d62828', border: '#fbb' },
  HIGH: { bg: '#fff8e1', text: '#e67e22', border: '#f5d080' },
  MEDIUM: { bg: '#e8f5e9', text: '#2d6a4f', border: '#a5d6a7' },
  LOW: { bg: '#e3f2fd', text: '#1565c0', border: '#90caf9' },
};

function IssueCard({ item, onPress }) {
  const severity = severityColors[item.severity] || severityColors.MEDIUM;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)} activeOpacity={0.8}>
      <View style={styles.cardLeft}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>{item.icon}</Text>
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardCategory}>{item.category}</Text>
          <Text style={styles.cardDesc} numberOfLines={2}>
            {item.shortDesc}
          </Text>
        </View>
      </View>
      <View style={[styles.badge, { backgroundColor: severity.bg, borderColor: severity.border }]}>
        <Text style={[styles.badgeText, { color: severity.text }]}>{item.severity}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function IssuesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0faf4" />
      <View style={styles.header}>
        <Text style={styles.globe}>🌍</Text>
        <Text style={styles.headerTitle}>Sustainability Issues</Text>
      </View>
      <FlatList
        data={ISSUES_DATA}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          <IssueCard item={item} onPress={(issue) => navigation.navigate('IssueDetail', { issue })} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0faf4',
  },
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
  globe: { fontSize: 22 },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a4731',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    
    elevation: 2,
  },
  cardLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#f0faf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 24 },
  cardText: { flex: 1 },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1a4731',
    marginBottom: 2,
  },
  cardCategory: {
    fontSize: 11,
    color: '#888',
    marginBottom: 4,
    fontWeight: '500',
  },
  cardDesc: {
    fontSize: 12,
    color: '#555',
    lineHeight: 17,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

