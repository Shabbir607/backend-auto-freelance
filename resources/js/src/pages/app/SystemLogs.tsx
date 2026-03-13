import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Clock,
  Activity,
  Server,
  Globe,
  Zap,
  ChevronDown,
  ChevronRight,
  Terminal,
  FileText,
  Trash2,
} from 'lucide-react';

// Mock log data
const mockLogs = [
  {
    id: '1',
    timestamp: '2024-01-15T14:32:45.123Z',
    level: 'success',
    category: 'api',
    source: 'Upwork API',
    message: 'Successfully fetched 25 new job listings',
    details: { endpoint: '/api/v1/jobs/search', responseTime: '245ms', jobsFound: 25 },
  },
  {
    id: '2',
    timestamp: '2024-01-15T14:32:40.456Z',
    level: 'info',
    category: 'bidding',
    source: 'Auto-Bidder',
    message: 'Submitted proposal for "React Dashboard Development"',
    details: { jobId: 'job_123', bidAmount: '$2,500', connects: 6 },
  },
  {
    id: '3',
    timestamp: '2024-01-15T14:32:35.789Z',
    level: 'warning',
    category: 'system',
    source: 'Proxy Manager',
    message: 'High latency detected on proxy 192.168.1.102',
    details: { proxyIp: '192.168.1.102', latency: '450ms', threshold: '200ms' },
  },
  {
    id: '4',
    timestamp: '2024-01-15T14:32:30.012Z',
    level: 'error',
    category: 'api',
    source: 'Fiverr API',
    message: 'Rate limit exceeded - waiting 60 seconds',
    details: { endpoint: '/api/v2/gigs', retryAfter: '60s', requestCount: 100 },
  },
  {
    id: '5',
    timestamp: '2024-01-15T14:32:25.345Z',
    level: 'success',
    category: 'bidding',
    source: 'Auto-Bidder',
    message: 'Proposal accepted by client "TechStartup Inc"',
    details: { jobId: 'job_456', clientName: 'TechStartup Inc', contractValue: '$5,000' },
  },
  {
    id: '6',
    timestamp: '2024-01-15T14:32:20.678Z',
    level: 'info',
    category: 'system',
    source: 'Scheduler',
    message: 'Daily job scan completed',
    details: { jobsScanned: 150, matchesFound: 12, duration: '45s' },
  },
  {
    id: '7',
    timestamp: '2024-01-15T14:32:15.901Z',
    level: 'success',
    category: 'api',
    source: 'Freelancer API',
    message: 'Successfully synced account data',
    details: { endpoint: '/api/users/me', balance: '$1,234.56', activeProjects: 3 },
  },
  {
    id: '8',
    timestamp: '2024-01-15T14:32:10.234Z',
    level: 'warning',
    category: 'bidding',
    source: 'Auto-Bidder',
    message: 'Low connects warning - 15 connects remaining',
    details: { currentConnects: 15, threshold: 20, accountId: 'upwork_main' },
  },
  {
    id: '9',
    timestamp: '2024-01-15T14:32:05.567Z',
    level: 'error',
    category: 'system',
    source: 'Authentication',
    message: 'OAuth token refresh failed for Upwork account',
    details: { accountId: 'upwork_secondary', error: 'invalid_grant', action: 'Re-authentication required' },
  },
  {
    id: '10',
    timestamp: '2024-01-15T14:32:00.890Z',
    level: 'info',
    category: 'api',
    source: 'WebSocket',
    message: 'Real-time connection established',
    details: { server: 'wss://api.nexus.ai/ws', latency: '12ms', protocol: 'v2' },
  },
];

const levelIcons: Record<string, React.ReactNode> = {
  success: <CheckCircle className="w-4 h-4 text-[#39FF14]" />,
  info: <Info className="w-4 h-4 text-cyan-400" />,
  warning: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
  error: <XCircle className="w-4 h-4 text-[#FF073A]" />,
};

const levelColors: Record<string, string> = {
  success: 'bg-[#39FF14]/10 text-[#39FF14] border-[#39FF14]/30',
  info: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  error: 'bg-[#FF073A]/10 text-[#FF073A] border-[#FF073A]/30',
};

const categoryIcons: Record<string, React.ReactNode> = {
  api: <Globe className="w-4 h-4" />,
  bidding: <Zap className="w-4 h-4" />,
  system: <Server className="w-4 h-4" />,
};

