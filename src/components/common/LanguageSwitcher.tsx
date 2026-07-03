'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { changeLanguage, getAvailableLanguages } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLng, setCurrentLng] = useState(i18n.language);

  const languages = getAvailableLanguages();
  const languageNames: Record<string, string> = {
    en: 'English',
    id: 'Bahasa Indonesia',
  };

  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
    setCurrentLng(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lng) => (
          <DropdownMenuItem
            key={lng}
            onClick={() => handleLanguageChange(lng)}
            className={currentLng === lng ? 'bg-muted' : ''}
          >
            {languageNames[lng] || lng}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
