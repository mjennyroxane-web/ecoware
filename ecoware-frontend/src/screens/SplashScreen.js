import React, { useEffect, useState } from 'react';

export default function SplashScreen({ navigate }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const steps = duration / interval;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setProgress(Math.min((current / steps) * 100, 100));
      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => navigate('home'), 200);
      }
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.globeWrapper}>
          <span style={styles.globe}>🌍</span>
        </div>
        <h1 style={styles.title}>EcoAware</h1>
        <p style={styles.tagline}>Understand. Act. Sustain.</p>
      </div>
      <div style={styles.progressContainer}>
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }} />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .globe-anim { animation: float 3s ease-in-out infinite; }
        .content-anim { animation: fadeIn 0.8s ease forwards; }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#1a4731',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: 'fadeIn 0.8s ease forwards',
  },
  globeWrapper: {
    marginBottom: 20,
    animation: 'float 3s ease-in-out infinite',
  },
  globe: {
    fontSize: 80,
    display: 'block',
  },
  title: {
    fontSize: 38,
    fontWeight: 900,
    color: '#ffffff',
    letterSpacing: 1,
    marginBottom: 10,
    margin: '0 0 10px 0',
  },
  tagline: {
    fontSize: 15,
    color: '#74c69d',
    letterSpacing: 0.5,
    fontWeight: 500,
    margin: 0,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 80,
    width: '55%',
  },
  progressTrack: {
    width: '100%',
    height: 5,
    backgroundColor: '#2d6a4f',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#52b788',
    borderRadius: 10,
    transition: 'width 0.03s linear',
  },
};
