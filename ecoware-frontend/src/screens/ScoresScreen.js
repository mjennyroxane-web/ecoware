import React, { useState, useEffect } from 'react';

export default function ScoresScreen({ navigate }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('ecoScores') || '[]');
      setScores(data.sort((a, b) => b.score - a.score));
    } catch (e) { setScores([]); }
  }, []);

  const handleClear = () => {
    if (window.confirm('Delete all saved scores?')) {
      localStorage.removeItem('ecoScores');
      setScores([]);
    }
  };

  const getMedal = (i) => ['🥇', '🥈', '🥉'][i] || `#${i + 1}`;
  const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.headerIcon}>🏆</span>
        <span style={styles.headerTitle}>Leaderboard</span>
        {scores.length > 0 && (
          <button style={styles.clearBtn} onClick={handleClear}>Clear</button>
        )}
      </div>

      {scores.length === 0 ? (
        <div style={styles.empty}>
          <span style={styles.emptyEmoji}>📋</span>
          <h2 style={styles.emptyTitle}>No Scores Yet</h2>
          <p style={styles.emptySubtitle}>Take a quiz and save your score to see it here!</p>
          <button style={styles.quizBtn} onClick={() => navigate('quiz')}>
            🧩 Take Quiz
          </button>
        </div>
      ) : (
        <div style={styles.list}>
          {scores.map((item, i) => (
            <div key={i} style={{ ...styles.scoreCard, ...(i === 0 ? styles.topCard : {}) }}>
              <span style={styles.medal}>{getMedal(i)}</span>
              <div style={styles.info}>
                <span style={styles.scoreName}>{item.name}</span>
                <span style={styles.scoreDate}>{formatDate(item.date)}</span>
              </div>
              <div style={styles.right}>
                <span style={styles.scoreVal}>{item.score}<span style={styles.scoreOf}>/{item.total}</span></span>
                <span style={styles.scorePct}>{Math.round((item.score / item.total) * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
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
  headerTitle: { fontSize: 20, fontWeight: 800, color: '#1a4731', flex: 1 },
  clearBtn: {
    backgroundColor: '#fff0f0',
    color: '#d62828',
    border: 'none',
    borderRadius: 10,
    padding: '6px 12px',
    fontWeight: 700,
    fontSize: 13,
    cursor: 'pointer',
  },
  empty: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    gap: 12,
  },
  emptyEmoji: { fontSize: 60 },
  emptyTitle: { fontSize: 22, fontWeight: 900, color: '#1a4731', margin: 0 },
  emptySubtitle: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 1.5, margin: 0 },
  quizBtn: {
    backgroundColor: '#1a4731',
    color: '#fff',
    border: 'none',
    borderRadius: 14,
    padding: '14px 36px',
    fontSize: 15,
    fontWeight: 800,
    cursor: 'pointer',
  },
  list: {
    flex: 1,
    overflowY: 'auto',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  scoreCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  topCard: {
    border: '2px solid #ffd700',
    backgroundColor: '#fffdf0',
  },
  medal: { fontSize: 26, width: 36, textAlign: 'center' },
  info: { flex: 1, display: 'flex', flexDirection: 'column', gap: 2 },
  scoreName: { fontSize: 16, fontWeight: 800, color: '#1a1a1a' },
  scoreDate: { fontSize: 12, color: '#888' },
  right: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
  scoreVal: { fontSize: 22, fontWeight: 900, color: '#1a4731' },
  scoreOf: { fontSize: 14, color: '#74c69d' },
  scorePct: { fontSize: 12, color: '#74c69d', fontWeight: 700 },
};
