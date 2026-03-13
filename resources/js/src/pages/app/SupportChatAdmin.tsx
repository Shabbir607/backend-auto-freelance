import { useConfirmation } from '@/components/ConfirmationDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CompactPagination } from '@/components/ui/pagination-controls';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/contexts/ToastContext';
import { cn } from '@/lib/utils';
import {
  adminSupportChatService,
  AdminSupportStats,
  AdminSupportTicket,
  SupportTicketMessage,
} from '@/services/supportChatService';
import { formatDistanceToNow } from 'date-fns';
import { AlertCircle, Loader2, MessageSquare, RefreshCw, Send, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const getStatusLabel = (ticket: AdminSupportTicket) =>
  String(ticket.status || ticket.ticket_status || 'open').toLowerCase();

const getStatsValue = (stats: AdminSupportStats, keys: string[]) => {
  for (const key of keys) {
    const value = stats[key];
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && !Number.isNaN(Number(value))) return Number(value);
  }
  return 0;
};

const normalizeTicket = (item: any): AdminSupportTicket => ({
  id: Number(item?.id),
  name: item?.name || item?.customer_name || item?.user_name,
  email: item?.email || item?.customer_email || item?.user_email,
  status: item?.status || item?.ticket_status,
  subject: item?.subject,
  created_at: item?.created_at,
  updated_at: item?.updated_at,
  last_message_at: item?.last_message_at,
  messages_count: item?.messages_count,
  ...item,
});

const normalizeMessage = (item: any): SupportTicketMessage => ({
  id: item?.id,
  message: item?.message || item?.content,
  sender_type: item?.sender_type || item?.sender,
  created_at: item?.created_at || item?.timestamp,
  ...item,
});

// Maps perfectly to Laravel's lengthAwarePaginator
const extractTicketsPayload = (payload: any) => {
  if (!payload) return { items: [] as AdminSupportTicket[], lastPage: 1, total: 0 };

  const source = payload.data && !Array.isArray(payload.data) ? payload.data : payload;
  const list = Array.isArray(source.data)
    ? source.data
    : Array.isArray(source.tickets)
      ? source.tickets
      : Array.isArray(source)
        ? source
        : [];

  return {
    items: list.map(normalizeTicket).filter((item: any) => Number.isFinite(item.id)),
    lastPage: Number(source.last_page || source.total_pages || 1),
    total: Number(source.total || list.length || 0),
  };
};

const extractDetailPayload = (payload: any) => {
  // Handles backend: return response()->json(['success' => true, 'ticket' => $ticket])
  const source = payload?.data ?? payload;
  const ticketRaw = source?.ticket ?? source;
  const messagesRaw = source?.ticket?.messages ?? ticketRaw?.messages ?? [];

  return {
    ticket: ticketRaw ? normalizeTicket(ticketRaw) : null,
    messages: Array.isArray(messagesRaw) ? messagesRaw.map(normalizeMessage) : [],
  };
};

