import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  MoreHorizontal,
  ChevronDown,
  GripVertical,
  Paperclip,
  MessageSquare,
  Tag,
  Users,
  Flag,
  ArrowUpRight,
  Zap,
  ListTodo,
  LayoutGrid,
  CalendarDays,
  Timer,
  X,
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  assignee: {
    name: string;
    avatar: string;
  };
  project: string;
  tags: string[];
  attachments: number;
  comments: number;
  subtasks: { total: number; completed: number };
  createdAt: string;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implement user authentication flow',
    description: 'Set up OAuth2.0 authentication with Google and GitHub providers',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-04-05',
    assignee: { name: 'John Doe', avatar: '' },
    project: 'Web Platform',
    tags: ['backend', 'security'],
    attachments: 3,
    comments: 12,
    subtasks: { total: 5, completed: 3 },
    createdAt: '2024-03-28',
  },
  {
    id: '2',
    title: 'Design dashboard wireframes',
    description: 'Create low-fidelity wireframes for the analytics dashboard',
    status: 'review',
    priority: 'medium',
    dueDate: '2024-04-03',
    assignee: { name: 'Sarah Chen', avatar: '' },
    project: 'Mobile App',
    tags: ['design', 'ui/ux'],
    attachments: 8,
    comments: 6,
    subtasks: { total: 3, completed: 3 },
    createdAt: '2024-03-25',
  },
  {
    id: '3',
    title: 'API rate limiting implementation',
    description: 'Add rate limiting to protect API endpoints from abuse',
    status: 'todo',
    priority: 'urgent',
    dueDate: '2024-04-02',
    assignee: { name: 'Mike Wilson', avatar: '' },
    project: 'API Gateway',
    tags: ['backend', 'performance'],
    attachments: 1,
    comments: 4,
    subtasks: { total: 4, completed: 0 },
    createdAt: '2024-03-30',
  },
  {
    id: '4',
    title: 'Write documentation for REST API',
    description: 'Document all endpoints with examples and error codes',
    status: 'completed',
    priority: 'low',
    dueDate: '2024-03-30',
    assignee: { name: 'Emily Brown', avatar: '' },
    project: 'Documentation',
    tags: ['docs', 'api'],
    attachments: 2,
    comments: 8,
    subtasks: { total: 6, completed: 6 },
    createdAt: '2024-03-20',
  },
  {
    id: '5',
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-04-08',
    assignee: { name: 'Alex Kim', avatar: '' },
    project: 'DevOps',
    tags: ['devops', 'automation'],
    attachments: 0,
    comments: 3,
    subtasks: { total: 8, completed: 4 },
    createdAt: '2024-03-27',
  },
  {
    id: '6',
    title: 'Performance optimization audit',
    description: 'Analyze and optimize frontend bundle size and load times',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-04-10',
    assignee: { name: 'John Doe', avatar: '' },
    project: 'Web Platform',
    tags: ['frontend', 'performance'],
    attachments: 1,
    comments: 2,
    subtasks: { total: 5, completed: 0 },
    createdAt: '2024-03-29',
  },
];

const statusColumns = [
  { id: 'todo', label: 'To Do', icon: Circle, color: 'text-gray-400' },
  { id: 'in-progress', label: 'In Progress', icon: Timer, color: 'text-blue-400' },
  { id: 'review', label: 'In Review', icon: AlertCircle, color: 'text-yellow-400' },
  { id: 'completed', label: 'Completed', icon: CheckCircle2, color: 'text-green-400' },
];

