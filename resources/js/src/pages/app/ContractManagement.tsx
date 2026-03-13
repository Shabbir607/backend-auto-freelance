import { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Contract {
  id: string;
  title: string;
  client: string;
  platform: 'upwork' | 'fiverr' | 'direct';
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  value: number;
  startDate: string;
  endDate?: string;
  type: 'fixed' | 'hourly';
}

const mockContracts: Contract[] = [
  {
    id: '1',
    title: 'Full Stack Development Project',
    client: 'TechCorp Inc.',
    platform: 'upwork',
    status: 'active',
    value: 15000,
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    type: 'fixed',
  },
  {
    id: '2',
    title: 'Mobile App Development',
    client: 'StartupXYZ',
    platform: 'fiverr',
    status: 'pending',
    value: 8000,
    startDate: '2024-02-01',
    type: 'fixed',
  },
  {
    id: '3',
    title: 'Ongoing Maintenance',
    client: 'Enterprise Solutions',
    platform: 'direct',
    status: 'active',
    value: 75,
    startDate: '2024-01-01',
    type: 'hourly',
  },
  {
    id: '4',
    title: 'E-commerce Platform',
    client: 'RetailMax',
    platform: 'upwork',
    status: 'completed',
    value: 25000,
    startDate: '2023-10-01',
    endDate: '2024-01-01',
    type: 'fixed',
  },
  {
    id: '5',
    title: 'API Integration',
    client: 'DataFlow Inc.',
    platform: 'fiverr',
    status: 'cancelled',
    value: 3000,
    startDate: '2024-01-20',
    type: 'fixed',
  },
];

const statusConfig = {
  active: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10', label: 'Active' },
  pending: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10', label: 'Pending' },
  completed: { icon: CheckCircle, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Completed' },
  cancelled: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10', label: 'Cancelled' },
};

const platformColors = {
  upwork: 'bg-green-500/20 text-green-400',
  fiverr: 'bg-emerald-500/20 text-emerald-400',
  direct: 'bg-purple-500/20 text-purple-400',
};

function ContractManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');

  const filteredContracts = mockContracts.filter((contract) => {
    const matchesSearch = contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    const matchesPlatform = platformFilter === 'all' || contract.platform === platformFilter;
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const totalValue = filteredContracts.reduce((sum, c) => sum + (c.type === 'fixed' ? c.value : 0), 0);
  const activeCount = filteredContracts.filter(c => c.status === 'active').length;

  return (
    <div className="min-h-screen bg-[#0D0D15] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Contract Management</h1>
            <p className="text-gray-400 text-sm mt-1">Manage and track all your contracts across platforms</p>
          </div>
          <Button className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:opacity-90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Contract
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-[#1A1A23] border-[#2A2A33] p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <FileText className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Contracts</p>
                <p className="text-xl font-bold text-white">{filteredContracts.length}</p>
              </div>
            </div>
          </Card>
          <Card className="bg-[#1A1A23] border-[#2A2A33] p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Active</p>
                <p className="text-xl font-bold text-white">{activeCount}</p>
              </div>
            </div>
          </Card>
          <Card className="bg-[#1A1A23] border-[#2A2A33] p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-xl font-bold text-white">{filteredContracts.filter(c => c.status === 'pending').length}</p>
              </div>
            </div>
          </Card>
          <Card className="bg-[#1A1A23] border-[#2A2A33] p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-fuchsia-500/10">
                <AlertTriangle className="w-5 h-5 text-fuchsia-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Value</p>
                <p className="text-xl font-bold text-white">${totalValue.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-[#1A1A23] border-[#2A2A33] p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search contracts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0D0D15] border-[#2A2A33] text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-[#0D0D15] border-[#2A2A33] text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A23] border-[#2A2A33]">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-[150px] bg-[#0D0D15] border-[#2A2A33] text-white">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A23] border-[#2A2A33]">
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="upwork">Upwork</SelectItem>
                <SelectItem value="fiverr">Fiverr</SelectItem>
                <SelectItem value="direct">Direct</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Contracts Table */}
        <Card className="bg-[#1A1A23] border-[#2A2A33]">
          <ScrollArea className="h-[500px]">
            <table className="w-full">
              <thead className="sticky top-0 bg-[#1A1A23]">
                <tr className="border-b border-[#2A2A33]">
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Contract</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Client</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Platform</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Status</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Value</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Type</th>
                  <th className="text-right p-4 text-gray-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContracts.map((contract) => {
                  const StatusIcon = statusConfig[contract.status].icon;
                  return (
                    <tr 
                      key={contract.id} 
                      className="border-b border-[#2A2A33] hover:bg-[#2A2A33]/30 transition-colors"
                    >
                      <td className="p-4">
                        <p className="text-white font-medium">{contract.title}</p>
                        <p className="text-gray-400 text-sm">{contract.startDate}</p>
                      </td>
                      <td className="p-4 text-gray-300">{contract.client}</td>
                      <td className="p-4">
                        <Badge className={platformColors[contract.platform]}>
                          {contract.platform.charAt(0).toUpperCase() + contract.platform.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${statusConfig[contract.status].bg}`}>
                          <StatusIcon className={`w-3.5 h-3.5 ${statusConfig[contract.status].color}`} />
                          <span className={`text-sm ${statusConfig[contract.status].color}`}>
                            {statusConfig[contract.status].label}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-white font-medium">
                        {contract.type === 'hourly' ? `$${contract.value}/hr` : `$${contract.value.toLocaleString()}`}
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="border-[#2A2A33] text-gray-400">
                          {contract.type.charAt(0).toUpperCase() + contract.type.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-400">
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
    </div>
  );
}

export default ContractManagement;
