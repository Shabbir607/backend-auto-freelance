import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Shield,
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  ArrowLeft,
  Activity,
  Globe,
} from 'lucide-react';
import { mockTeams, mockUsers } from '@/api/mocks/_auth';
import { mockPlatformStats, mockActivities } from '@/api/mocks/_system';
import { formatDistanceToNow } from 'date-fns';

export default function SuperAdminDashboard() {
  const { user, hasRole } = useAuth();
  const navigate = useNavigate();

  if (!hasRole(['superadmin'])) {
    return (
      <div className="min-h-screen bg-nexus-black flex items-center justify-center p-6">
        <Card className="p-8 bg-nexus-card border-nexus-border text-center max-w-md">
          <Shield className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-nexus-muted mb-4">
            This area is restricted to Super Admins only.
          </p>
          <Button onClick={() => navigate('/app')}>
            Go to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const totalRevenue = Object.values(mockPlatformStats).reduce((sum, stats) => sum + stats.totalEarnings, 0);
  const totalUsers = mockUsers.filter(u => u.role !== 'superadmin').length;
  const totalTeams = mockTeams.length;
  const totalProjects = Object.values(mockPlatformStats).reduce((sum, stats) => sum + stats.activeProjects + stats.completedProjects, 0);

  return (
    <div className="min-h-screen bg-nexus-black">
      {/* Header */}
      <header className="border-b border-nexus-border bg-nexus-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/app')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to App
            </Button>
            <div className="h-6 w-px bg-nexus-border" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-nexus-purple" />
              <span className="font-semibold">Super Admin Panel</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-nexus-border text-xs">{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{user?.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Platform Overview</h1>
          <p className="text-nexus-muted">Monitor all teams, users, and platform-wide metrics</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-nexus-card border-nexus-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-500/20">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-3xl font-bold">${(totalRevenue / 1000).toFixed(0)}K</p>
                <p className="text-sm text-nexus-muted">Total Platform Revenue</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-nexus-card border-nexus-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-500/20">
                <Building2 className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-3xl font-bold">{totalTeams}</p>
                <p className="text-sm text-nexus-muted">Active Teams</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-nexus-card border-nexus-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-500/20">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-3xl font-bold">{totalUsers}</p>
                <p className="text-sm text-nexus-muted">Total Users</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-nexus-card border-nexus-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-500/20">
                <TrendingUp className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-3xl font-bold">{totalProjects}</p>
                <p className="text-sm text-nexus-muted">Total Projects</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Teams */}
          <Card className="p-6 bg-nexus-card border-nexus-border">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              All Teams
            </h2>
            <div className="space-y-4">
              {mockTeams.map((team) => {
                const admin = mockUsers.find(u => u.id === team.adminId);
                const teamMembers = mockUsers.filter(u => u.teamId === team.id);
                const stats = mockPlatformStats[team.id];

                return (
                  <div
                    key={team.id}
                    className="p-4 rounded-lg bg-nexus-black border border-nexus-border hover:border-nexus-blue/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{team.name}</h3>
                        <p className="text-xs text-nexus-muted">Admin: {admin?.name}</p>
                      </div>
                      <Badge className={
                        team.plan === 'enterprise'
                          ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                          : team.plan === 'pro'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            : 'bg-nexus-border text-nexus-muted'
                      }>
                        {team.plan}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-nexus-muted">Members</p>
                        <p className="font-medium">{teamMembers.length}</p>
                      </div>
                      <div>
                        <p className="text-nexus-muted">Revenue</p>
                        <p className="font-medium text-green-500">${stats?.totalEarnings.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-nexus-muted">Projects</p>
                        <p className="font-medium">{(stats?.activeProjects || 0) + (stats?.completedProjects || 0)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 bg-nexus-card border-nexus-border">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Platform Activity
            </h2>
            <div className="space-y-3">
              {mockActivities.slice(0, 8).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-nexus-border/30 transition-colors"
                >
                  <div className="text-lg">
                    {activity.type === 'bid_placed' && '🎯'}
                    {activity.type === 'message_received' && '💬'}
                    {activity.type === 'bid_won' && '🎉'}
                    {activity.type === 'project_completed' && '✅'}
                    {activity.type === 'payment_received' && '💰'}
                    {activity.type === 'account_connected' && '🔗'}
                    {activity.type === 'user_joined' && '👤'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-nexus-muted truncate">{activity.description}</p>
                    <p className="text-xs text-nexus-muted mt-1">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  {activity.platform && (
                    <Badge variant="outline" className="text-xs capitalize">
                      {activity.platform}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* All Users */}
        <Card className="p-6 bg-nexus-card border-nexus-border">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            All Users
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-nexus-border">
                  <th className="text-left p-3 text-sm font-medium text-nexus-muted">User</th>
                  <th className="text-left p-3 text-sm font-medium text-nexus-muted">Email</th>
                  <th className="text-left p-3 text-sm font-medium text-nexus-muted">Role</th>
                  <th className="text-left p-3 text-sm font-medium text-nexus-muted">Team</th>
                  <th className="text-left p-3 text-sm font-medium text-nexus-muted">Joined</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.filter(u => u.role !== 'superadmin').map((user) => {
                  const team = mockTeams.find(t => t.id === user.teamId);
                  return (
                    <tr key={user.id} className="border-b border-nexus-border hover:bg-nexus-border/30 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-nexus-border text-xs">{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-nexus-muted">{user.email}</td>
                      <td className="p-3">
                        <Badge className={
                          user.role === 'admin'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            : 'bg-nexus-border text-nexus-muted'
                        }>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm">{team?.name || '-'}</td>
                      <td className="p-3 text-sm text-nexus-muted">
                        {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
