import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FileText,
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Star,
  CheckCircle,
  AlertCircle,
  Clock,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MoreVertical,
  Sparkles,
  RefreshCw,
  Copy,
  Link as LinkIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/contexts/ToastContext';
import { cn } from '@/lib/utils';

interface CV {
  id: string;
  name: string;
  type: 'primary' | 'specialized';
  lastUpdated: string;
  completeness: number;
  views: number;
  downloads: number;
  status: 'active' | 'draft';
  skills: string[];
  targetRole?: string;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  year: string;
}

const mockCVs: CV[] = [
  {
    id: 'cv-1',
    name: 'Full Stack Developer CV',
    type: 'primary',
    lastUpdated: '2024-01-20',
    completeness: 95,
    views: 245,
    downloads: 32,
    status: 'active',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    targetRole: 'Full Stack Developer',
  },
  {
    id: 'cv-2',
    name: 'Frontend Specialist CV',
    type: 'specialized',
    lastUpdated: '2024-01-15',
    completeness: 88,
    views: 156,
    downloads: 18,
    status: 'active',
    skills: ['React', 'Vue.js', 'CSS', 'Tailwind', 'Figma'],
    targetRole: 'Frontend Developer',
  },
  {
    id: 'cv-3',
    name: 'Technical Lead CV',
    type: 'specialized',
    lastUpdated: '2024-01-10',
    completeness: 72,
    views: 89,
    downloads: 8,
    status: 'draft',
    skills: ['Architecture', 'Team Leadership', 'Agile', 'System Design'],
    targetRole: 'Technical Lead',
  },
];

const mockExperience: Experience[] = [
  {
    id: 'exp-1',
    company: 'TechCorp Inc',
    role: 'Senior Full Stack Developer',
    startDate: '2022-01',
    endDate: '',
    description: 'Led development of enterprise SaaS platform serving 50K+ users.',
    current: true,
  },
  {
    id: 'exp-2',
    company: 'StartupXYZ',
    role: 'Full Stack Developer',
    startDate: '2020-03',
    endDate: '2022-01',
    description: 'Built and scaled e-commerce platform from 0 to $2M ARR.',
    current: false,
  },
];

const mockEducation: Education[] = [
  {
    id: 'edu-1',
    institution: 'MIT',
    degree: 'Master of Science',
    field: 'Computer Science',
    year: '2020',
  },
  {
    id: 'edu-2',
    institution: 'UC Berkeley',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    year: '2018',
  },
];

