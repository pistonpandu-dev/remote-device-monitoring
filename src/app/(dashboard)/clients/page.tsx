'use client';

import { useState, useEffect } from 'react';
import { useClient } from '@/lib/hooks/useClient';
import { ClientTable } from '@/components/clients/ClientTable';
import { ClientForm } from '@/components/clients/ClientForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchBar } from '@/components/common/SearchBar';
import { Plus, Filter } from 'lucide-react';
import { Client } from '@/types';
import { toast } from 'react-hot-toast';

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const { clients, isLoading, createClient, updateClient, deleteClient, refetchClients } = useClient();

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateClient = async (data: any) => {
    await createClient.mutateAsync(data);
    setShowForm(false);
  };

  const handleUpdateClient = async (data: any) => {
    if (editingClient) {
      await updateClient.mutateAsync({ id: editingClient.id, data });
      setEditingClient(null);
      setShowForm(false);
    }
  };

  const handleDeleteClient = async (client: Client) => {
    if (confirm(`Are you sure you want to delete ${client.name}?`)) {
      await deleteClient.mutateAsync(client.id);
    }
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleViewClient = (client: Client) => {
    // Navigate to client detail
    window.location.href = `/clients/${client.id}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search clients..."
          className="w-full sm:w-80"
        />
      </div>

      <ClientTable
        clients={filteredClients}
        onEdit={handleEditClient}
        onDelete={handleDeleteClient}
        onView={handleViewClient}
        isLoading={isLoading}
      />

      <ClientForm
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingClient(null);
        }}
        onSubmit={editingClient ? handleUpdateClient : handleCreateClient}
        initialData={editingClient}
        isLoading={createClient.isLoading || updateClient.isLoading}
      />
    </div>
  );
}
