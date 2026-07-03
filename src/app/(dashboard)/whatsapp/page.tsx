'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSocket } from '@/lib/hooks/useSocket';
import { SearchBar } from '@/components/common/SearchBar';
import { formatDate } from '@/lib/utils/helpers';
import { MessageSquare, User, Phone, Clock, Send, Image, File } from 'lucide-react';

interface ChatContact {
  id: string;
  name: string;
  phoneNumber: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  isOnline: boolean;
}

interface ChatMessage {
  id: string;
  contactId: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  isOutgoing: boolean;
  media?: {
    type: 'image' | 'video' | 'document';
    url: string;
    thumbnail?: string;
  };
}

export default function WhatsAppPage() {
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { socket } = useSocket();

  const { data: contactsData, isLoading: contactsLoading } = useQuery({
    queryKey: ['whatsapp-contacts'],
    queryFn: async () => {
      const response = await apiClient.get('/whatsapp/contacts');
      return response.data as ChatContact[];
    },
  });

  const { data: messagesData, refetch: refetchMessages } = useQuery({
    queryKey: ['whatsapp-messages', selectedContact],
    queryFn: async () => {
      if (!selectedContact) return [];
      const response = await apiClient.get(`/whatsapp/messages/${selectedContact}`);
      return response.data as ChatMessage[];
    },
    enabled: !!selectedContact,
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (contactsData) {
      setContacts(contactsData);
    }
  }, [contactsData]);

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  useEffect(() => {
    if (!socket) return;

    socket.on('whatsapp:message', (data) => {
      if (data.contactId === selectedContact) {
        setMessages(prev => [...prev, data]);
      }
      // Update contact list
      setContacts(prev => 
        prev.map(contact => 
          contact.id === data.contactId 
            ? { ...contact, lastMessage: data.message, lastMessageTime: data.timestamp, unreadCount: contact.unreadCount + 1 }
            : contact
        )
      );
    });

    return () => {
      socket.off('whatsapp:message');
    };
  }, [socket, selectedContact]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase()) ||
    contact.phoneNumber.includes(search)
  );

  const handleSendMessage = async () => {
    if (!selectedContact || !newMessage.trim()) return;

    try {
      await apiClient.post('/whatsapp/messages', {
        contactId: selectedContact,
        message: newMessage,
      });
      setNewMessage('');
      refetchMessages();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const selectedContactData = contacts.find(c => c.id === selectedContact);

  return (
    <div className="h-[calc(100vh-8rem)] space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">WhatsApp Monitoring</h1>
        <Badge variant="outline" className="gap-1">
          <MessageSquare className="h-3 w-3" />
          {contacts.filter(c => c.isOnline).length} online
        </Badge>
      </div>

      <div className="grid h-full gap-4 md:grid-cols-3">
        {/* Contacts List */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Contacts</CardTitle>
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search contacts..."
              className="mt-2"
            />
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-18rem)]">
              {contactsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <User className="h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">No contacts found</p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {filteredContacts.map((contact) => (
                    <button
                      key={contact.id}
                      className={`w-full rounded-lg p-3 text-left transition-colors hover:bg-muted ${
                        selectedContact === contact.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedContact(contact.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            {contact.isOnline && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{contact.name}</p>
                            <p className="truncate text-xs text-muted-foreground">
                              {contact.phoneNumber}
                            </p>
                          </div>
                        </div>
                        {contact.unreadCount > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {contact.unreadCount}
                          </Badge>
                        )}
                      </div>
                      {contact.lastMessage && (
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="truncate">{contact.lastMessage}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(contact.lastMessageTime || '')}</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2">
          {selectedContact ? (
            <>
              <CardHeader className="border-b pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{selectedContactData?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedContactData?.phoneNumber}
                        {selectedContactData?.isOnline && (
                          <Badge variant="success" className="ml-2 text-xs">
                            Online
                          </Badge>
                        )}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {messages.length} messages
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex h-[calc(100vh-22rem)] flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <MessageSquare className="mx-auto h-12 w-12" />
                        <p className="mt-2">No messages yet</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOutgoing ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.isOutgoing
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            {message.media && (
                              <div className="mt-2">
                                {message.media.type === 'image' && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Image className="h-4 w-4" />
                                    Image
                                  </div>
                                )}
                                {message.media.type === 'document' && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <File className="h-4 w-4" />
                                    Document
                                  </div>
                                )}
                                {message.media.type === 'video' && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <File className="h-4 w-4" />
                                    Video
                                  </div>
                                )}
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
                      ))}
                    </div>
                  )}
                </ScrollArea>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No conversation selected</h3>
              <p className="text-sm text-muted-foreground">
                Select a contact from the list to start monitoring
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
