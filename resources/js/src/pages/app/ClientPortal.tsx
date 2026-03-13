import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
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
  Plus,
  Search,
  Send,
  Paperclip,
  Download,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  MessageSquare,
  Link2,
  Copy,
  Eye,
  Settings,
  Users,
  FolderOpen,
  Receipt,
  Shield,
  ExternalLink,
  Mail,
  Phone,
  Building2,
  Globe,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  avatar: string;
  status: 'active' | 'pending' | 'inactive';
  portalAccess: boolean;
  lastLogin?: string;
  projects: number;
  totalSpent: number;
  rating: number;
}

interface PortalProject {
  id: string;
  name: string;
  status: 'in-progress' | 'review' | 'completed' | 'on-hold';
  progress: number;
  dueDate: string;
  budget: number;
  spent: number;
}

interface PortalInvoice {
  id: string;
  number: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  dueDate: string;
}

interface PortalFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@techcorp.com',
    company: 'TechCorp Inc.',
    phone: '+1 (555) 123-4567',
    avatar: '',
    status: 'active',
    portalAccess: true,
    lastLogin: '2 hours ago',
    projects: 3,
    totalSpent: 45000,
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@startupx.io',
    company: 'StartupX',
    phone: '+1 (555) 234-5678',
    avatar: '',
    status: 'active',
    portalAccess: true,
    lastLogin: '1 day ago',
    projects: 2,
    totalSpent: 28000,
    rating: 4,
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily@globalretail.com',
    company: 'Global Retail Co.',
    phone: '+1 (555) 345-6789',
    avatar: '',
    status: 'pending',
    portalAccess: false,
    projects: 1,
    totalSpent: 12000,
    rating: 5,
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@financeplus.com',
    company: 'FinancePlus',
    phone: '+1 (555) 456-7890',
    avatar: '',
    status: 'active',
    portalAccess: true,
    lastLogin: '3 days ago',
    projects: 4,
    totalSpent: 72000,
    rating: 4,
  },
];

const mockProjects: PortalProject[] = [
  { id: '1', name: 'E-commerce Platform Redesign', status: 'in-progress', progress: 65, dueDate: '2024-04-15', budget: 25000, spent: 16250 },
  { id: '2', name: 'Mobile App Development', status: 'review', progress: 90, dueDate: '2024-04-08', budget: 18000, spent: 17500 },
  { id: '3', name: 'API Integration', status: 'completed', progress: 100, dueDate: '2024-03-20', budget: 8000, spent: 8000 },
];

const mockInvoices: PortalInvoice[] = [
  { id: '1', number: 'INV-2024-001', amount: 8500, status: 'paid', date: '2024-03-01', dueDate: '2024-03-15' },
  { id: '2', number: 'INV-2024-002', amount: 7750, status: 'pending', date: '2024-03-15', dueDate: '2024-03-30' },
  { id: '3', number: 'INV-2024-003', amount: 5200, status: 'overdue', date: '2024-02-15', dueDate: '2024-03-01' },
];

const mockFiles: PortalFile[] = [
  { id: '1', name: 'Project Requirements.pdf', type: 'PDF', size: '2.4 MB', uploadedAt: '2024-03-25', uploadedBy: 'You' },
  { id: '2', name: 'Design Mockups.fig', type: 'Figma', size: '15.2 MB', uploadedAt: '2024-03-20', uploadedBy: 'You' },
  { id: '3', name: 'API Documentation.md', type: 'Markdown', size: '156 KB', uploadedAt: '2024-03-18', uploadedBy: 'Client' },
  { id: '4', name: 'Brand Guidelines.pdf', type: 'PDF', size: '8.7 MB', uploadedAt: '2024-03-15', uploadedBy: 'Client' },
];

