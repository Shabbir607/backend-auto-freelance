import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Plus,
  FileText,
  Star,
  StarOff,
  MoreHorizontal,
  Copy,
  Edit,
  Trash2,
  Zap,
  Globe,
  Clock,
  CheckCircle,
  TrendingUp,
  Target,
  Filter,
  Bot,
  Eye,
  Send,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';

// Template types
interface ProposalTemplate {
  id: string;
  name: string;
  category: string;
  platform: 'upwork' | 'fiverr' | 'all';
  content: string;
  variables: string[];
  winRate: number;
  usageCount: number;
  isFavorite: boolean;
  isAiOptimized: boolean;
  createdAt: string;
  updatedAt: string;
}

// Categories
const categories = [
  'All Categories',
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Data Science',
  'DevOps',
  'Content Writing',
  'Marketing',
];

// Mock templates
const mockTemplates: ProposalTemplate[] = [
  {
    id: '1',
    name: 'React/Next.js Expert',
    category: 'Web Development',
    platform: 'upwork',
    content: `Hi {{client_name}},

I noticed your project requires expertise in {{technology_stack}}, and I'm excited to submit my proposal.

With over {{years_experience}} years of experience building scalable web applications, I've helped companies like {{previous_clients}} achieve their goals through clean, maintainable code.

Here's how I can help:
- {{benefit_1}}
- {{benefit_2}}
- {{benefit_3}}

I'd love to discuss your project in detail and share some relevant examples from my portfolio.

Looking forward to hearing from you!

Best regards,
{{your_name}}`,
    variables: ['client_name', 'technology_stack', 'years_experience', 'previous_clients', 'benefit_1', 'benefit_2', 'benefit_3', 'your_name'],
    winRate: 32,
    usageCount: 156,
    isFavorite: true,
    isAiOptimized: true,
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2025-01-10T15:30:00Z',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    category: 'Mobile Development',
    platform: 'all',
    content: `Hello {{client_name}},

I'm thrilled to see your {{app_type}} app project! As a {{platform}} specialist with {{years_experience}} years of experience, I understand exactly what it takes to build a successful mobile application.

My approach:
1. Deep dive into your requirements
2. Design user-friendly interfaces
3. Build robust, scalable architecture
4. Thorough testing and optimization
5. Post-launch support

Recent similar projects:
{{project_examples}}

I'm confident I can deliver an app that exceeds your expectations. Let's schedule a quick call to discuss the details?

Best,
{{your_name}}`,
    variables: ['client_name', 'app_type', 'platform', 'years_experience', 'project_examples', 'your_name'],
    winRate: 28,
    usageCount: 89,
    isFavorite: false,
    isAiOptimized: true,
    createdAt: '2024-11-15T09:00:00Z',
    updatedAt: '2025-01-08T11:20:00Z',
  },
  {
    id: '3',
    name: 'Quick Intro - Fiverr',
    category: 'All Categories',
    platform: 'fiverr',
    content: `Hi {{client_name}}! 👋

Thanks for reaching out about {{project_topic}}.

I can definitely help you with this! Here's what I propose:
- Delivery: {{delivery_time}}
- Includes: {{deliverables}}

Ready to get started! Let me know if you have any questions.

{{your_name}}`,
    variables: ['client_name', 'project_topic', 'delivery_time', 'deliverables', 'your_name'],
    winRate: 45,
    usageCount: 234,
    isFavorite: true,
    isAiOptimized: false,
    createdAt: '2024-10-20T14:00:00Z',
    updatedAt: '2025-01-12T09:15:00Z',
  },
  {
    id: '4',
    name: 'UI/UX Design Proposal',
    category: 'UI/UX Design',
    platform: 'upwork',
    content: `Dear {{client_name}},

Your {{project_type}} caught my attention! As a UX-focused designer with {{years_experience}}+ years creating intuitive digital experiences, I'd love to help bring your vision to life.

My design process:
✓ Research & Discovery
✓ Wireframing & Prototyping
✓ Visual Design & UI Kit
✓ Developer Handoff Ready Files

Portfolio highlights: {{portfolio_link}}

I'm available to start {{availability}} and would be happy to discuss your timeline and budget.

Best regards,
{{your_name}}`,
    variables: ['client_name', 'project_type', 'years_experience', 'portfolio_link', 'availability', 'your_name'],
    winRate: 35,
    usageCount: 67,
    isFavorite: false,
    isAiOptimized: true,
    createdAt: '2024-12-10T16:00:00Z',
    updatedAt: '2025-01-05T14:45:00Z',
  },
];

