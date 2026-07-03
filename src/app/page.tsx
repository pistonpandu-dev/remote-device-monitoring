'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Monitor, 
  Smartphone, 
  MapPin, 
  MessageSquare, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle,
  Users,
  Wifi,
  Clock
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

export default function HomePage() {
  const { user } = useAuth();

  const features = [
    {
      icon: Monitor,
      title: 'Live Screen Streaming',
      description: 'View Android device screens in real-time with low latency streaming',
    },
    {
      icon: MapPin,
      title: 'Real-time Location',
      description: 'Track device locations with Google Maps integration and route history',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Monitoring',
      description: 'Monitor WhatsApp messages and chats in real-time',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Firebase Authentication, JWT tokens, and end-to-end encryption',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'WebSocket connections for instant status updates and notifications',
    },
    {
      icon: Smartphone,
      title: 'Device Management',
      description: 'Manage multiple devices with QR code pairing and remote control',
    },
  ];

  const stats = [
    { icon: Users, value: '500+', label: 'Active Clients' },
    { icon: Wifi, value: '99.9%', label: 'Uptime' },
    { icon: Clock, value: '24/7', label: 'Monitoring' },
    { icon: CheckCircle, value: '100%', label: 'Secure' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Remote Device Monitoring
              <span className="block text-blue-600 dark:text-blue-400">
                Made Simple
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Monitor, manage, and control your remote Android devices in real-time
              with enterprise-grade security and reliability.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2">
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button size="lg" className="gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="lg" variant="outline">
                      Create Account
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="mx-auto h-8 w-8 text-blue-600 dark:text-blue-400" />
                    <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Features</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Everything you need to monitor and manage your remote devices
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="rounded-lg bg-blue-100 p-3 w-fit dark:bg-blue-900/30">
                      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="mt-4 text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 dark:bg-blue-700 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to get started?
          </h2>
          <p className="mt-4 text-blue-100">
            Join thousands of businesses already using Remote Device Monitoring
          </p>
          <div className="mt-8">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="gap-2">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Link href="/register">
                <Button size="lg" variant="secondary" className="gap-2">
                  Create Free Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
