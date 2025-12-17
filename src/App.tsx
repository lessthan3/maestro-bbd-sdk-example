import React, { useCallback, useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import SDK, { IMaestroEvent } from "@maestro_io/maestro-web-sdk";
import { AppDelegate } from "./AppDelegate";

const delegate = new AppDelegate();

const PAGE_ID = "YOUR_PAGE_ID";
const SITE_ID = "YOUR_SITE_ID";

const App: React.FC = () => {
  const eventViewModel = useRef<IMaestroEvent | null>(null);
  const unmountFunction = useRef<(() => Promise<void>) | null>(null);
  const quitButtonRef = useRef<HTMLButtonElement>(null);
  const panelButtonRef = useRef<HTMLButtonElement>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  const showPanel = async () => {
    setPanelVisible(true);
    unmountFunction.current = await SDK.renderPanel("panel-section");

    if (eventViewModel.current) {
      await eventViewModel.current.didShowPanel();
    }
  };

  const hidePanel = useCallback(async () => {
    setPanelVisible(false);
    if (unmountFunction.current) {
      await unmountFunction.current();
      unmountFunction.current = null;
    }
    panelButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    SDK.configure({
      siteID: SITE_ID,
    });
    quitButtonRef.current?.focus();
  }, []);

  const onPanelClick = async () => {
    if (!videoVisible) {
      return;
    }

    if (panelVisible) {
      await hidePanel();
    } else {
      await showPanel();
    }
  };

  const onEventToggleClick = async () => {
    if (videoVisible) {
      setVideoVisible(false);
      await SDK.userDidStopWatchingEvent({
        pageId: PAGE_ID,
      });
    } else {
      setVideoVisible(true);
      eventViewModel.current = await SDK.userDidStartWatchingEvent({
        pageId: PAGE_ID,
        delegate,
        useProdEnv: false,
      });
    }
  };

  return (
    <div className="app-container">
      <main className="app-main">
        <div className="video-section">
          <header className="app-header">
            <h1>Maestro SDK Example</h1>
            <div>
              <button
                ref={quitButtonRef}
                style={{
                  marginRight: "10px",
                }}
                id="quit-btn"
                className="panel-toggle-btn"
                onClick={onEventToggleClick}
                onKeyDown={async (e) => {
                  if (e.key === "ArrowRight" || e.key === "Right") {
                    const button = document.getElementById("panel-toggle-tbn");
                    if (button) {
                      button.focus();
                    }
                  }
                }}
              >
                {videoVisible ? "Stop Watching Event" : "Start Watching Event"}
              </button>
              <button
                ref={panelButtonRef}
                id="panel-toggle-tbn"
                className="panel-toggle-btn"
                onClick={onPanelClick}
                onKeyDown={async (e) => {
                  if (e.key === "ArrowRight" || e.key === "Right") {
                    if (panelVisible && eventViewModel.current) {
                      // Pass focus down to the SDK and blur current button
                      await eventViewModel.current.startFocusManagement();
                      const button =
                        document.getElementById("panel-toggle-tbn");
                      if (button) {
                        button.blur();
                      }
                    }
                  }

                  if (e.key === "ArrowLeft" || e.key === "Left") {
                    const button = document.getElementById("quit-btn");
                    if (button) {
                      button.focus();
                    }
                  }
                }}
              >
                {panelVisible ? "Hide Panel" : "Show Panel"}
              </button>
            </div>
          </header>
          <div className="video-wrapper">
            {videoVisible ? <VideoPlayer /> : <p>No event is being watched.</p>}
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
