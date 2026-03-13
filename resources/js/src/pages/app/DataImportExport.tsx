import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Upload,
  Download,
  FileText,
  FileSpreadsheet,
  Database,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Trash2,
  Eye,
  Settings,
  FolderOpen,
  ArrowRight,
  Users,
  MessageSquare,
  Briefcase,
  FileJson,
  FilePlus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImportExportJob {
  id: string;
  type: 'import' | 'export';
  dataType: string;
  format: string;
  status: 'completed' | 'processing' | 'failed' | 'pending';
  records: number;
  createdAt: string;
  completedAt?: string;
  fileName: string;
  size: string;
}

interface DataTemplate {
  id: string;
  name: string;
  description: string;
  dataType: string;
  fields: string[];
  format: string;
}

const mockJobs: ImportExportJob[] = [
  {
    id: '1',
    type: 'export',
    dataType: 'Clients',
    format: 'CSV',
    status: 'completed',
    records: 1250,
    createdAt: '2024-04-01 10:30 AM',
    completedAt: '2024-04-01 10:32 AM',
    fileName: 'clients_export_20240401.csv',
    size: '2.4 MB',
  },
  {
    id: '2',
    type: 'import',
    dataType: 'Leads',
    format: 'CSV',
    status: 'completed',
    records: 450,
    createdAt: '2024-03-28 02:15 PM',
    completedAt: '2024-03-28 02:17 PM',
    fileName: 'leads_batch_march.csv',
    size: '850 KB',
  },
  {
    id: '3',
    type: 'export',
    dataType: 'Messages',
    format: 'JSON',
    status: 'processing',
    records: 5420,
    createdAt: '2024-04-02 09:00 AM',
    fileName: 'messages_backup.json',
    size: '12.5 MB',
  },
  {
    id: '4',
    type: 'import',
    dataType: 'Proposals',
    format: 'XLSX',
    status: 'failed',
    records: 0,
    createdAt: '2024-03-25 11:45 AM',
    fileName: 'proposals_import.xlsx',
    size: '1.2 MB',
  },
];

const dataTemplates: DataTemplate[] = [
  {
    id: '1',
    name: 'Client Import Template',
    description: 'Import clients with contact information',
    dataType: 'Clients',
    fields: ['name', 'email', 'phone', 'company', 'platform', 'notes'],
    format: 'CSV',
  },
  {
    id: '2',
    name: 'Lead Import Template',
    description: 'Bulk import leads from external sources',
    dataType: 'Leads',
    fields: ['name', 'email', 'source', 'status', 'budget', 'notes'],
    format: 'CSV',
  },
  {
    id: '3',
    name: 'Proposal Template',
    description: 'Import proposal templates',
    dataType: 'Proposals',
    fields: ['title', 'description', 'price', 'deliveryTime', 'category'],
    format: 'XLSX',
  },
  {
    id: '4',
    name: 'Full Backup Export',
    description: 'Export all data for backup purposes',
    dataType: 'All Data',
    fields: ['clients', 'leads', 'messages', 'proposals', 'contracts'],
    format: 'JSON',
  },
];

const exportOptions = [
  { id: 'clients', name: 'Clients', icon: Users, count: 1250 },
  { id: 'leads', name: 'Leads', icon: Users, count: 3420 },
  { id: 'messages', name: 'Messages', icon: MessageSquare, count: 15680 },
  { id: 'proposals', name: 'Proposals', icon: FileText, count: 892 },
  { id: 'contracts', name: 'Contracts', icon: Briefcase, count: 234 },
];

