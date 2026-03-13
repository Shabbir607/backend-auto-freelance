import { useConfirmation } from '@/components/ConfirmationDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CompactPagination } from '@/components/ui/pagination-controls';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/contexts/ToastContext';
import { NewsletterSubscriber, newsletterService } from '@/services/newsletterService';
import { formatDistanceToNow } from 'date-fns';
import { Loader2, Mail, RefreshCw, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NewsletterSubscribers() {
  const { showToast } = useToast();
  const { confirm } = useConfirmation();

  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSubscribers, setTotalSubscribers] = useState(0);

  useEffect(() => {
    loadSubscribers();
  }, [currentPage]);

  const loadSubscribers = async () => {
    setIsLoading(true);
    try {
      const response = await newsletterService.getAllSubscribers(currentPage);

      if (response.success && response.data) {
        if (Array.isArray(response.data)) {
          setSubscribers(response.data);
          setTotalPages(1);
          setTotalSubscribers(response.data.length);
        } else {
          setSubscribers(response.data.data || []);
          setTotalPages(response.data.last_page || 1);
          setTotalSubscribers(response.data.total || 0);
        }
      } else {
        setSubscribers([]);
        setTotalPages(1);
        setTotalSubscribers(0);
      }
    } catch (error) {
      console.error('Failed to load newsletter subscribers:', error);
      showToast('Failed to load newsletter subscribers', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number, email: string) => {
    const confirmed = await confirm({
      title: 'Delete Subscriber',
      description: `Are you sure you want to delete ${email} from newsletter subscribers?`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });

    if (!confirmed) return;

    try {
      const response = await newsletterService.deleteSubscriber(id);
      if (response.success) {
        showToast('Subscriber deleted successfully', 'success');
        await loadSubscribers();
      } else {
        showToast(response.message || 'Failed to delete subscriber', 'error');
      }
    } catch (error) {
      console.error('Failed to delete subscriber:', error);
      showToast('Failed to delete subscriber', 'error');
    }
  };

  const filteredSubscribers = subscribers.filter((subscriber) => {
    const query = searchQuery.toLowerCase();
    return (
      subscriber.email?.toLowerCase().includes(query) ||
      subscriber.name?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Newsletter Subscribers</h1>
          <p className="text-nexus-muted mt-1">Manage newsletter subscribers</p>
        </div>
        <Button onClick={loadSubscribers} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-nexus-card border-nexus-border">
          <CardHeader className="pb-3">
            <CardDescription>Total Subscribers</CardDescription>
            <CardTitle className="text-3xl">{totalSubscribers}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-nexus-card border-nexus-border">
          <CardHeader className="pb-3">
            <CardDescription>Current Page Results</CardDescription>
            <CardTitle className="text-3xl">{subscribers.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="bg-nexus-card border-nexus-border">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nexus-muted w-4 h-4" />
            <Input
              placeholder="Search subscribers by email or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-nexus-card border-nexus-border">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-nexus-blue" />
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 mx-auto text-nexus-muted mb-4" />
              <h3 className="text-lg font-medium mb-2">No subscribers found</h3>
              <p className="text-nexus-muted">
                {searchQuery ? 'Try adjusting your search query' : 'No newsletter subscribers yet'}
              </p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Subscribed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-medium">{subscriber.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {subscriber.status || 'active'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {subscriber.created_at
                          ? formatDistanceToNow(new Date(subscriber.created_at), { addSuffix: true })
                          : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(subscriber.id, subscriber.email)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {totalPages > 1 && (
                <CompactPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="mt-6"
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
