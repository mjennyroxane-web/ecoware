import React from 'react';
import issues from '../data/issues.json';

const severityColors = {
  CRITICAL: { bg: '#fff0f0', text: '#d62828', border: '#ffbbbb' },
  HIGH: { bg: '#fff8e1', text: '#e67e22', border: '#f5d080' },
  MEDIUM: { bg: '#e8f5e9', text: '#2d6a4f', border: '#a5d6a7' },
  LOW: { bg: '#e3f2fd', text: '#1565c0', border: '#90caf9' },
};

export default function IssuesScreen({ navigate }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.headerIcon}>🌍</span>
        <span style={styles.headerTitle}>Sustainability Issues</span>
      </div>
      <div style={styles.list}>
        {issues.map((issue) => {
          const sev = severityColors[issue.severity] || severityColors.MEDIUM;
          return (
            <div
              key={issue.id}
              style={styles.card}
              onClick={() => navigate('issueDetail', { issue })}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'}
            >
              <div style={styles.cardLeft}>
                <div style={styles.iconCircle}>
                  <span style={styles.icon}>{issue.icon}</span>
                </div>
                <div style={styles.cardText}>
                  <span style={styles.cardTitle}>{issue.title}</span>
                  <span style={styles.cardCategory}>{issue.category}</span>
                  <span style={styles.cardDesc}>{issue.shortDesc}</span>
                </div>
              </div>
              <div style={{
                ...styles.badge,
                backgroundColor: sev.bg,
                color: sev.text,
                border: `1px solid ${sev.border}`,
              }}>
                {issue.severity}
              </div>
            </div>
          );
        })}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: '#1a4731',
  },
  list: {
    flex: 1,
    overflowY: 'auto',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    transition: 'box-shadow 0.2s ease',
  },
  cardLeft: {
    display: 'flex',
    gap: 12,
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#f0faf4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: { fontSize: 24 },
  cardText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 800,
    color: '#1a4731',
  },
  cardCategory: {
    fontSize: 11,
    color: '#888',
    fontWeight: 500,
  },
  cardDesc: {
    fontSize: 12,
    color: '#555',
    lineHeight: 1.5,
    marginTop: 2,
  },
  badge: {
    padding: '4px 10px',
    borderRadius: 20,
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 0.5,
    flexShrink: 0,
    marginLeft: 8,
    height: 'fit-content',
  },
};