export default function ProposalTemplates() {
  const { showToast } = useToast();
  const [templates, setTemplates] = useState<ProposalTemplate[]>(mockTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [editingTemplate, setEditingTemplate] = useState<ProposalTemplate | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<ProposalTemplate | null>(null);

  // New template state
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'Web Development',
    platform: 'all' as 'upwork' | 'fiverr' | 'all',
    content: '',
    isAiOptimized: false,
  });

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || template.category === selectedCategory;
    const matchesPlatform = selectedPlatform === 'all' || template.platform === selectedPlatform || template.platform === 'all';
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setTemplates(prev => prev.map(t => 
      t.id === id ? { ...t, isFavorite: !t.isFavorite } : t
    ));
    showToast('Template updated', 'success');
  };

  // Duplicate template
  const duplicateTemplate = (template: ProposalTemplate) => {
    const newId = (Math.max(...templates.map(t => parseInt(t.id))) + 1).toString();
    const duplicated = {
      ...template,
      id: newId,
      name: `${template.name} (Copy)`,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTemplates(prev => [...prev, duplicated]);
    showToast('Template duplicated', 'success');
  };

  // Delete template
  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    showToast('Template deleted', 'success');
  };

  // Create new template
  const createTemplate = () => {
    const newId = (Math.max(...templates.map(t => parseInt(t.id))) + 1).toString();
    const template: ProposalTemplate = {
      id: newId,
      name: newTemplate.name,
      category: newTemplate.category,
      platform: newTemplate.platform,
      content: newTemplate.content,
      variables: extractVariables(newTemplate.content),
      winRate: 0,
      usageCount: 0,
      isFavorite: false,
      isAiOptimized: newTemplate.isAiOptimized,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTemplates(prev => [...prev, template]);
    setIsCreateModalOpen(false);
    setNewTemplate({ name: '', category: 'Web Development', platform: 'all', content: '', isAiOptimized: false });
    showToast('Template created', 'success');
  };

  // Extract variables from content
  const extractVariables = (content: string): string[] => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = content.matchAll(regex);
    return [...new Set([...matches].map(m => m[1]))];
  };

  // Platform badge
  const PlatformBadge = ({ platform }: { platform: string }) => {
    const colors = {
      upwork: 'bg-green-500/20 text-green-400',
      fiverr: 'bg-purple-500/20 text-purple-400',
      all: 'bg-blue-500/20 text-blue-400',
    };
    return (
      <Badge className={cn('text-xs', colors[platform as keyof typeof colors])}>
        {platform === 'all' ? 'All Platforms' : platform.charAt(0).toUpperCase() + platform.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Proposal Templates</h1>
          <p className="text-nexus-muted mt-1">
            Create and manage your proposal templates for faster bidding
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-nexus-border">
            <Bot className="w-4 h-4 mr-2" />
            AI Optimize All
          </Button>
          <Button className="gradient-primary text-white" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-nexus-muted text-sm">Total Templates</p>
              <p className="text-2xl font-bold text-white">{templates.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </Card>
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-nexus-muted text-sm">AI Optimized</p>
              <p className="text-2xl font-bold text-white">
                {templates.filter(t => t.isAiOptimized).length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </Card>
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-nexus-muted text-sm">Avg Win Rate</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(templates.reduce((sum, t) => sum + t.winRate, 0) / templates.length)}%
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </Card>
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-nexus-muted text-sm">Total Uses</p>
              <p className="text-2xl font-bold text-white">
                {templates.reduce((sum, t) => sum + t.usageCount, 0)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Send className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-muted" />
          <Input 
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-nexus-card border-nexus-border"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px] bg-nexus-card border-nexus-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-nexus-card border-nexus-border">
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
          <SelectTrigger className="w-[150px] bg-nexus-card border-nexus-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-nexus-card border-nexus-border">
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="upwork">Upwork</SelectItem>
            <SelectItem value="fiverr">Fiverr</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card 
            key={template.id} 
            className="bg-nexus-card border-nexus-border hover:border-cyan-500/30 transition-all"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-nexus-border flex items-center justify-center">
                    <FileText className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      {template.name}
                      {template.isAiOptimized && (
                        <Sparkles className="w-4 h-4 text-purple-400" />
                      )}
                    </h3>
                    <p className="text-sm text-nexus-muted">{template.category}</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleFavorite(template.id)}
                  className="text-nexus-muted hover:text-yellow-400 transition-colors"
                >
                  {template.isFavorite ? (
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ) : (
                    <StarOff className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Preview */}
              <div className="bg-nexus-border/50 rounded-lg p-3 mb-4 h-24 overflow-hidden">
                <p className="text-sm text-nexus-muted line-clamp-4">
                  {template.content.substring(0, 200)}...
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <PlatformBadge platform={template.platform} />
                <Badge className="bg-green-500/20 text-green-400 text-xs">
                  {template.winRate}% win rate
                </Badge>
                <Badge variant="outline" className="border-nexus-border text-xs">
                  {template.usageCount} uses
                </Badge>
              </div>

              {/* Variables */}
              <div className="mb-4">
                <p className="text-xs text-nexus-muted mb-2">Variables ({template.variables.length})</p>
                <div className="flex flex-wrap gap-1">
                  {template.variables.slice(0, 4).map((v) => (
                    <Badge key={v} variant="outline" className="text-xs border-nexus-border text-cyan-400">
                      {`{{${v}}}`}
                    </Badge>
                  ))}
                  {template.variables.length > 4 && (
                    <Badge variant="outline" className="text-xs border-nexus-border">
                      +{template.variables.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-nexus-border">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-nexus-border"
                  onClick={() => setPreviewTemplate(template)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 gradient-primary text-white"
                  onClick={() => {
                    navigator.clipboard.writeText(template.content);
                    showToast('Copied to clipboard', 'success');
                  }}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="border-nexus-border">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-nexus-card border-nexus-border">
                    <DropdownMenuItem 
                      className="text-white hover:bg-nexus-border cursor-pointer"
                      onClick={() => setEditingTemplate(template)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-white hover:bg-nexus-border cursor-pointer"
                      onClick={() => duplicateTemplate(template)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-nexus-border" />
                    <DropdownMenuItem 
                      className="text-red-400 hover:bg-red-500/20 cursor-pointer"
                      onClick={() => deleteTemplate(template.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-nexus-border flex items-center justify-center">
            <FileText className="w-8 h-8 text-nexus-muted" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No templates found</h3>
          <p className="text-nexus-muted mb-4">Try adjusting your filters or create a new template</p>
          <Button className="gradient-primary text-white" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>
      )}

      {/* Create Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="bg-nexus-card border-nexus-border max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>
              Create a reusable proposal template with dynamic variables
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Template Name</Label>
              <Input 
                value={newTemplate.name}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., React Developer Proposal"
                className="bg-nexus-border border-nexus-border mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select 
                  value={newTemplate.category} 
                  onValueChange={(v) => setNewTemplate(prev => ({ ...prev, category: v }))}
                >
                  <SelectTrigger className="mt-1 bg-nexus-border border-nexus-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-nexus-card border-nexus-border">
                    {categories.slice(1).map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Platform</Label>
                <Select 
                  value={newTemplate.platform} 
                  onValueChange={(v) => setNewTemplate(prev => ({ ...prev, platform: v as any }))}
                >
                  <SelectTrigger className="mt-1 bg-nexus-border border-nexus-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-nexus-card border-nexus-border">
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="upwork">Upwork</SelectItem>
                    <SelectItem value="fiverr">Fiverr</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Template Content</Label>
              <p className="text-xs text-nexus-muted mt-1 mb-2">
                Use {`{{variable_name}}`} for dynamic content
              </p>
              <Textarea 
                value={newTemplate.content}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                placeholder={`Hi {{client_name}},\n\nI noticed your project about {{project_topic}}...\n\nBest regards,\n{{your_name}}`}
                className="bg-nexus-border border-nexus-border min-h-[200px] font-mono text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={newTemplate.isAiOptimized}
                  onCheckedChange={(v) => setNewTemplate(prev => ({ ...prev, isAiOptimized: v }))}
                />
                <Label className="text-sm">Enable AI optimization</Label>
              </div>
              {newTemplate.content && (
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                  {extractVariables(newTemplate.content).length} variables detected
                </Badge>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" className="border-nexus-border" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="gradient-primary text-white"
              onClick={createTemplate}
              disabled={!newTemplate.name || !newTemplate.content}
            >
              Create Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="bg-nexus-card border-nexus-border max-w-2xl max-h-[80vh]">
          {previewTemplate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {previewTemplate.name}
                  {previewTemplate.isAiOptimized && <Sparkles className="w-4 h-4 text-purple-400" />}
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <PlatformBadge platform={previewTemplate.platform} />
                  <Badge variant="outline" className="border-nexus-border">{previewTemplate.category}</Badge>
                </div>
              </DialogHeader>
              
              <ScrollArea className="max-h-[400px] mt-4">
                <pre className="whitespace-pre-wrap text-sm text-white font-mono bg-nexus-border/50 rounded-lg p-4">
                  {previewTemplate.content}
                </pre>
              </ScrollArea>

              <div className="mt-4 pt-4 border-t border-nexus-border">
                <p className="text-sm text-nexus-muted mb-2">Variables to fill:</p>
                <div className="flex flex-wrap gap-2">
                  {previewTemplate.variables.map((v) => (
                    <Badge key={v} className="bg-cyan-500/20 text-cyan-400">
                      {v}
                    </Badge>
                  ))}
                </div>
              </div>

              <DialogFooter>
                <Button 
                  className="gradient-primary text-white"
                  onClick={() => {
                    navigator.clipboard.writeText(previewTemplate.content);
                    showToast('Copied to clipboard', 'success');
                  }}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Template
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
