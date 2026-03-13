import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  Building2,
  Globe,
  User,
  MessageSquare,
  Star,
  StarOff,
  Archive,
  Trash2,
  MoveRight,
  Clock,
  TrendingUp,
  Target,
  Zap,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';

// Lead types
type LeadStage = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  platform: 'upwork' | 'fiverr' | 'direct' | 'linkedin' | 'referral';
  value: number;
  stage: LeadStage;
  priority: 'high' | 'medium' | 'low';
  starred: boolean;
  lastContact: string;
  nextFollowUp?: string;
  notes?: string;
  avatar?: string;
  tags: string[];
  createdAt: string;
}

// Pipeline stages
const pipelineStages: { id: LeadStage; label: string; color: string }[] = [
  { id: 'new', label: 'New Leads', color: 'bg-blue-500' },
  { id: 'contacted', label: 'Contacted', color: 'bg-purple-500' },
  { id: 'qualified', label: 'Qualified', color: 'bg-cyan-500' },
  { id: 'proposal', label: 'Proposal Sent', color: 'bg-yellow-500' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-orange-500' },
  { id: 'won', label: 'Won', color: 'bg-green-500' },
];

// Mock leads data
const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    company: 'TechCorp Inc.',
    email: 'sarah@techcorp.com',
    phone: '+1 (555) 123-4567',
    platform: 'upwork',
    value: 15000,
    stage: 'proposal',
    priority: 'high',
    starred: true,
    lastContact: '2025-01-15T10:30:00Z',
    nextFollowUp: '2025-01-18T14:00:00Z',
    notes: 'Interested in full-stack development for their SaaS platform',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    tags: ['React', 'Node.js', 'SaaS'],
    createdAt: '2025-01-10T08:00:00Z',
  },
  {
    id: '2',
    name: 'Michael Chen',
    company: 'StartupXYZ',
    email: 'michael@startupxyz.io',
    platform: 'linkedin',
    value: 8500,
    stage: 'qualified',
    priority: 'medium',
    starred: false,
    lastContact: '2025-01-14T15:45:00Z',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    tags: ['Mobile App', 'React Native'],
    createdAt: '2025-01-08T12:00:00Z',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    company: 'DesignStudio Co',
    email: 'emily@designstudio.co',
    platform: 'fiverr',
    value: 5000,
    stage: 'contacted',
    priority: 'low',
    starred: false,
    lastContact: '2025-01-13T09:00:00Z',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    tags: ['UI/UX', 'Figma'],
    createdAt: '2025-01-05T16:00:00Z',
  },
  {
    id: '4',
    name: 'David Park',
    company: 'E-Commerce Plus',
    email: 'david@ecomplus.com',
    phone: '+1 (555) 987-6543',
    platform: 'direct',
    value: 25000,
    stage: 'negotiation',
    priority: 'high',
    starred: true,
    lastContact: '2025-01-15T16:00:00Z',
    nextFollowUp: '2025-01-17T10:00:00Z',
    notes: 'Needs custom e-commerce platform with AI recommendations',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    tags: ['E-commerce', 'AI', 'Python'],
    createdAt: '2025-01-01T09:00:00Z',
  },
  {
    id: '5',
    name: 'Alex Thompson',
    company: 'Marketing Agency',
    email: 'alex@marketingagency.com',
    platform: 'referral',
    value: 12000,
    stage: 'new',
    priority: 'medium',
    starred: false,
    lastContact: '2025-01-15T11:00:00Z',
    tags: ['Landing Pages', 'Next.js'],
    createdAt: '2025-01-15T11:00:00Z',
  },
  {
    id: '6',
    name: 'Lisa Wang',
    company: 'FinTech Solutions',
    email: 'lisa@fintechsolutions.com',
    platform: 'upwork',
    value: 35000,
    stage: 'won',
    priority: 'high',
    starred: true,
    lastContact: '2025-01-12T14:00:00Z',
    notes: 'Contract signed! Starting next week',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80',
    tags: ['FinTech', 'Security', 'Compliance'],
    createdAt: '2024-12-20T10:00:00Z',
  },
];

// Platform icons
const platformIcons = {
  upwork: '🟢',
  fiverr: '🟣',
  direct: '🔵',
  linkedin: '🔷',
  referral: '⭐',
};

