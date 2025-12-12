import React, { useCallback, useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import SDK, { IMaestroEvent } from "@maestro_io/maestro-web-sdk";
import { AppDelegate } from "./AppDelegate";

const delegate = new AppDelegate();
const App: React.FC = () => {
  const eventViewModel = useRef<IMaestroEvent | null>(null);
  const unmountFunction = useRef<(() => Promise<void>) | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [panelVisible, setPanelVisible] = useState(false);

  const showPanel = useCallback(async () => {
    setPanelVisible(true);
    eventViewModel.current = await SDK.userDidStartWatchingEvent(
      "401790363",
      delegate
    );
    unmountFunction.current = await SDK.renderPanel("panel-section");
  }, []);

  const hidePanel = useCallback(async () => {
    setPanelVisible(false);
    if (unmountFunction.current) {
      await unmountFunction.current();
      unmountFunction.current = null;
    }
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    SDK.configure({
      siteID: "664b9c57d59a7a431542d814",
    });
    buttonRef.current?.focus();
  }, []);

  const onClick = async () => {
    if (panelVisible) {
      await hidePanel();
    } else {
      await showPanel();
    }
  };

  return (
    <div className="app-container">
      <main className="app-main">
        <div className="video-section">
          <header className="app-header">
            <h1>Maestro SDK Example</h1>
            <button
              ref={buttonRef}
              id="panel-toggle-tbn"
              className="panel-toggle-btn"
              onClick={onClick}
              onKeyDown={async (e) => {
                if (e.key === "ArrowRight" || e.key === "Right") {
                  if (panelVisible && eventViewModel.current) {
                    // Pass focus down to the SDK and blur current button
                    await eventViewModel.current.startFocusManagement();
                    const button = document.getElementById("panel-toggle-tbn");
                    if (button) {
                      button.blur();
                    }
                  }
                }
              }}
            >
              {panelVisible ? "Hide Panel" : "Show Panel"}
            </button>
          </header>
          <div className="video-wrapper">
            <VideoPlayer />
          </div>
        </div>

        <div
          id="panel-section"
          className={`panel-section ${panelVisible ? "" : "panel-hidden"}`}
        ></div>
      </main>
    </div>
  );
};

export default App;
