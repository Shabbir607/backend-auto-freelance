import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Play,
  Pause,
  Square,
  Clock,
  Calendar,
  Plus,
  MoreHorizontal,
  Edit2,
  Trash2,
  Download,
  Filter,
  ChevronDown,
  TrendingUp,
  DollarSign,
  Target,
  FolderOpen,
  Users,
  BarChart3,
  Timer,
  Coffee,
  Sun,
  Moon,
  Sunset,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimeEntry {
  id: string;
  project: string;
  task: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  billable: boolean;
  hourlyRate: number;
  date: string;
}

interface Project {
  id: string;
  name: string;
  client: string;
  color: string;
  totalHours: number;
  budgetHours: number;
}

const mockTimeEntries: TimeEntry[] = [
  {
    id: '1',
    project: 'E-commerce Platform',
    task: 'Frontend Development',
    description: 'Working on product listing page and cart functionality',
    startTime: '09:00',
    endTime: '12:30',
    duration: 210,
    billable: true,
    hourlyRate: 85,
    date: '2024-04-01',
  },
  {
    id: '2',
    project: 'Mobile App',
    task: 'UI Design',
    description: 'Designing onboarding screens',
    startTime: '13:30',
    endTime: '16:00',
    duration: 150,
    billable: true,
    hourlyRate: 95,
    date: '2024-04-01',
  },
  {
    id: '3',
    project: 'API Gateway',
    task: 'Code Review',
    description: 'Reviewing pull requests and providing feedback',
    startTime: '16:30',
    endTime: '17:45',
    duration: 75,
    billable: false,
    hourlyRate: 85,
    date: '2024-04-01',
  },
  {
    id: '4',
    project: 'E-commerce Platform',
    task: 'Backend Development',
    description: 'Implementing payment gateway integration',
    startTime: '09:00',
    endTime: '11:30',
    duration: 150,
    billable: true,
    hourlyRate: 85,
    date: '2024-03-31',
  },
  {
    id: '5',
    project: 'Mobile App',
    task: 'Testing',
    description: 'Unit testing and bug fixes',
    startTime: '14:00',
    endTime: '17:00',
    duration: 180,
    billable: true,
    hourlyRate: 95,
    date: '2024-03-31',
  },
];

