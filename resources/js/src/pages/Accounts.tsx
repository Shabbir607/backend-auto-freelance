import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';
import { PlatformAccount, Platform } from '@/types';

export default function Accounts() {
  const { accounts, user } = useApp();
  const { toast } = useToast();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<PlatformAccount | null>(null);

  const [formData, setFormData] = useState({
    platform: 'upwork' as Platform,
    accountName: '',
    username: '',
    dailyBudget: '500',
  });

  if (user.role !== 'admin' && user.role !== 'superadmin') {
    return (
      <div className="p-8 flex items-center justify-center h-screen">
        <Card className="p-8 bg-[#1A1A23] border-[#2A2A33] text-center max-w-md">
          <Shield className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">
            You don't have permission to access account management. Please contact an administrator.
          </p>
        </Card>
      </div>
    );
  }

  const handleAddAccount = () => {
    if (!formData.accountName || !formData.username) {
      toast({
        title: 'Validation error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Account added',
      description: `${formData.accountName} has been added successfully.`,
    });

    setAddModalOpen(false);
    setFormData({
      platform: 'upwork',
      accountName: '',
      username: '',
      dailyBudget: '500',
    });
  };

  const handleEditAccount = (account: PlatformAccount) => {
    setEditingAccount(account);
    setFormData({
      platform: account.platform,
      accountName: account.accountName,
      username: account.username,
      dailyBudget: account.dailyBudget.toString(),
    });
    setEditModalOpen(true);
  };

  const handleUpdateAccount = () => {
    if (!formData.accountName || !formData.username) {
      toast({
        title: 'Validation error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Account updated',
      description: `${formData.accountName} has been updated successfully.`,
    });

    setEditModalOpen(false);
  };

  const handleDeleteAccount = (account: PlatformAccount) => {
    if (confirm(`Are you sure you want to delete ${account.accountName}?`)) {
      toast({
        title: 'Account deleted',
        description: `${account.accountName} has been removed.`,
      });
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Account Management</h1>
          <p className="text-muted-foreground">
            Manage platform accounts and user access
          </p>
        </div>
        <Button
          onClick={() => setAddModalOpen(true)}
          className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Account
        </Button>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account, index) => (
          <Card
            key={account.id}
            className="p-6 bg-[#1A1A23] border-[#2A2A33] hover:border-cyan-500/30 transition-all"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={account.isActive ? 'default' : 'secondary'}
                      className={account.isActive ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                    >
                      {account.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {account.platform}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{account.accountName}</h3>
                  <p className="text-sm text-muted-foreground font-mono">@{account.username}</p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#2A2A33]">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Daily Budget:</span>
                  <span className="font-mono font-medium">${account.dailyBudget}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Bids:</span>
                  <span className="font-medium">{account.bidCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Success Rate:</span>
                  <span className="text-green-400 font-medium">{account.successRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Auto-Bid:</span>
                  <span className={account.autoBidEnabled ? 'text-cyan-400' : 'text-muted-foreground'}>
                    {account.autoBidEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-[#2A2A33]">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleEditAccount(account)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-400 hover:text-red-300 hover:border-red-400"
                  onClick={() => handleDeleteAccount(account)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Account Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="bg-[#1A1A23] border-[#2A2A33]">
          <DialogHeader>
            <DialogTitle>Add New Account</DialogTitle>
            <DialogDescription>
              Connect a new platform account to the system
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select
                value={formData.platform}
                onValueChange={(value) => setFormData({ ...formData, platform: value as Platform })}
              >
                <SelectTrigger className="bg-[#0D0D15] border-[#2A2A33]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A23] border-[#2A2A33]">
                  <SelectItem value="upwork">Upwork</SelectItem>
                  <SelectItem value="fiverr">Fiverr</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                className="bg-[#0D0D15] border-[#2A2A33]"
                placeholder="ProDev Solutions"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-[#0D0D15] border-[#2A2A33]"
                placeholder="prodev_alex"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dailyBudget">Daily Budget ($)</Label>
              <Input
                id="dailyBudget"
                type="number"
                value={formData.dailyBudget}
                onChange={(e) => setFormData({ ...formData, dailyBudget: e.target.value })}
                className="bg-[#0D0D15] border-[#2A2A33]"
                placeholder="500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAccount} className="bg-gradient-to-r from-cyan-500 to-fuchsia-500">
                Add Account
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Account Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-[#1A1A23] border-[#2A2A33]">
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>
              Update account information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-platform">Platform</Label>
              <Select
                value={formData.platform}
                onValueChange={(value) => setFormData({ ...formData, platform: value as Platform })}
              >
                <SelectTrigger className="bg-[#0D0D15] border-[#2A2A33]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A23] border-[#2A2A33]">
                  <SelectItem value="upwork">Upwork</SelectItem>
                  <SelectItem value="fiverr">Fiverr</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-accountName">Account Name</Label>
              <Input
                id="edit-accountName"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                className="bg-[#0D0D15] border-[#2A2A33]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-username">Username</Label>
              <Input
                id="edit-username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-[#0D0D15] border-[#2A2A33]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-dailyBudget">Daily Budget ($)</Label>
              <Input
                id="edit-dailyBudget"
                type="number"
                value={formData.dailyBudget}
                onChange={(e) => setFormData({ ...formData, dailyBudget: e.target.value })}
                className="bg-[#0D0D15] border-[#2A2A33]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateAccount} className="bg-gradient-to-r from-cyan-500 to-fuchsia-500">
                Update Account
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
