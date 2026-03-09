import React from 'react';
import videos from '../data/videos.json';

export default function VideosScreen() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.headerIcon}>🎬</span>
        <span style={styles.headerTitle}>Eco Videos</span>
      </div>
      <div style={styles.list}>
        {videos.map((video) => (
          <div key={video.id} style={styles.card}>
            <div style={styles.thumbnail}>
              <span style={styles.thumbIcon}>{video.icon || '🎬'}</span>
              <div style={styles.durationBadge}>{video.duration}</div>
            </div>
            <div style={styles.cardBody}>
              <div style={styles.categoryPill}>{video.category}</div>
              <h3 style={styles.cardTitle}>{video.title}</h3>
              <p style={styles.cardDesc}>{video.description}</p>
              <div style={styles.cardFooter}>
                <span style={styles.channel}>📺 {video.channel}</span>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.watchBtn}
                >
                  ▶ Watch
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#f0faf4',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 20px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #e0f0e8',
    flexShrink: 0,
  },
  headerIcon: { fontSize: 22 },
  headerTitle: { fontSize: 20, fontWeight: 800, color: '#1a4731' },
  list: {
    flex: 1,
    overflowY: 'auto',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  },
  thumbnail: {
    height: 140,
    backgroundColor: '#1a4731',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  thumbIcon: { fontSize: 54 },
  durationBadge: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: '#fff',
    fontSize: 11,
    fontWeight: 700,
    padding: '3px 8px',
    borderRadius: 6,
  },
  cardBody: { padding: 16 },
  categoryPill: {
    display: 'inline-block',
    backgroundColor: '#d8f3dc',
    color: '#2d6a4f',
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 0.5,
    padding: '3px 10px',
    borderRadius: 20,
    marginBottom: 8,
  },
  cardTitle: { fontSize: 15, fontWeight: 800, color: '#1a1a1a', margin: '0 0 6px 0', lineHeight: 1.3 },
  cardDesc: { fontSize: 13, color: '#666', lineHeight: 1.5, margin: '0 0 10px 0' },
  cardFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  channel: { fontSize: 12, color: '#888', fontWeight: 600 },
  watchBtn: {
    backgroundColor: '#1a4731',
    color: '#fff',
    textDecoration: 'none',
    padding: '6px 16px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
  },
};
