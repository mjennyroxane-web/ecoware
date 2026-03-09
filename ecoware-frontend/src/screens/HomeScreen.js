import React, { useState, useEffect } from 'react';
import issues from '../data/issues.json';
import quiz from '../data/quiz.json';
import videos from '../data/videos.json';

export default function HomeScreen({ navigate }) {
  const [topScore, setTopScore] = useState(0);

  useEffect(() => {
    try {
      const scores = JSON.parse(localStorage.getItem('ecoScores') || '[]');
      if (scores.length > 0) {
        setTopScore(Math.max(...scores.map(s => s.score)));
      }
    } catch (e) {}
  }, []);

  const menuItems = [
    { label: 'Issues', icon: '🌍', screen: 'issues' },
    { label: 'Take Quiz', icon: '🧩', screen: 'quiz' },
    { label: 'Videos', icon: '🎬', screen: 'videos' },
    { label: 'Scores', icon: '🏆', screen: 'scores' },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.headerIcon}>🌿</span>
          <span style={styles.headerTitle}>EcoAware</span>
        </div>
        <div style={styles.scoreBadge}>
          <span style={styles.scoreText}>Score: {topScore}</span>
        </div>
      </div>

      <div style={styles.scroll}>
        {/* Hero Banner */}
        <div style={styles.heroBanner}>
          <div style={styles.heroPill}>
            <span style={styles.heroPillText}>🌱 For Our Planet</span>
          </div>
          <h1 style={styles.heroTitle}>Learn. Quiz.<br />Make a Difference.</h1>
          <p style={styles.heroSubtitle}>Explore global sustainability challenges.</p>
        </div>

        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{issues.length}</span>
            <span style={styles.statLabel}>Issues</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{quiz.length}</span>
            <span style={styles.statLabel}>Questions</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{videos.length}</span>
            <span style={styles.statLabel}>Videos</span>
          </div>
        </div>

        {/* Menu Grid */}
        <div style={styles.menuGrid}>
          {menuItems.map((item) => (
            <button
              key={item.label}
              style={styles.menuCard}
              onClick={() => navigate(item.screen)}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={styles.menuIcon}>{item.icon}</span>
              <span style={styles.menuLabel}>{item.label}</span>
            </button>
          ))}
        </div>
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
    justifyContent: 'space-between',
    padding: '12px 20px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #e0f0e8',
    flexShrink: 0,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  headerIcon: { fontSize: 20 },
  headerTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: '#1a4731',
  },
  scoreBadge: {
    backgroundColor: '#1a4731',
    padding: '5px 12px',
    borderRadius: 20,
  },
  scoreText: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 13,
  },
  scroll: {
    flex: 1,
    overflowY: 'auto',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  heroBanner: {
    backgroundColor: '#1a4731',
    borderRadius: 18,
    padding: 22,
  },
  heroPill: {
    backgroundColor: '#2d6a4f',
    display: 'inline-block',
    padding: '5px 12px',
    borderRadius: 20,
    marginBottom: 12,
  },
  heroPillText: {
    color: '#74c69d',
    fontWeight: 700,
    fontSize: 12,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 900,
    color: '#fff',
    lineHeight: 1.25,
    margin: '0 0 8px 0',
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#b7e4c7',
    margin: 0,
  },
  statsRow: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: '16px 0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  statItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: 900,
    color: '#1a4731',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e8f5e9',
  },
  menuGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },
  menuIcon: { fontSize: 32 },
  menuLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1a4731',
  },
};