export default function CVManager() {
  const { showToast } = useToast();
  const [cvs, setCVs] = useState<CV[]>(mockCVs);
  const [selectedCV, setSelectedCV] = useState<CV | null>(mockCVs[0]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (!uploadedFile) return;
    const newCV: CV = {
      id: `cv-${Date.now()}`,
      name: uploadedFile.name.replace(/\.[^/.]+$/, ''),
      type: 'specialized',
      lastUpdated: new Date().toISOString().split('T')[0],
      completeness: 60,
      views: 0,
      downloads: 0,
      status: 'draft',
      skills: [],
    };
    setCVs(prev => [...prev, newCV]);
    setShowUploadModal(false);
    setUploadedFile(null);
    showToast({ title: 'CV Uploaded', description: 'Your CV has been uploaded successfully', type: 'success' });
  };

  const handleDelete = (cvId: string) => {
    setCVs(prev => prev.filter(cv => cv.id !== cvId));
    if (selectedCV?.id === cvId) {
      setSelectedCV(cvs[0] || null);
    }
    showToast({ title: 'CV Deleted', description: 'Your CV has been deleted', type: 'success' });
  };

  const handleDuplicate = (cv: CV) => {
    const newCV: CV = {
      ...cv,
      id: `cv-${Date.now()}`,
      name: `${cv.name} (Copy)`,
      status: 'draft',
      views: 0,
      downloads: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setCVs(prev => [...prev, newCV]);
    showToast({ title: 'CV Duplicated', description: 'A copy of your CV has been created', type: 'success' });
  };

  const getCompletenessColor = (value: number) => {
    if (value >= 90) return 'text-emerald-400';
    if (value >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">CV Manager</h1>
          <p className="text-muted-foreground">Manage your resumes and portfolios</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setShowUploadModal(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Upload CV
          </Button>
          <Button className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
            <Plus className="w-4 h-4 mr-2" />
            Create CV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{cvs.length}</p>
              <p className="text-sm text-muted-foreground">Total CVs</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{cvs.reduce((sum, cv) => sum + cv.views, 0)}</p>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Download className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{cvs.reduce((sum, cv) => sum + cv.downloads, 0)}</p>
              <p className="text-sm text-muted-foreground">Downloads</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{cvs.filter(cv => cv.completeness >= 90).length}</p>
              <p className="text-sm text-muted-foreground">Complete</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* CV List */}
        <Card className="lg:col-span-1 bg-card border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Your CVs</h3>
          </div>
          <ScrollArea className="h-[500px]">
            <div className="p-4 space-y-3">
              {cvs.map((cv) => (
                <div
                  key={cv.id}
                  onClick={() => setSelectedCV(cv)}
                  className={cn(
                    'p-4 rounded-lg cursor-pointer transition-all border',
                    selectedCV?.id === cv.id
                      ? 'bg-primary/10 border-primary/30'
                      : 'bg-muted/50 border-transparent hover:border-primary/20'
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="font-medium">{cv.name}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> Preview</DropdownMenuItem>
                        <DropdownMenuItem><Download className="w-4 h-4 mr-2" /> Download</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(cv)}><Copy className="w-4 h-4 mr-2" /> Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(cv.id)} className="text-red-400">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={cv.type === 'primary' ? 'border-cyan-500/30 text-cyan-400' : 'border-gray-500/30'}>
                      {cv.type}
                    </Badge>
                    <Badge variant="outline" className={cv.status === 'active' ? 'border-emerald-500/30 text-emerald-400' : 'border-yellow-500/30 text-yellow-400'}>
                      {cv.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className={getCompletenessColor(cv.completeness)}>{cv.completeness}% complete</span>
                    <span>{cv.views} views</span>
                  </div>
                  <Progress value={cv.completeness} className="h-1 mt-2" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* CV Detail */}
        <Card className="lg:col-span-2 bg-card border-border">
          {selectedCV ? (
            <>
              <div className="p-5 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{selectedCV.name}</h3>
                  <p className="text-sm text-muted-foreground">Last updated: {selectedCV.lastUpdated}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-[450px]">
                <div className="p-5 space-y-6">
                  {/* Completeness */}
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Profile Completeness</span>
                      <span className={cn('font-bold', getCompletenessColor(selectedCV.completeness))}>
                        {selectedCV.completeness}%
                      </span>
                    </div>
                    <Progress value={selectedCV.completeness} className="h-2" />
                    {selectedCV.completeness < 100 && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                        Add more details to improve your profile
                      </div>
                    )}
                  </div>

                  {/* Target Role */}
                  {selectedCV.targetRole && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        Target Role
                      </h4>
                      <p className="text-muted-foreground">{selectedCV.targetRole}</p>
                    </div>
                  )}

                  {/* Skills */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Code className="w-4 h-4 text-primary" />
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCV.skills.map((skill) => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Experience
                    </h4>
                    <div className="space-y-4">
                      {mockExperience.map((exp) => (
                        <div key={exp.id} className="p-4 rounded-lg bg-muted/50 border border-border">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="font-medium">{exp.role}</h5>
                              <p className="text-sm text-muted-foreground">{exp.company}</p>
                            </div>
                            {exp.current && (
                              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Current</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </p>
                          <p className="text-sm mt-2">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Education
                    </h4>
                    <div className="space-y-3">
                      {mockEducation.map((edu) => (
                        <div key={edu.id} className="p-4 rounded-lg bg-muted/50 border border-border">
                          <h5 className="font-medium">{edu.degree} in {edu.field}</h5>
                          <p className="text-sm text-muted-foreground">{edu.institution} • {edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Suggestions */}
                  <Card className="p-4 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 border-primary/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">AI Suggestions</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        Add 2 more projects to your portfolio
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        Include certifications for higher visibility
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        Add a professional summary section
                      </li>
                    </ul>
                    <Button className="mt-4 w-full bg-white/10 hover:bg-white/20 text-white border-0">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Optimize with AI
                    </Button>
                  </Card>
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="h-[500px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a CV to view details</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Upload Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload CV</DialogTitle>
            <DialogDescription>Upload your existing CV to get started</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                className="hidden"
                id="cv-upload"
              />
              <label htmlFor="cv-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX up to 10MB</p>
              </label>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>Cancel</Button>
            <Button
              className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0"
              onClick={handleUpload}
              disabled={!uploadedFile}
            >
              Upload CV
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