const priorityConfig = {
  low: { label: 'Low', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
  medium: { label: 'Medium', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  high: { label: 'High', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  urgent: { label: 'Urgent', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

export default function TaskManagement() {
  const [tasks, setTasks] = useState(mockTasks);
  const [view, setView] = useState<'board' | 'list'>('board');
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const getTasksByStatus = (status: string) =>
    tasks.filter(
      (t) =>
        t.status === status &&
        (searchQuery === '' ||
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const TaskCard = ({ task }: { task: Task }) => {
    const priority = priorityConfig[task.priority];
    return (
      <Card
        className="bg-nexus-card border-nexus-border p-4 cursor-pointer hover:border-nexus-muted transition-all group"
        onClick={() => setSelectedTask(task)}
      >
        <div className="flex items-start justify-between mb-3">
          <Badge className={cn('text-xs', priority.color)}>{priority.label}</Badge>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-nexus-border rounded">
            <MoreHorizontal className="w-4 h-4 text-nexus-muted" />
          </button>
        </div>
        <h3 className="font-medium text-sm mb-2 line-clamp-2">{task.title}</h3>
        <p className="text-xs text-nexus-muted line-clamp-2 mb-3">{task.description}</p>
        
        {task.subtasks.total > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-nexus-muted mb-1">
              <span>Subtasks</span>
              <span>{task.subtasks.completed}/{task.subtasks.total}</span>
            </div>
            <Progress value={(task.subtasks.completed / task.subtasks.total) * 100} className="h-1" />
          </div>
        )}

        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-nexus-border px-1.5 py-0">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-nexus-muted">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            {task.attachments > 0 && (
              <span className="flex items-center gap-1">
                <Paperclip className="w-3 h-3" />
                {task.attachments}
              </span>
            )}
            {task.comments > 0 && (
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                {task.comments}
              </span>
            )}
          </div>
          <Avatar className="w-6 h-6">
            <AvatarImage src={task.assignee.avatar} />
            <AvatarFallback className="text-xs bg-nexus-border">
              {task.assignee.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Task Management</h1>
          <p className="text-nexus-muted mt-1">Organize and track your tasks and projects</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-nexus-card border border-nexus-border rounded-lg p-1">
            <Button
              variant={view === 'board' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('board')}
              className={view === 'board' ? 'gradient-primary' : ''}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('list')}
              className={view === 'list' ? 'gradient-primary' : ''}
            >
              <ListTodo className="w-4 h-4" />
            </Button>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-nexus-card border-nexus-border max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>Add a new task to your project</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Task Title</label>
                  <Input placeholder="Enter task title" className="bg-nexus-black border-nexus-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Describe the task..." className="bg-nexus-black border-nexus-border min-h-[100px]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <select className="w-full bg-nexus-black border border-nexus-border rounded-md p-2">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Due Date</label>
                    <Input type="date" className="bg-nexus-black border-nexus-border" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assignee</label>
                  <select className="w-full bg-nexus-black border border-nexus-border rounded-md p-2">
                    <option>John Doe</option>
                    <option>Sarah Chen</option>
                    <option>Mike Wilson</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <Input placeholder="Add tags separated by commas" className="bg-nexus-black border-nexus-border" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
                <Button className="gradient-primary" onClick={() => setCreateDialogOpen(false)}>
                  Create Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-muted" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-nexus-card border-nexus-border"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-nexus-border">
            <Filter className="w-4 h-4 mr-2" />
            Filter
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" className="border-nexus-border">
            <Users className="w-4 h-4 mr-2" />
            Assignee
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" className="border-nexus-border">
            <Calendar className="w-4 h-4 mr-2" />
            Due Date
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statusColumns.map((col) => {
          const count = getTasksByStatus(col.id).length;
          const Icon = col.icon;
          return (
            <Card key={col.id} className="bg-nexus-card border-nexus-border p-4">
              <div className="flex items-center gap-3">
                <div className={cn('w-10 h-10 rounded-lg bg-nexus-border flex items-center justify-center', col.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-xs text-nexus-muted">{col.label}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Board View */}
      {view === 'board' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statusColumns.map((column) => {
            const columnTasks = getTasksByStatus(column.id);
            const Icon = column.icon;
            return (
              <div key={column.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={cn('w-4 h-4', column.color)} />
                    <span className="font-medium text-sm">{column.label}</span>
                    <Badge variant="outline" className="border-nexus-border text-xs">
                      {columnTasks.length}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3 min-h-[200px]">
                  {columnTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                  {columnTasks.length === 0 && (
                    <div className="border-2 border-dashed border-nexus-border rounded-lg p-6 text-center">
                      <p className="text-sm text-nexus-muted">No tasks</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <Card className="bg-nexus-card border-nexus-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-nexus-border">
                  <th className="text-left p-4 text-xs font-medium text-nexus-muted">Task</th>
                  <th className="text-left p-4 text-xs font-medium text-nexus-muted">Status</th>
                  <th className="text-left p-4 text-xs font-medium text-nexus-muted">Priority</th>
                  <th className="text-left p-4 text-xs font-medium text-nexus-muted">Assignee</th>
                  <th className="text-left p-4 text-xs font-medium text-nexus-muted">Due Date</th>
                  <th className="text-left p-4 text-xs font-medium text-nexus-muted">Progress</th>
                  <th className="text-right p-4 text-xs font-medium text-nexus-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks
                  .filter(
                    (t) =>
                      searchQuery === '' ||
                      t.title.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((task) => {
                    const priority = priorityConfig[task.priority];
                    const statusCol = statusColumns.find((c) => c.id === task.status);
                    const StatusIcon = statusCol?.icon || Circle;
                    return (
                      <tr
                        key={task.id}
                        className="border-b border-nexus-border hover:bg-nexus-border/30 cursor-pointer"
                        onClick={() => setSelectedTask(task)}
                      >
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-sm">{task.title}</p>
                            <p className="text-xs text-nexus-muted">{task.project}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <StatusIcon className={cn('w-4 h-4', statusCol?.color)} />
                            <span className="text-sm">{statusCol?.label}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={cn('text-xs', priority.color)}>{priority.label}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs bg-nexus-border">
                                {task.assignee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{task.assignee.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-nexus-muted">
                            {new Date(task.dueDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="p-4">
                          {task.subtasks.total > 0 && (
                            <div className="flex items-center gap-2">
                              <Progress
                                value={(task.subtasks.completed / task.subtasks.total) * 100}
                                className="w-16 h-1.5"
                              />
                              <span className="text-xs text-nexus-muted">
                                {task.subtasks.completed}/{task.subtasks.total}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Task Detail Dialog */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="bg-nexus-card border-nexus-border max-w-2xl">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-xl">{selectedTask?.title}</DialogTitle>
                <p className="text-sm text-nexus-muted mt-1">{selectedTask?.project}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-nexus-red">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-6 py-4">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="text-xs text-nexus-muted block mb-1">Status</label>
                  <select className="bg-nexus-black border border-nexus-border rounded-md px-3 py-1.5 text-sm">
                    {statusColumns.map((col) => (
                      <option key={col.id} value={col.id} selected={col.id === selectedTask.status}>
                        {col.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-nexus-muted block mb-1">Priority</label>
                  <Badge className={cn('text-sm', priorityConfig[selectedTask.priority].color)}>
                    {priorityConfig[selectedTask.priority].label}
                  </Badge>
                </div>
                <div>
                  <label className="text-xs text-nexus-muted block mb-1">Assignee</label>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-nexus-border">
                        {selectedTask.assignee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{selectedTask.assignee.name}</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-nexus-muted block mb-1">Due Date</label>
                  <span className="text-sm flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedTask.dueDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs text-nexus-muted block mb-2">Description</label>
                <p className="text-sm">{selectedTask.description}</p>
              </div>

              {selectedTask.subtasks.total > 0 && (
                <div>
                  <label className="text-xs text-nexus-muted block mb-2">
                    Subtasks ({selectedTask.subtasks.completed}/{selectedTask.subtasks.total})
                  </label>
                  <Progress value={(selectedTask.subtasks.completed / selectedTask.subtasks.total) * 100} className="h-2" />
                </div>
              )}

              <div>
                <label className="text-xs text-nexus-muted block mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {selectedTask.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-nexus-border">
                      {tag}
                    </Badge>
                  ))}
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <Plus className="w-3 h-3 mr-1" />
                    Add tag
                  </Button>
                </div>
              </div>

              <div className="border-t border-nexus-border pt-4">
                <label className="text-xs text-nexus-muted block mb-2">Comments ({selectedTask.comments})</label>
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs bg-nexus-border">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea placeholder="Write a comment..." className="bg-nexus-black border-nexus-border min-h-[80px]" />
                    <Button size="sm" className="gradient-primary mt-2">Post Comment</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
