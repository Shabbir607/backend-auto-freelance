import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Briefcase,
  Calendar,
  Camera,
  Save,
  Plus,
  X,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  CreditCard,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Upload,
  FileText,
  Link as LinkIcon,
  Star,
  Award,
  CheckCircle,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import ReputationScore from '@/components/ReputationScore';

interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  isPublic: boolean;
}

export default function ProfileManagement() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  
  // Personal Info State
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    location: 'San Francisco, CA',
    timezone: 'America/Los_Angeles',
    bio: 'Full-stack developer with 8+ years of experience building scalable web applications. Passionate about clean code and user experience.',
    title: 'Senior Full-Stack Developer',
    hourlyRate: '85',
    availability: 'full-time',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  });

  // Skills State
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'React', level: 'expert' },
    { id: '2', name: 'TypeScript', level: 'expert' },
    { id: '3', name: 'Node.js', level: 'advanced' },
    { id: '4', name: 'PostgreSQL', level: 'advanced' },
    { id: '5', name: 'AWS', level: 'intermediate' },
    { id: '6', name: 'Docker', level: 'intermediate' },
  ]);
  const [newSkill, setNewSkill] = useState('');

  // Portfolio State
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Built a full-featured e-commerce platform with React and Node.js',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
      link: 'https://example.com/project1',
      isPublic: true,
    },
    {
      id: '2',
      title: 'SaaS Dashboard',
      description: 'Designed and developed a comprehensive analytics dashboard',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
      link: 'https://example.com/project2',
      isPublic: true,
    },
  ]);

  // Social Links State
  const [socialLinks, setSocialLinks] = useState({
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    website: 'https://johndoe.dev',
  });

  // Payment State
  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: 'bank',
    bankName: 'Chase Bank',
    accountNumber: '****4567',
    routingNumber: '****1234',
    paypalEmail: '',
    stripeConnected: true,
  });

  // Notification Preferences
  const [notifications, setNotifications] = useState({
    emailNewMessages: true,
    emailProjectUpdates: true,
    emailPayments: true,
    emailMarketing: false,
    pushNewMessages: true,
    pushProjectUpdates: true,
    pushPayments: true,
    inAppAll: true,
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showPhone: false,
    showLocation: true,
    showHourlyRate: true,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, { id: Date.now().toString(), name: newSkill, level: 'intermediate' }]);
      setNewSkill('');
    }
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const profileCompletion = 85;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Profile Management</h1>
          <p className="text-nexus-muted mt-1">Manage your personal information, skills, and preferences</p>
        </div>
        <Button className="gradient-primary text-white border-0" onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Profile Completion */}
      <Card className="p-4 bg-nexus-card border-nexus-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Profile Completion</span>
          <span className="text-sm text-nexus-muted">{profileCompletion}%</span>
        </div>
        <Progress value={profileCompletion} className="h-2" />
        <p className="text-xs text-nexus-muted mt-2">Complete your profile to increase visibility and attract more clients</p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Card */}
        <Card className="p-6 bg-nexus-card border-nexus-border lg:col-span-1">
          <div className="text-center">
            <div className="relative inline-block">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={personalInfo.avatar} />
                <AvatarFallback className="text-2xl">{personalInfo.firstName[0]}{personalInfo.lastName[0]}</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:opacity-90 transition-opacity">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="mt-4 text-lg font-semibold">{personalInfo.firstName} {personalInfo.lastName}</h2>
            <p className="text-sm text-nexus-muted">{personalInfo.title}</p>
            
            <div className="mt-4">
              <ReputationScore score={92} size="lg" showDetails />
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                <Award className="w-3 h-3 mr-1" />
                Top Rated
              </Badge>
            </div>

            <div className="mt-4 pt-4 border-t border-nexus-border space-y-2 text-sm">
              <div className="flex items-center gap-2 text-nexus-muted">
                <MapPin className="w-4 h-4" />
                {personalInfo.location}
              </div>
              <div className="flex items-center gap-2 text-nexus-muted">
                <Briefcase className="w-4 h-4" />
                ${personalInfo.hourlyRate}/hr
              </div>
              <div className="flex items-center gap-2 text-nexus-muted">
                <Calendar className="w-4 h-4" />
                {personalInfo.availability === 'full-time' ? 'Full-time' : 'Part-time'}
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-2">
              {socialLinks.github && (
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-nexus-border transition-colors">
                  <Github className="w-5 h-5 text-nexus-muted hover:text-white" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-nexus-border transition-colors">
                  <Linkedin className="w-5 h-5 text-nexus-muted hover:text-white" />
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-nexus-border transition-colors">
                  <Twitter className="w-5 h-5 text-nexus-muted hover:text-white" />
                </a>
              )}
              {socialLinks.website && (
                <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-nexus-border transition-colors">
                  <Globe className="w-5 h-5 text-nexus-muted hover:text-white" />
                </a>
              )}
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-nexus-card border border-nexus-border overflow-x-auto">
              <TabsTrigger value="personal" className="data-[state=active]:bg-nexus-blue/20">
                <User className="w-4 h-4 mr-2" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-nexus-blue/20">
                <Star className="w-4 h-4 mr-2" />
                Skills
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="data-[state=active]:bg-nexus-blue/20">
                <Briefcase className="w-4 h-4 mr-2" />
                Portfolio
              </TabsTrigger>
              <TabsTrigger value="payment" className="data-[state=active]:bg-nexus-blue/20">
                <CreditCard className="w-4 h-4 mr-2" />
                Payment
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-nexus-blue/20">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-nexus-blue/20">
                <Shield className="w-4 h-4 mr-2" />
                Privacy
              </TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal" className="mt-4">
              <Card className="p-6 bg-nexus-card border-nexus-border">
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                      className="mt-1 bg-nexus-black border-nexus-border"
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                      className="mt-1 bg-nexus-black border-nexus-border"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      className="mt-1 bg-nexus-black border-nexus-border"
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      className="mt-1 bg-nexus-black border-nexus-border"
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                      className="mt-1 bg-nexus-black border-nexus-border"
                    />
                  </div>
                  <div>
                    <Label>Timezone</Label>
                    <Select value={personalInfo.timezone} onValueChange={(v) => setPersonalInfo({ ...personalInfo, timezone: v })}>
                      <SelectTrigger className="mt-1 bg-nexus-black border-nexus-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="Europe/London">GMT</SelectItem>
                        <SelectItem value="Europe/Paris">CET</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Professional Title</Label>
                    <Input
                      value={personalInfo.title}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                      className="mt-1 bg-nexus-black border-nexus-border"
                    />
                  </div>
                  <div>
                    <Label>Hourly Rate ($)</Label>
                    <Input
                      type="number"
                      value={personalInfo.hourlyRate}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, hourlyRate: e.target.value })}
                      className="mt-1 bg-nexus-black border-nexus-border"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Availability</Label>
                    <Select value={personalInfo.availability} onValueChange={(v) => setPersonalInfo({ ...personalInfo, availability: v })}>
                      <SelectTrigger className="mt-1 bg-nexus-black border-nexus-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time (40+ hrs/week)</SelectItem>
                        <SelectItem value="part-time">Part-time (20-30 hrs/week)</SelectItem>
                        <SelectItem value="limited">Limited (10-20 hrs/week)</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Bio</Label>
                    <Textarea
                      value={personalInfo.bio}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                      className="mt-1 bg-nexus-black border-nexus-border min-h-[120px]"
                      placeholder="Tell clients about yourself..."
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-8 mb-4">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center gap-2"><Github className="w-4 h-4" /> GitHub</Label>
                    <Input
                      value={socialLinks.github}
                      onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                      className="mt-1 bg-nexus-black border-nexus-border"
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</Label>
                    <Input
                      value={socialLinks.linkedin}
                      onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                      className="mt-1 bg-nexus-black border-nexus-border"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2"><Twitter className="w-4 h-4" /> Twitter</Label>
                    <Input
                      value={socialLinks.twitter}
                      onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                      className="mt-1 bg-nexus-black border-nexus-border"
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2"><Globe className="w-4 h-4" /> Website</Label>
                    <Input
                      value={socialLinks.website}
                      onChange={(e) => setSocialLinks({ ...socialLinks, website: e.target.value })}
                      className="mt-1 bg-nexus-black border-nexus-border"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-8 mb-4">Resume</h3>
                <div className="border-2 border-dashed border-nexus-border rounded-lg p-8 text-center">
                  <Upload className="w-10 h-10 text-nexus-muted mx-auto mb-3" />
                  <p className="text-sm text-nexus-muted mb-2">Drag and drop your resume here, or click to browse</p>
                  <Button variant="outline" className="border-nexus-border">
                    <FileText className="w-4 h-4 mr-2" />
                    Upload Resume
                  </Button>
                  <p className="text-xs text-nexus-muted mt-2">PDF, DOC, or DOCX (max 5MB)</p>
                </div>
              </Card>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="mt-4">
              <Card className="p-6 bg-nexus-card border-nexus-border">
                <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>
                
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill..."
                    className="bg-nexus-black border-nexus-border"
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill} className="gradient-primary text-white border-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between p-3 rounded-lg bg-nexus-black border border-nexus-border">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{skill.name}</span>
                        <Select
                          value={skill.level}
                          onValueChange={(v) => setSkills(skills.map(s => s.id === skill.id ? { ...s, level: v as Skill['level'] } : s))}
                        >
                          <SelectTrigger className="w-32 h-8 bg-nexus-card border-nexus-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeSkill(skill.id)} className="text-nexus-muted hover:text-red-400">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="mt-4">
              <Card className="p-6 bg-nexus-card border-nexus-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Portfolio</h3>
                  <Button className="gradient-primary text-white border-0">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolio.map((item) => (
                    <div key={item.id} className="rounded-lg border border-nexus-border overflow-hidden group">
                      <div className="aspect-video relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="sm" variant="outline" className="border-white text-white hover:bg-white/20">
                            Edit
                          </Button>
                          <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="border-white text-white hover:bg-white/20">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </a>
                        </div>
                      </div>
                      <div className="p-4 bg-nexus-black">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{item.title}</h4>
                          <div className="flex items-center gap-2">
                            {item.isPublic ? (
                              <Eye className="w-4 h-4 text-green-400" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-nexus-muted" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-nexus-muted">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment" className="mt-4">
              <Card className="p-6 bg-nexus-card border-nexus-border">
                <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label>Preferred Payment Method</Label>
                    <Select value={paymentInfo.paymentMethod} onValueChange={(v) => setPaymentInfo({ ...paymentInfo, paymentMethod: v })}>
                      <SelectTrigger className="mt-1 bg-nexus-black border-nexus-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="wise">Wise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentInfo.paymentMethod === 'bank' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Bank Name</Label>
                        <Input
                          value={paymentInfo.bankName}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, bankName: e.target.value })}
                          className="mt-1 bg-nexus-black border-nexus-border"
                        />
                      </div>
                      <div>
                        <Label>Account Number</Label>
                        <Input
                          value={paymentInfo.accountNumber}
                          className="mt-1 bg-nexus-black border-nexus-border"
                          disabled
                        />
                      </div>
                    </div>
                  )}

                  {paymentInfo.paymentMethod === 'paypal' && (
                    <div>
                      <Label>PayPal Email</Label>
                      <Input
                        type="email"
                        value={paymentInfo.paypalEmail}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, paypalEmail: e.target.value })}
                        className="mt-1 bg-nexus-black border-nexus-border"
                        placeholder="your@email.com"
                      />
                    </div>
                  )}

                  {paymentInfo.paymentMethod === 'stripe' && (
                    <div className="p-4 rounded-lg bg-nexus-black border border-nexus-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="font-medium">Stripe Connect</p>
                            <p className="text-sm text-nexus-muted">
                              {paymentInfo.stripeConnected ? 'Connected' : 'Not connected'}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" className="border-nexus-border">
                          {paymentInfo.stripeConnected ? 'Manage' : 'Connect'}
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                    <p className="text-sm text-yellow-400">
                      <Shield className="w-4 h-4 inline mr-2" />
                      Your payment information is encrypted and stored securely. We never store raw card numbers.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-4">
              <Card className="p-6 bg-nexus-card border-nexus-border">
                <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Email Notifications</h4>
                    <div className="space-y-3">
                      {[
                        { key: 'emailNewMessages', label: 'New messages' },
                        { key: 'emailProjectUpdates', label: 'Project updates' },
                        { key: 'emailPayments', label: 'Payment notifications' },
                        { key: 'emailMarketing', label: 'Marketing & promotions' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <Label>{item.label}</Label>
                          <Switch
                            checked={notifications[item.key as keyof typeof notifications]}
                            onCheckedChange={(v) => setNotifications({ ...notifications, [item.key]: v })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Push Notifications</h4>
                    <div className="space-y-3">
                      {[
                        { key: 'pushNewMessages', label: 'New messages' },
                        { key: 'pushProjectUpdates', label: 'Project updates' },
                        { key: 'pushPayments', label: 'Payment notifications' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <Label>{item.label}</Label>
                          <Switch
                            checked={notifications[item.key as keyof typeof notifications]}
                            onCheckedChange={(v) => setNotifications({ ...notifications, [item.key]: v })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">In-App Notifications</h4>
                    <div className="flex items-center justify-between">
                      <Label>Enable all in-app notifications</Label>
                      <Switch
                        checked={notifications.inAppAll}
                        onCheckedChange={(v) => setNotifications({ ...notifications, inAppAll: v })}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="mt-4">
              <Card className="p-6 bg-nexus-card border-nexus-border">
                <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
                
                <div className="space-y-4">
                  {[
                    { key: 'profilePublic', label: 'Make profile public', description: 'Allow anyone to view your profile' },
                    { key: 'showEmail', label: 'Show email address', description: 'Display your email on your public profile' },
                    { key: 'showPhone', label: 'Show phone number', description: 'Display your phone number on your public profile' },
                    { key: 'showLocation', label: 'Show location', description: 'Display your location on your public profile' },
                    { key: 'showHourlyRate', label: 'Show hourly rate', description: 'Display your hourly rate on your public profile' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-nexus-black border border-nexus-border">
                      <div>
                        <Label>{item.label}</Label>
                        <p className="text-sm text-nexus-muted">{item.description}</p>
                      </div>
                      <Switch
                        checked={privacy[item.key as keyof typeof privacy]}
                        onCheckedChange={(v) => setPrivacy({ ...privacy, [item.key]: v })}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <h4 className="font-medium text-red-400 mb-2">Danger Zone</h4>
                  <p className="text-sm text-nexus-muted mb-3">Once you delete your account, there is no going back. Please be certain.</p>
                  <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/20">
                    Delete Account
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