export default function SupportChatAdmin() {
  const { showToast } = useToast();
  const { confirm } = useConfirmation();

  const [stats, setStats] = useState<AdminSupportStats>({});
  const [tickets, setTickets] = useState<AdminSupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTickets, setTotalTickets] = useState(0);

  const [selectedTicket, setSelectedTicket] = useState<AdminSupportTicket | null>(null);
  const [selectedTicketMessages, setSelectedTicketMessages] = useState<SupportTicketMessage[]>([]);
  const [isDialogLoading, setIsDialogLoading] = useState(false);

  const [replyMessage, setReplyMessage] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [isMutatingStatus, setIsMutatingStatus] = useState(false);

  const statsCards = useMemo(
    () => [
      { title: 'Total Tickets', value: getStatsValue(stats, ['total_tickets', 'total']) },
      { title: 'Open Tickets', value: getStatsValue(stats, ['open_tickets', 'open']) },
      { title: 'Closed Tickets', value: getStatsValue(stats, ['closed_tickets', 'closed']) },
      { title: 'Today Tickets', value: getStatsValue(stats, ['today_tickets', 'today']) },
    ],
    [stats],
  );

  const loadStats = async () => {
    const response = await adminSupportChatService.getStats();
    if (response.success && response.data) {
      setStats(response.data?.data ?? response.data);
      return;
    }
  };

  const loadTickets = async (page: number = currentPage, silent = false) => {
    if (!silent) setIsLoading(true);

    const response = await adminSupportChatService.getTickets(page);
    if (response.success && response.data) {
      const parsed = extractTicketsPayload(response.data);
      setTickets(parsed.items);
      setTotalPages(parsed.lastPage > 0 ? parsed.lastPage : 1);
      setTotalTickets(parsed.total);
    } else {
      setTickets([]);
      showToast(response.message || 'Failed to load tickets', 'error');
    }

    if (!silent) setIsLoading(false);
  };

  const loadTicketDetail = async (id: number) => {
    setIsDialogLoading(true);
    const response = await adminSupportChatService.getTicketById(id);

    if (response.success && response.data) {
      const parsed = extractDetailPayload(response.data);
      if (parsed.ticket) setSelectedTicket(parsed.ticket);
      setSelectedTicketMessages(parsed.messages);
    } else {
      showToast(response.message || 'Failed to load ticket details', 'error');
    }

    setIsDialogLoading(false);
  };

  const refreshAll = async () => {
    setIsRefreshing(true);
    await Promise.all([loadStats(), loadTickets(currentPage, true)]);
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    loadTickets(currentPage);
  }, [currentPage]);

  const handleOpenDetail = async (ticket: AdminSupportTicket) => {
    setSelectedTicket(ticket);
    setReplyMessage('');
    setSelectedTicketMessages([]);
    await loadTicketDetail(ticket.id);
  };

  const handleReply = async () => {
    if (!selectedTicket || !replyMessage.trim()) return;

    setIsReplying(true);
    const response = await adminSupportChatService.replyToTicket(selectedTicket.id, {
      message: replyMessage.trim(),
    });
    setIsReplying(false);

    if (response.success) {
      setReplyMessage('');
      showToast(response.message || 'Reply sent successfully', 'success');
      await Promise.all([
        loadTicketDetail(selectedTicket.id),
        loadTickets(currentPage, true),
        loadStats(),
      ]);
      return;
    }

    showToast(response.message || 'Failed to send reply', 'error');
  };

  const handleTicketStatus = async (action: 'close' | 'reopen') => {
    if (!selectedTicket) return;

    setIsMutatingStatus(true);
    const response = action === 'close'
      ? await adminSupportChatService.closeTicket(selectedTicket.id)
      : await adminSupportChatService.reopenTicket(selectedTicket.id);
    setIsMutatingStatus(false);

    if (response.success) {
      showToast(response.message || `Ticket ${action}d successfully`, 'success');
      await Promise.all([
        loadTicketDetail(selectedTicket.id),
        loadTickets(currentPage, true),
        loadStats(),
      ]);
      return;
    }

    showToast(response.message || `Failed to ${action} ticket`, 'error');
  };

  const handleDeleteTicket = async (ticket: AdminSupportTicket) => {
    const accepted = await confirm({
      title: 'Delete Ticket',
      description: `Are you sure you want to delete ticket #${ticket.id}? This will also delete all messages.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });

    if (!accepted) return;

    const response = await adminSupportChatService.deleteTicket(ticket.id);
    if (response.success) {
      showToast(response.message || 'Ticket deleted successfully', 'success');
      if (selectedTicket?.id === ticket.id) {
        setSelectedTicket(null);
        setSelectedTicketMessages([]);
        setReplyMessage('');
      }
      await Promise.all([loadTickets(currentPage, true), loadStats()]);
      return;
    }

    showToast(response.message || 'Failed to delete ticket', 'error');
  };

  const isTicketClosed = selectedTicket ? getStatusLabel(selectedTicket) === 'closed' : false;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Support Chat</h1>
          <p className="text-nexus-muted mt-1">Manage customer support tickets and replies</p>
        </div>
        <Button onClick={refreshAll} variant="outline" className="gap-2" disabled={isRefreshing}>
          {isRefreshing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsCards.map(card => (
          <Card key={card.title} className="bg-nexus-card border-nexus-border">
            <CardHeader className="pb-3">
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className="text-3xl">{card.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Tickets Table */}
      <Card className="bg-nexus-card border-nexus-border">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-nexus-blue" />
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 mx-auto text-nexus-muted mb-4" />
              <h3 className="text-lg font-medium mb-2">No support tickets found</h3>
              <p className="text-nexus-muted">New customer tickets will appear here.</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map(ticket => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">#{ticket.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-white">{ticket.name || 'N/A'}</p>
                          <p className="text-xs text-nexus-muted">{ticket.email || '-'}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn("capitalize", getStatusLabel(ticket) === 'closed' ? "text-slate-400 border-slate-600" : "text-green-400 border-green-400/30")}
                        >
                          {getStatusLabel(ticket)}
                        </Badge>
                      </TableCell>
                      <TableCell>{ticket.messages_count ?? '-'}</TableCell>
                      <TableCell className="text-nexus-muted">
                        {ticket.updated_at
                          ? formatDistanceToNow(new Date(ticket.updated_at), { addSuffix: true })
                          : '-'}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleOpenDetail(ticket)}>
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteTicket(ticket)}
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

              <p className="text-sm text-nexus-muted mt-4">Total Tickets: {totalTickets}</p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Ticket Details Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={(open) => !open && setSelectedTicket(null)}>
        <DialogContent className="bg-[#0c0d12] border-white/10 text-white max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Support Ticket {selectedTicket ? `#${selectedTicket.id}` : ''}</DialogTitle>
            <DialogDescription className="text-slate-400">
              Review conversation and reply to the customer.
            </DialogDescription>
          </DialogHeader>

          {!selectedTicket ? null : isDialogLoading ? (
            <div className="py-10 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-nexus-blue" />
            </div>
          ) : (
            <div className="space-y-4 overflow-y-auto pr-2 flex-1 flex flex-col h-full">
              {/* Customer Info Header */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between shrink-0">
                <div>
                  <h4 className="font-semibold text-white">{selectedTicket.name || 'Unknown Customer'}</h4>
                  <p className="text-sm text-slate-400">{selectedTicket.email || '-'}</p>
                </div>
                <Badge variant="outline" className={cn("capitalize", isTicketClosed ? "text-slate-400 border-slate-600" : "text-green-400 border-green-400/30")}>
                  {getStatusLabel(selectedTicket)}
                </Badge>
              </div>

              {/* Chat View */}
              <div className="flex-1 space-y-4 max-h-[350px] overflow-y-auto p-2 bg-nexus-black/30 rounded-lg border border-white/5">
                {selectedTicketMessages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-sm text-slate-400">No messages yet.</p>
                  </div>
                ) : (
                  selectedTicketMessages.map((message, index) => {
                    const senderType = String(message.sender_type || message.sender || '').toLowerCase();
                    const isAdmin = senderType.includes('admin') || senderType.includes('agent');

                    return (
                      <div
                        key={String(message.id ?? `${index}-${message.created_at ?? Date.now()}`)}
                        className={cn("flex w-full", isAdmin ? "justify-end" : "justify-start")}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] p-3 rounded-2xl",
                            isAdmin
                              ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-tr-sm"
                              : "bg-nexus-card border border-nexus-border text-white rounded-tl-sm"
                          )}
                        >
                          <p className={cn("text-[10px] mb-1 font-medium", isAdmin ? "text-white/80" : "text-cyan-400")}>
                            {isAdmin ? 'You (Admin)' : selectedTicket.name}
                          </p>
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.message || message.content || '-'}</p>
                          <p className={cn("text-[10px] mt-2 text-right", isAdmin ? "text-white/70" : "text-slate-500")}>
                            {message.created_at ? formatDistanceToNow(new Date(message.created_at), { addSuffix: true }) : ''}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Reply Input Area */}
              <div className="shrink-0 space-y-3">
                {isTicketClosed ? (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center justify-center gap-2 text-yellow-500">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Cannot reply to a closed ticket. Please reopen it first.</span>
                  </div>
                ) : (
                  <Textarea
                    placeholder="Write your reply to the customer..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="min-h-[100px] bg-nexus-black border-nexus-border text-white focus:ring-cyan-500/50"
                    disabled={isReplying || isMutatingStatus}
                  />
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
                  <div className="space-x-2">
                    {isTicketClosed ? (
                      <Button
                        variant="outline"
                        onClick={() => handleTicketStatus('reopen')}
                        disabled={isMutatingStatus || isReplying}
                        className="bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:text-green-300 border-green-500/30"
                      >
                        Reopen Ticket
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => handleTicketStatus('close')}
                        disabled={isMutatingStatus || isReplying}
                      >
                        Close Ticket
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteTicket(selectedTicket)}
                      disabled={isMutatingStatus || isReplying}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>

                  <Button
                    onClick={handleReply}
                    disabled={!replyMessage.trim() || isReplying || isMutatingStatus || isTicketClosed}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0"
                  >
                    {isReplying ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                    Send Reply
                  </Button>
                </div>
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}