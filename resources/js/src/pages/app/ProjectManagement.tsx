import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import { useToast } from '@/contexts/ToastContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Clock, DollarSign, GripVertical } from 'lucide-react';
import { Project, ProjectStatus } from '@/api/mocks/_projects';
import { mockUsers } from '@/api/mocks/_auth';

const columns: { id: ProjectStatus; title: string; color: string }[] = [
  { id: 'bidding', title: 'Bidding', color: 'bg-amber-500' },
  { id: 'active', title: 'Active', color: 'bg-primary' },
  { id: 'in_review', title: 'In Review', color: 'bg-violet-500' },
  { id: 'completed', title: 'Completed', color: 'bg-emerald-500' },
];

export default function ProjectManagement() {
  const navigate = useNavigate();
  const { projects, updateProjectStatus } = useAppStore();
  const { showToast } = useToast();
  const [draggedProject, setDraggedProject] = useState<Project | null>(null);

  const getProjectsByStatus = (status: ProjectStatus) => {
    return projects.filter(p => p.status === status);
  };

  const handleDragStart = (e: React.DragEvent, project: Project) => {
    setDraggedProject(project);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: ProjectStatus) => {
    e.preventDefault();
    if (draggedProject && draggedProject.status !== status) {
      updateProjectStatus(draggedProject.id, status);
      showToast(`Project moved to ${status.replace('_', ' ')}`, 'success');
    }
    setDraggedProject(null);
  };

  const getAssignedUsers = (assignedTo: string[]) => {
    return assignedTo.map(id => mockUsers.find(u => u.id === id)).filter(Boolean);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Project Management</h1>
          <p className="text-muted-foreground text-sm">
            Drag and drop projects to update their status
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex flex-col"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className={`w-2.5 h-2.5 rounded-full ${column.color}`} />
              <h3 className="font-semibold text-sm">{column.title}</h3>
              <Badge variant="outline" className="ml-auto text-xs">
                {getProjectsByStatus(column.id).length}
              </Badge>
            </div>

            {/* Column Content */}
            <div className="flex-1 space-y-3 min-h-[400px] p-3 rounded-lg bg-muted/30 border border-border">
              {getProjectsByStatus(column.id).map((project) => (
                <Card
                  key={project.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, project)}
                  onClick={() => navigate(`/app/projects/${project.id}`)}
                  className={`p-4 bg-card border-border cursor-pointer hover:border-primary/50 transition-all ${draggedProject?.id === project.id ? 'opacity-50' : ''
                    }`}
                >
                  <div className="flex items-start gap-2 mb-3">
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="capitalize text-xs">
                          {project.platform}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${project.priority === 'high' || project.priority === 'urgent'
                              ? 'border-red-500/30 text-red-400'
                              : project.priority === 'medium'
                                ? 'border-amber-500/30 text-amber-400'
                                : 'border-border text-muted-foreground'
                            }`}
                        >
                          {project.priority}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm mb-1 line-clamp-2">{project.title}</h4>
                      <p className="text-xs text-muted-foreground">{project.clientName}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center gap-1 text-emerald-500">
                      <DollarSign className="w-3 h-3" />
                      <span className="font-medium">{project.budget.toLocaleString()}</span>
                    </div>
                    {project.deadline && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(project.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Assigned Users */}
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {getAssignedUsers(project.assignedTo).slice(0, 3).map((user) => (
                        <Avatar key={user?.id} className="w-6 h-6 border-2 border-card">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback className="text-xs bg-muted">
                            {user?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.assignedTo.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-card">
                          +{project.assignedTo.length - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {project.tasks.filter(t => t.completed).length}/{project.tasks.length} tasks
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