export default function LeadPipeline() {
  const { showToast } = useToast();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  // Filter leads by search
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get leads for a specific stage
  const getLeadsForStage = (stage: LeadStage) => 
    filteredLeads.filter(lead => lead.stage === stage);

  // Calculate stage totals
  const getStageTotals = (stage: LeadStage) => {
    const stageLeads = getLeadsForStage(stage);
    return {
      count: stageLeads.length,
      value: stageLeads.reduce((sum, lead) => sum + lead.value, 0),
    };
  };

  // Handle drag start
  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (stage: LeadStage) => {
    if (draggedLead && draggedLead.stage !== stage) {
      setLeads(prev => prev.map(lead => 
        lead.id === draggedLead.id ? { ...lead, stage } : lead
      ));
      showToast(`Moved ${draggedLead.name} to ${stage}`, 'success');
    }
    setDraggedLead(null);
  };

  // Toggle star
  const toggleStar = (leadId: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, starred: !lead.starred } : lead
    ));
  };

  // Format currency
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  // Total pipeline value
  const totalPipelineValue = leads.filter(l => l.stage !== 'lost').reduce((sum, lead) => sum + lead.value, 0);
  const activeDeals = leads.filter(l => !['won', 'lost'].includes(l.stage)).length;

  return (
    <div className="p-4 md:p-6 h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Lead Pipeline</h1>
          <p className="text-nexus-muted mt-1">
            {activeDeals} active deals worth {formatCurrency(totalPipelineValue)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-muted" />
            <Input 
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64 bg-nexus-card border-nexus-border"
            />
          </div>
          <Button variant="outline" size="icon" className="border-nexus-border">
            <Filter className="w-4 h-4" />
          </Button>
          <Button className="gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-nexus-muted text-sm">Pipeline Value</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(totalPipelineValue)}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </Card>
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-nexus-muted text-sm">Active Deals</p>
              <p className="text-2xl font-bold text-white">{activeDeals}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </Card>
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-nexus-muted text-sm">Avg. Deal Size</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(activeDeals > 0 ? totalPipelineValue / activeDeals : 0)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </Card>
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-nexus-muted text-sm">Win Rate</p>
              <p className="text-2xl font-bold text-white">68%</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Pipeline Kanban */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex gap-4 pb-4 min-w-max">
            {pipelineStages.map((stage) => {
              const stageTotals = getStageTotals(stage.id);
              const stageLeads = getLeadsForStage(stage.id);

              return (
                <div 
                  key={stage.id}
                  className="w-80 flex-shrink-0"
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(stage.id)}
                >
                  {/* Stage Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={cn('w-3 h-3 rounded-full', stage.color)} />
                      <span className="font-semibold text-white">{stage.label}</span>
                      <Badge variant="secondary" className="bg-nexus-card text-nexus-muted text-xs">
                        {stageTotals.count}
                      </Badge>
                    </div>
                    <span className="text-sm text-nexus-muted">{formatCurrency(stageTotals.value)}</span>
                  </div>

                  {/* Cards */}
                  <div className="space-y-3">
                    {stageLeads.map((lead) => (
                      <Card 
                        key={lead.id}
                        className={cn(
                          "bg-nexus-card border-nexus-border p-4 cursor-pointer hover:border-cyan-500/30 transition-all",
                          draggedLead?.id === lead.id && "opacity-50"
                        )}
                        draggable
                        onDragStart={() => handleDragStart(lead)}
                        onClick={() => setSelectedLead(lead)}
                      >
                        {/* Card Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={lead.avatar} />
                              <AvatarFallback className="bg-nexus-border text-white">
                                {lead.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-white">{lead.name}</span>
                                {lead.starred && <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />}
                              </div>
                              <span className="text-sm text-nexus-muted">{lead.company}</span>
                            </div>
                          </div>
                          <span className="text-lg">{platformIcons[lead.platform]}</span>
                        </div>

                        {/* Value */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-bold text-white">{formatCurrency(lead.value)}</span>
                          <Badge 
                            className={cn(
                              "text-xs",
                              lead.priority === 'high' && "bg-red-500/20 text-red-400",
                              lead.priority === 'medium' && "bg-yellow-500/20 text-yellow-400",
                              lead.priority === 'low' && "bg-gray-500/20 text-gray-400"
                            )}
                          >
                            {lead.priority}
                          </Badge>
                        </div>

                        {/* Tags */}
                        {lead.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {lead.tags.slice(0, 3).map((tag) => (
                              <Badge 
                                key={tag} 
                                variant="outline" 
                                className="text-xs border-nexus-border text-nexus-muted"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between text-xs text-nexus-muted pt-2 border-t border-nexus-border">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(lead.lastContact)}
                          </span>
                          {lead.nextFollowUp && (
                            <span className="flex items-center gap-1 text-cyan-400">
                              <Calendar className="w-3 h-3" />
                              Follow-up
                            </span>
                          )}
                        </div>
                      </Card>
                    ))}

                    {/* Empty state */}
                    {stageLeads.length === 0 && (
                      <div className="border-2 border-dashed border-nexus-border rounded-lg p-8 text-center">
                        <p className="text-nexus-muted text-sm">No leads in this stage</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Lead Detail Modal */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="bg-nexus-card border-nexus-border max-w-2xl">
          {selectedLead && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={selectedLead.avatar} />
                      <AvatarFallback className="bg-nexus-border text-white text-lg">
                        {selectedLead.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <DialogTitle className="text-xl flex items-center gap-2">
                        {selectedLead.name}
                        <button onClick={() => toggleStar(selectedLead.id)}>
                          {selectedLead.starred ? (
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          ) : (
                            <StarOff className="w-5 h-5 text-nexus-muted hover:text-yellow-400" />
                          )}
                        </button>
                      </DialogTitle>
                      <p className="text-nexus-muted">{selectedLead.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">{formatCurrency(selectedLead.value)}</span>
                    <Badge 
                      className={cn(
                        "ml-2",
                        selectedLead.priority === 'high' && "bg-red-500/20 text-red-400",
                        selectedLead.priority === 'medium' && "bg-yellow-500/20 text-yellow-400",
                        selectedLead.priority === 'low' && "bg-gray-500/20 text-gray-400"
                      )}
                    >
                      {selectedLead.priority} priority
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-nexus-muted" />
                    <a href={`mailto:${selectedLead.email}`} className="text-cyan-400 hover:underline">
                      {selectedLead.email}
                    </a>
                  </div>
                  {selectedLead.phone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-nexus-muted" />
                      <span className="text-white">{selectedLead.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <Building2 className="w-4 h-4 text-nexus-muted" />
                    <span className="text-white">{selectedLead.company}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 text-nexus-muted" />
                    <span className="text-white capitalize">{selectedLead.platform}</span>
                    <span className="text-lg">{platformIcons[selectedLead.platform]}</span>
                  </div>
                </div>

                {/* Current Stage */}
                <div>
                  <label className="text-sm text-nexus-muted mb-2 block">Current Stage</label>
                  <div className="flex gap-2">
                    {pipelineStages.map((stage) => (
                      <button
                        key={stage.id}
                        onClick={() => {
                          setLeads(prev => prev.map(lead => 
                            lead.id === selectedLead.id ? { ...lead, stage: stage.id } : lead
                          ));
                          setSelectedLead({ ...selectedLead, stage: stage.id });
                          showToast(`Moved to ${stage.label}`, 'success');
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                          selectedLead.stage === stage.id 
                            ? `${stage.color} text-white`
                            : "bg-nexus-border text-nexus-muted hover:bg-nexus-border/80"
                        )}
                      >
                        {stage.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-sm text-nexus-muted mb-2 block">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-nexus-border">
                        {tag}
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm" className="border-dashed border-nexus-border text-nexus-muted">
                      <Plus className="w-3 h-3 mr-1" />
                      Add Tag
                    </Button>
                  </div>
                </div>

                {/* Notes */}
                {selectedLead.notes && (
                  <div>
                    <label className="text-sm text-nexus-muted mb-2 block">Notes</label>
                    <p className="text-white bg-nexus-border/50 rounded-lg p-3 text-sm">
                      {selectedLead.notes}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-nexus-border">
                  <Button className="flex-1 gradient-primary text-white">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="flex-1 border-nexus-border">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Follow-up
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="border-nexus-border">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-nexus-card border-nexus-border">
                      <DropdownMenuItem className="text-white hover:bg-nexus-border cursor-pointer">
                        <Archive className="w-4 h-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:bg-red-500/20 cursor-pointer">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
