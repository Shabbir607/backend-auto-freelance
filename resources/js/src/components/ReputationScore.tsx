import { Star, TrendingUp, TrendingDown, Minus, Shield, Clock, MessageSquare, DollarSign, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ReputationScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  showTrend?: boolean;
  trend?: 'up' | 'down' | 'stable';
  breakdown?: {
    completionRate: number;
    disputeRate: number;
    responseTime: number;
    paymentPromptness: number;
  };
}

export default function ReputationScore({
  score,
  size = 'md',
  showDetails = false,
  showTrend = false,
  trend = 'stable',
  breakdown = {
    completionRate: 98,
    disputeRate: 2,
    responseTime: 95,
    paymentPromptness: 100,
  }
}: ReputationScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-500/20 border-green-500/30';
    if (score >= 70) return 'bg-yellow-500/20 border-yellow-500/30';
    if (score >= 50) return 'bg-orange-500/20 border-orange-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Needs Improvement';
  };

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-lg',
    lg: 'w-20 h-20 text-2xl',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-nexus-muted';

  const ScoreCircle = () => (
    <div className={cn(
      "rounded-full border-2 flex items-center justify-center font-bold relative",
      sizeClasses[size],
      getScoreBgColor(score)
    )}>
      <span className={getScoreColor(score)}>{score}</span>
      {showTrend && (
        <TrendIcon className={cn("absolute -top-1 -right-1 w-4 h-4", trendColor)} />
      )}
    </div>
  );

  if (!showDetails) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline-flex items-center gap-2 cursor-help">
              <ScoreCircle />
              {size !== 'sm' && (
                <div className="flex flex-col">
                  <span className={cn("font-semibold", getScoreColor(score))}>
                    {getScoreLabel(score)}
                  </span>
                  <span className="text-xs text-nexus-muted">Reputation Score</span>
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-nexus-card border-nexus-border p-3">
            <div className="space-y-2">
              <p className="font-semibold">Reputation Score: {score}/100</p>
              <p className="text-xs text-nexus-muted">Based on project history, communication, and payment behavior</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <ScoreCircle />
        <div>
          <div className="flex items-center gap-2">
            <span className={cn("text-xl font-bold", getScoreColor(score))}>
              {getScoreLabel(score)}
            </span>
            {showTrend && (
              <span className={cn("text-xs flex items-center gap-1", trendColor)}>
                <TrendIcon className="w-3 h-3" />
                {trend === 'up' ? '+2.5%' : trend === 'down' ? '-1.2%' : '0%'}
              </span>
            )}
          </div>
          <span className="text-sm text-nexus-muted">Reputation Score</span>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-nexus-muted">Score Breakdown</h4>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-nexus-black border border-nexus-border">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs text-nexus-muted">Completion Rate</span>
            </div>
            <span className="text-lg font-semibold text-green-400">{breakdown.completionRate}%</span>
          </div>

          <div className="p-3 rounded-lg bg-nexus-black border border-nexus-border">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-nexus-muted">Dispute Rate</span>
            </div>
            <span className="text-lg font-semibold text-cyan-400">{breakdown.disputeRate}%</span>
          </div>

          <div className="p-3 rounded-lg bg-nexus-black border border-nexus-border">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-nexus-muted">Response Time</span>
            </div>
            <span className="text-lg font-semibold text-purple-400">{breakdown.responseTime}%</span>
          </div>

          <div className="p-3 rounded-lg bg-nexus-black border border-nexus-border">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-nexus-muted">Payment Promptness</span>
            </div>
            <span className="text-lg font-semibold text-yellow-400">{breakdown.paymentPromptness}%</span>
          </div>
        </div>

        <p className="text-xs text-nexus-muted">
          Your reputation score is calculated based on your project completion rate, dispute history, 
          communication responsiveness, and payment behavior. Higher scores increase your visibility 
          and trustworthiness on the platform.
        </p>
      </div>
    </div>
  );
}
