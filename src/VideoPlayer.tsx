import React, { useRef } from 'react';

const VIDEO_URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        className="video-element"
        src={VIDEO_URL}
        controls
        autoPlay={false}
        playsInline
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
