import React from 'react';
import VideoPlayer from './VideoPlayer';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Maestro SDK Example</h1>
      </header>

      <main className="app-main">
        <div className="video-section">
          <VideoPlayer />
        </div>

        <div className="panel-section">
          <div className="panel-placeholder">
            <p>Panel Manager</p>
            <span>SDK panels will render here</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