const mockProjects: Project[] = [
  { id: '1', name: 'E-commerce Platform', client: 'TechCorp Inc.', color: 'bg-blue-500', totalHours: 124, budgetHours: 200 },
  { id: '2', name: 'Mobile App', client: 'StartupX', color: 'bg-purple-500', totalHours: 86, budgetHours: 150 },
  { id: '3', name: 'API Gateway', client: 'DataFlow', color: 'bg-green-500', totalHours: 45, budgetHours: 80 },
  { id: '4', name: 'Dashboard Redesign', client: 'Global Retail', color: 'bg-orange-500', totalHours: 32, budgetHours: 60 },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function TimeTracking() {
  const [isTracking, setIsTracking] = useState(false);
  const [activeTimer, setActiveTimer] = useState(0);
  const [selectedProject, setSelectedProject] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [manualEntryOpen, setManualEntryOpen] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTracking) {
      interval = setInterval(() => {
        setActiveTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  };

  const todayTotal = mockTimeEntries
    .filter((e) => e.date === '2024-04-01')
    .reduce((acc, e) => acc + e.duration, 0);

  const weekTotal = mockTimeEntries.reduce((acc, e) => acc + e.duration, 0);

  const billableTotal = mockTimeEntries
    .filter((e) => e.billable)
    .reduce((acc, e) => acc + e.duration, 0);

  const totalEarnings = mockTimeEntries
    .filter((e) => e.billable)
    .reduce((acc, e) => acc + (e.duration / 60) * e.hourlyRate, 0);

  const getTimeOfDayIcon = () => {
    const hour = new Date().getHours();
    if (hour < 12) return <Sun className="w-5 h-5 text-yellow-400" />;
    if (hour < 17) return <Coffee className="w-5 h-5 text-orange-400" />;
    if (hour < 20) return <Sunset className="w-5 h-5 text-pink-400" />;
    return <Moon className="w-5 h-5 text-indigo-400" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            Time Tracking
            {getTimeOfDayIcon()}
          </h1>
          <p className="text-nexus-muted mt-1">Track your time across projects and tasks</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={manualEntryOpen} onOpenChange={setManualEntryOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-nexus-border">
                <Plus className="w-4 h-4 mr-2" />
                Manual Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-nexus-card border-nexus-border">
              <DialogHeader>
                <DialogTitle>Add Time Entry</DialogTitle>
                <DialogDescription>Manually log time for a task</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project</label>
                  <select className="w-full bg-nexus-black border border-nexus-border rounded-md p-2">
                    {mockProjects.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Task</label>
                  <Input placeholder="What are you working on?" className="bg-nexus-black border-nexus-border" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input type="date" className="bg-nexus-black border-nexus-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <div className="flex gap-2">
                      <Input type="number" placeholder="Hrs" className="bg-nexus-black border-nexus-border" />
                      <Input type="number" placeholder="Min" className="bg-nexus-black border-nexus-border" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="billable" defaultChecked className="rounded" />
                  <label htmlFor="billable" className="text-sm">Billable</label>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes (Optional)</label>
                  <Textarea placeholder="Add notes..." className="bg-nexus-black border-nexus-border" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setManualEntryOpen(false)}>Cancel</Button>
                <Button className="gradient-primary" onClick={() => setManualEntryOpen(false)}>
                  Add Entry
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="border-nexus-border">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Timer Card */}
      <Card className="bg-nexus-card border-nexus-border p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex items-center gap-4">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="bg-nexus-black border border-nexus-border rounded-md px-4 py-3 min-w-[200px]"
            >
              <option value="">Select Project</option>
              {mockProjects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <Input
              placeholder="What are you working on?"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="flex-1 h-12 bg-nexus-black border-nexus-border"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-mono font-bold min-w-[150px] text-center">
              {formatTime(activeTimer)}
            </div>
            <div className="flex gap-2">
              {!isTracking ? (
                <Button
                  size="lg"
                  className="gradient-primary w-14 h-14 rounded-full p-0"
                  onClick={() => setIsTracking(true)}
                >
                  <Play className="w-6 h-6" />
                </Button>
              ) : (
                <>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-nexus-border w-14 h-14 rounded-full p-0"
                    onClick={() => setIsTracking(false)}
                  >
                    <Pause className="w-6 h-6" />
                  </Button>
                  <Button
                    size="lg"
                    className="bg-nexus-red hover:bg-nexus-red/80 w-14 h-14 rounded-full p-0"
                    onClick={() => {
                      setIsTracking(false);
                      setActiveTimer(0);
                    }}
                  >
                    <Square className="w-5 h-5" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Today</p>
              <p className="text-2xl font-bold mt-1">{formatDuration(todayTotal)}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-blue/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-nexus-blue" />
            </div>
          </div>
          <Progress value={(todayTotal / 480) * 100} className="h-1.5 mt-3" />
          <p className="text-xs text-nexus-muted mt-1">Target: 8h</p>
        </Card>

        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">This Week</p>
              <p className="text-2xl font-bold mt-1">{formatDuration(weekTotal)}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-purple/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-nexus-purple" />
            </div>
          </div>
          <Progress value={(weekTotal / 2400) * 100} className="h-1.5 mt-3" />
          <p className="text-xs text-nexus-muted mt-1">Target: 40h</p>
        </Card>

        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Billable Hours</p>
              <p className="text-2xl font-bold mt-1">{formatDuration(billableTotal)}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-green/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-nexus-green" />
            </div>
          </div>
          <p className="text-xs text-nexus-green mt-3">
            {Math.round((billableTotal / weekTotal) * 100)}% billable rate
          </p>
        </Card>

        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Earnings</p>
              <p className="text-2xl font-bold mt-1">${totalEarnings.toFixed(0)}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-fuchsia/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-nexus-fuchsia" />
            </div>
          </div>
          <p className="text-xs text-nexus-green mt-3 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +12% from last week
          </p>
        </Card>
      </div>

      <Tabs defaultValue="entries">
        <TabsList className="bg-nexus-card border border-nexus-border">
          <TabsTrigger value="entries" className="data-[state=active]:bg-nexus-border">
            <Timer className="w-4 h-4 mr-2" />
            Time Entries
          </TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-nexus-border">
            <FolderOpen className="w-4 h-4 mr-2" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-nexus-border">
            <BarChart3 className="w-4 h-4 mr-2" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Time Entries Tab */}
        <TabsContent value="entries" className="mt-6 space-y-6">
          {/* Week Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm">← Previous Week</Button>
            <div className="text-center">
              <h3 className="font-semibold">March 25 - April 1, 2024</h3>
              <p className="text-sm text-nexus-muted">This Week</p>
            </div>
            <Button variant="ghost" size="sm">Next Week →</Button>
          </div>

          {/* Day Summary */}
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, i) => (
              <Card
                key={day}
                className={cn(
                  'bg-nexus-card border-nexus-border p-3 text-center cursor-pointer hover:border-nexus-muted',
                  i === 0 && 'border-nexus-blue bg-nexus-blue/5'
                )}
              >
                <p className="text-xs text-nexus-muted">{day}</p>
                <p className="text-lg font-bold mt-1">{Math.floor(Math.random() * 8) + 2}h</p>
              </Card>
            ))}
          </div>

          {/* Entries Table */}
          <Card className="bg-nexus-card border-nexus-border">
            <div className="p-4 border-b border-nexus-border flex items-center justify-between">
              <h3 className="font-semibold">Today's Entries</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-nexus-border">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-nexus-border">
                  <TableHead className="text-nexus-muted">Project</TableHead>
                  <TableHead className="text-nexus-muted">Task</TableHead>
                  <TableHead className="text-nexus-muted">Time</TableHead>
                  <TableHead className="text-nexus-muted">Duration</TableHead>
                  <TableHead className="text-nexus-muted">Billable</TableHead>
                  <TableHead className="text-nexus-muted text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTimeEntries
                  .filter((e) => e.date === '2024-04-01')
                  .map((entry) => (
                    <TableRow key={entry.id} className="border-nexus-border">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={cn('w-3 h-3 rounded-full', mockProjects.find(p => p.name === entry.project)?.color || 'bg-gray-500')} />
                          <span className="font-medium">{entry.project}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{entry.task}</p>
                          <p className="text-xs text-nexus-muted truncate max-w-xs">{entry.description}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-nexus-muted">
                        {entry.startTime} - {entry.endTime}
                      </TableCell>
                      <TableCell className="font-medium">{formatDuration(entry.duration)}</TableCell>
                      <TableCell>
                        {entry.billable ? (
                          <Badge className="bg-nexus-green/10 text-nexus-green">Billable</Badge>
                        ) : (
                          <Badge className="bg-nexus-muted/10 text-nexus-muted">Non-billable</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-nexus-red">
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

        {/* Projects Tab */}
        <TabsContent value="projects" className="mt-6 space-y-4">
          {mockProjects.map((project) => (
            <Card key={project.id} className="bg-nexus-card border-nexus-border p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn('w-4 h-4 rounded-full', project.color)} />
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-nexus-muted">{project.client}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-nexus-muted">Time Tracked</span>
                  <span>{project.totalHours}h / {project.budgetHours}h</span>
                </div>
                <Progress value={(project.totalHours / project.budgetHours) * 100} className="h-2" />
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-nexus-border text-sm">
                <span className="text-nexus-muted">
                  {project.budgetHours - project.totalHours}h remaining
                </span>
                <Button variant="outline" size="sm" className="border-nexus-border">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="mt-6">
          <Card className="bg-nexus-card border-nexus-border p-6">
            <h3 className="font-semibold mb-6">Weekly Overview</h3>
            <div className="h-64 flex items-end justify-between gap-4">
              {weekDays.map((day) => {
                const height = Math.random() * 80 + 20;
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-nexus-blue to-nexus-purple rounded-t"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-nexus-muted">{day}</span>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-nexus-border">
              <div className="text-center">
                <p className="text-2xl font-bold">{formatDuration(weekTotal)}</p>
                <p className="text-sm text-nexus-muted">Total Time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">${totalEarnings.toFixed(0)}</p>
                <p className="text-sm text-nexus-muted">Total Earnings</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{Math.round((billableTotal / weekTotal) * 100)}%</p>
                <p className="text-sm text-nexus-muted">Billable Rate</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
