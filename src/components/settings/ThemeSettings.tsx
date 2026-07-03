'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Moon, Sun } from 'lucide-react';

export function ThemeSettings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? (
              <Moon className="h-5 w-5 text-blue-500" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-500" />
            )}
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark theme
              </p>
            </div>
          </div>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </div>

        <div className="mt-4 rounded-lg bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Current Theme:</strong> {theme === 'dark' ? 'Dark' : 'Light'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
