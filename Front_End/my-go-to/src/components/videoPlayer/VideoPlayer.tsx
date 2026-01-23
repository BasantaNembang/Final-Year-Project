"use client";

import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  streamURL: string,
}

const posterURL = './loading.jpg'

const VideoPlayer = ({ streamURL }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);


  //`http://localhost:9292/hls/c235aad4-daa8-43a2-9637-032cae54f8c3/1767078910266/master.m3u8`

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    //const src = `http://localhost:9292/hls/${stream_ID}/master.m3u8`;
    const src = streamURL!;

    let hls: Hls | null = null;

    // Safari (native HLS)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {  //you have to do hardwork i.e play()
      video.src = src;
      video.play().catch(() => {});
      return;
    }

    // Chrome / Firefox / Edge
    if (Hls.isSupported()) {     //hls will take care of play, buffering, quality and so on......... 
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    }

    return () => {
      if (hls) hls.destroy();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [streamURL]);

  return (
    <video
      ref={videoRef}
      controls
      muted
      autoPlay
      playsInline
      poster={posterURL}
    />
  );
};

export default VideoPlayer;
