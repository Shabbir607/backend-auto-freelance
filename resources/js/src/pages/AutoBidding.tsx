import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Edit, DollarSign, Zap } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { PlatformAccount } from '@/types';

export default function AutoBidding() {
  const { accounts, updateAccount, user } = useApp();
  const { toast } = useToast();
  const [editingAccount, setEditingAccount] = useState<PlatformAccount | null>(null);
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [promptModalOpen, setPromptModalOpen] = useState(false);
  const [budgetValue, setBudgetValue] = useState('');
  const [promptValue, setPromptValue] = useState('');

  const handleToggleAutoBid = (accountId: string, currentValue: boolean) => {
    updateAccount(accountId, { autoBidEnabled: !currentValue });
    toast({
      title: !currentValue ? 'Auto-bidding enabled' : 'Auto-bidding disabled',
      description: `Auto-bidding has been ${!currentValue ? 'enabled' : 'disabled'} for this account.`,
    });
  };

  const handleToggleActive = (accountId: string, currentValue: boolean) => {
    updateAccount(accountId, { isActive: !currentValue });
    toast({
      title: !currentValue ? 'Account activated' : 'Account deactivated',
      description: `Account has been ${!currentValue ? 'activated' : 'deactivated'}.`,
    });
  };

  const openBudgetModal = (account: PlatformAccount) => {
    setEditingAccount(account);
    setBudgetValue(account.dailyBudget.toString());
    setBudgetModalOpen(true);
  };

  const openPromptModal = (account: PlatformAccount) => {
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      toast({
        title: 'Access denied',
        description: 'Only admins can edit AI prompts.',
        variant: 'destructive',
      });
      return;
    }
    setEditingAccount(account);
    setPromptValue(account.aiPrompt || '');
    setPromptModalOpen(true);
  };

  const saveBudget = () => {
    if (editingAccount) {
      const newBudget = parseFloat(budgetValue);
      if (isNaN(newBudget) || newBudget < 0) {
        toast({
          title: 'Invalid budget',
          description: 'Please enter a valid budget amount.',
          variant: 'destructive',
        });
        return;
      }
      updateAccount(editingAccount.id, { dailyBudget: newBudget });
      toast({
        title: 'Budget updated',
        description: `Daily budget set to $${newBudget}`,
      });
      setBudgetModalOpen(false);
    }
  };

  const savePrompt = () => {
    if (editingAccount) {
      if (!promptValue.trim()) {
        toast({
          title: 'Invalid prompt',
          description: 'Prompt cannot be empty.',
          variant: 'destructive',
        });
        return;
      }
      updateAccount(editingAccount.id, { aiPrompt: promptValue });
      toast({
        title: 'AI prompt updated',
        description: 'The AI bidding prompt has been updated successfully.',
      });
      setPromptModalOpen(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Auto-Bidding Control</h1>
        <p className="text-muted-foreground">
          Manage automated bidding across all platform accounts
        </p>
      </div>

      {/* Accounts Table */}
      <Card className="bg-[#1A1A23] border-[#2A2A33] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A33]">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Account</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Platform</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Auto-Bid</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Daily Budget</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Performance</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Activity</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr
                  key={account.id}
                  className="border-b border-[#2A2A33] hover:bg-[#2A2A33] transition-colors group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{account.accountName}</p>
                      <p className="text-xs text-muted-foreground font-mono">@{account.username}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="capitalize">
                      {account.platform}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={account.isActive}
                        onCheckedChange={() => handleToggleActive(account.id, account.isActive)}
                      />
                      <span className={`text-sm ${account.isActive ? 'text-green-400' : 'text-muted-foreground'}`}>
                        {account.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={account.autoBidEnabled}
                        onCheckedChange={() => handleToggleAutoBid(account.id, account.autoBidEnabled)}
                        disabled={!account.isActive}
                      />
                      {account.autoBidEnabled && (
                        <Zap className="w-4 h-4 text-cyan-400 pulse-glow" />
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-medium">${account.dailyBudget}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => openBudgetModal(account)}
                      >
                        <DollarSign className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Bids: </span>
                        <span className="font-medium">{account.bidCount}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Win rate: </span>
                        <span className="text-green-400 font-medium">{account.successRate}%</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground font-mono">
                      {formatDistanceToNow(new Date(account.lastActivity), { addSuffix: true })}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openPromptModal(account)}
                      className="h-8"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Prompt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Budget Modal */}
      <Dialog open={budgetModalOpen} onOpenChange={setBudgetModalOpen}>
        <DialogContent className="bg-[#1A1A23] border-[#2A2A33]">
          <DialogHeader>
            <DialogTitle>Edit Daily Budget</DialogTitle>
            <DialogDescription>
              Set the daily budget for {editingAccount?.accountName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Daily Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                value={budgetValue}
                onChange={(e) => setBudgetValue(e.target.value)}
                className="bg-[#0D0D15] border-[#2A2A33]"
                placeholder="500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setBudgetModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveBudget} className="bg-gradient-to-r from-cyan-500 to-fuchsia-500">
                Save Budget
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Prompt Modal */}
      <Dialog open={promptModalOpen} onOpenChange={setPromptModalOpen}>
        <DialogContent className="bg-[#1A1A23] border-[#2A2A33] max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit AI Bidding Prompt</DialogTitle>
            <DialogDescription>
              Configure the AI prompt for {editingAccount?.accountName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">AI Prompt</Label>
              <Textarea
                id="prompt"
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
                className="bg-[#0D0D15] border-[#2A2A33] min-h-[200px] font-mono text-sm"
                placeholder="Enter AI bidding instructions..."
              />
              <p className="text-xs text-muted-foreground">
                This prompt guides the AI in selecting and bidding on projects for this account.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setPromptModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={savePrompt} className="bg-gradient-to-r from-cyan-500 to-fuchsia-500">
                Save Prompt
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