export default function ClientPortal() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(mockClients[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  const filteredClients = mockClients.filter(
    (client) =>
      searchQuery === '' ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
      case 'completed':
        return 'bg-nexus-green/10 text-nexus-green';
      case 'pending':
      case 'review':
        return 'bg-nexus-yellow/10 text-nexus-yellow';
      case 'inactive':
      case 'overdue':
      case 'on-hold':
        return 'bg-nexus-red/10 text-nexus-red';
      case 'in-progress':
        return 'bg-nexus-blue/10 text-nexus-blue';
      default:
        return 'bg-nexus-muted/10 text-nexus-muted';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Client Portal</h1>
          <p className="text-nexus-muted mt-1">Manage client access and share project updates</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Invite Client
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-nexus-card border-nexus-border">
              <DialogHeader>
                <DialogTitle>Invite Client to Portal</DialogTitle>
                <DialogDescription>Send a portal invitation to your client</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Client Email</label>
                  <Input placeholder="client@example.com" className="bg-nexus-black border-nexus-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Client Name</label>
                  <Input placeholder="John Smith" className="bg-nexus-black border-nexus-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <Input placeholder="Company Inc." className="bg-nexus-black border-nexus-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Personalized Message (Optional)</label>
                  <Textarea 
                    placeholder="Welcome to our client portal..." 
                    className="bg-nexus-black border-nexus-border min-h-[100px]" 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>Cancel</Button>
                <Button className="gradient-primary" onClick={() => setInviteDialogOpen(false)}>
                  <Send className="w-4 h-4 mr-2" />
                  Send Invitation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Client List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-muted" />
            <Input
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-nexus-card border-nexus-border"
            />
          </div>

          <div className="space-y-2">
            {filteredClients.map((client) => (
              <Card
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className={cn(
                  'bg-nexus-card border-nexus-border p-4 cursor-pointer transition-all',
                  selectedClient?.id === client.id ? 'border-nexus-blue bg-nexus-blue/5' : 'hover:border-nexus-muted'
                )}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={client.avatar} />
                    <AvatarFallback className="bg-nexus-border">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{client.name}</p>
                    <p className="text-xs text-nexus-muted truncate">{client.company}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className={cn('text-xs', getStatusColor(client.status))}>
                      {client.status}
                    </Badge>
                    {client.portalAccess && (
                      <span className="text-xs text-nexus-green flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Portal
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Client Details */}
        {selectedClient && (
          <div className="lg:col-span-3 space-y-6">
            {/* Client Header */}
            <Card className="bg-nexus-card border-nexus-border p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedClient.avatar} />
                    <AvatarFallback className="text-xl bg-nexus-border">
                      {selectedClient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold">{selectedClient.name}</h2>
                      <div className="flex items-center gap-0.5">
                        {[...Array(selectedClient.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-nexus-yellow text-nexus-yellow" />
                        ))}
                      </div>
                    </div>
                    <p className="text-nexus-muted">{selectedClient.company}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-nexus-muted">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {selectedClient.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {selectedClient.phone}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-nexus-border">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-nexus-card border-nexus-border">
                      <DialogHeader>
                        <DialogTitle>Send Message to {selectedClient.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Subject</label>
                          <Input placeholder="Message subject..." className="bg-nexus-black border-nexus-border" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Message</label>
                          <Textarea 
                            placeholder="Type your message..." 
                            className="bg-nexus-black border-nexus-border min-h-[150px]" 
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="border-nexus-border">
                            <Paperclip className="w-4 h-4 mr-1" />
                            Attach File
                          </Button>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>Cancel</Button>
                        <Button className="gradient-primary" onClick={() => setMessageDialogOpen(false)}>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  {!selectedClient.portalAccess ? (
                    <Button className="gradient-primary">
                      <Link2 className="w-4 h-4 mr-2" />
                      Enable Portal Access
                    </Button>
                  ) : (
                    <Button variant="outline" className="border-nexus-border">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View as Client
                    </Button>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-nexus-border">
                <div>
                  <p className="text-xs text-nexus-muted">Active Projects</p>
                  <p className="text-2xl font-bold mt-1">{selectedClient.projects}</p>
                </div>
                <div>
                  <p className="text-xs text-nexus-muted">Total Spent</p>
                  <p className="text-2xl font-bold mt-1">${selectedClient.totalSpent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-nexus-muted">Portal Status</p>
                  <p className="text-sm mt-1">
                    {selectedClient.portalAccess ? (
                      <span className="text-nexus-green flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Active
                      </span>
                    ) : (
                      <span className="text-nexus-muted flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Not Enabled
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-nexus-muted">Last Portal Login</p>
                  <p className="text-sm mt-1">{selectedClient.lastLogin || 'Never'}</p>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="projects">
              <TabsList className="bg-nexus-card border border-nexus-border">
                <TabsTrigger value="projects" className="data-[state=active]:bg-nexus-border">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="invoices" className="data-[state=active]:bg-nexus-border">
                  <Receipt className="w-4 h-4 mr-2" />
                  Invoices
                </TabsTrigger>
                <TabsTrigger value="files" className="data-[state=active]:bg-nexus-border">
                  <FileText className="w-4 h-4 mr-2" />
                  Files
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-nexus-border">
                  <Settings className="w-4 h-4 mr-2" />
                  Portal Settings
                </TabsTrigger>
              </TabsList>

              {/* Projects Tab */}
              <TabsContent value="projects" className="mt-6 space-y-4">
                {mockProjects.map((project) => (
                  <Card key={project.id} className="bg-nexus-card border-nexus-border p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-nexus-muted">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Due: {new Date(project.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Badge className={cn('capitalize', getStatusColor(project.status))}>
                        {project.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-nexus-muted">Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-nexus-border text-sm">
                      <div>
                        <span className="text-nexus-muted">Budget:</span>{' '}
                        <span className="font-medium">${project.budget.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-nexus-muted">Spent:</span>{' '}
                        <span className="font-medium">${project.spent.toLocaleString()}</span>
                      </div>
                      <Button variant="outline" size="sm" className="border-nexus-border">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              {/* Invoices Tab */}
              <TabsContent value="invoices" className="mt-6">
                <Card className="bg-nexus-card border-nexus-border">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-nexus-border">
                        <TableHead className="text-nexus-muted">Invoice</TableHead>
                        <TableHead className="text-nexus-muted">Amount</TableHead>
                        <TableHead className="text-nexus-muted">Status</TableHead>
                        <TableHead className="text-nexus-muted">Date</TableHead>
                        <TableHead className="text-nexus-muted">Due Date</TableHead>
                        <TableHead className="text-nexus-muted text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockInvoices.map((invoice) => (
                        <TableRow key={invoice.id} className="border-nexus-border">
                          <TableCell className="font-medium">{invoice.number}</TableCell>
                          <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={cn('capitalize', getStatusColor(invoice.status))}>
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-nexus-muted">{new Date(invoice.date).toLocaleDateString()}</TableCell>
                          <TableCell className="text-nexus-muted">{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              {/* Files Tab */}
              <TabsContent value="files" className="mt-6">
                <Card className="bg-nexus-card border-nexus-border">
                  <div className="p-4 border-b border-nexus-border flex items-center justify-between">
                    <h3 className="font-semibold">Shared Files</h3>
                    <Button size="sm" className="gradient-primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-nexus-border">
                        <TableHead className="text-nexus-muted">File Name</TableHead>
                        <TableHead className="text-nexus-muted">Type</TableHead>
                        <TableHead className="text-nexus-muted">Size</TableHead>
                        <TableHead className="text-nexus-muted">Uploaded</TableHead>
                        <TableHead className="text-nexus-muted">By</TableHead>
                        <TableHead className="text-nexus-muted text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockFiles.map((file) => (
                        <TableRow key={file.id} className="border-nexus-border">
                          <TableCell className="font-medium flex items-center gap-2">
                            <FileText className="w-4 h-4 text-nexus-muted" />
                            {file.name}
                          </TableCell>
                          <TableCell>{file.type}</TableCell>
                          <TableCell className="text-nexus-muted">{file.size}</TableCell>
                          <TableCell className="text-nexus-muted">{new Date(file.uploadedAt).toLocaleDateString()}</TableCell>
                          <TableCell>{file.uploadedBy}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="mt-6 space-y-6">
                <Card className="bg-nexus-card border-nexus-border p-6">
                  <h3 className="font-semibold mb-4">Portal Access Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Project Updates</p>
                        <p className="text-sm text-nexus-muted">Allow client to view project progress</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Invoice Access</p>
                        <p className="text-sm text-nexus-muted">Allow client to view and download invoices</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">File Sharing</p>
                        <p className="text-sm text-nexus-muted">Allow client to upload and download files</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Messaging</p>
                        <p className="text-sm text-nexus-muted">Allow client to send messages through portal</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Time Tracking</p>
                        <p className="text-sm text-nexus-muted">Allow client to view time logs</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </Card>

                <Card className="bg-nexus-card border-nexus-border p-6">
                  <h3 className="font-semibold mb-4">Portal Link</h3>
                  <div className="flex items-center gap-3">
                    <Input 
                      value={`https://portal.nexusai.com/client/${selectedClient.id}`}
                      readOnly
                      className="bg-nexus-black border-nexus-border"
                    />
                    <Button variant="outline" className="border-nexus-border">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" className="border-nexus-border">
                      <Send className="w-4 h-4 mr-2" />
                      Resend Invite
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
