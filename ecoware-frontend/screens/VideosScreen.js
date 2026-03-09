import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';

const VIDEOS_DATA = require('../data/videos.json');

function VideoCard({ item }) {
  const handlePress = async () => {
    const url = item.url;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert('Cannot open link', 'This URL cannot be opened on your device.');
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      {/* Thumbnail placeholder */}
      <View style={styles.thumbnail}>
        <Text style={styles.thumbnailIcon}>{item.icon || '🎬'}</Text>
        <View style={styles.playBadge}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.channelRow}>
          <Text style={styles.channel}>📺 {item.channel}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function VideosScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0faf4" />
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🎬</Text>
        <Text style={styles.headerTitle}>Eco Videos</Text>
      </View>
      <FlatList
        data={VIDEOS_DATA}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, gap: 14 }}
        renderItem={({ item }) => <VideoCard item={item} />}
      />
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
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    
    elevation: 3,
  },
  thumbnail: {
    height: 150,
    backgroundColor: '#1a4731',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  thumbnailIcon: { fontSize: 56 },
  playBadge: {
    position: 'absolute',
    bottom: 12,
    right: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  playIcon: { color: '#fff', fontSize: 12, fontWeight: '800' },
  durationBadge: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  durationText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  cardBody: { padding: 16 },
  categoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#d8f3dc',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#2d6a4f',
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 6,
    lineHeight: 20,
  },
  cardDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 10,
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },
});