export default function DataImportExport() {
  const [selectedExports, setSelectedExports] = useState<string[]>([]);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-nexus-green" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-nexus-blue animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-nexus-red" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-nexus-muted" />;
      default:
        return <Clock className="w-4 h-4 text-nexus-muted" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-nexus-green/10 text-nexus-green';
      case 'processing':
        return 'bg-nexus-blue/10 text-nexus-blue';
      case 'failed':
        return 'bg-nexus-red/10 text-nexus-red';
      case 'pending':
        return 'bg-nexus-muted/10 text-nexus-muted';
      default:
        return 'bg-nexus-muted/10 text-nexus-muted';
    }
  };

  const toggleExport = (id: string) => {
    setSelectedExports(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Data Import & Export</h1>
          <p className="text-nexus-muted mt-1">Bulk import data or export your records</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-nexus-border">
                <Upload className="w-4 h-4 mr-2" />
                Import Data
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-nexus-card border-nexus-border max-w-lg">
              <DialogHeader>
                <DialogTitle>Import Data</DialogTitle>
                <DialogDescription>
                  Upload a file to import data into your account
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {!isUploading ? (
                  <div
                    className="border-2 border-dashed border-nexus-border rounded-lg p-8 text-center hover:border-nexus-blue transition-colors cursor-pointer"
                    onClick={simulateUpload}
                  >
                    <Upload className="w-12 h-12 mx-auto text-nexus-muted mb-4" />
                    <p className="font-medium">Drop files here or click to upload</p>
                    <p className="text-sm text-nexus-muted mt-1">
                      Supports CSV, XLSX, JSON (max 50MB)
                    </p>
                  </div>
                ) : (
                  <div className="border border-nexus-border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FileSpreadsheet className="w-8 h-8 text-nexus-blue" />
                      <div className="flex-1">
                        <p className="font-medium">leads_import.csv</p>
                        <p className="text-sm text-nexus-muted">2.4 MB</p>
                      </div>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-sm text-nexus-muted mt-2 text-center">
                      {uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : 'Upload complete!'}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Type</label>
                  <select className="w-full bg-nexus-black border border-nexus-border rounded-md p-2">
                    <option value="clients">Clients</option>
                    <option value="leads">Leads</option>
                    <option value="proposals">Proposals</option>
                    <option value="messages">Messages</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 p-3 bg-nexus-border/30 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-nexus-yellow" />
                  <span className="text-sm text-nexus-muted">
                    Make sure your file matches the required template format
                  </span>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="gradient-primary" disabled={!isUploading && uploadProgress < 100}>
                  Start Import
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-nexus-card border-nexus-border max-w-lg">
              <DialogHeader>
                <DialogTitle>Export Data</DialogTitle>
                <DialogDescription>
                  Select the data you want to export
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  {exportOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedExports.includes(option.id);
                    return (
                      <div
                        key={option.id}
                        onClick={() => toggleExport(option.id)}
                        className={cn(
                          'flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors',
                          isSelected
                            ? 'border-nexus-blue bg-nexus-blue/10'
                            : 'border-nexus-border hover:border-nexus-muted'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-nexus-muted" />
                          <span className="font-medium">{option.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="border-nexus-border">
                            {option.count.toLocaleString()} records
                          </Badge>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => { }}
                            className="rounded"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Export Format</label>
                  <div className="flex gap-2">
                    {['CSV', 'XLSX', 'JSON'].map((format) => (
                      <Button
                        key={format}
                        variant="outline"
                        size="sm"
                        className="border-nexus-border flex-1"
                      >
                        {format}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range (Optional)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      className="bg-nexus-black border border-nexus-border rounded-md p-2"
                    />
                    <input
                      type="date"
                      className="bg-nexus-black border border-nexus-border rounded-md p-2"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="gradient-primary" disabled={selectedExports.length === 0}>
                  Export {selectedExports.length} Items
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
              <p className="text-xs text-nexus-muted">Total Imports</p>
              <p className="text-2xl font-bold mt-1">142</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-blue/10 flex items-center justify-center">
              <Upload className="w-5 h-5 text-nexus-blue" />
            </div>
          </div>
        </Card>

        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Total Exports</p>
              <p className="text-2xl font-bold mt-1">89</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-green/10 flex items-center justify-center">
              <Download className="w-5 h-5 text-nexus-green" />
            </div>
          </div>
        </Card>

        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Records Imported</p>
              <p className="text-2xl font-bold mt-1">45.2K</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-purple/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-nexus-purple" />
            </div>
          </div>
        </Card>

        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Data Exported</p>
              <p className="text-2xl font-bold mt-1">128 MB</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-fuchsia/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-nexus-fuchsia" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="history" className="space-y-6">
        <TabsList className="bg-nexus-card border border-nexus-border">
          <TabsTrigger value="history" className="data-[state=active]:bg-nexus-border">
            <Clock className="w-4 h-4 mr-2" />
            Job History
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-nexus-border">
            <FileText className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="data-[state=active]:bg-nexus-border">
            <RefreshCw className="w-4 h-4 mr-2" />
            Scheduled Jobs
          </TabsTrigger>
        </TabsList>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card className="bg-nexus-card border-nexus-border">
            <Table>
              <TableHeader>
                <TableRow className="border-nexus-border hover:bg-transparent">
                  <TableHead className="text-nexus-muted">Job</TableHead>
                  <TableHead className="text-nexus-muted">Type</TableHead>
                  <TableHead className="text-nexus-muted">Status</TableHead>
                  <TableHead className="text-nexus-muted">Records</TableHead>
                  <TableHead className="text-nexus-muted">Size</TableHead>
                  <TableHead className="text-nexus-muted">Created</TableHead>
                  <TableHead className="text-nexus-muted text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockJobs.map((job) => (
                  <TableRow key={job.id} className="border-nexus-border hover:bg-nexus-border/30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {job.format === 'CSV' ? (
                          <FileSpreadsheet className="w-4 h-4 text-nexus-green" />
                        ) : job.format === 'JSON' ? (
                          <FileJson className="w-4 h-4 text-nexus-yellow" />
                        ) : (
                          <FileText className="w-4 h-4 text-nexus-blue" />
                        )}
                        <div>
                          <p className="font-medium">{job.dataType}</p>
                          <p className="text-xs text-nexus-muted">{job.fileName}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        'capitalize',
                        job.type === 'import'
                          ? 'bg-nexus-blue/10 text-nexus-blue'
                          : 'bg-nexus-green/10 text-nexus-green'
                      )}>
                        {job.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(job.status)}
                        <Badge className={cn('capitalize', getStatusColor(job.status))}>
                          {job.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{job.records.toLocaleString()}</TableCell>
                    <TableCell className="text-nexus-muted">{job.size}</TableCell>
                    <TableCell className="text-nexus-muted text-sm">{job.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {job.status === 'completed' && job.type === 'export' && (
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
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

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Import/Export Templates</h2>
              <p className="text-sm text-nexus-muted">Downlaods to ensure correct data format</p>
            </div>
            <Button variant="outline" className="border-nexus-border">
              <FilePlus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataTemplates.map((template) => (
              <Card key={template.id} className="bg-nexus-card border-nexus-border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-nexus-border flex items-center justify-center">
                      {template.format === 'CSV' ? (
                        <FileSpreadsheet className="w-5 h-5 text-nexus-green" />
                      ) : template.format === 'JSON' ? (
                        <FileJson className="w-5 h-5 text-nexus-yellow" />
                      ) : (
                        <FileText className="w-5 h-5 text-nexus-blue" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-nexus-muted mt-0.5">{template.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-nexus-border">
                    {template.format}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {template.fields.slice(0, 4).map((field) => (
                    <Badge key={field} className="bg-nexus-border text-xs">
                      {field}
                    </Badge>
                  ))}
                  {template.fields.length > 4 && (
                    <Badge className="bg-nexus-border text-xs">
                      +{template.fields.length - 4} more
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-nexus-border">
                  <Button variant="outline" size="sm" className="flex-1 border-nexus-border">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="border-nexus-border">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-nexus-border">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Scheduled Tab */}
        <TabsContent value="scheduled" className="space-y-4">
          <Card className="bg-nexus-card border-nexus-border p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-nexus-border flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-nexus-muted" />
            </div>
            <h3 className="text-lg font-semibold">Schedule Automated Exports</h3>
            <p className="text-nexus-muted mt-2 max-w-md mx-auto">
              Set up recurring exports to automatically backup your data on a daily, weekly, or monthly basis.
            </p>
            <Button className="gradient-primary mt-4">
              <Clock className="w-4 h-4 mr-2" />
              Create Scheduled Job
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