export default function SystemLogs() {
  const { t } = useTranslation();
  const [logs, setLogs] = useState(mockLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
  const [isLive, setIsLive] = useState(true);

  const toggleLogExpansion = (logId: string) => {
    setExpandedLogs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(logId)) {
        newSet.delete(logId);
      } else {
        newSet.add(logId);
      }
      return newSet;
    });
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) +
      '.' + date.getMilliseconds().toString().padStart(3, '0');
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Stats
  const stats = {
    total: logs.length,
    success: logs.filter(l => l.level === 'success').length,
    warnings: logs.filter(l => l.level === 'warning').length,
    errors: logs.filter(l => l.level === 'error').length,
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">System Logs</h1>
          <p className="text-nexus-muted text-sm">Monitor API calls, bidding results, and system events</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant={isLive ? "default" : "outline"}
            onClick={() => setIsLive(!isLive)}
            size="sm"
            className={isLive ? "gradient-primary text-white border-0" : "border-nexus-border text-white hover:bg-white/5"}
          >
            <Activity className={`w-4 h-4 mr-2 ${isLive ? 'animate-pulse' : ''}`} />
            {isLive ? 'Live' : 'Paused'}
          </Button>
          <Button variant="outline" size="sm" className="border-nexus-border text-white hover:bg-white/5">
            <Download className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button variant="outline" size="sm" className="border-nexus-border text-white hover:bg-white/5">
            <Trash2 className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-nexus-muted text-sm">Total Logs</p>
              <p className="text-2xl font-bold text-white font-mono">{stats.total}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
          </div>
        </Card>
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-nexus-muted text-sm">Success</p>
              <p className="text-2xl font-bold text-[#39FF14] font-mono">{stats.success}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#39FF14]/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[#39FF14]" />
            </div>
          </div>
        </Card>
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-nexus-muted text-sm">Warnings</p>
              <p className="text-2xl font-bold text-yellow-500 font-mono">{stats.warnings}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
          </div>
        </Card>
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-nexus-muted text-sm">Errors</p>
              <p className="text-2xl font-bold text-[#FF073A] font-mono">{stats.errors}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#FF073A]/10 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-[#FF073A]" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-nexus-card border-nexus-border p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-muted" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-nexus-black border-nexus-border text-white"
              />
            </div>
          </div>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-40 bg-nexus-black border-nexus-border text-white">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent className="bg-nexus-card border-nexus-border">
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40 bg-nexus-black border-nexus-border text-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-nexus-card border-nexus-border">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="api">API</SelectItem>
              <SelectItem value="bidding">Bidding</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-nexus-border text-white hover:bg-white/5">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </Card>

      {/* Log Viewer */}
      <Card className="bg-nexus-card border-nexus-border overflow-hidden">
        <div className="p-4 border-b border-nexus-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="font-semibold text-white">Log Stream</span>
            {isLive && (
              <Badge className="bg-[#39FF14]/10 text-[#39FF14] border-[#39FF14]/30 animate-pulse">
                LIVE
              </Badge>
            )}
          </div>
          <span className="text-nexus-muted text-sm">{filteredLogs.length} entries</span>
        </div>

        <ScrollArea className="h-[600px]">
          <div className="font-mono text-sm">
            {filteredLogs.map((log, index) => (
              <div
                key={log.id}
                className={`border-b border-nexus-border/50 hover:bg-white/5 transition-colors ${log.level === 'error' ? 'bg-[#FF073A]/5' : ''
                  }`}
              >
                <div
                  className="p-3 flex items-start gap-3 cursor-pointer"
                  onClick={() => toggleLogExpansion(log.id)}
                >
                  <button className="mt-0.5 text-nexus-muted hover:text-white">
                    {expandedLogs.has(log.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  <div className="flex-shrink-0 mt-0.5">
                    {levelIcons[log.level]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-nexus-muted text-xs">
                        {formatTimestamp(log.timestamp)}
                      </span>
                      <Badge className={`${levelColors[log.level]} text-xs`}>
                        {log.level.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="border-nexus-border text-nexus-muted text-xs">
                        {categoryIcons[log.category]}
                        <span className="ml-1">{log.category}</span>
                      </Badge>
                      <span className="text-cyan-400 text-xs">[{log.source}]</span>
                    </div>
                    <p className="text-white mt-1">{log.message}</p>
                  </div>
                </div>

                {expandedLogs.has(log.id) && (
                  <div className="px-12 pb-3">
                    <div className="bg-nexus-black rounded-lg p-3 border border-nexus-border">
                      <p className="text-nexus-muted text-xs mb-2">Details:</p>
                      <pre className="text-cyan-400 text-xs overflow-x-auto">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
