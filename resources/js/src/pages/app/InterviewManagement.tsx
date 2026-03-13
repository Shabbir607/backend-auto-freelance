import { useState } from 'react';
import { 
  Shield, 
  Plus, 
  Search, 
  Eye, 
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Copy,
  ExternalLink,
  Play,
  Pause,
  BarChart3,
  Users,
  Calendar,
  Filter,
  MoreVertical,
  Video,
  FileText,
  Download,
  RefreshCw,
  Send,
  Link2,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';

// Types
type InterviewStatus = 'scheduled' | 'in_progress' | 'completed' | 'terminated' | 'expired';
type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidateAvatar?: string;
  position: string;
  status: InterviewStatus;
  scheduledAt: string;
  completedAt?: string;
  duration?: number;
  riskScore: number;
  riskLevel: RiskLevel;
  warningsCount: number;
  questionsAnswered: number;
  totalQuestions: number;
  interviewLink: string;
  isWebFallback: boolean;
}

// Mock data
const mockInterviews: Interview[] = [
  {
    id: 'int-1',
    candidateName: 'Sarah Johnson',
    candidateEmail: 'sarah.johnson@email.com',
    position: 'Senior Software Engineer',
    status: 'completed',
    scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 45).toISOString(),
    duration: 45,
    riskScore: 12,
    riskLevel: 'low',
    warningsCount: 2,
    questionsAnswered: 10,
    totalQuestions: 10,
    interviewLink: 'https://interview.nexus.ai/start/abc123',
    isWebFallback: false,
  },
  {
    id: 'int-2',
    candidateName: 'Michael Chen',
    candidateEmail: 'michael.chen@email.com',
    position: 'Frontend Developer',
    status: 'in_progress',
    scheduledAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    riskScore: 35,
    riskLevel: 'medium',
    warningsCount: 5,
    questionsAnswered: 4,
    totalQuestions: 8,
    interviewLink: 'https://interview.nexus.ai/start/def456',
    isWebFallback: true,
  },
  {
    id: 'int-3',
    candidateName: 'Emily Rodriguez',
    candidateEmail: 'emily.r@email.com',
    position: 'DevOps Engineer',
    status: 'terminated',
    scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 12).toISOString(),
    duration: 12,
    riskScore: 85,
    riskLevel: 'critical',
    warningsCount: 15,
    questionsAnswered: 3,
    totalQuestions: 10,
    interviewLink: 'https://interview.nexus.ai/start/ghi789',
    isWebFallback: true,
  },
  {
    id: 'int-4',
    candidateName: 'David Kim',
    candidateEmail: 'david.kim@email.com',
    position: 'Backend Developer',
    status: 'scheduled',
    scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    riskScore: 0,
    riskLevel: 'low',
    warningsCount: 0,
    questionsAnswered: 0,
    totalQuestions: 10,
    interviewLink: 'https://interview.nexus.ai/start/jkl012',
    isWebFallback: false,
  },
  {
    id: 'int-5',
    candidateName: 'Lisa Wang',
    candidateEmail: 'lisa.wang@email.com',
    position: 'Full Stack Developer',
    status: 'completed',
    scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 48 + 1000 * 60 * 38).toISOString(),
    duration: 38,
    riskScore: 58,
    riskLevel: 'high',
    warningsCount: 8,
    questionsAnswered: 10,
    totalQuestions: 10,
    interviewLink: 'https://interview.nexus.ai/start/mno345',
    isWebFallback: false,
  },
];

