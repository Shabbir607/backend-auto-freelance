import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Bot,
  Zap,
  Target,
  TrendingUp,
  DollarSign,
  Clock,
  Settings,
  Play,
  Pause,
  RefreshCw,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Brain,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit2,
  Send,
  Filter,
  Globe,
  Star,
  BarChart3,
} from 'lucide-react';

interface BidOpportunity {
  id: string;
  title: string;
  client: string;
  budget: string;
  matchScore: number;
  platform: string;
  postedTime: string;
  aiRecommendation: 'bid' | 'skip' | 'review';
  proposedBid: number;
  winProbability: number;
  skills: string[];
  status: 'pending' | 'sent' | 'won' | 'lost';
}

const mockOpportunities: BidOpportunity[] = [
  {
    id: '1',
    title: 'Full Stack Developer for SaaS Platform',
    client: 'TechStart Inc',
    budget: '$5,000 - $10,000',
    matchScore: 95,
    platform: 'Upwork',
    postedTime: '2 hours ago',
    aiRecommendation: 'bid',
    proposedBid: 7500,
    winProbability: 78,
    skills: ['React', 'Node.js', 'PostgreSQL'],
    status: 'pending',
  },
  {
    id: '2',
    title: 'React Native Mobile App Development',
    client: 'MobileFirst Co',
    budget: '$8,000 - $15,000',
    matchScore: 88,
    platform: 'Upwork',
    postedTime: '4 hours ago',
    aiRecommendation: 'bid',
    proposedBid: 12000,
    winProbability: 65,
    skills: ['React Native', 'TypeScript', 'Firebase'],
    status: 'pending',
  },
  {
    id: '3',
    title: 'E-commerce Website Redesign',
    client: 'ShopPro LLC',
    budget: '$2,000 - $4,000',
    matchScore: 72,
    platform: 'Fiverr',
    postedTime: '6 hours ago',
    aiRecommendation: 'review',
    proposedBid: 3500,
    winProbability: 52,
    skills: ['Shopify', 'UI/UX', 'HTML/CSS'],
    status: 'pending',
  },
  {
    id: '4',
    title: 'Simple Landing Page',
    client: 'StartupXYZ',
    budget: '$200 - $500',
    matchScore: 45,
    platform: 'Freelancer',
    postedTime: '8 hours ago',
    aiRecommendation: 'skip',
    proposedBid: 400,
    winProbability: 30,
    skills: ['HTML', 'CSS', 'JavaScript'],
    status: 'pending',
  },
];

const aiMetrics = [
  {
    title: 'Opportunities Scanned',
    value: '1,247',
    change: '+156 today',
    icon: Eye,
    color: 'cyan',
  },
  {
    title: 'Auto-Bids Sent',
    value: '89',
    change: '+12 today',
    icon: Send,
    color: 'purple',
  },
  {
    title: 'Win Rate',
    value: '34%',
    change: '+5% vs last month',
    icon: Target,
    color: 'green',
  },
  {
    title: 'Revenue Generated',
    value: '$45,200',
    change: '+$8,400 this week',
    icon: DollarSign,
    color: 'yellow',
  },
];

