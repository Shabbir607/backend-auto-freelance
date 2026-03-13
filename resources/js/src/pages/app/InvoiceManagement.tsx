import { useState } from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  Eye, 
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Download,
  Send,
  CreditCard,
  DollarSign,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type InvoiceStatus = 'paid' | 'sent' | 'overdue' | 'draft' | 'cancelled';

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  total: number;
  issueDate: string;
  dueDate: string;
  paymentMethod?: 'stripe' | 'paypal' | 'bank_transfer' | 'other';
}

const mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2024-001',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@techcorp.com',
    status: 'paid',
    total: 5940,
    issueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    paymentMethod: 'stripe',
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2024-002',
    clientName: 'Michael Chen',
    clientEmail: 'michael@startupxyz.com',
    status: 'sent',
    total: 3850,
    issueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-2024-003',
    clientName: 'Emily Rodriguez',
    clientEmail: 'emily@enterprise.com',
    status: 'overdue',
    total: 2200,
    issueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
  {
    id: 'inv-4',
    invoiceNumber: 'INV-2024-004',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@techcorp.com',
    status: 'draft',
    total: 1237.5,
    issueDate: new Date().toISOString(),
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
];

const statusConfig = {
  paid: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Paid' },
  sent: { icon: Clock, color: 'text-primary', bg: 'bg-primary/10', label: 'Sent' },
  overdue: { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10', label: 'Overdue' },
  draft: { icon: FileText, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Draft' },
  cancelled: { icon: XCircle, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Cancelled' },
};

const paymentMethodIcons = {
  stripe: CreditCard,
  paypal: DollarSign,
  bank_transfer: DollarSign,
  other: DollarSign,
};

function InvoiceManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const paid = mockInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0);
  const pending = mockInvoices.filter(inv => inv.status === 'sent').reduce((sum, inv) => sum + inv.total, 0);
  const overdue = mockInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0);

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Invoice Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Create, track, and manage all your invoices</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" />
          New Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Invoices</p>
              <p className="text-xl font-bold">{mockInvoices.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Paid</p>
              <p className="text-xl font-bold">${paid.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Pending</p>
              <p className="text-xl font-bold">${pending.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Overdue</p>
              <p className="text-xl font-bold">${overdue.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card border-border">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] bg-background border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Invoices Table */}
      <Card className="bg-card border-border">
        <ScrollArea className="h-[500px]">
          <table className="w-full">
            <thead className="sticky top-0 bg-card">
              <tr className="border-b border-border">
                <th className="text-left p-4 text-muted-foreground font-medium text-sm">Invoice</th>
                <th className="text-left p-4 text-muted-foreground font-medium text-sm">Client</th>
                <th className="text-left p-4 text-muted-foreground font-medium text-sm">Status</th>
                <th className="text-left p-4 text-muted-foreground font-medium text-sm">Amount</th>
                <th className="text-left p-4 text-muted-foreground font-medium text-sm">Due Date</th>
                <th className="text-left p-4 text-muted-foreground font-medium text-sm">Payment</th>
                <th className="text-right p-4 text-muted-foreground font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => {
                const StatusIcon = statusConfig[invoice.status].icon;
                const PaymentIcon = invoice.paymentMethod ? paymentMethodIcons[invoice.paymentMethod] : null;
                return (
                  <tr 
                    key={invoice.id} 
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-medium font-mono">{invoice.invoiceNumber}</p>
                      <p className="text-muted-foreground text-sm">{new Date(invoice.issueDate).toLocaleDateString()}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{invoice.clientName}</p>
                      <p className="text-muted-foreground text-sm">{invoice.clientEmail}</p>
                    </td>
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${statusConfig[invoice.status].bg}`}>
                        <StatusIcon className={`w-3.5 h-3.5 ${statusConfig[invoice.status].color}`} />
                        <span className={`text-sm ${statusConfig[invoice.status].color}`}>
                          {statusConfig[invoice.status].label}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-medium">
                      ${invoice.total.toLocaleString()}
                    </td>
                    <td className="p-4 font-mono text-sm text-muted-foreground">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      {PaymentIcon && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <PaymentIcon className="w-4 h-4" />
                          <span className="text-sm capitalize">{invoice.paymentMethod?.replace('_', ' ')}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Send className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ScrollArea>
      </Card>
    </div>
  );
}

export default InvoiceManagement;

