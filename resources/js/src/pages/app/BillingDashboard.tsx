import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  CreditCard,
  Download,
  Plus,
  Receipt,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Users,
  Bot,
  HardDrive,
  Settings,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  downloadUrl: string;
}

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'paypal';
  last4: string;
  expiryDate: string;
  isDefault: boolean;
}

const mockInvoices: Invoice[] = [
  { id: '1', number: 'INV-2024-001', date: 'Jan 1, 2024', amount: 99, status: 'paid', downloadUrl: '#' },
  { id: '2', number: 'INV-2024-002', date: 'Feb 1, 2024', amount: 99, status: 'paid', downloadUrl: '#' },
  { id: '3', number: 'INV-2024-003', date: 'Mar 1, 2024', amount: 149, status: 'paid', downloadUrl: '#' },
  { id: '4', number: 'INV-2024-004', date: 'Apr 1, 2024', amount: 149, status: 'pending', downloadUrl: '#' },
];

const mockPaymentMethods: PaymentMethod[] = [
  { id: '1', type: 'visa', last4: '4242', expiryDate: '12/25', isDefault: true },
  { id: '2', type: 'mastercard', last4: '8888', expiryDate: '08/26', isDefault: false },
];

const usageData = [
  { name: 'AI Credits', used: 7500, total: 10000, icon: Bot, color: 'nexus-purple' },
  { name: 'Active Accounts', used: 12, total: 25, icon: Users, color: 'nexus-blue' },
  { name: 'Automations', used: 45, total: 100, icon: Zap, color: 'nexus-fuchsia' },
  { name: 'Storage', used: 2.5, total: 10, icon: HardDrive, unit: 'GB', color: 'nexus-green' },
];

const planFeatures = [
  { name: 'Unlimited Platform Accounts', included: true },
  { name: 'AI Auto-Bidding', included: true },
  { name: 'CRM Integration', included: true },
  { name: 'Workflow Automation', included: true },
  { name: 'API Access', included: true },
  { name: 'Priority Support', included: true },
  { name: 'Custom Integrations', included: false },
  { name: 'White-label Solution', included: false },
];

