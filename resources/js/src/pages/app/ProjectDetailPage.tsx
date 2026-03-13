import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft, Clock, DollarSign, Calendar, Video, Plus,
  Send, Hash, Users, FileText, Upload, GripVertical
} from 'lucide-react';
import { mockUsers } from '@/api/mocks/_auth';
import { formatDistanceToNow, format } from 'date-fns';

// Mock daily updates
const mockDailyUpdates = [
  { id: 'update-1', userId: 'user-1', content: 'Completed the authentication module. All tests passing.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), attachments: [] },
  { id: 'update-2', userId: 'user-2', content: 'Finished the initial wireframes for the admin panel.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), attachments: ['admin-wireframes.fig'] },
];

// Mock channels
const mockChannels = [
  { id: 'ch-1', name: 'general', unread: 0 },
  { id: 'ch-2', name: 'design-feedback', unread: 3 },
  { id: 'ch-3', name: 'dev-blockers', unread: 1 },
];

const mockChannelMessages = [
  { id: 'cm-1', channelId: 'ch-1', userId: 'user-1', content: 'Hey team, just pushed the latest changes.', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: 'cm-2', channelId: 'ch-1', userId: 'user-2', content: 'Great! I\'ll review the design.', timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
];

const mockMeetings = [
  { id: 'meet-1', title: 'Sprint Planning', date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), attendees: ['user-1', 'user-2', 'admin-1'] },
  { id: 'meet-2', title: 'Design Review', date: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), attendees: ['user-2', 'admin-1'] },
];

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, toggleTaskComplete } = useAppStore();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChannel, setSelectedChannel] = useState('ch-1');
  const [newUpdate, setNewUpdate] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [dailyUpdates, setDailyUpdates] = useState(mockDailyUpdates);
  const [channelMessages, setChannelMessages] = useState(mockChannelMessages);

  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Project not found</h2>
          <Button variant="outline" onClick={() => navigate('/app/projects')}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const assignedUsers = project.assignedTo.map(id => mockUsers.find(u => u.id === id)).filter(Boolean);
  const completedTasks = project.tasks.filter(t => t.completed).length;
  const getUserById = (userId: string) => mockUsers.find(u => u.id === userId);

  const handleTaskToggle = (taskId: string) => {
    toggleTaskComplete(project.id, taskId);
    showToast('Task updated', 'success');
  };

  const handlePostUpdate = () => {
    if (!newUpdate.trim() || !user) return;
    setDailyUpdates([{ id: `update-${Date.now()}`, userId: user.id, content: newUpdate, timestamp: new Date().toISOString(), attachments: [] }, ...dailyUpdates]);
    setNewUpdate('');
    showToast('Your daily update has been posted.', 'success');
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;
    setChannelMessages([...channelMessages, { id: `cm-${Date.now()}`, channelId: selectedChannel, userId: user.id, content: newMessage, timestamp: new Date().toISOString() }]);
    setNewMessage('');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/app/projects')} className="mt-1">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="capitalize">{project.platform}</Badge>
              <Badge className={project.status === 'active' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : project.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}>
                {project.status.replace('_', ' ')}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold mb-1">{project.title}</h1>
            <p className="text-nexus-muted text-sm">Client: {project.clientName}</p>
          </div>
        </div>
        <Button className="gradient-primary text-white border-0 gap-2">
          <Video className="w-4 h-4" />
          Schedule Meeting
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-nexus-card border border-nexus-border">
          <TabsTrigger value="overview" className="data-[state=active]:bg-nexus-border">Overview</TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-nexus-border">Task Board</TabsTrigger>
          <TabsTrigger value="updates" className="data-[state=active]:bg-nexus-border">Daily Updates</TabsTrigger>
          <TabsTrigger value="channels" className="data-[state=active]:bg-nexus-border">Channels</TabsTrigger>
          <TabsTrigger value="files" className="data-[state=active]:bg-nexus-border">Client Files</TabsTrigger>
          <TabsTrigger value="meetings" className="data-[state=active]:bg-nexus-border">Meetings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-lg font-semibold mb-4">Project Summary</h2>
                <p className="text-sm text-muted-foreground mb-6">{project.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-background rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1"><DollarSign className="w-4 h-4" /><span className="text-xs">Budget</span></div>
                    <p className="text-lg font-bold text-emerald-500">${project.budget.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1"><Clock className="w-4 h-4" /><span className="text-xs">Progress</span></div>
                    <p className="text-lg font-bold">{project.progress}%</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1"><Calendar className="w-4 h-4" /><span className="text-xs">Deadline</span></div>
                    <p className="text-lg font-bold">{project.deadline ? format(new Date(project.deadline), 'MMM d') : 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <div className="text-muted-foreground mb-1"><span className="text-xs">Tasks</span></div>
                    <p className="text-lg font-bold">{completedTasks}/{project.tasks.length}</p>
                  </div>
                </div>
              </Card>
            </div>
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Team Members</h2>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Plus className="w-4 h-4" /></Button>
              </div>
              <div className="space-y-3">
                {assignedUsers.map((u) => (
                  <div key={u?.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <Avatar className="w-10 h-10"><AvatarImage src={u?.avatar} /><AvatarFallback className="bg-muted">{u?.name?.charAt(0)}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{u?.name}</p><p className="text-xs text-muted-foreground capitalize">{u?.role}</p></div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Task Board Tab */}
        <TabsContent value="tasks" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Task Board</h2>
            <Button variant="outline" size="sm" className="gap-2"><Plus className="w-4 h-4" />Add Task</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {['To Do', 'In Progress', 'In Review', 'Done'].map((column) => (
              <div key={column} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${column === 'To Do' ? 'bg-gray-500' : column === 'In Progress' ? 'bg-blue-500' : column === 'In Review' ? 'bg-purple-500' : 'bg-green-500'}`} />
                  <h3 className="font-medium text-sm">{column}</h3>
                </div>
                <div className="min-h-[300px] p-2 rounded-lg bg-nexus-card/50 border border-nexus-border space-y-2">
                  {project.tasks.filter(t => column === 'Done' ? t.completed : !t.completed && column === 'To Do').map((task) => (
                    <Card key={task.id} className="p-3 bg-nexus-card border-nexus-border cursor-move">
                      <div className="flex items-start gap-2">
                        <GripVertical className="w-4 h-4 text-nexus-muted mt-0.5" />
                        <span className="flex-1 text-sm">{task.title}</span>
                        <Checkbox checked={task.completed} onCheckedChange={() => handleTaskToggle(task.id)} />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Daily Updates Tab */}
        <TabsContent value="updates" className="space-y-6">
          <Card className="p-6 bg-nexus-card border-nexus-border">
            <h3 className="font-semibold mb-4">Post Your Daily Update</h3>
            <div className="space-y-3">
              <Textarea value={newUpdate} onChange={(e) => setNewUpdate(e.target.value)} placeholder="What did you work on today?" className="bg-nexus-black border-nexus-border min-h-[100px]" />
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" className="gap-2"><Upload className="w-4 h-4" />Attach File</Button>
                <Button onClick={handlePostUpdate} className="gradient-primary text-white border-0 gap-2"><Send className="w-4 h-4" />Post Update</Button>
              </div>
            </div>
          </Card>
          <div className="space-y-4">
            <h3 className="font-semibold">Team Updates</h3>
            {dailyUpdates.map((update) => {
              const updateUser = getUserById(update.userId);
              return (
                <Card key={update.id} className="p-4 bg-nexus-card border-nexus-border">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10"><AvatarImage src={updateUser?.avatar} /><AvatarFallback className="bg-nexus-border">{updateUser?.name?.charAt(0)}</AvatarFallback></Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{updateUser?.name}</span>
                        <span className="text-xs text-nexus-muted">{formatDistanceToNow(new Date(update.timestamp), { addSuffix: true })}</span>
                      </div>
                      <p className="text-sm text-nexus-muted">{update.content}</p>
                      {update.attachments.length > 0 && (
                        <div className="flex gap-2 mt-2">{update.attachments.map((file) => (<Badge key={file} variant="outline" className="text-xs gap-1"><FileText className="w-3 h-3" />{file}</Badge>))}</div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Channels Tab */}
        <TabsContent value="channels" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[500px]">
            <Card className="p-4 bg-nexus-card border-nexus-border">
              <h3 className="font-semibold mb-4">Channels</h3>
              <div className="space-y-1">
                {mockChannels.map((channel) => (
                  <button key={channel.id} onClick={() => setSelectedChannel(channel.id)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${selectedChannel === channel.id ? 'bg-nexus-border' : 'hover:bg-nexus-border/50'}`}>
                    <Hash className="w-4 h-4 text-nexus-muted" />
                    <span className="flex-1 text-sm">{channel.name}</span>
                    {channel.unread > 0 && <Badge className="gradient-primary text-white border-0 h-5 px-2 text-xs">{channel.unread}</Badge>}
                  </button>
                ))}
              </div>
            </Card>
            <Card className="lg:col-span-3 bg-nexus-card border-nexus-border flex flex-col">
              <div className="p-4 border-b border-nexus-border">
                <div className="flex items-center gap-2"><Hash className="w-5 h-5" /><span className="font-semibold">{mockChannels.find(c => c.id === selectedChannel)?.name}</span></div>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {channelMessages.filter(m => m.channelId === selectedChannel).map((message) => {
                    const msgUser = getUserById(message.userId);
                    return (
                      <div key={message.id} className="flex items-start gap-3">
                        <Avatar className="w-8 h-8"><AvatarImage src={msgUser?.avatar} /><AvatarFallback className="bg-nexus-border text-xs">{msgUser?.name?.charAt(0)}</AvatarFallback></Avatar>
                        <div><div className="flex items-center gap-2"><span className="font-medium text-sm">{msgUser?.name}</span><span className="text-xs text-nexus-muted">{format(new Date(message.timestamp), 'h:mm a')}</span></div><p className="text-sm text-nexus-muted">{message.content}</p></div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
              <div className="p-4 border-t border-nexus-border">
                <div className="flex gap-2">
                  <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder={`Message #${mockChannels.find(c => c.id === selectedChannel)?.name}`} className="bg-nexus-black border-nexus-border" onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
                  <Button onClick={handleSendMessage} className="gradient-primary text-white border-0"><Send className="w-4 h-4" /></Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Client Files Tab */}
        <TabsContent value="files" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Client Files</h2>
            <Button className="gradient-primary text-white border-0 gap-2"><Upload className="w-4 h-4" />Upload File</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Project Brief.pdf', type: 'pdf', size: '2.4 MB', date: '2 days ago' },
              { name: 'Brand Guidelines.pdf', type: 'pdf', size: '5.1 MB', date: '3 days ago' },
              { name: 'Logo Assets.zip', type: 'zip', size: '12.8 MB', date: '1 week ago' },
              { name: 'Wireframes.fig', type: 'figma', size: '8.2 MB', date: '1 week ago' },
              { name: 'Requirements.docx', type: 'doc', size: '156 KB', date: '2 weeks ago' },
              { name: 'Product Images.zip', type: 'zip', size: '45.3 MB', date: '2 weeks ago' },
            ].map((file, idx) => (
              <Card key={idx} className="p-4 bg-nexus-card border-nexus-border hover:border-nexus-blue/50 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${file.type === 'pdf' ? 'bg-red-500/20 text-red-400' :
                      file.type === 'zip' ? 'bg-yellow-500/20 text-yellow-400' :
                        file.type === 'figma' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-blue-500/20 text-blue-400'
                    }`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-nexus-muted">{file.size} • {file.date}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Meetings Tab */}
        <TabsContent value="meetings" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Scheduled Meetings</h2>
            <Button className="gradient-primary text-white border-0 gap-2"><Plus className="w-4 h-4" />Schedule New Meeting</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockMeetings.map((meeting) => (
              <Card key={meeting.id} className="p-4 bg-nexus-card border-nexus-border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{meeting.title}</h3>
                    <p className="text-sm text-nexus-muted">{format(new Date(meeting.date), 'EEEE, MMM d')}</p>
                    <p className="text-sm text-nexus-blue">{format(new Date(meeting.date), 'h:mm a')}</p>
                  </div>
                  <Video className="w-5 h-5 text-nexus-muted" />
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-nexus-muted" />
                  <div className="flex -space-x-2">
                    {meeting.attendees.slice(0, 3).map((attendeeId) => {
                      const attendee = getUserById(attendeeId);
                      return <Avatar key={attendeeId} className="w-6 h-6 border-2 border-nexus-card"><AvatarImage src={attendee?.avatar} /><AvatarFallback className="text-xs bg-nexus-border">{attendee?.name?.charAt(0)}</AvatarFallback></Avatar>;
                    })}
                  </div>
                  <span className="text-xs text-nexus-muted">{meeting.attendees.length} attendees</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
