import React, { useState } from 'react';
import quiz from '../data/quiz.json';

export default function QuizScreen({ navigate }) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const q = quiz[index];

  const handleSelect = (key) => {
    if (showFeedback) return;
    setSelected(key);
    setShowFeedback(true);
    if (key === q.correctAnswer) setScore(s => s + 1);
  };

  const handleNext = () => {
    const newScore = score + (selected === q.correctAnswer ? 0 : 0);
    if (index + 1 >= quiz.length) {
      navigate('quizResult', { finalScore: score, total: quiz.length });
    } else {
      setIndex(i => i + 1);
      setSelected(null);
      setShowFeedback(false);
    }
  };

  const getOptionStyle = (key) => {
    const base = { ...styles.option };
    if (!showFeedback) {
      if (selected === key) return { ...base, ...styles.optionSelected };
      return base;
    }
    if (key === q.correctAnswer) return { ...base, ...styles.optionCorrect };
    if (key === selected) return { ...base, ...styles.optionWrong };
    return base;
  };

  if (!started) {
    return (
      <div style={styles.startContainer}>
        <span style={styles.startEmoji}>🧩</span>
        <h1 style={styles.startTitle}>Eco Quiz</h1>
        <p style={styles.startSubtitle}>
          Test your knowledge on global sustainability with {quiz.length} questions.
        </p>
        <div style={styles.startMeta}>
          <span>📋 {quiz.length} Questions</span>
          <span>🏆 Score tracked</span>
          <span>🌍 Multiple topics</span>
        </div>
        <button style={styles.startBtn} onClick={() => setStarted(true)}>
          Start Quiz →
        </button>
      </div>
    );
  }

  const progress = (index / quiz.length) * 100;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.quizHeader}>
        <span style={styles.qHeaderText}>Question {index + 1} of {quiz.length}</span>
        <span style={styles.qHeaderScore}>Score: {score}</span>
      </div>
      {/* Progress */}
      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }} />
      </div>

      <div style={styles.scroll}>
        <p style={styles.category}>QUESTION {index + 1} · {q.category?.toUpperCase()}</p>
        <h2 style={styles.question}>{q.question}</h2>

        <div style={styles.options}>
          {Object.entries(q.options).map(([key, val]) => (
            <button
              key={key}
              style={getOptionStyle(key)}
              onClick={() => handleSelect(key)}
              disabled={showFeedback}
            >
              <div style={styles.optionInner}>
                <div style={styles.keyCircle}><span style={styles.keyText}>{key}</span></div>
                <span style={styles.optionVal}>{val}</span>
                {showFeedback && key === q.correctAnswer && <span>✅</span>}
                {showFeedback && key === selected && key !== q.correctAnswer && <span>❌</span>}
              </div>
            </button>
          ))}
        </div>

        {showFeedback && (
          <div style={{
            ...styles.feedback,
            ...(selected === q.correctAnswer ? styles.feedbackCorrect : styles.feedbackWrong),
          }}>
            {selected === q.correctAnswer ? '✅' : '❌'} {q.explanation}
          </div>
        )}

        {showFeedback && (
          <button style={styles.nextBtn} onClick={handleNext}>
            {index + 1 >= quiz.length ? 'See Results 🏆' : 'Next Question →'}
          </button>
        )}
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
  startContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 30,
    backgroundColor: '#f0faf4',
    gap: 16,
  },
  startEmoji: { fontSize: 70 },
  startTitle: { fontSize: 32, fontWeight: 900, color: '#1a4731', margin: 0 },
  startSubtitle: { fontSize: 15, color: '#555', textAlign: 'center', lineHeight: 1.5, margin: 0 },
  startMeta: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: 600,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  startBtn: {
    backgroundColor: '#1a4731',
    color: '#fff',
    border: 'none',
    borderRadius: 14,
    padding: '15px 50px',
    fontSize: 17,
    fontWeight: 800,
    cursor: 'pointer',
    width: '100%',
  },
  quizHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a4731',
    padding: '12px 20px',
    flexShrink: 0,
  },
  qHeaderText: { color: '#b7e4c7', fontSize: 13, fontWeight: 700 },
  qHeaderScore: { color: '#fff', fontSize: 15, fontWeight: 800 },
  progressTrack: {
    height: 4,
    backgroundColor: '#2d6a4f',
    flexShrink: 0,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#52b788',
    transition: 'width 0.3s ease',
  },
  scroll: {
    flex: 1,
    overflowY: 'auto',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  category: {
    fontSize: 11,
    fontWeight: 800,
    color: '#888',
    letterSpacing: 1,
    margin: 0,
  },
  question: {
    fontSize: 18,
    fontWeight: 800,
    color: '#1a1a1a',
    lineHeight: 1.4,
    margin: 0,
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  option: {
    backgroundColor: '#fff',
    borderRadius: 14,
    border: '2px solid #e8f5e9',
    padding: 14,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'border-color 0.15s',
  },
  optionSelected: {
    border: '2px solid #2d6a4f',
  },
  optionCorrect: {
    backgroundColor: '#f0fff4',
    border: '2px solid #40916c',
  },
  optionWrong: {
    backgroundColor: '#fff5f5',
    border: '2px solid #e63946',
  },
  optionInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  keyCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0faf4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  keyText: { fontSize: 12, fontWeight: 800, color: '#1a4731' },
  optionVal: { flex: 1, fontSize: 15, color: '#222', fontWeight: 500 },
  feedback: {
    borderRadius: 12,
    padding: 14,
    fontSize: 13,
    lineHeight: 1.5,
    border: '1px solid',
  },
  feedbackCorrect: {
    backgroundColor: '#f0fff4',
    borderColor: '#74c69d',
    color: '#1a4731',
  },
  feedbackWrong: {
    backgroundColor: '#fff5f5',
    borderColor: '#ffb3b3',
    color: '#d62828',
  },
  nextBtn: {
    backgroundColor: '#1a4731',
    color: '#fff',
    border: 'none',
    borderRadius: 14,
    padding: '15px 0',
    fontSize: 16,
    fontWeight: 800,
    cursor: 'pointer',
    width: '100%',
  },
};