export default function BillingDashboard() {
  const [selectedPlan] = useState('pro');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-nexus-green/10 text-nexus-green';
      case 'pending':
        return 'bg-nexus-yellow/10 text-nexus-yellow';
      case 'overdue':
        return 'bg-nexus-red/10 text-nexus-red';
      default:
        return 'bg-nexus-muted/10 text-nexus-muted';
    }
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return '💳 Visa';
      case 'mastercard':
        return '💳 Mastercard';
      case 'amex':
        return '💳 Amex';
      case 'paypal':
        return '🅿️ PayPal';
      default:
        return '💳 Card';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Billing & Subscription</h1>
          <p className="text-nexus-muted mt-1">Manage your plan, payments, and invoices</p>
        </div>
        <Button className="gradient-primary">
          <Zap className="w-4 h-4 mr-2" />
          Upgrade Plan
        </Button>
      </div>

      {/* Current Plan Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-nexus-card border-nexus-border p-6">
          <div className="flex items-start justify-between">
            <div>
              <Badge className="bg-gradient-to-r from-nexus-blue to-nexus-purple text-white mb-3">
                Current Plan
              </Badge>
              <h2 className="text-2xl font-bold">Professional Plan</h2>
              <p className="text-nexus-muted mt-1">Perfect for agencies and growing teams</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">$149<span className="text-base font-normal text-nexus-muted">/mo</span></p>
              <p className="text-sm text-nexus-muted">Billed monthly</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {usageData.map((item) => {
              const Icon = item.icon;
              const percentage = (item.used / item.total) * 100;
              return (
                <div key={item.name} className="bg-nexus-black rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={cn('w-4 h-4', `text-${item.color}`)} />
                    <span className="text-xs text-nexus-muted">{item.name}</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {item.used}{item.unit && ` ${item.unit}`}
                    <span className="text-xs text-nexus-muted font-normal"> / {item.total}{item.unit && ` ${item.unit}`}</span>
                  </p>
                  <Progress value={percentage} className="h-1.5 mt-2" />
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-nexus-border">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-nexus-muted" />
              <span className="text-sm text-nexus-muted">Next billing date: May 1, 2024</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-nexus-border">
                <Settings className="w-4 h-4 mr-2" />
                Manage Plan
              </Button>
              <Button variant="outline" size="sm" className="border-nexus-border text-nexus-red hover:text-nexus-red">
                Cancel Plan
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card className="bg-nexus-card border-nexus-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-nexus-muted">Total Spent (YTD)</p>
                <p className="text-2xl font-bold mt-1">$1,196</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-nexus-green/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-nexus-green" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-nexus-green">
              <ArrowUpRight className="w-3 h-3" />
              <span>50% increase from last year</span>
            </div>
          </Card>

          <Card className="bg-nexus-card border-nexus-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-nexus-muted">ROI Generated</p>
                <p className="text-2xl font-bold mt-1">$45,320</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-nexus-blue/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-nexus-blue" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-nexus-green">
              <ArrowUpRight className="w-3 h-3" />
              <span>38x return on investment</span>
            </div>
          </Card>

          <Card className="bg-nexus-card border-nexus-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-nexus-muted">Credits Remaining</p>
                <p className="text-2xl font-bold mt-1">2,500</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-nexus-purple/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-nexus-purple" />
              </div>
            </div>
            <Progress value={25} className="h-1.5 mt-2" />
            <p className="text-xs text-nexus-muted mt-1">Resets in 15 days</p>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="invoices" className="space-y-6">
        <TabsList className="bg-nexus-card border border-nexus-border">
          <TabsTrigger value="invoices" className="data-[state=active]:bg-nexus-border">
            <Receipt className="w-4 h-4 mr-2" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-nexus-border">
            <CreditCard className="w-4 h-4 mr-2" />
            Payment Methods
          </TabsTrigger>
          <TabsTrigger value="plans" className="data-[state=active]:bg-nexus-border">
            <Zap className="w-4 h-4 mr-2" />
            Compare Plans
          </TabsTrigger>
        </TabsList>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Billing History</h2>
              <p className="text-sm text-nexus-muted">Download invoices and view payment history</p>
            </div>
            <Button variant="outline" className="border-nexus-border">
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
          </div>

          <Card className="bg-nexus-card border-nexus-border">
            <Table>
              <TableHeader>
                <TableRow className="border-nexus-border hover:bg-transparent">
                  <TableHead className="text-nexus-muted">Invoice</TableHead>
                  <TableHead className="text-nexus-muted">Date</TableHead>
                  <TableHead className="text-nexus-muted">Amount</TableHead>
                  <TableHead className="text-nexus-muted">Status</TableHead>
                  <TableHead className="text-nexus-muted text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map((invoice) => (
                  <TableRow key={invoice.id} className="border-nexus-border hover:bg-nexus-border/30">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-nexus-muted" />
                        {invoice.number}
                      </div>
                    </TableCell>
                    <TableCell className="text-nexus-muted">{invoice.date}</TableCell>
                    <TableCell>${invoice.amount}.00</TableCell>
                    <TableCell>
                      <Badge className={cn('capitalize', getStatusColor(invoice.status))}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Payment Methods</h2>
              <p className="text-sm text-nexus-muted">Manage your payment methods</p>
            </div>
            <Button className="gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Method
            </Button>
          </div>

          <div className="grid gap-4">
            {mockPaymentMethods.map((method) => (
              <Card key={method.id} className="bg-nexus-card border-nexus-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 rounded bg-nexus-border flex items-center justify-center text-lg">
                      {method.type === 'visa' ? '💳' : '💳'}
                    </div>
                    <div>
                      <p className="font-medium">
                        {getCardIcon(method.type)} •••• {method.last4}
                        {method.isDefault && (
                          <Badge className="ml-2 bg-nexus-blue/10 text-nexus-blue text-xs">Default</Badge>
                        )}
                      </p>
                      <p className="text-sm text-nexus-muted">Expires {method.expiryDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <Button variant="outline" size="sm" className="border-nexus-border">
                        Set Default
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="border-nexus-border">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="border-nexus-border text-nexus-red hover:text-nexus-red">
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="bg-nexus-card border-nexus-border p-6">
            <h3 className="font-semibold mb-4">Billing Address</h3>
            <div className="text-sm text-nexus-muted">
              <p>John Smith</p>
              <p>123 Main Street</p>
              <p>San Francisco, CA 94102</p>
              <p>United States</p>
            </div>
            <Button variant="outline" size="sm" className="mt-4 border-nexus-border">
              Edit Address
            </Button>
          </Card>
        </TabsContent>

        {/* Plans Tab */}
        <TabsContent value="plans" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Starter Plan */}
            <Card className="bg-nexus-card border-nexus-border p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold">Starter</h3>
                <p className="text-nexus-muted text-sm mt-1">For individuals</p>
                <p className="text-3xl font-bold mt-4">$49<span className="text-base font-normal text-nexus-muted">/mo</span></p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-nexus-green" />
                  5 Platform Accounts
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-nexus-green" />
                  2,500 AI Credits/mo
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-nexus-green" />
                  Basic Analytics
                </li>
                <li className="flex items-center gap-2 text-sm text-nexus-muted">
                  <Clock className="w-4 h-4" />
                  Email Support
                </li>
              </ul>
              <Button variant="outline" className="w-full border-nexus-border">
                Downgrade
              </Button>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-nexus-card border-2 border-nexus-blue p-6 relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-nexus-blue to-nexus-purple text-white">
                Current Plan
              </Badge>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold">Professional</h3>
                <p className="text-nexus-muted text-sm mt-1">For agencies</p>
                <p className="text-3xl font-bold mt-4">$149<span className="text-base font-normal text-nexus-muted">/mo</span></p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-nexus-green" />
                  25 Platform Accounts
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-nexus-green" />
                  10,000 AI Credits/mo
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-nexus-green" />
                  Advanced Analytics
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-nexus-green" />
                  Priority Support
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-nexus-green" />
                  API Access
                </li>
              </ul>
              <Button className="w-full gradient-primary" disabled>
                Current Plan
              </Button>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-nexus-card border-nexus-border p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold">Enterprise</h3>
                <p className="text-nexus-muted text-sm mt-1">For large teams</p>
                <p className="text-3xl font-bold mt-4">Custom</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-nexus-green" />
                  Unlimited Accounts
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-nexus-green" />
                  Unlimited AI Credits
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-nexus-green" />
                  Custom Integrations
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-nexus-green" />
                  Dedicated Support
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-nexus-green" />
                  White-label Option
                </li>
              </ul>
              <Button className="w-full gradient-primary">
                Contact Sales
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
