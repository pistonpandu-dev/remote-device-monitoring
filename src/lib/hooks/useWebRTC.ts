import { useState, useRef, useEffect } from 'react';

interface WebRTCConfig {
  iceServers?: RTCIceServer[];
  constraints?: MediaStreamConstraints;
}

export function useWebRTC(config?: WebRTCConfig) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'new' | 'connecting' | 'connected' | 'disconnected' | 'failed'>('new');
  
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const dataChannel = useRef<RTCDataChannel | null>(null);

  const defaultConfig: RTCConfiguration = {
    iceServers: config?.iceServers || [
      { urls: 'stun:stun.l.google.com:19302' },
    ],
  };

  const createPeerConnection = async () => {
    const pc = new RTCPeerConnection(defaultConfig);
    
    pc.oniceconnectionstatechange = () => {
      setConnectionStatus(pc.iceConnectionState);
    };

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        // Handle ICE candidate
        console.log('ICE candidate:', event.candidate);
      }
    };

    return pc;
  };

  const createOffer = async () => {
    try {
      const pc = await createPeerConnection();
      peerConnection.current = pc;

      const stream = await navigator.mediaDevices.getUserMedia(
        config?.constraints || { video: true, audio: true }
      );
      setLocalStream(stream);
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      setConnectionStatus('connecting');
      setIsConnected(true);

      return offer;
    } catch (error) {
      console.error('Error creating offer:', error);
      throw error;
    }
  };

  const createAnswer = async (offer: RTCSessionDescriptionInit) => {
    try {
      const pc = await createPeerConnection();
      peerConnection.current = pc;

      const stream = await navigator.mediaDevices.getUserMedia(
        config?.constraints || { video: true, audio: true }
      );
      setLocalStream(stream);
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      setConnectionStatus('connecting');
      setIsConnected(true);

      return answer;
    } catch (error) {
      console.error('Error creating answer:', error);
      throw error;
    }
  };

  const setRemoteDescription = async (description: RTCSessionDescriptionInit) => {
    if (!peerConnection.current) {
      throw new Error('Peer connection not initialized');
    }
    await peerConnection.current.setRemoteDescription(description);
  };

  const addIceCandidate = async (candidate: RTCIceCandidateInit) => {
    if (!peerConnection.current) {
      throw new Error('Peer connection not initialized');
    }
    await peerConnection.current.addIceCandidate(candidate);
  };

  const closeConnection = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    setRemoteStream(null);
    setIsConnected(false);
    setConnectionStatus('disconnected');
  };

  useEffect(() => {
    return () => {
      closeConnection();
    };
  }, []);

  return {
    localStream,
    remoteStream,
    isConnected,
    connectionStatus,
    createOffer,
    createAnswer,
    setRemoteDescription,
    addIceCandidate,
    closeConnection,
  };
}