const statusConfig = {
  scheduled: { icon: Calendar, color: 'text-primary', bg: 'bg-primary/10', label: 'Scheduled' },
  in_progress: { icon: Play, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'In Progress' },
  completed: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Completed' },
  terminated: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', label: 'Terminated' },
  expired: { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Expired' },
};

const riskLevelConfig = {
  low: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  medium: { color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  high: { color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  critical: { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' },
};

function InterviewManagement() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newInterview, setNewInterview] = useState({
    candidateName: '',
    candidateEmail: '',
    position: '',
  });

  // Stats
  const totalInterviews = mockInterviews.length;
  const completedInterviews = mockInterviews.filter(i => i.status === 'completed').length;
  const inProgressInterviews = mockInterviews.filter(i => i.status === 'in_progress').length;
  const terminatedInterviews = mockInterviews.filter(i => i.status === 'terminated').length;
  const avgRiskScore = Math.round(mockInterviews.reduce((sum, i) => sum + i.riskScore, 0) / mockInterviews.length);

  const filteredInterviews = mockInterviews.filter((interview) => {
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || interview.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    showToast('Interview link copied to clipboard', 'success');
  };

  const handleCreateInterview = () => {
    // In real implementation, this would create the interview
    showToast('Interview created and invitation sent', 'success');
    setIsCreateDialogOpen(false);
    setNewInterview({ candidateName: '', candidateEmail: '', position: '' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Interview Management
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Manage AI-powered secure interviews</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white gap-2">
              <Plus className="w-4 h-4" />
              New Interview
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>Create New Interview</DialogTitle>
              <DialogDescription>
                Send an interview invitation to a candidate
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Candidate Name</Label>
                <Input 
                  placeholder="John Doe"
                  value={newInterview.candidateName}
                  onChange={(e) => setNewInterview(prev => ({ ...prev, candidateName: e.target.value }))}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Candidate Email</Label>
                <Input 
                  type="email"
                  placeholder="john@example.com"
                  value={newInterview.candidateEmail}
                  onChange={(e) => setNewInterview(prev => ({ ...prev, candidateEmail: e.target.value }))}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Position</Label>
                <Input 
                  placeholder="Software Engineer"
                  value={newInterview.position}
                  onChange={(e) => setNewInterview(prev => ({ ...prev, position: e.target.value }))}
                  className="bg-background border-border"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-primary text-primary-foreground gap-2"
                onClick={handleCreateInterview}
                disabled={!newInterview.candidateName || !newInterview.candidateEmail || !newInterview.position}
              >
                <Send className="w-4 h-4" />
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Total</p>
              <p className="text-xl font-bold">{totalInterviews}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Completed</p>
              <p className="text-xl font-bold">{completedInterviews}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Play className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">In Progress</p>
              <p className="text-xl font-bold">{inProgressInterviews}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Terminated</p>
              <p className="text-xl font-bold">{terminatedInterviews}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <BarChart3 className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Avg Risk</p>
              <p className="text-xl font-bold">{avgRiskScore}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card border-border">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px] bg-background border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="terminated">Terminated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Interviews List */}
      <Card className="bg-card border-border">
        <ScrollArea className="h-[500px]">
          <div className="divide-y divide-border">
            {filteredInterviews.map((interview) => {
              const StatusIcon = statusConfig[interview.status].icon;
              return (
                <div 
                  key={interview.id}
                  className="p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Candidate Info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarImage src={interview.candidateAvatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {interview.candidateName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{interview.candidateName}</p>
                          {interview.isWebFallback && (
                            <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-500">
                              Web
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{interview.position}</p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                        statusConfig[interview.status].bg
                      )}>
                        <StatusIcon className={cn("w-3.5 h-3.5", statusConfig[interview.status].color)} />
                        <span className={statusConfig[interview.status].color}>
                          {statusConfig[interview.status].label}
                        </span>
                      </div>

                      {/* Risk Score */}
                      <div className={cn(
                        "inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium",
                        riskLevelConfig[interview.riskLevel].bg
                      )}>
                        <AlertTriangle className={cn("w-3.5 h-3.5", riskLevelConfig[interview.riskLevel].color)} />
                        <span className={riskLevelConfig[interview.riskLevel].color}>
                          Risk: {interview.riskScore}%
                        </span>
                      </div>

                      {/* Progress */}
                      {interview.status !== 'scheduled' && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{interview.questionsAnswered}/{interview.totalQuestions} questions</span>
                          <Progress 
                            value={(interview.questionsAnswered / interview.totalQuestions) * 100} 
                            className="w-16 h-1.5"
                          />
                        </div>
                      )}

                      {/* Warnings */}
                      {interview.warningsCount > 0 && (
                        <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-500">
                          {interview.warningsCount} warnings
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => handleCopyLink(interview.interviewLink)}
                      >
                        <Link2 className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="w-4 h-4" />
                            View Details
                          </DropdownMenuItem>
                          {interview.status === 'completed' && (
                            <>
                              <DropdownMenuItem className="gap-2">
                                <Video className="w-4 h-4" />
                                Watch Recording
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <FileText className="w-4 h-4" />
                                View Report
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Download className="w-4 h-4" />
                                Export Data
                              </DropdownMenuItem>
                            </>
                          )}
                          {interview.status === 'in_progress' && (
                            <DropdownMenuItem className="gap-2 text-red-500">
                              <Pause className="w-4 h-4" />
                              Terminate Interview
                            </DropdownMenuItem>
                          )}
                          {interview.status === 'scheduled' && (
                            <>
                              <DropdownMenuItem className="gap-2">
                                <Send className="w-4 h-4" />
                                Resend Invitation
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Copy className="w-4 h-4" />
                                Copy Link
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-red-500">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{interview.candidateEmail}</span>
                    <span>•</span>
                    <span>Scheduled: {formatDate(interview.scheduledAt)}</span>
                    {interview.duration && (
                      <>
                        <span>•</span>
                        <span>Duration: {interview.duration} min</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}

export default InterviewManagement;
