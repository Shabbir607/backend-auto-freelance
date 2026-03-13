import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Mail,
  Plus,
  Search,
  Edit2,
  Copy,
  Trash2,
  Eye,
  Send,
  Clock,
  CheckCircle,
  Star,
  MoreVertical,
  Sparkles,
  FileText,
  Users,
  Calendar,
  TrendingUp,
  Zap,
  Layout,
  Type,
  Image,
  Link2,
  Code,
  Palette,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: string;
  lastEdited: string;
  usageCount: number;
  openRate: number;
  replyRate: number;
  starred: boolean;
  preview: string;
}

const mockTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Initial Outreach',
    subject: 'Excited to connect about {{project_name}}',
    category: 'Outreach',
    lastEdited: '2 days ago',
    usageCount: 245,
    openRate: 68,
    replyRate: 24,
    starred: true,
    preview: 'Hi {{client_name}}, I came across your project and was impressed by...',
  },
  {
    id: '2',
    name: 'Proposal Follow-up',
    subject: 'Following up on my proposal for {{project_name}}',
    category: 'Follow-up',
    lastEdited: '1 week ago',
    usageCount: 189,
    openRate: 72,
    replyRate: 31,
    starred: true,
    preview: "Hi {{client_name}}, I wanted to follow up on the proposal I submitted...",
  },
  {
    id: '3',
    name: 'Project Milestone Update',
    subject: '✅ Milestone completed: {{milestone_name}}',
    category: 'Updates',
    lastEdited: '3 days ago',
    usageCount: 156,
    openRate: 85,
    replyRate: 45,
    starred: false,
    preview: "Great news! I'm happy to report that we've completed the {{milestone_name}} milestone...",
  },
  {
    id: '4',
    name: 'Invoice Reminder',
    subject: 'Payment reminder: Invoice #{{invoice_number}}',
    category: 'Billing',
    lastEdited: '5 days ago',
    usageCount: 89,
    openRate: 91,
    replyRate: 52,
    starred: false,
    preview: 'Hi {{client_name}}, This is a friendly reminder that invoice #{{invoice_number}}...',
  },
  {
    id: '5',
    name: 'Thank You & Review Request',
    subject: 'Thank you for working with me! 🙏',
    category: 'Post-Project',
    lastEdited: '1 week ago',
    usageCount: 112,
    openRate: 79,
    replyRate: 38,
    starred: true,
    preview: 'Hi {{client_name}}, It was a pleasure working on {{project_name}} with you...',
  },
  {
    id: '6',
    name: 'Availability Check',
    subject: 'Quick question about your project timeline',
    category: 'Outreach',
    lastEdited: '4 days ago',
    usageCount: 78,
    openRate: 62,
    replyRate: 28,
    starred: false,
    preview: 'Hi {{client_name}}, I noticed your project is starting soon and wanted to check...',
  },
];

const templateVariables = [
  { name: 'client_name', description: 'Client first name' },
  { name: 'project_name', description: 'Project title' },
  { name: 'your_name', description: 'Your name' },
  { name: 'milestone_name', description: 'Milestone name' },
  { name: 'invoice_number', description: 'Invoice number' },
  { name: 'due_date', description: 'Payment due date' },
  { name: 'amount', description: 'Payment amount' },
  { name: 'platform', description: 'Platform name (Upwork, Fiverr)' },
];

const categories = ['All', 'Outreach', 'Follow-up', 'Updates', 'Billing', 'Post-Project'];

