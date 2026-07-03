'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSocket } from '@/lib/hooks/useSocket';
import { RefreshCw, CheckCircle, XCircle, Clock, Smartphone } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function PairDevicePage() {
  const [qrData, setQrData] = useState<any>(null);
  const [status, setStatus] = useState<'waiting' | 'connected' | 'expired'>('waiting');
  const { socket } = useSocket();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['pairing-qr'],
    queryFn: async () => {
      const response = await apiClient.get('/pairing/qr');
      return response.data;
    },
    refetchInterval: status === 'waiting' ? 5000 : false,
  });

  useEffect(() => {
    if (data) {
      setQrData(data);
      setStatus(data.status);
    }
  }, [data]);

  useEffect(() => {
    if (!socket) return;

    socket.on('pairing:status', (data) => {
      setStatus(data.status);
      if (data.status === 'connected') {
        toast.success('Device connected successfully!');
      }
    });

    return () => {
      socket.off('pairing:status');
    };
  }, [socket]);

  const handleRefresh = async () => {
    await refetch();
    toast.success('QR Code refreshed');
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case 'expired':
        return <XCircle className="h-12 w-12 text-red-500" />;
      default:
        return <Clock className="h-12 w-12 text-yellow-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Device Connected';
      case 'expired':
        return 'QR Code Expired';
      default:
        return 'Waiting for Connection';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Pair Device</h1>
        <Button onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh QR
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>QR Code</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="rounded-lg border-2 border-dashed p-8">
              {qrData?.qrCode ? (
                <QRCodeSVG
                  value={qrData.qrCode}
                  size={250}
                  level="H"
                  includeMargin
                />
              ) : (
                <div className="flex h-[250px] w-[250px] items-center justify-center">
                  <Smartphone className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <div>
                <p className="font-medium">{getStatusText()}</p>
                <Badge variant={
                  status === 'connected' ? 'success' :
                  status === 'expired' ? 'destructive' :
                  'warning'
                }>
                  {status.toUpperCase()}
                </Badge>
              </div>
            </div>

            {status === 'connected' && qrData?.deviceId && (
              <div className="text-center text-sm text-muted-foreground">
                Device ID: {qrData.deviceId}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal space-y-3 pl-4">
              <li className="text-sm">
                Open the <strong>Remote Device Monitoring</strong> app on your Android device
              </li>
              <li className="text-sm">
                Navigate to <strong>Settings {'>'} Pair Device</strong>
              </li>
              <li className="text-sm">
                Tap <strong>Scan QR Code</strong> and point your camera at the QR code above
              </li>
              <li className="text-sm">
                Wait for the connection to establish automatically
              </li>
              <li className="text-sm">
                Once connected, you'll see the device status update to <strong>Connected</strong>
              </li>
            </ol>

            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> The QR code expires in 5 minutes. 
                If it expires, click the "Refresh QR" button to generate a new one.
              </p>
            </div>

            {status === 'waiting' && (
              <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950/20">
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  <Clock className="mr-2 inline-block h-4 w-4" />
                  Waiting for device to scan QR code...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
