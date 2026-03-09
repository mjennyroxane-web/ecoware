import React, { useState } from 'react';

export default function QuizResultScreen({ navigate, finalScore, total }) {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  const getTitle = () => {
    if (finalScore === total) return '🌍 Perfect Score! True EcoHero!';
    if (finalScore >= total * 0.8) return '🌿 Excellent! Eco Champion!';
    if (finalScore >= total * 0.6) return '♻️ Good Job! Keep Learning!';
    if (finalScore >= total * 0.4) return '🌱 Nice Try! Keep Growing!';
    return '📚 Keep Studying! You Can Do It!';
  };

  const getSubtitle = () => {
    if (finalScore === total) return `You answered all ${total} questions correctly. Our planet thanks you!`;
    return `You answered ${finalScore} out of ${total} correctly.`;
  };

  const handleSave = () => {
    if (!name.trim()) { alert('Please enter your name!'); return; }
    const scores = JSON.parse(localStorage.getItem('ecoScores') || '[]');
    scores.push({ name: name.trim(), score: finalScore, total, date: new Date().toISOString() });
    localStorage.setItem('ecoScores', JSON.stringify(scores));
    setSaved(true);
    alert(`✅ ${name.trim()}'s score of ${finalScore}/${total} saved!`);
  };

  return (
    <div style={styles.container}>
      <span style={styles.emoji}>🎉</span>

      <div style={styles.scoreCircle}>
        <span style={styles.scoreNum}>{finalScore}</span>
        <span style={styles.scoreMax}>/{total}</span>
      </div>

      <h2 style={styles.title}>{getTitle()}</h2>
      <p style={styles.subtitle}>{getSubtitle()}</p>

      {!saved ? (
        <div style={styles.saveBox}>
          <input
            style={styles.input}
            placeholder="Your name..."
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={30}
          />
          <button style={styles.saveBtn} onClick={handleSave}>
            🏆 Save Score
          </button>
        </div>
      ) : (
        <div style={styles.savedBadge}>✅ Score Saved!</div>
      )}

      <div style={styles.actions}>
        <button style={styles.retryBtn} onClick={() => navigate('quiz')}>
          🔄 Try Again
        </button>
        <button style={styles.homeBtn} onClick={() => navigate('home')}>
          🏠 Home
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#f0faf4',
    padding: 28,
    gap: 16,
    overflowY: 'auto',
  },
  emoji: { fontSize: 70 },
  scoreCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#fff',
    border: '4px solid #52b788',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 30px rgba(82,183,136,0.3)',
  },
  scoreNum: { fontSize: 38, fontWeight: 900, color: '#1a4731' },
  scoreMax: { fontSize: 18, fontWeight: 700, color: '#74c69d', alignSelf: 'flex-end', marginBottom: 8 },
  title: { fontSize: 18, fontWeight: 900, color: '#1a4731', textAlign: 'center', margin: 0 },
  subtitle: { fontSize: 13, color: '#555', textAlign: 'center', lineHeight: 1.5, margin: 0 },
  saveBox: { display: 'flex', flexDirection: 'column', gap: 10, width: '100%' },
  input: {
    backgroundColor: '#fff',
    border: '1.5px solid #d8f3dc',
    borderRadius: 12,
    padding: '12px 16px',
    fontSize: 15,
    color: '#222',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  saveBtn: {
    backgroundColor: '#40916c',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    padding: '14px 0',
    fontSize: 16,
    fontWeight: 800,
    cursor: 'pointer',
    width: '100%',
  },
  savedBadge: {
    backgroundColor: '#f0fff4',
    border: '1.5px solid #74c69d',
    borderRadius: 12,
    padding: '12px 24px',
    color: '#2d6a4f',
    fontWeight: 800,
    fontSize: 15,
  },
  actions: { display: 'flex', gap: 12, width: '100%' },
  retryBtn: {
    flex: 1,
    backgroundColor: '#1a4731',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    padding: '14px 0',
    fontSize: 15,
    fontWeight: 800,
    cursor: 'pointer',
  },
  homeBtn: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#1a4731',
    border: '2px solid #d8f3dc',
    borderRadius: 12,
    padding: '14px 0',
    fontSize: 15,
    fontWeight: 800,
    cursor: 'pointer',
  },
};
