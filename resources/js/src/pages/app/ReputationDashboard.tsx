import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Award,
  Star,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Users,
  DollarSign,
  Globe,
  ChevronRight,
  RefreshCw,
  Eye,
  ThumbsUp,
  Calendar,
  BarChart3,
} from 'lucide-react';

interface ReputationMetric {
  label: string;
  value: number;
  maxValue: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  description: string;
}

const metrics: ReputationMetric[] = [
  { label: 'Response Rate', value: 98, maxValue: 100, trend: 'up', trendValue: 3, description: 'How quickly you respond to messages' },
  { label: 'On-Time Delivery', value: 95, maxValue: 100, trend: 'up', trendValue: 2, description: 'Projects delivered by deadline' },
  { label: 'Client Satisfaction', value: 4.9, maxValue: 5, trend: 'stable', trendValue: 0, description: 'Average rating from clients' },
  { label: 'Job Success', value: 92, maxValue: 100, trend: 'up', trendValue: 5, description: 'Successfully completed contracts' },
  { label: 'Repeat Clients', value: 45, maxValue: 100, trend: 'up', trendValue: 8, description: 'Clients who hired you again' },
  { label: 'Profile Views', value: 1250, maxValue: 2000, trend: 'up', trendValue: 15, description: 'Views in the last 30 days' },
];

const platformScores = [
  { name: 'Upwork', score: 98, badge: 'Top Rated Plus', color: 'green' },
  { name: 'Fiverr', score: 4.9, badge: 'Level Two', color: 'emerald' },
  { name: 'Freelancer', score: 95, badge: 'Preferred', color: 'blue' },
  { name: 'LinkedIn', score: 87, badge: 'Expert', color: 'sky' },
];

const recommendations = [
  { text: 'Complete 2 more projects to reach Top Rated Plus', impact: '+5 points', priority: 'high' },
  { text: 'Update your portfolio with recent work', impact: '+3 points', priority: 'medium' },
  { text: 'Add a professional video introduction', impact: '+4 points', priority: 'medium' },
  { text: 'Get 3 more client testimonials', impact: '+2 points', priority: 'low' },
];

const achievements = [
  { name: 'Top Rated', icon: Star, color: 'yellow', earned: true, date: 'Dec 2024' },
  { name: 'Rising Talent', icon: TrendingUp, color: 'cyan', earned: true, date: 'Aug 2024' },
  { name: 'Fast Responder', icon: Zap, color: 'purple', earned: true, date: 'Oct 2024' },
  { name: '100+ Projects', icon: Target, color: 'green', earned: false, progress: 87 },
  { name: 'Expert Verified', icon: Shield, color: 'blue', earned: false, progress: 60 },
  { name: '$100K Earned', icon: DollarSign, color: 'emerald', earned: false, progress: 75 },
];

export default function ReputationDashboard() {
  const [overallScore, setOverallScore] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const targetScore = 87;

  useEffect(() => {
    setOverallScore(targetScore);
    let current = 0;
    const increment = targetScore / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetScore) {
        setAnimatedScore(targetScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, 20);
    return () => clearInterval(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 70) return 'text-cyan-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Needs Work';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-emerald-400" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <div className="w-4 h-4 rounded-full bg-gray-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reputation Dashboard</h1>
          <p className="text-muted-foreground">Monitor and improve your professional reputation across platforms</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync All Platforms
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
            <Sparkles className="w-4 h-4 mr-2" />
            Boost Score
          </Button>
        </div>
      </div>

      {/* Main Score */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-card to-muted/30 border-border p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Overall Reputation
                </h3>
                <p className="text-sm text-muted-foreground">Composite score across all platforms</p>
              </div>
              <Badge className={`${overallScore >= 70 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}`}>
                {getScoreLabel(overallScore)}
              </Badge>
            </div>

            <div className="flex items-center gap-8">
              {/* Score Circle */}
              <div className="relative">
                <svg className="w-32 h-32 -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted/30"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#scoreGradientDash)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(animatedScore / 100) * 352} 352`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="scoreGradientDash" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00FFFF" />
                      <stop offset="100%" stopColor="#FF00FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>{animatedScore}</span>
                  <span className="text-xs text-muted-foreground">of 100</span>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rank</span>
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Top 10%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Trend</span>
                  <span className="flex items-center gap-1 text-emerald-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    +5 this month
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Next Goal</span>
                  <span className="text-sm font-medium">90 pts (Top 5%)</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Platform Scores */}
        <Card className="bg-card border-border p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Platform Scores
            </h3>
            <Button variant="ghost" size="sm">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platformScores.map((platform) => (
              <div key={platform.name} className="p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{platform.name}</span>
                  <Globe className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mb-1">{platform.score}</p>
                <Badge className={`bg-${platform.color}-500/20 text-${platform.color}-400 border-${platform.color}-500/30 text-xs`}>
                  {platform.badge}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Metrics Grid */}
      <Card className="bg-card border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Performance Metrics
          </h3>
          <Badge variant="outline">Last 30 days</Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <div className="flex items-center gap-1 text-sm">
                  {getTrendIcon(metric.trend)}
                  <span className={metric.trend === 'up' ? 'text-emerald-400' : metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'}>
                    {metric.trendValue > 0 ? `+${metric.trendValue}%` : `${metric.trendValue}%`}
                  </span>
                </div>
              </div>
              <p className="text-2xl font-bold mb-2">
                {metric.label === 'Client Satisfaction' ? metric.value.toFixed(1) : metric.value}
                <span className="text-sm font-normal text-muted-foreground">
                  {metric.label === 'Profile Views' ? '' : metric.label === 'Client Satisfaction' ? '/5' : '%'}
                </span>
              </p>
              <Progress 
                value={(metric.value / metric.maxValue) * 100} 
                className="h-2 bg-muted"
              />
              <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations & Achievements */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recommendations */}
        <Card className="bg-card border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-fuchsia-400" />
              AI Recommendations
            </h3>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    rec.priority === 'high' ? 'bg-red-400' :
                    rec.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                  }`} />
                  <span className="text-sm">{rec.text}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-0 text-xs">
                    {rec.impact}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
            View All Recommendations
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>

        {/* Achievements */}
        <Card className="bg-card border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Achievements & Badges
            </h3>
            <Badge variant="outline">{achievements.filter(a => a.earned).length}/{achievements.length}</Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((badge) => (
              <div 
                key={badge.name}
                className={`p-4 rounded-xl text-center border transition-all ${
                  badge.earned 
                    ? `bg-${badge.color}-500/10 border-${badge.color}-500/30` 
                    : 'bg-muted/30 border-border opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  badge.earned ? `bg-${badge.color}-500/20` : 'bg-muted'
                }`}>
                  <badge.icon className={`w-6 h-6 ${badge.earned ? `text-${badge.color}-400` : 'text-muted-foreground'}`} />
                </div>
                <p className={`font-medium text-sm ${badge.earned ? '' : 'text-muted-foreground'}`}>{badge.name}</p>
                {badge.earned ? (
                  <p className="text-xs text-muted-foreground mt-1">{badge.date}</p>
                ) : (
                  <div className="mt-2">
                    <Progress value={badge.progress} className="h-1" />
                    <p className="text-xs text-muted-foreground mt-1">{badge.progress}%</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
