import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  Book,
  FileText,
  Video,
  MessageCircle,
  ChevronRight,
  ExternalLink,
  Star,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Lightbulb,
  Zap,
  Users,
  Settings,
  Bot,
  Target,
  Workflow,
  Mail,
  Shield,
  CreditCard,
  PlayCircle,
  BookOpen,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  views: number;
  helpful: number;
  featured: boolean;
  updated: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  articleCount: number;
  color: string;
}

const categories: Category[] = [
  { id: 'getting-started', name: 'Getting Started', icon: Zap, articleCount: 12, color: 'nexus-green' },
  { id: 'platform-accounts', name: 'Platform Accounts', icon: Users, articleCount: 18, color: 'nexus-blue' },
  { id: 'auto-bidding', name: 'Auto-Bidding', icon: Target, articleCount: 15, color: 'nexus-purple' },
  { id: 'ai-agents', name: 'AI Agents', icon: Bot, articleCount: 22, color: 'nexus-fuchsia' },
  { id: 'workflows', name: 'Workflows', icon: Workflow, articleCount: 10, color: 'nexus-yellow' },
  { id: 'integrations', name: 'Integrations', icon: Settings, articleCount: 8, color: 'nexus-cyan' },
  { id: 'billing', name: 'Billing & Plans', icon: CreditCard, articleCount: 6, color: 'nexus-green' },
  { id: 'security', name: 'Security', icon: Shield, articleCount: 9, color: 'nexus-red' },
];

const articles: Article[] = [
  {
    id: '1',
    title: 'How to Set Up Your First Platform Account',
    description: 'Learn how to connect your Upwork, Fiverr, or Freelancer account to start auto-bidding.',
    category: 'Getting Started',
    readTime: '5 min',
    views: 2450,
    helpful: 234,
    featured: true,
    updated: '2 days ago',
  },
  {
    id: '2',
    title: 'Understanding AI Auto-Bidding Settings',
    description: 'A complete guide to configuring your AI auto-bidding parameters for maximum effectiveness.',
    category: 'Auto-Bidding',
    readTime: '8 min',
    views: 1820,
    helpful: 189,
    featured: true,
    updated: '1 week ago',
  },
  {
    id: '3',
    title: 'Creating Effective Proposal Templates',
    description: 'Best practices for writing proposal templates that win more clients.',
    category: 'Auto-Bidding',
    readTime: '6 min',
    views: 1560,
    helpful: 156,
    featured: true,
    updated: '3 days ago',
  },
  {
    id: '4',
    title: 'Setting Up Workflow Automations',
    description: 'Automate repetitive tasks with our powerful workflow builder.',
    category: 'Workflows',
    readTime: '10 min',
    views: 980,
    helpful: 102,
    featured: false,
    updated: '5 days ago',
  },
  {
    id: '5',
    title: 'Using AI Agents for Client Communication',
    description: 'How to leverage AI agents to respond to clients faster and more effectively.',
    category: 'AI Agents',
    readTime: '7 min',
    views: 1340,
    helpful: 145,
    featured: false,
    updated: '4 days ago',
  },
  {
    id: '6',
    title: 'Managing Multiple Platform Accounts',
    description: 'Tips for efficiently managing accounts across Upwork, Fiverr, and other platforms.',
    category: 'Platform Accounts',
    readTime: '5 min',
    views: 890,
    helpful: 87,
    featured: false,
    updated: '1 week ago',
  },
];

const videoTutorials = [
  { id: '1', title: 'Getting Started with EdgeLancer', duration: '15:30', views: 5420, thumbnail: '🎬' },
  { id: '2', title: 'Auto-Bidding Setup Walkthrough', duration: '12:45', views: 3210, thumbnail: '🎬' },
  { id: '3', title: 'AI Agents Deep Dive', duration: '20:15', views: 2890, thumbnail: '🎬' },
  { id: '4', title: 'Workflow Automation Tutorial', duration: '18:00', views: 1950, thumbnail: '🎬' },
];

