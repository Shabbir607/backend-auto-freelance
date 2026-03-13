import { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, DollarSign, Zap, MoreHorizontal, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { FreelanceAccount } from '@/api/mocks/_freelanceAccounts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AutoBidding() {
  const { freelanceAccounts, updateFreelanceAccount, toggleAutoBid, deleteFreelanceAccount } = useAppStore();
  const { hasRole } = useAuth();
  const { showToast } = useToast();

  const [editingAccount, setEditingAccount] = useState<FreelanceAccount | null>(null);
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [promptModalOpen, setPromptModalOpen] = useState(false);
  const [budgetValue, setBudgetValue] = useState('');
  const [promptValue, setPromptValue] = useState('');

  const handleToggleAutoBid = (accountId: string) => {
    toggleAutoBid(accountId);
    const account = freelanceAccounts.find(a => a.id === accountId);
    showToast(
      account?.autoBidEnabled ? 'Auto-bidding disabled' : 'Auto-bidding enabled',
      'success'
    );
  };

  const handleToggleActive = (accountId: string, currentValue: boolean) => {
    updateFreelanceAccount(accountId, { isActive: !currentValue });
    showToast(!currentValue ? 'Account activated' : 'Account deactivated', 'success');
  };

  const openBudgetModal = (account: FreelanceAccount) => {
    setEditingAccount(account);
    setBudgetValue(account.dailyBudget.toString());
    setBudgetModalOpen(true);
  };

  const openPromptModal = (account: FreelanceAccount) => {
    if (!hasRole(['admin', 'superadmin'])) {
      showToast('Only admins can edit AI prompts', 'error');
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
        showToast('Please enter a valid budget amount', 'error');
        return;
      }
      updateFreelanceAccount(editingAccount.id, { dailyBudget: newBudget });
      showToast(`Daily budget set to $${newBudget}`, 'success');
      setBudgetModalOpen(false);
    }
  };

  const savePrompt = () => {
    if (editingAccount) {
      if (!promptValue.trim()) {
        showToast('Prompt cannot be empty', 'error');
        return;
      }
      updateFreelanceAccount(editingAccount.id, { aiPrompt: promptValue });
      showToast('AI prompt updated successfully', 'success');
      setPromptModalOpen(false);
    }
  };

  const handleDelete = (account: FreelanceAccount) => {
    if (confirm(`Are you sure you want to delete ${account.accountName}?`)) {
      deleteFreelanceAccount(account.id);
      showToast('Account deleted', 'success');
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1">Auto-Bidding Control</h1>
          <p className="text-nexus-muted text-sm">
            Manage automated bidding across all platform accounts
          </p>
        </div>
        <Button className="gradient-primary text-white border-0">
          Add Account
        </Button>
      </div>

      {/* Accounts Table */}
      <Card className="bg-nexus-card border-nexus-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-nexus-border bg-nexus-black/50">
                <th className="text-left p-4 text-sm font-medium text-nexus-muted">Account</th>
                <th className="text-left p-4 text-sm font-medium text-nexus-muted">Platform</th>
                <th className="text-left p-4 text-sm font-medium text-nexus-muted">Status</th>
                <th className="text-left p-4 text-sm font-medium text-nexus-muted">Auto-Bid</th>
                <th className="text-left p-4 text-sm font-medium text-nexus-muted">Daily Budget</th>
                <th className="text-left p-4 text-sm font-medium text-nexus-muted">Performance</th>
                <th className="text-left p-4 text-sm font-medium text-nexus-muted">Last Activity</th>
                <th className="text-left p-4 text-sm font-medium text-nexus-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {freelanceAccounts.map((account) => (
                <tr
                  key={account.id}
                  className="border-b border-nexus-border hover:bg-nexus-border/30 transition-colors group"
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{account.accountName}</p>
                      <p className="text-xs text-nexus-muted font-mono">@{account.username}</p>
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
                      <span className={`text-sm ${account.isActive ? 'text-green-500' : 'text-nexus-muted'}`}>
                        {account.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={account.autoBidEnabled}
                        onCheckedChange={() => handleToggleAutoBid(account.id)}
                        disabled={!account.isActive}
                      />
                      {account.autoBidEnabled && (
                        <Zap className="w-4 h-4 text-nexus-blue pulse-glow" />
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
                        <span className="text-nexus-muted">Bids: </span>
                        <span className="font-medium">{account.bidCount}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-nexus-muted">Win rate: </span>
                        <span className="text-green-500 font-medium">{account.successRate}%</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-nexus-muted font-mono">
                      {formatDistanceToNow(new Date(account.lastActivity), { addSuffix: true })}
                    </span>
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-nexus-card border-nexus-border">
                        <DropdownMenuItem onClick={() => openPromptModal(account)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit AI Prompt
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(account)}
                          className="text-red-500 focus:text-red-500"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Budget Modal */}
      <Dialog open={budgetModalOpen} onOpenChange={setBudgetModalOpen}>
        <DialogContent className="bg-nexus-card border-nexus-border">
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
                className="bg-nexus-black border-nexus-border"
                placeholder="500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setBudgetModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveBudget} className="gradient-primary text-white border-0">
                Save Budget
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Prompt Modal with Template Engine */}
      <Dialog open={promptModalOpen} onOpenChange={setPromptModalOpen}>
        <DialogContent className="bg-nexus-card border-nexus-border max-w-3xl">
          <DialogHeader>
            <DialogTitle>AI Proposal Template Engine</DialogTitle>
            <DialogDescription>
              Configure the AI prompt template for {editingAccount?.accountName}. Use variables to personalize proposals.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Template Variables */}
            <div className="p-4 bg-nexus-black rounded-lg border border-nexus-border">
              <Label className="text-sm font-medium text-white mb-2 block">Available Variables</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { var: '[ClientName]', desc: 'Client name' },
                  { var: '[JobTitle]', desc: 'Job title' },
                  { var: '[JobDescription]', desc: 'Job description' },
                  { var: '[Budget]', desc: 'Project budget' },
                  { var: '[Skills]', desc: 'Required skills' },
                  { var: '[MyName]', desc: 'Your name' },
                  { var: '[MyExperience]', desc: 'Your experience' },
                  { var: '[Portfolio]', desc: 'Portfolio link' },
                ].map((item) => (
                  <button
                    key={item.var}
                    onClick={() => setPromptValue(prev => prev + ' ' + item.var)}
                    className="px-2 py-1 text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded hover:bg-cyan-500/20 transition-colors"
                    title={item.desc}
                  >
                    {item.var}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt">Proposal Template</Label>
              <Textarea
                id="prompt"
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
                className="bg-nexus-black border-nexus-border min-h-[250px] font-mono text-sm"
                placeholder={`Hi [ClientName],

I noticed your project "[JobTitle]" and I'm excited about the opportunity to help.

With my experience in [Skills], I can deliver exactly what you're looking for within your [Budget] budget.

Here's what I bring to the table:
- [MyExperience]
- Proven track record with similar projects
- Clear communication and timely delivery

Check out my portfolio: [Portfolio]

Looking forward to discussing this further!

Best regards,
[MyName]`}
              />
              <p className="text-xs text-nexus-muted">
                Use variables like [ClientName], [JobTitle], [Budget] to personalize each proposal automatically.
              </p>
            </div>

            {/* Preview Section */}
            <div className="p-4 bg-nexus-black rounded-lg border border-nexus-border">
              <Label className="text-sm font-medium text-white mb-2 block">Preview (with sample data)</Label>
              <div className="text-sm text-nexus-muted whitespace-pre-wrap">
                {promptValue
                  .replace('[ClientName]', 'John Smith')
                  .replace('[JobTitle]', 'React Dashboard Development')
                  .replace('[JobDescription]', 'Build a modern analytics dashboard...')
                  .replace('[Budget]', '$5,000')
                  .replace('[Skills]', 'React, TypeScript, Tailwind CSS')
                  .replace('[MyName]', 'Alex Developer')
                  .replace('[MyExperience]', '5+ years of React development')
                  .replace('[Portfolio]', 'https://portfolio.example.com')
                  || 'Enter a template above to see preview...'}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setPromptModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={savePrompt} className="gradient-primary text-white border-0">
                Save Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
