import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  MessageSquare,
  FileText,
  Code,
  Target,
  Lightbulb,
  Send,
  Copy,
  Check,
  Loader2,
  X,
  Settings,
  Plus,
  Trash2,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface AIAgent {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  capabilities: string[];
  systemPrompt?: string;
  isCustom?: boolean;
}

const defaultAgents: AIAgent[] = [
  {
    id: 'job-scraper',
    name: 'Job Scraper Agent',
    description: 'Automatically scans and filters job postings across platforms',
    icon: Target,
    color: 'from-cyan-500 to-blue-600',
    capabilities: ['Multi-platform scanning', 'Keyword filtering', 'Budget matching', 'Skill matching'],
  },
  {
    id: 'proposal-review',
    name: 'Proposal Review Agent',
    description: 'Reviews and optimizes your proposals before submission',
    icon: FileText,
    color: 'from-green-500 to-emerald-600',
    capabilities: ['Grammar check', 'Tone analysis', 'Keyword optimization', 'Win rate prediction'],
  },
  {
    id: 'client-closing',
    name: 'Client Closing Agent',
    description: 'Helps craft persuasive responses to close deals and win projects',
    icon: Target,
    color: 'from-orange-500 to-red-600',
    capabilities: ['Proposal writing', 'Objection handling', 'Price negotiation', 'Follow-up messages'],
  },
  {
    id: 'scope-analysis',
    name: 'Scope Analysis',
    description: 'Analyzes project requirements and estimates time/budget',
    icon: FileText,
    color: 'from-blue-500 to-cyan-600',
    capabilities: ['Requirement breakdown', 'Time estimation', 'Risk assessment', 'Milestone planning'],
  },
  {
    id: 'content-generator',
    name: 'Content Generator',
    description: 'Creates marketing content, ads, and social media posts',
    icon: Lightbulb,
    color: 'from-purple-500 to-pink-600',
    capabilities: ['Ad copy', 'Social posts', 'Email campaigns', 'Blog outlines'],
  },
  {
    id: 'proposal-writer',
    name: 'Proposal Writer',
    description: 'Generates professional proposals tailored to job requirements',
    icon: MessageSquare,
    color: 'from-fuchsia-500 to-purple-600',
    capabilities: ['Custom proposals', 'Cover letters', 'Portfolio highlights', 'Pricing strategies'],
  },
  {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    description: 'Reviews code for best practices, bugs, and improvements',
    icon: Code,
    color: 'from-indigo-500 to-violet-600',
    capabilities: ['Bug detection', 'Performance tips', 'Security audit', 'Refactoring suggestions'],
  },
];

