import React, { useState } from 'react';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import IssuesScreen from './screens/IssuesScreen';
import IssueDetailScreen from './screens/IssueDetailScreen';
import QuizScreen from './screens/QuizScreen';
import QuizResultScreen from './screens/QuizResultScreen';
import VideosScreen from './screens/VideosScreen';
import ScoresScreen from './screens/ScoresScreen';

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [params, setParams] = useState({});
  const [tab, setTab] = useState('home');

  const navigate = (screenName, screenParams = {}) => {
    setScreen(screenName);
    setParams(screenParams);
    if (['home', 'issues', 'quiz', 'videos'].includes(screenName)) {
      setTab(screenName);
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen navigate={navigate} />;
      case 'home':
        return <HomeScreen navigate={navigate} />;
      case 'issues':
        return <IssuesScreen navigate={navigate} />;
      case 'issueDetail':
        return <IssueDetailScreen navigate={navigate} issue={params.issue} />;
      case 'quiz':
        return <QuizScreen navigate={navigate} />;
      case 'quizResult':
        return <QuizResultScreen navigate={navigate} finalScore={params.finalScore} total={params.total} />;
      case 'videos':
        return <VideosScreen navigate={navigate} />;
      case 'scores':
        return <ScoresScreen navigate={navigate} />;
      default:
        return <HomeScreen navigate={navigate} />;
    }
  };

  const showTabs = !['splash', 'issueDetail', 'quizResult'].includes(screen);

  return (
    <div style={styles.appContainer}>
      {/* Phone frame */}
      <div style={styles.phoneFrame}>
        <div style={styles.phoneNotch} />
        <div style={styles.screenArea}>
          {renderScreen()}
        </div>
        {showTabs && (
          <div style={styles.tabBar}>
            {[
              { key: 'home', icon: '🏠', label: 'Home' },
              { key: 'issues', icon: '🌍', label: 'Issues' },
              { key: 'quiz', icon: '🧩', label: 'Quiz' },
              { key: 'videos', icon: '🎬', label: 'Videos' },
            ].map((t) => (
              <button
                key={t.key}
                style={{
                  ...styles.tabItem,
                  color: tab === t.key ? '#2d6a4f' : '#aaa',
                }}
                onClick={() => navigate(t.key)}
              >
                <span style={styles.tabIcon}>{t.icon}</span>
                <span style={{
                  ...styles.tabLabel,
                  color: tab === t.key ? '#2d6a4f' : '#aaa',
                  fontWeight: tab === t.key ? '700' : '500',
                }}>{t.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    minHeight: '100vh',
    backgroundColor: '#0f2419',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', sans-serif",
  },
  phoneFrame: {
    width: 390,
    height: 844,
    backgroundColor: '#f0faf4',
    borderRadius: 50,
    overflow: 'hidden',
    boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 2px #333',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  phoneNotch: {
    width: 120,
    height: 28,
    backgroundColor: '#111',
    borderRadius: '0 0 20px 20px',
    alignSelf: 'center',
    zIndex: 10,
    flexShrink: 0,
  },
  screenArea: {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTop: '1px solid #e0e0e0',
    height: 64,
    flexShrink: 0,
  },
  tabItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    gap: 2,
    padding: '6px 0',
  },
  tabIcon: { fontSize: 20 },
  tabLabel: { fontSize: 11 },
};
