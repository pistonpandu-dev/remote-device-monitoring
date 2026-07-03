'use client';

import { ChatMessage } from '@/types';
import { formatDate } from '@/lib/utils/helpers';
import { Badge } from '@/components/ui/badge';
import { Image, File, Video } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOutgoing = message.isOutgoing;

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'document':
        return <File className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isOutgoing
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        }`}
      >
        <p className="text-sm">{message.message}</p>
        
        {message.media && (
          <div className="mt-2 rounded-lg bg-black/10 p-2">
            <div className="flex items-center gap-2 text-sm">
              {getMediaIcon(message.media.type)}
              <span>Media: {message.media.type}</span>
              {message.media.thumbnail && (
                <img
                  src={message.media.thumbnail}
                  alt="Media thumbnail"
                  className="mt-2 max-h-32 rounded"
                />
              )}
            </div>
          </div>
        )}

        <div className="mt-1 flex items-center justify-end gap-2">
          <span className="text-xs opacity-70">
            {formatDate(message.timestamp)}
          </span>
          <Badge
            variant="outline"
            className="text-[10px]"
          >
            {message.status}
          </Badge>
        </div>
      </div>
    </div>
  );
}
