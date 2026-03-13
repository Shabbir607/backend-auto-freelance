import { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, ChevronLeft, ChevronRight, Image, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';
import { SocialPlatform, SocialPost } from '@/api/mocks/_social';
import { addDays, startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSameDay, isToday } from 'date-fns';

const platformIcons: Record<SocialPlatform, React.ElementType> = {
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
  instagram: Instagram,
};

const platformColors: Record<SocialPlatform, string> = {
  twitter: 'bg-blue-400',
  facebook: 'bg-blue-600',
  linkedin: 'bg-blue-700',
  instagram: 'bg-gradient-to-br from-purple-500 to-pink-500',
};

export default function ContentScheduler() {
  const { socialPosts, addSocialPost } = useAppStore();
  const { user, team } = useAuth();
  const { showToast } = useToast();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [newPost, setNewPost] = useState({
    content: '',
    platforms: [] as SocialPlatform[],
    imageUrl: '',
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Pad the start of the month to align with weekdays
  const startDay = monthStart.getDay();
  const paddedDays = [...Array(startDay).fill(null), ...days];

  const getPostsForDay = (date: Date) => {
    return socialPosts.filter(post => {
      const postDate = new Date(post.scheduledFor);
      return isSameDay(postDate, date);
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => addDays(startOfMonth(prev), -1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addDays(endOfMonth(prev), 1));
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setCreateModalOpen(true);
  };

  const togglePlatform = (platform: SocialPlatform) => {
    setNewPost(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleCreatePost = () => {
    if (!newPost.content.trim()) {
      showToast('Please enter post content', 'error');
      return;
    }
    if (newPost.platforms.length === 0) {
      showToast('Please select at least one platform', 'error');
      return;
    }
    if (!selectedDate || !team || !user) return;

    addSocialPost({
      teamId: team.id,
      content: newPost.content,
      platforms: newPost.platforms,
      scheduledFor: selectedDate.toISOString(),
      status: 'scheduled',
      imageUrl: newPost.imageUrl || undefined,
      createdBy: user.id,
    });

    showToast('Post scheduled successfully!', 'success');
    setCreateModalOpen(false);
    setNewPost({ content: '', platforms: [], imageUrl: '' });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Content Scheduler</h1>
          <p className="text-nexus-muted text-sm">
            Schedule and manage your social media content
          </p>
        </div>
        <Button
          className="gradient-primary text-white border-0 gap-2"
          onClick={() => {
            setSelectedDate(new Date());
            setCreateModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4" />
          Create Post
        </Button>
      </div>

      {/* Calendar */}
      <Card className="p-6 bg-nexus-card border-nexus-border">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrevMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-nexus-muted py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {paddedDays.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="min-h-[100px]" />;
            }

            const posts = getPostsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isCurrentDay = isToday(day);

            return (
              <div
                key={day.toISOString()}
                onClick={() => handleDayClick(day)}
                className={`min-h-[100px] p-2 rounded-lg border cursor-pointer transition-all ${isCurrentMonth
                    ? 'bg-nexus-black border-nexus-border hover:border-nexus-blue/50'
                    : 'bg-nexus-card/50 border-transparent opacity-50'
                  } ${isCurrentDay ? 'ring-2 ring-nexus-blue' : ''}`}
              >
                <div className={`text-sm font-medium mb-2 ${isCurrentDay ? 'text-nexus-blue' : ''}`}>
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {posts.slice(0, 3).map(post => (
                    <div
                      key={post.id}
                      className="flex items-center gap-1"
                    >
                      {post.platforms.slice(0, 2).map(platform => {
                        const Icon = platformIcons[platform];
                        return (
                          <div
                            key={platform}
                            className={`w-4 h-4 rounded flex items-center justify-center ${platformColors[platform]}`}
                          >
                            <Icon className="w-2.5 h-2.5 text-white" />
                          </div>
                        );
                      })}
                      <span className="text-xs text-nexus-muted truncate flex-1">
                        {post.content.substring(0, 20)}...
                      </span>
                    </div>
                  ))}
                  {posts.length > 3 && (
                    <span className="text-xs text-nexus-muted">+{posts.length - 3} more</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Upcoming Posts */}
      <Card className="p-6 bg-nexus-card border-nexus-border">
        <h2 className="text-lg font-semibold mb-4">Upcoming Posts</h2>
        <div className="space-y-3">
          {socialPosts
            .filter(p => p.status === 'scheduled' && new Date(p.scheduledFor) > new Date())
            .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
            .slice(0, 5)
            .map(post => (
              <div
                key={post.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-nexus-black border border-nexus-border"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm mb-2 line-clamp-2">{post.content}</p>
                  <div className="flex items-center gap-2">
                    {post.platforms.map(platform => {
                      const Icon = platformIcons[platform];
                      return (
                        <div
                          key={platform}
                          className={`w-5 h-5 rounded flex items-center justify-center ${platformColors[platform]}`}
                        >
                          <Icon className="w-3 h-3 text-white" />
                        </div>
                      );
                    })}
                    <span className="text-xs text-nexus-muted ml-2">
                      {format(new Date(post.scheduledFor), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className="capitalize text-xs">
                  {post.status}
                </Badge>
              </div>
            ))}
        </div>
      </Card>

      {/* Create Post Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="bg-nexus-card border-nexus-border max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Scheduled Date</Label>
              <Input
                type="datetime-local"
                value={selectedDate ? format(selectedDate, "yyyy-MM-dd'T'HH:mm") : ''}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="bg-nexus-black border-nexus-border"
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                placeholder="What's on your mind?"
                className="bg-nexus-black border-nexus-border min-h-[120px]"
              />
              <p className="text-xs text-nexus-muted text-right">
                {newPost.content.length}/280 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label>Image URL (optional)</Label>
              <div className="flex gap-2">
                <Input
                  value={newPost.imageUrl}
                  onChange={(e) => setNewPost(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://..."
                  className="bg-nexus-black border-nexus-border"
                />
                <Button variant="outline" size="icon">
                  <Image className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Platforms</Label>
              <div className="flex gap-3">
                {(['twitter', 'facebook', 'linkedin', 'instagram'] as SocialPlatform[]).map(platform => {
                  const Icon = platformIcons[platform];
                  const isSelected = newPost.platforms.includes(platform);
                  return (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${isSelected
                          ? 'border-nexus-blue bg-nexus-blue/20'
                          : 'border-nexus-border hover:border-nexus-blue/50'
                        }`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center ${platformColors[platform]}`}>
                        <Icon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm capitalize">{platform}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePost} className="gradient-primary text-white border-0">
                Schedule Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
