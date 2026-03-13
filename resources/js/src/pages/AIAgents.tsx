import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Target,
  FileSearch,
  FileText,
  MessageSquare,
  Megaphone,
  Calculator,
  Sparkles,
  Loader2
} from 'lucide-react';
import { mockAIAgents } from '@/lib/mockData';
import { AIAgent } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  target: Target,
  'file-search': FileSearch,
  'file-text': FileText,
  'message-square': MessageSquare,
  megaphone: Megaphone,
  calculator: Calculator,
};

export default function AIAgents() {
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleLaunchAgent = (agent: AIAgent) => {
    setSelectedAgent(agent);
    setModalOpen(true);
    setResult('');
    setInputValue('');
    setProcessing(false);
  };

  const handleProcess = () => {
    if (!inputValue.trim()) return;

    setProcessing(true);
    setResult('');

    // Simulate AI processing
    setTimeout(() => {
      setProcessing(false);

      // Generate mock results based on agent type
      if (selectedAgent?.id === 'agent-1') {
        setResult(`## Closing Strategy for Your Lead

**Key Pain Points Identified:**
- Client needs fast turnaround
- Budget-conscious but values quality
- Previous bad experience with freelancers

**Recommended Approach:**
1. **Emphasize Reliability**: Highlight your track record and testimonials
2. **Offer Milestone-Based Payment**: Reduces risk for the client
3. **Provide Timeline Guarantee**: Commit to specific delivery dates
4. **Include Post-Delivery Support**: 30-day bug fix guarantee

**Suggested Closing Message:**
"I understand your concerns about timeline and quality. I propose we structure this with clear milestones, so you can review progress at each stage. I also include 30 days of post-delivery support to ensure everything works perfectly. Would you like to discuss the first milestone?"`);
      } else if (selectedAgent?.id === 'agent-2') {
        setResult(`## Project Scope Analysis

**Project Type:** Web Application Development
**Estimated Complexity:** Medium-High
**Recommended Timeline:** 6-8 weeks

**Key Requirements Identified:**
- User authentication system
- Dashboard with data visualization
- RESTful API integration
- Responsive design for mobile/desktop
- Admin panel for content management

**Technical Stack Recommendation:**
- Frontend: React + TypeScript + Tailwind CSS
- Backend: Node.js + Express
- Database: PostgreSQL
- Hosting: Vercel/AWS

**Estimated Budget Range:** $4,500 - $6,500

**Risk Factors:**
- Third-party API reliability
- Data migration complexity
- Mobile optimization requirements`);
      } else {
        setResult(`## Generated Content

Your AI-generated content is ready! This has been tailored based on your input and best practices for ${selectedAgent?.name}.

**Key Points:**
- Professional tone maintained
- SEO-optimized structure
- Clear call-to-action included
- Industry-specific terminology used

**Next Steps:**
1. Review and customize as needed
2. Add your personal touch
3. Deploy or send to client`);
      }
    }, 2500);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Agents Hub</h1>
        <p className="text-muted-foreground">
          Launch AI-powered tools to automate your workflow
        </p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAIAgents.map((agent, index) => {
          const Icon = iconMap[agent.icon] || Sparkles;

          return (
            <Card
              key={agent.id}
              className="p-6 bg-[#1A1A23] border-[#2A2A33] hover:border-cyan-500/50 transition-all cursor-pointer group relative overflow-hidden"
              onClick={() => handleLaunchAgent(agent)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-fuchsia-500/0 group-hover:from-cyan-500/10 group-hover:to-fuchsia-500/10 transition-all duration-300" />

              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold mb-2">{agent.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>

                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLaunchAgent(agent);
                  }}
                >
                  Launch Agent
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Agent Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-[#1A1A23] border-[#2A2A33] max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedAgent && iconMap[selectedAgent.icon] && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center">
                  {(() => {
                    const Icon = iconMap[selectedAgent.icon];
                    return <Icon className="w-4 h-4 text-white" />;
                  })()}
                </div>
              )}
              {selectedAgent?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedAgent?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-auto space-y-4 py-4">
            {!result && !processing && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="agent-input">
                    {selectedAgent?.id === 'agent-1' && 'Enter client conversation or requirements'}
                    {selectedAgent?.id === 'agent-2' && 'Paste project description or requirements'}
                    {selectedAgent?.id === 'agent-3' && 'Enter project details for proposal'}
                    {selectedAgent?.id === 'agent-4' && 'Describe the message context'}
                    {selectedAgent?.id === 'agent-5' && 'Enter service details for ad'}
                    {selectedAgent?.id === 'agent-6' && 'Enter project scope for pricing'}
                  </Label>
                  <Textarea
                    id="agent-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="bg-[#0D0D15] border-[#2A2A33] min-h-[200px]"
                    placeholder="Enter your input here..."
                  />
                </div>

                <Button
                  onClick={handleProcess}
                  disabled={!inputValue.trim()}
                  className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Process with AI
                </Button>
              </div>
            )}

            {processing && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-cyan-400" />
                <p className="text-sm text-muted-foreground">AI is processing your request...</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <Card className="p-6 bg-[#0D0D15] border-cyan-500/30">
                  <div className="prose prose-invert prose-sm max-w-none">
                    {result.split('\n').map((line, i) => {
                      if (line.startsWith('##')) {
                        return <h2 key={i} className="text-xl font-bold text-cyan-400 mt-4 mb-2">{line.replace('##', '')}</h2>;
                      } else if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={i} className="font-bold mt-3 mb-1">{line.replace(/\*\*/g, '')}</p>;
                      } else if (line.startsWith('-')) {
                        return <li key={i} className="ml-4 text-sm">{line.replace('-', '').trim()}</li>;
                      } else if (line.trim()) {
                        return <p key={i} className="text-sm mb-2">{line}</p>;
                      }
                      return null;
                    })}
                  </div>
                </Card>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setResult('');
                      setInputValue('');
                    }}
                    className="flex-1"
                  >
                    Start Over
                  </Button>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(result);
                    }}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500"
                  >
                    Copy Result
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
