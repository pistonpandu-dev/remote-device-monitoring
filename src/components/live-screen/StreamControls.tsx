'use client';

import { Button } from '@/components/ui/button';
import { 
  Play, 
  Pause, 
  Maximize2, 
  Minimize2, 
  RotateCw, 
  Camera, 
  Volume2, 
  VolumeX,
  RefreshCw
} from 'lucide-react';

interface StreamControlsProps {
  isStreaming: boolean;
  isFullscreen: boolean;
  isMuted: boolean;
  isReconnecting: boolean;
  onToggleStream: () => void;
  onToggleFullscreen: () => void;
  onRotate: () => void;
  onScreenshot: () => void;
  onToggleMute: () => void;
  onReconnect: () => void;
  disabled?: boolean;
}

export function StreamControls({
  isStreaming,
  isFullscreen,
  isMuted,
  isReconnecting,
  onToggleStream,
  onToggleFullscreen,
  onRotate,
  onScreenshot,
  onToggleMute,
  onReconnect,
  disabled,
}: StreamControlsProps) {
  return (
    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
      <Button
        variant="secondary"
        size="icon"
        className="h-9 w-9 rounded-full bg-black/50 hover:bg-black/70"
        onClick={onToggleFullscreen}
        disabled={disabled}
      >
        {isFullscreen ? (
          <Minimize2 className="h-4 w-4" />
        ) : (
          <Maximize2 className="h-4 w-4" />
        )}
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="h-9 w-9 rounded-full bg-black/50 hover:bg-black/70"
        onClick={onRotate}
        disabled={disabled}
      >
        <RotateCw className="h-4 w-4" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="h-9 w-9 rounded-full bg-black/50 hover:bg-black/70"
        onClick={onScreenshot}
        disabled={disabled}
      >
        <Camera className="h-4 w-4" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="h-9 w-9 rounded-full bg-black/50 hover:bg-black/70"
        onClick={onToggleMute}
        disabled={disabled}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="h-9 w-9 rounded-full bg-black/50 hover:bg-black/70"
        onClick={onReconnect}
        disabled={isReconnecting || disabled}
      >
        <RefreshCw className={`h-4 w-4 ${isReconnecting ? 'animate-spin' : ''}`} />
      </Button>

      <Button
        variant={isStreaming ? 'destructive' : 'default'}
        size="icon"
        className="h-9 w-9 rounded-full"
        onClick={onToggleStream}
        disabled={disabled}
      >
        {isStreaming ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
    </div>
  );
}
