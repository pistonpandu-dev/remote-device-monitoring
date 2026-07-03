'use client';

import { SearchBar } from '@/components/common/SearchBar';

interface ChatSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ChatSearch({ value, onChange, placeholder = 'Search chats...' }: ChatSearchProps) {
  return (
    <SearchBar
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full"
    />
  );
}
