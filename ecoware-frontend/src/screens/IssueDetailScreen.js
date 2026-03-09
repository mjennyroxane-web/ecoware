import React from 'react';

const severityColors = {
  CRITICAL: { bg: '#fff0f0', text: '#d62828', border: '#ffbbbb' },
  HIGH: { bg: '#fff8e1', text: '#e67e22', border: '#f5d080' },
  MEDIUM: { bg: '#e8f5e9', text: '#2d6a4f', border: '#a5d6a7' },
  LOW: { bg: '#e3f2fd', text: '#1565c0', border: '#90caf9' },
};

export default function IssueDetailScreen({ navigate, issue }) {
  if (!issue) { navigate('issues'); return null; }
  const sev = severityColors[issue.severity] || severityColors.MEDIUM;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('issues')}>← Back</button>
        <span style={styles.headerTitle}>{issue.title}</span>
        <div style={{ width: 60 }} />
      </div>
      <div style={styles.scroll}>
        {/* Hero */}
        <div style={styles.heroCard}>
          <span style={styles.heroIcon}>{issue.icon}</span>
          <h2 style={styles.heroTitle}>{issue.title}</h2>
          <p style={styles.heroCategory}>{issue.category}</p>
          <div style={{
            ...styles.badge,
            backgroundColor: sev.bg,
            color: sev.text,
            border: `1px solid ${sev.border}`,
          }}>
            {issue.severity}
          </div>
        </div>

        {/* Overview */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Overview</h3>
          <p style={styles.sectionBody}>{issue.description}</p>
        </div>

        {/* Facts */}
        {issue.facts?.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Key Facts</h3>
            {issue.facts.map((f, i) => (
              <div key={i} style={styles.factRow}>
                <span>🔹</span>
                <span style={styles.factText}>{f}</span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {issue.actions?.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>What You Can Do</h3>
            {issue.actions.map((a, i) => (
              <div key={i} style={styles.factRow}>
                <span>✅</span>
                <span style={styles.factText}>{a}</span>
              </div>
            ))}
          </div>
        )}

        <button style={styles.quizBtn} onClick={() => navigate('quiz')}>
          🧩 Test Your Knowledge
        </button>
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
    padding: '12px 16px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #e0f0e8',
    flexShrink: 0,
  },
  backBtn: {
    background: '#f0faf4',
    border: 'none',
    borderRadius: 10,
    padding: '6px 12px',
    fontSize: 13,
    fontWeight: 700,
    color: '#1a4731',
    cursor: 'pointer',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 800,
    color: '#1a4731',
    flex: 1,
    textAlign: 'center',
    margin: '0 8px',
  },
  scroll: {
    flex: 1,
    overflowY: 'auto',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  heroCard: {
    backgroundColor: '#1a4731',
    borderRadius: 18,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heroIcon: { fontSize: 56, marginBottom: 12 },
  heroTitle: {
    fontSize: 22,
    fontWeight: 900,
    color: '#fff',
    margin: '0 0 4px 0',
    textAlign: 'center',
  },
  heroCategory: {
    fontSize: 13,
    color: '#b7e4c7',
    margin: '0 0 12px 0',
  },
  badge: {
    padding: '5px 14px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 800,
    color: '#1a4731',
    margin: '0 0 10px 0',
  },
  sectionBody: {
    fontSize: 14,
    color: '#444',
    lineHeight: 1.6,
    margin: 0,
  },
  factRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  factText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 1.5,
    flex: 1,
  },
  quizBtn: {
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
