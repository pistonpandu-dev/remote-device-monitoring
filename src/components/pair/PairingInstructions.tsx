'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, QrCode, CheckCircle, Clock } from 'lucide-react';

interface PairingInstructionsProps {
  status: 'waiting' | 'connected' | 'expired';
}

export function PairingInstructions({ status }: PairingInstructionsProps) {
  const instructions = [
    {
      step: 1,
      icon: Smartphone,
      text: 'Open the Remote Device Monitoring app on your Android device',
    },
    {
      step: 2,
      icon: QrCode,
      text: 'Navigate to Settings > Pair Device and tap "Scan QR Code"',
    },
    {
      step: 3,
      icon: status === 'connected' ? CheckCircle : Clock,
      text: status === 'connected' 
        ? 'Device connected successfully!' 
        : status === 'expired' 
        ? 'QR Code expired. Click Refresh to generate a new one.'
        : 'Point your camera at the QR code to connect',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Instructions</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal space-y-4 pl-4">
          {instructions.map(({ step, icon: Icon, text }) => (
            <li key={step} className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-1.5">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">{text}</span>
            </li>
          ))}
        </ol>

        <div className="mt-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950/20">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            <Clock className="mr-2 inline-block h-4 w-4" />
            <strong>Note:</strong> The QR code expires in 5 minutes. 
            {status === 'expired' && ' Click the Refresh button to generate a new one.'}
            {status === 'waiting' && ' Waiting for device to scan...'}
            {status === 'connected' && ' Device is now paired and connected!'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