const faqs = [
  { q: 'How do I connect my Upwork account?', a: 'Go to Platform Accounts > Add Account and follow the OAuth flow to securely connect your Upwork profile.' },
  { q: 'What is the AI credit limit?', a: 'AI credits depend on your plan. Starter gets 2,500/mo, Pro gets 10,000/mo, and Enterprise has unlimited credits.' },
  { q: 'Can I pause auto-bidding?', a: 'Yes! You can pause auto-bidding per account or globally from the Auto-Bidding settings page.' },
  { q: 'How do I customize proposal templates?', a: 'Navigate to Proposals > Templates and create or edit templates with dynamic variables for personalization.' },
  { q: 'Is my data secure?', a: 'Absolutely. We use end-to-end encryption, SOC 2 compliance, and never store your platform passwords.' },
];

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold">Knowledge Base</h1>
        <p className="text-nexus-muted mt-2">Find answers, tutorials, and guides to help you succeed</p>
        
        {/* Search */}
        <div className="relative mt-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nexus-muted" />
          <Input
            placeholder="Search for articles, tutorials, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-nexus-card border-nexus-border text-lg"
          />
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Badge variant="outline" className="border-nexus-border cursor-pointer hover:bg-nexus-border">
            auto-bidding setup
          </Badge>
          <Badge variant="outline" className="border-nexus-border cursor-pointer hover:bg-nexus-border">
            connect upwork
          </Badge>
          <Badge variant="outline" className="border-nexus-border cursor-pointer hover:bg-nexus-border">
            proposal templates
          </Badge>
          <Badge variant="outline" className="border-nexus-border cursor-pointer hover:bg-nexus-border">
            AI agents
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList className="bg-nexus-card border border-nexus-border mx-auto">
          <TabsTrigger value="articles" className="data-[state=active]:bg-nexus-border">
            <Book className="w-4 h-4 mr-2" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-nexus-border">
            <Video className="w-4 h-4 mr-2" />
            Video Tutorials
          </TabsTrigger>
          <TabsTrigger value="faq" className="data-[state=active]:bg-nexus-border">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </TabsTrigger>
        </TabsList>

        {/* Articles Tab */}
        <TabsContent value="articles" className="space-y-6">
          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.id}
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                  className={cn(
                    'bg-nexus-card border-nexus-border p-4 cursor-pointer transition-all hover:border-nexus-muted',
                    selectedCategory === category.name && 'border-nexus-blue bg-nexus-blue/5'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      `bg-${category.color}/10`
                    )}>
                      <Icon className={cn('w-5 h-5', `text-${category.color}`)} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{category.name}</p>
                      <p className="text-xs text-nexus-muted">{category.articleCount} articles</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Featured Articles */}
          {!selectedCategory && !searchQuery && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Star className="w-5 h-5 text-nexus-yellow" />
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {articles.filter(a => a.featured).map((article) => (
                  <Card key={article.id} className="bg-nexus-card border-nexus-border p-5 hover:border-nexus-muted transition-colors cursor-pointer">
                    <Badge className="bg-nexus-purple/10 text-nexus-purple text-xs mb-3">
                      {article.category}
                    </Badge>
                    <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-nexus-muted mt-2 line-clamp-2">{article.description}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-nexus-border">
                      <div className="flex items-center gap-3 text-xs text-nexus-muted">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {article.helpful}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-nexus-muted" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All/Filtered Articles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {selectedCategory ? `${selectedCategory} Articles` : searchQuery ? 'Search Results' : 'All Articles'}
              </h2>
              {selectedCategory && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>
                  Clear filter
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="bg-nexus-card border-nexus-border p-4 hover:border-nexus-muted transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="border-nexus-border text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-nexus-muted">Updated {article.updated}</span>
                      </div>
                      <h3 className="font-semibold">{article.title}</h3>
                      <p className="text-sm text-nexus-muted mt-1">{article.description}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-nexus-muted flex-shrink-0">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {article.views.toLocaleString()}
                      </span>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {videoTutorials.map((video) => (
              <Card key={video.id} className="bg-nexus-card border-nexus-border overflow-hidden hover:border-nexus-muted transition-colors cursor-pointer">
                <div className="aspect-video bg-nexus-border flex items-center justify-center text-4xl">
                  <PlayCircle className="w-16 h-16 text-nexus-muted" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                  <div className="flex items-center justify-between mt-2 text-sm text-nexus-muted">
                    <span>{video.duration}</span>
                    <span>{video.views.toLocaleString()} views</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Video Playlists */}
          <Card className="bg-nexus-card border-nexus-border p-6">
            <h3 className="font-semibold mb-4">Learning Paths</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-nexus-black rounded-lg border border-nexus-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-nexus-green/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-nexus-green" />
                  </div>
                  <div>
                    <p className="font-medium">Beginner Path</p>
                    <p className="text-xs text-nexus-muted">5 videos • 45 min</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full border-nexus-border">
                  Start Learning
                </Button>
              </div>
              <div className="p-4 bg-nexus-black rounded-lg border border-nexus-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-nexus-blue/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-nexus-blue" />
                  </div>
                  <div>
                    <p className="font-medium">Auto-Bidding Mastery</p>
                    <p className="text-xs text-nexus-muted">8 videos • 1.5 hrs</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full border-nexus-border">
                  Start Learning
                </Button>
              </div>
              <div className="p-4 bg-nexus-black rounded-lg border border-nexus-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-nexus-purple/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-nexus-purple" />
                  </div>
                  <div>
                    <p className="font-medium">AI Agents Pro</p>
                    <p className="text-xs text-nexus-muted">10 videos • 2 hrs</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full border-nexus-border">
                  Start Learning
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          <Card className="bg-nexus-card border-nexus-border p-6">
            <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-nexus-border pb-4 last:border-0 last:pb-0">
                  <h4 className="font-medium flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-nexus-blue flex-shrink-0 mt-0.5" />
                    {faq.q}
                  </h4>
                  <p className="text-sm text-nexus-muted mt-2 ml-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Still Need Help */}
          <Card className="bg-gradient-to-r from-nexus-blue/10 to-nexus-purple/10 border-nexus-border p-6 text-center">
            <MessageCircle className="w-12 h-12 mx-auto text-nexus-blue mb-4" />
            <h3 className="text-lg font-semibold">Still have questions?</h3>
            <p className="text-nexus-muted mt-2">Our support team is here to help you 24/7</p>
            <div className="flex justify-center gap-3 mt-4">
              <Button variant="outline" className="border-nexus-border">
                <Mail className="w-4 h-4 mr-2" />
                Email Support
              </Button>
              <Button className="gradient-primary">
                <MessageCircle className="w-4 h-4 mr-2" />
                Live Chat
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
