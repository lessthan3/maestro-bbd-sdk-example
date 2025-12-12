import React from "react";
import VideoPlayer from "./VideoPlayer";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <main className="app-main">
        <div className="video-section">
          <header className="app-header">
            <h1>Maestro SDK Example</h1>
          </header>
          <div className="video-wrapper">
            <VideoPlayer />
          </div>
        </div>

        <div id="panel-section"></div>
      </main>
    </div>
  );
};

export default App;