export default function SmartBiddingAI() {
  const [isAutoBidding, setIsAutoBidding] = useState(true);
  const [bidAggressiveness, setBidAggressiveness] = useState([65]);
  const [minMatchScore, setMinMatchScore] = useState([70]);
  const [maxBidsPerDay, setMaxBidsPerDay] = useState([20]);
  const [selectedOpp, setSelectedOpp] = useState<BidOpportunity | null>(mockOpportunities[0]);

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'bid': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'skip': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'review': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            Smart Bidding AI
          </h1>
          <p className="text-muted-foreground">AI-powered job discovery and automated bidding</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
            <span className="text-sm text-muted-foreground">Auto-Bidding:</span>
            <Switch
              checked={isAutoBidding}
              onCheckedChange={setIsAutoBidding}
            />
            <span className={`text-sm font-medium ${isAutoBidding ? 'text-emerald-400' : 'text-muted-foreground'}`}>
              {isAutoBidding ? 'Active' : 'Paused'}
            </span>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* AI Status Banner */}
      <Card className={`p-4 ${isAutoBidding ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${isAutoBidding ? 'bg-emerald-500/20' : 'bg-yellow-500/20'} flex items-center justify-center`}>
              {isAutoBidding ? <Play className="w-5 h-5 text-emerald-400" /> : <Pause className="w-5 h-5 text-yellow-400" />}
            </div>
            <div>
              <p className="font-medium">
                {isAutoBidding ? 'AI is actively scanning for opportunities' : 'Auto-bidding is paused'}
              </p>
              <p className="text-sm text-muted-foreground">
                {isAutoBidding 
                  ? 'Last scan: 2 minutes ago • Next scan in 3 minutes'
                  : 'Enable auto-bidding to let AI work for you 24/7'
                }
              </p>
            </div>
          </div>
          <Button size="sm" onClick={() => setIsAutoBidding(!isAutoBidding)}>
            {isAutoBidding ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Enable
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {aiMetrics.map((metric) => (
          <Card key={metric.title} className="p-5 bg-card border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg bg-${metric.color}-500/20 flex items-center justify-center`}>
                <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
              </div>
            </div>
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-sm text-muted-foreground">{metric.title}</p>
            <p className="text-xs text-emerald-400 mt-1">{metric.change}</p>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* AI Settings */}
        <Card className="bg-card border-border p-5">
          <h3 className="font-semibold mb-6 flex items-center gap-2">
            <Settings className="w-4 h-4 text-primary" />
            AI Configuration
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Bid Aggressiveness</label>
                <span className="text-sm text-primary">{bidAggressiveness}%</span>
              </div>
              <Slider
                value={bidAggressiveness}
                onValueChange={setBidAggressiveness}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">Higher = more competitive bids</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Min Match Score</label>
                <span className="text-sm text-primary">{minMatchScore}%</span>
              </div>
              <Slider
                value={minMatchScore}
                onValueChange={setMinMatchScore}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">Only bid on jobs above this threshold</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Max Bids Per Day</label>
                <span className="text-sm text-primary">{maxBidsPerDay}</span>
              </div>
              <Slider
                value={maxBidsPerDay}
                onValueChange={setMaxBidsPerDay}
                max={50}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">Daily bid limit to manage spending</p>
            </div>

            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-submit high-confidence bids</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Notify on new opportunities</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Learn from won proposals</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </Card>

        {/* Opportunities List */}
        <Card className="lg:col-span-2 bg-card border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI-Matched Opportunities
            </h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[480px]">
            <div className="space-y-3">
              {mockOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  onClick={() => setSelectedOpp(opp)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedOpp?.id === opp.id
                      ? 'bg-primary/10 border-primary/30'
                      : 'bg-muted/30 border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium line-clamp-1">{opp.title}</h4>
                        <Badge variant="outline" className={getRecommendationColor(opp.aiRecommendation)}>
                          {opp.aiRecommendation === 'bid' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {opp.aiRecommendation === 'skip' && <XCircle className="w-3 h-3 mr-1" />}
                          {opp.aiRecommendation === 'review' && <AlertCircle className="w-3 h-3 mr-1" />}
                          {opp.aiRecommendation}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{opp.client}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getMatchScoreColor(opp.matchScore)}`}>
                        {opp.matchScore}%
                      </p>
                      <p className="text-xs text-muted-foreground">match</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-muted-foreground" />
                      {opp.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-muted-foreground" />
                      {opp.platform}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      {opp.postedTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    {opp.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {opp.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{opp.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">AI Proposed Bid</p>
                        <p className="font-semibold">${opp.proposedBid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Win Probability</p>
                        <p className="font-semibold text-emerald-400">{opp.winProbability}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit2 className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
                        <Send className="w-3 h-3 mr-1" />
                        Send Bid
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* AI Insights */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-card border-border p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Win Rate Trend
          </h3>
          <div className="space-y-3">
            {[
              { period: 'This Week', rate: 38 },
              { period: 'Last Week', rate: 32 },
              { period: '2 Weeks Ago', rate: 28 },
              { period: '3 Weeks Ago', rate: 25 },
            ].map((item) => (
              <div key={item.period} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-24">{item.period}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                    style={{ width: `${item.rate}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-10 text-right">{item.rate}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-card border-border p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            Top Performing Skills
          </h3>
          <div className="space-y-3">
            {[
              { skill: 'React', wins: 12, total: 18 },
              { skill: 'Node.js', wins: 9, total: 15 },
              { skill: 'TypeScript', wins: 8, total: 12 },
              { skill: 'PostgreSQL', wins: 6, total: 10 },
            ].map((item) => (
              <div key={item.skill} className="flex items-center justify-between">
                <span className="text-sm">{item.skill}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-emerald-400">{item.wins}/{item.total}</span>
                  <span className="text-xs text-muted-foreground">
                    ({Math.round((item.wins / item.total) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-card border-border p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            AI Recommendations
          </h3>
          <div className="space-y-3">
            {[
              { text: 'Lower bid range for Fiverr by 10%', impact: 'Higher win rate' },
              { text: 'Add Docker to your skills', impact: '+15% match score' },
              { text: 'Respond faster to messages', impact: '+8% conversion' },
            ].map((rec, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm">{rec.text}</p>
                <p className="text-xs text-emerald-400 mt-1">{rec.impact}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
