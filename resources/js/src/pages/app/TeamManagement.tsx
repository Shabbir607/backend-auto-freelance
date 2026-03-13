import { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, MoreHorizontal, Mail, Shield, Trash2, Edit } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { User, UserRole } from '@/api/mocks/_auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function TeamManagement() {
  const { teamUsers, addTeamUser, updateTeamUser, deleteTeamUser } = useAppStore();
  const { team, hasRole } = useAuth();
  const { showToast } = useToast();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user' as UserRole,
  });

  if (!hasRole(['admin', 'superadmin'])) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <Card className="p-8 bg-nexus-card border-nexus-border text-center max-w-md">
          <Shield className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-nexus-muted">
            You don't have permission to manage team members.
          </p>
        </Card>
      </div>
    );
  }

  const handleAddUser = () => {
    if (!formData.name || !formData.email) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    if (!team) return;

    addTeamUser({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      teamId: team.id,
    });

    showToast('Team member added successfully', 'success');
    setAddModalOpen(false);
    setFormData({ name: '', email: '', role: 'user' });
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setEditModalOpen(true);
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;

    updateTeamUser(editingUser.id, {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    });

    showToast('Team member updated', 'success');
    setEditModalOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (user: User) => {
    if (confirm(`Are you sure you want to remove ${user.name} from the team?`)) {
      deleteTeamUser(user.id);
      showToast('Team member removed', 'success');
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'superadmin':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'admin':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-nexus-border text-nexus-muted';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Team Management</h1>
          <p className="text-nexus-muted text-sm">
            Manage your team members and their roles
          </p>
        </div>
        <Button
          className="gradient-primary text-white border-0 gap-2"
          onClick={() => setAddModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Add Member
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-nexus-card border-nexus-border">
          <p className="text-2xl font-bold">{teamUsers.length}</p>
          <p className="text-sm text-nexus-muted">Total Members</p>
        </Card>
        <Card className="p-4 bg-nexus-card border-nexus-border">
          <p className="text-2xl font-bold">{teamUsers.filter(u => u.role === 'admin').length}</p>
          <p className="text-sm text-nexus-muted">Admins</p>
        </Card>
        <Card className="p-4 bg-nexus-card border-nexus-border">
          <p className="text-2xl font-bold">{teamUsers.filter(u => u.role === 'user').length}</p>
          <p className="text-sm text-nexus-muted">Team Members</p>
        </Card>
      </div>

      {/* Team Members Table */}
      <Card className="bg-nexus-card border-nexus-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-nexus-border bg-nexus-black/50">
                <th className="text-left p-4 text-sm font-medium text-nexus-muted">Member</th>
                <th className="text-left p-4 text-sm font-medium text-nexus-muted">Email</th>
                <th className="text-left p-4 text-sm font-medium text-nexus-muted">Role</th>
                <th className="text-left p-4 text-sm font-medium text-nexus-muted">Joined</th>
                <th className="text-left p-4 text-sm font-medium text-nexus-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-nexus-border hover:bg-nexus-border/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-nexus-border">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-nexus-muted">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={`capitalize ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-nexus-muted">
                      {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
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
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-500 focus:text-red-500"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
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

      {/* Add Member Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="bg-nexus-card border-nexus-border">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>
              Invite a new member to join your team
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-nexus-black border-nexus-border"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-nexus-black border-nexus-border"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as UserRole }))}
              >
                <SelectTrigger className="bg-nexus-black border-nexus-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-nexus-card border-nexus-border">
                  <SelectItem value="user">Team Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser} className="gradient-primary text-white border-0">
                Add Member
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Member Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-nexus-card border-nexus-border">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>
              Update member information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-nexus-black border-nexus-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-nexus-black border-nexus-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as UserRole }))}
              >
                <SelectTrigger className="bg-nexus-black border-nexus-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-nexus-card border-nexus-border">
                  <SelectItem value="user">Team Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateUser} className="gradient-primary text-white border-0">
                Update Member
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
