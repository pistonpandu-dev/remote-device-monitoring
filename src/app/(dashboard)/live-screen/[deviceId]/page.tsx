'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSocket } from '@/lib/hooks/useSocket';
import { Device } from '@/types';
import { 
  ArrowLeft,
  Monitor,
  Maximize2,
  Minimize2,
  RotateCw,
  Camera,
  Activity,
  Signal,
  Download,
  RefreshCw,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function LiveScreenDevicePage() {
  const params = useParams();
  const router = useRouter();
  const deviceId = params.deviceId as string;
  const [isStreaming, setIsStreaming] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [streamData, setStreamData] = useState<any>(null);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket();

  const { data: device, isLoading } = useQuery({
    queryKey: ['device', deviceId],
    queryFn: async () => {
      const response = await apiClient.get(`/devices/${deviceId}`);
      return response.data as Device;
    },
  });

  useEffect(() => {
    if (!socket) return;

    socket.on(`stream:${deviceId}:data`, (data) => {
      setStreamData(data);
    });

    socket.on(`stream:${deviceId}:status`, (data) => {
      setIsStreaming(data.isStreaming);
      if (data.isStreaming) {
        toast.success('Stream started');
      } else {
        toast.info('Stream stopped');
      }
    });

    socket.on(`stream:${deviceId}:error`, (data) => {
      toast.error(data.message || 'Stream error occurred');
      if (data.reconnect) {
        handleReconnect();
      }
    });

    return () => {
      socket.off(`stream:${deviceId}:data`);
      socket.off(`stream:${deviceId}:status`);
      socket.off(`stream:${deviceId}:error`);
    };
  }, [socket, deviceId]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const startStream = async () => {
    try {
      await apiClient.post(`/devices/${deviceId}/stream/start`);
      toast.success('Starting stream...');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to start stream');
    }
  };

  const stopStream = async () => {
    try {
      await apiClient.post(`/devices/${deviceId}/stream/stop`);
      toast.success('Stopping stream...');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to stop stream');
    }
  };

  const handleReconnect = async () => {
    setIsReconnecting(true);
    try {
      await apiClient.post(`/devices/${deviceId}/stream/reconnect`);
      toast.success('Reconnecting...');
      setTimeout(() => {
        setIsReconnecting(false);
      }, 3000);
    } catch (error: any) {
      toast.error('Failed to reconnect');
      setIsReconnecting(false);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const toggleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const takeScreenshot = () => {
    // Implement screenshot functionality
    toast.success('Screenshot captured');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!device) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <p className="text-lg font-medium">Device not found</p>
        <Button onClick={() => router.push('/live-screen')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Live Screen
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6" ref={containerRef}>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/live-screen')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Live Screen</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{device.deviceName}</span>
              <span>•</span>
              <Badge variant={device.isOnline ? 'success' : 'secondary'}>
                {device.isOnline ? 'Online' : 'Offline'}
              </Badge>
              {isStreaming && (
                <Badge variant="warning" className="animate-pulse">
                  <Activity className="mr-1 h-3 w-3" />
                  LIVE
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {isStreaming ? (
            <Button variant="destructive" onClick={stopStream}>
              <Pause className="mr-2 h-4 w-4" />
              Stop Stream
            </Button>
          ) : (
            <Button onClick={startStream} disabled={!device.isOnline}>
              <Play className="mr-2 h-4 w-4" />
              Start Stream
            </Button>
          )}
        </div>
      </div>

      {/* Stream View */}
      <Card>
        <CardContent className="p-0">
          <div className="relative aspect-video bg-black">
            {isStreaming ? (
              <>
                <video
                  ref={videoRef}
                  className="h-full w-full object-contain"
                  style={{ transform: `rotate(${rotation}deg)` }}
                  autoPlay
                  muted={isMuted}
                />
                {/* Stream Controls Overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                    onClick={toggleRotate}
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                    onClick={takeScreenshot}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                    onClick={handleReconnect}
                    disabled={isReconnecting}
                  >
                    <RefreshCw className={`h-4 w-4 ${isReconnecting ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-gray-500">
                  <Monitor className="mx-auto h-16 w-16" />
                  <p className="mt-4 text-lg">No active stream</p>
                  <p className="text-sm">
                    {device.isOnline ? 'Click "Start Stream" to begin' : 'Device is offline'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stream Info */}
      {isStreaming && streamData && (
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">FPS</p>
                  <p className="text-lg font-bold">{streamData.fps || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Signal className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Bitrate</p>
                  <p className="text-lg font-bold">{streamData.bitrate || '0 Kbps'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Resolution</p>
                  <p className="text-lg font-bold">{streamData.resolution || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Latency</p>
                  <p className="text-lg font-bold">{streamData.latency || '0ms'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Device Info */}
      <Card>
        <CardHeader>
          <CardTitle>Device Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">Manufacturer</p>
              <p className="font-medium">{device.manufacturer || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Model</p>
              <p className="font-medium">{device.model || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Android Version</p>
              <p className="font-medium">{device.androidVersion || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Battery</p>
              <p className="font-medium">{device.battery}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CPU</p>
              <p className="font-medium">{device.cpu || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">RAM</p>
              <p className="font-medium">{device.ram || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Storage</p>
              <p className="font-medium">{device.storage || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">IP Address</p>
              <p className="font-medium">{device.ipAddress || 'Unknown'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