export default function EmailTemplates() {
  const [templates, setTemplates] = useState(mockTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = searchQuery === '' ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleStar = (id: string) => {
    setTemplates(prev =>
      prev.map(t => (t.id === id ? { ...t, starred: !t.starred } : t))
    );
  };

  const duplicateTemplate = (template: EmailTemplate) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      usageCount: 0,
      lastEdited: 'Just now',
    };
    setTemplates(prev => [newTemplate, ...prev]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Email Templates</h1>
          <p className="text-nexus-muted mt-1">Create and manage email templates for client communication</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-nexus-border">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Generate
          </Button>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-nexus-card border-nexus-border max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Email Template</DialogTitle>
                <DialogDescription>
                  Create a new reusable email template with dynamic variables
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Template Name</label>
                    <Input placeholder="e.g., Initial Outreach" className="bg-nexus-black border-nexus-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select className="w-full bg-nexus-black border border-nexus-border rounded-md p-2">
                      {categories.filter(c => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject Line</label>
                  <Input
                    placeholder="e.g., Excited to connect about {{project_name}}"
                    className="bg-nexus-black border-nexus-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Body</label>
                  <div className="border border-nexus-border rounded-md">
                    <div className="flex items-center gap-1 p-2 border-b border-nexus-border bg-nexus-black">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Type className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Layout className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Image className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Link2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Code className="w-4 h-4" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Hi {{client_name}},&#10;&#10;I came across your project and..."
                      className="min-h-[200px] border-0 rounded-none bg-nexus-black focus:ring-0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Available Variables</label>
                  <div className="flex flex-wrap gap-2">
                    {templateVariables.map((v) => (
                      <Badge
                        key={v.name}
                        variant="outline"
                        className="border-nexus-border cursor-pointer hover:bg-nexus-border"
                        title={v.description}
                      >
                        {`{{${v.name}}}`}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="gradient-primary">
                  Create Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Total Templates</p>
              <p className="text-2xl font-bold mt-1">{templates.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-blue/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-nexus-blue" />
            </div>
          </div>
        </Card>

        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Emails Sent</p>
              <p className="text-2xl font-bold mt-1">1,245</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-green/10 flex items-center justify-center">
              <Send className="w-5 h-5 text-nexus-green" />
            </div>
          </div>
        </Card>

        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Avg Open Rate</p>
              <p className="text-2xl font-bold mt-1">76%</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-purple/10 flex items-center justify-center">
              <Eye className="w-5 h-5 text-nexus-purple" />
            </div>
          </div>
        </Card>

        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Avg Reply Rate</p>
              <p className="text-2xl font-bold mt-1">34%</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-fuchsia/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-nexus-fuchsia" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList className="bg-nexus-card border border-nexus-border">
            <TabsTrigger value="all" className="data-[state=active]:bg-nexus-border">
              All Templates
            </TabsTrigger>
            <TabsTrigger value="starred" className="data-[state=active]:bg-nexus-border">
              <Star className="w-4 h-4 mr-2" />
              Starred
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-muted" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64 bg-nexus-card border-nexus-border"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-nexus-card border border-nexus-border rounded-md px-3"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card className="bg-nexus-card border-nexus-border">
            <Table>
              <TableHeader>
                <TableRow className="border-nexus-border hover:bg-transparent">
                  <TableHead className="text-nexus-muted w-10"></TableHead>
                  <TableHead className="text-nexus-muted">Template</TableHead>
                  <TableHead className="text-nexus-muted">Category</TableHead>
                  <TableHead className="text-nexus-muted">Open Rate</TableHead>
                  <TableHead className="text-nexus-muted">Reply Rate</TableHead>
                  <TableHead className="text-nexus-muted">Used</TableHead>
                  <TableHead className="text-nexus-muted">Last Edited</TableHead>
                  <TableHead className="text-nexus-muted text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.map((template) => (
                  <TableRow key={template.id} className="border-nexus-border hover:bg-nexus-border/30">
                    <TableCell>
                      <button onClick={() => toggleStar(template.id)}>
                        <Star className={cn(
                          'w-4 h-4',
                          template.starred ? 'fill-nexus-yellow text-nexus-yellow' : 'text-nexus-muted'
                        )} />
                      </button>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-xs text-nexus-muted truncate max-w-xs">{template.subject}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-nexus-border">
                        {template.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-nexus-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-nexus-green rounded-full"
                            style={{ width: `${template.openRate}%` }}
                          />
                        </div>
                        <span className="text-sm">{template.openRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-nexus-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-nexus-blue rounded-full"
                            style={{ width: `${template.replyRate}%` }}
                          />
                        </div>
                        <span className="text-sm">{template.replyRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-nexus-muted">{template.usageCount}</TableCell>
                    <TableCell className="text-nexus-muted text-sm">{template.lastEdited}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setSelectedTemplate(template);
                            setPreviewDialogOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => duplicateTemplate(template)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-nexus-red hover:text-nexus-red">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="starred" className="space-y-4">
          <Card className="bg-nexus-card border-nexus-border">
            <Table>
              <TableHeader>
                <TableRow className="border-nexus-border hover:bg-transparent">
                  <TableHead className="text-nexus-muted w-10"></TableHead>
                  <TableHead className="text-nexus-muted">Template</TableHead>
                  <TableHead className="text-nexus-muted">Category</TableHead>
                  <TableHead className="text-nexus-muted">Open Rate</TableHead>
                  <TableHead className="text-nexus-muted">Reply Rate</TableHead>
                  <TableHead className="text-nexus-muted">Used</TableHead>
                  <TableHead className="text-nexus-muted text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.filter(t => t.starred).map((template) => (
                  <TableRow key={template.id} className="border-nexus-border hover:bg-nexus-border/30">
                    <TableCell>
                      <button onClick={() => toggleStar(template.id)}>
                        <Star className="w-4 h-4 fill-nexus-yellow text-nexus-yellow" />
                      </button>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-xs text-nexus-muted truncate max-w-xs">{template.subject}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-nexus-border">
                        {template.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{template.openRate}%</TableCell>
                    <TableCell>{template.replyRate}%</TableCell>
                    <TableCell>{template.usageCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="bg-nexus-card border-nexus-border max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.name}</DialogTitle>
            <DialogDescription>Preview how this template will look</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-nexus-black rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-nexus-border">
                <span className="text-sm text-nexus-muted">Subject:</span>
                <span className="text-sm font-medium">{selectedTemplate?.subject}</span>
              </div>
              <div className="text-sm whitespace-pre-wrap">
                {selectedTemplate?.preview}
                <br /><br />
                Looking forward to hearing from you!
                <br /><br />
                Best regards,<br />
                {'{{your_name}}'}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-nexus-muted">
              <span>Used {selectedTemplate?.usageCount} times</span>
              <span>Last edited {selectedTemplate?.lastEdited}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewDialogOpen(false)}>
              Close
            </Button>
            <Button variant="outline" className="border-nexus-border">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button className="gradient-primary">
              <Send className="w-4 h-4 mr-2" />
              Downlaod
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