function AgentCard({
  agent,
  onLaunch,
  onEdit,
  onDelete,
}: {
  agent: AIAgent;
  onLaunch: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const { t } = useTranslation();
  const Icon = agent.icon;

  return (
    <Card className="p-6 bg-nexus-card border-nexus-border hover:border-nexus-blue/50 transition-all duration-200 group relative overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
        `bg-gradient-to-br ${agent.color}`
      )} />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
            agent.color
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {agent.isCustom && (
            <div className="flex items-center gap-1">
              <button
                onClick={onEdit}
                className="p-1.5 hover:bg-nexus-border rounded transition-colors"
              >
                <Settings className="w-4 h-4 text-nexus-muted" />
              </button>
              <button
                onClick={onDelete}
                className="p-1.5 hover:bg-red-500/20 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          )}
        </div>

        <h3 className="font-semibold text-white mb-2">{agent.name}</h3>
        <p className="text-sm text-nexus-muted mb-4">{agent.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {agent.capabilities.slice(0, 3).map((cap, idx) => (
            <Badge key={idx} variant="secondary" className="bg-nexus-border text-nexus-muted text-xs">
              {cap}
            </Badge>
          ))}
          {agent.capabilities.length > 3 && (
            <Badge variant="secondary" className="bg-nexus-border text-nexus-muted text-xs">
              +{agent.capabilities.length - 3}
            </Badge>
          )}
        </div>

        <Button
          onClick={onLaunch}
          className="w-full gradient-primary text-white border-0"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {t('aiHub.launchAgent')}
        </Button>
      </div>
    </Card>
  );
}

function AgentModal({
  agent,
  isOpen,
  onClose
}: {
  agent: AIAgent;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const Icon = agent.icon;

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsProcessing(true);
    setResult(null);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock response based on agent type
    const mockResponses: Record<string, string> = {
      'client-closing': `Based on your input, here's a persuasive closing message:\n\n"Thank you for considering our proposal. I understand budget is a key factor, and I want to assure you that our pricing reflects the exceptional value we deliver.\n\nHere's what sets us apart:\n• 98% client satisfaction rate\n• On-time delivery guarantee\n• 30-day post-project support included\n\nI'm confident we can exceed your expectations. Shall we schedule a quick call to discuss any remaining questions?"\n\nThis approach addresses concerns while reinforcing value and creating urgency.`,
      'scope-analysis': `## Project Scope Analysis\n\n**Estimated Timeline:** 6-8 weeks\n**Recommended Budget:** $8,500 - $12,000\n\n### Phase Breakdown:\n\n1. **Discovery & Planning** (Week 1)\n   - Requirements gathering\n   - Technical architecture\n   - Milestone definition\n\n2. **Development** (Weeks 2-5)\n   - Core functionality\n   - API integrations\n   - Testing\n\n3. **Polish & Launch** (Weeks 6-8)\n   - UI refinements\n   - Performance optimization\n   - Deployment\n\n### Risk Factors:\n- Third-party API dependencies\n- Scope creep potential: Medium\n- Technical complexity: Moderate`,
      'content-generator': `Here are 3 content variations for your campaign:\n\n**Option 1 - Professional:**\n"Transform your workflow with AI-powered automation. Join 10,000+ professionals who've increased productivity by 40%."\n\n**Option 2 - Conversational:**\n"Tired of repetitive tasks eating up your day? Let AI handle the boring stuff while you focus on what matters. Try it free!"\n\n**Option 3 - Urgent:**\n"⚡ Limited time: Get 50% off our Pro plan. Automate your business before your competitors do. Offer ends Friday!"`,
      'proposal-writer': `# Project Proposal\n\n## Executive Summary\nI'm excited to submit my proposal for your project. With 5+ years of experience in similar projects and a track record of delivering high-quality solutions, I'm confident I can exceed your expectations.\n\n## Approach\n1. **Discovery Phase** - Deep dive into your requirements\n2. **Iterative Development** - Regular check-ins and demos\n3. **Quality Assurance** - Comprehensive testing\n4. **Handoff & Support** - Documentation and training\n\n## Why Choose Me?\n- Proven expertise in your tech stack\n- Clear communication and transparency\n- Flexible and adaptable to changes\n- Post-project support included\n\n## Investment\nBased on the scope, I estimate this project at $X,XXX with delivery in X weeks.`,
      'code-reviewer': `## Code Review Summary\n\n### ✅ Strengths\n- Clean component structure\n- Good use of TypeScript types\n- Consistent naming conventions\n\n### ⚠️ Suggestions\n\n**Performance:**\n\`\`\`typescript\n// Consider memoizing this computation\nconst expensiveValue = useMemo(() => {\n  return data.filter(item => item.active).map(transform);\n}, [data]);\n\`\`\`\n\n**Security:**\n- Sanitize user inputs before rendering\n- Add rate limiting to API calls\n\n**Best Practices:**\n- Extract magic numbers to constants\n- Add error boundaries for better UX\n- Consider lazy loading for large components`,
    };

    setResult(mockResponses[agent.id] || 'AI response generated successfully.');
    setIsProcessing(false);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-nexus-card border-nexus-border">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br",
              agent.color
            )}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-white">{agent.name}</DialogTitle>
              <DialogDescription>{agent.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Input Area */}
          <div>
            <label className="text-sm font-medium text-nexus-muted mb-2 block">
              Describe what you need:
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter your request for the ${agent.name}...`}
              className="min-h-[120px] bg-nexus-black border-nexus-border"
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!input.trim() || isProcessing}
            className="w-full gradient-primary text-white border-0"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t('aiHub.processing')}
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                {t('aiHub.generateResponse')}
              </>
            )}
          </Button>

          {/* Result Area */}
          {result && (
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-nexus-muted">Result:</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="text-nexus-muted hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <ScrollArea className="h-64">
                <div className="p-4 rounded-lg bg-nexus-black border border-nexus-border">
                  <pre className="text-sm text-nexus-text whitespace-pre-wrap font-sans">
                    {result}
                  </pre>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CreateAssistantModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (agent: AIAgent) => void;
}) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [capabilities, setCapabilities] = useState('');

  const handleSave = () => {
    if (!name.trim() || !description.trim()) return;

    const newAgent: AIAgent = {
      id: `custom-${Date.now()}`,
      name,
      description,
      icon: Sparkles,
      color: 'from-cyan-500 to-blue-600',
      capabilities: capabilities.split(',').map(c => c.trim()).filter(Boolean),
      systemPrompt,
      isCustom: true,
    };

    onSave(newAgent);
    setName('');
    setDescription('');
    setSystemPrompt('');
    setCapabilities('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-nexus-card border-nexus-border">
        <DialogHeader>
          <DialogTitle className="text-white">{t('settings.createAssistant')}</DialogTitle>
          <DialogDescription>
            Create a custom AI assistant with your own system prompt and capabilities.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium text-nexus-muted mb-2 block">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Custom Assistant"
              className="bg-nexus-black border-nexus-border"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-nexus-muted mb-2 block">Description</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this assistant do?"
              className="bg-nexus-black border-nexus-border"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-nexus-muted mb-2 block">
              {t('settings.systemPrompt')}
            </label>
            <Textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="You are a helpful assistant that..."
              className="min-h-[120px] bg-nexus-black border-nexus-border"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-nexus-muted mb-2 block">
              {t('settings.capabilities')} (comma-separated)
            </label>
            <Input
              value={capabilities}
              onChange={(e) => setCapabilities(e.target.value)}
              placeholder="Task 1, Task 2, Task 3"
              className="bg-nexus-black border-nexus-border"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button
              onClick={handleSave}
              disabled={!name.trim() || !description.trim()}
              className="gradient-primary text-white border-0"
            >
              {t('common.save')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AIHub() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [agents, setAgents] = useState<AIAgent[]>(defaultAgents);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleAddAgent = (agent: AIAgent) => {
    setAgents(prev => [...prev, agent]);
  };

  const handleDeleteAgent = (agentId: string) => {
    setAgents(prev => prev.filter(a => a.id !== agentId));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{t('aiHub.title')}</h1>
          <p className="text-nexus-muted">
            Launch AI-powered agents to automate your workflow
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/app/agents')}
            className="border-nexus-border text-white hover:bg-white/5"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Dashboard
          </Button>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="gradient-primary text-white border-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('settings.createAssistant')}
          </Button>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onLaunch={() => setSelectedAgent(agent)}
            onEdit={agent.isCustom ? () => { } : undefined}
            onDelete={agent.isCustom ? () => handleDeleteAgent(agent.id) : undefined}
          />
        ))}
      </div>

      {/* Agent Modal */}
      {selectedAgent && (
        <AgentModal
          agent={selectedAgent}
          isOpen={!!selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}

      {/* Create Assistant Modal */}
      <CreateAssistantModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleAddAgent}
      />
    </div>
  );
}
