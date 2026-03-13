import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { ContactMessage, contactService } from '@/services/contactService';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, Mail, MailOpen, RefreshCw, Reply } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ContactEnquiries() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [replySuccess, setReplySuccess] = useState(false);

  useEffect(() => {
    loadMessages();
  }, [page]);

  const loadMessages = async () => {
    setLoading(true);
    const result = await contactService.getAllMessages(page);
    console.log('API Response:', result);
    if (result.success && result.data) {
      // Check if data is already an array or has pagination structure
      if (Array.isArray(result.data)) {
        console.log('Setting messages from array:', result.data);
        setMessages(result.data);
        setTotalPages(1);
      } else {
        console.log('Setting messages from paginated:', result.data.data);
        setMessages(result.data.data || []);
        setTotalPages(result.data.last_page || 1);
      }
    } else {
      console.log('API call failed or no data');
      setMessages([]);
      setTotalPages(1);
    }
    setLoading(false);
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    setIsReplying(true);
    const result = await contactService.replyToMessage(selectedMessage.id, replyText);
    setIsReplying(false);
    
    if (result.success) {
      setReplySuccess(true);
      setReplyText('');
      setTimeout(() => {
        setReplySuccess(false);
        setSelectedMessage(null);
        loadMessages(); // Reload to get updated status
      }, 2000);
    }
  };

  const openMessageDialog = async (message: ContactMessage) => {
    setSelectedMessage(message);
    setReplyText('');
    setReplySuccess(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Contact Enquiries</h1>
          <p className="text-slate-400">Manage and respond to customer inquiries</p>
        </div>
        <Button onClick={loadMessages} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Messages List */}
      
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Card key={idx} className="p-4 bg-[#0c0d12] border-white/5">
              <Skeleton className="w-full h-20 bg-white/5" />
            </Card>
          ))}
        </div>
      ) : !messages || messages.length === 0 ? (
        <Card className="p-12 text-center bg-[#0c0d12] border-white/5">
          <Mail className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400">No contact enquiries yet</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className="p-6 bg-[#0c0d12] border-white/5 hover:border-white/15 transition-all cursor-pointer"
              onClick={() => openMessageDialog(message)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.is_read ? 'bg-slate-800' : 'bg-cyan-500/20'
                  }`}>
                    {message.is_read ? (
                      <MailOpen className="w-5 h-5 text-slate-400" />
                    ) : (
                      <Mail className="w-5 h-5 text-cyan-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{message.name}</h3>
                      {!message.is_read && (
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                          New
                        </Badge>
                      )}
                      {message.reply_status && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          Replied
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mb-1">{message.email}</p>
                    <p className="text-sm font-medium text-slate-300 mb-2">{message.subject}</p>
                    <p className="text-sm text-slate-400 line-clamp-2">{message.message}</p>
                    <p className="text-xs text-slate-500 mt-2">
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    openMessageDialog(message);
                  }}
                >
                  <Reply className="w-4 h-4" />
                  Reply
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-slate-400">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Reply Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="bg-[#0c0d12] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl">Contact Enquiry Details</DialogTitle>
            <DialogDescription className="text-slate-400">
              View and respond to customer inquiry
            </DialogDescription>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-6 overflow-y-auto pr-2 flex-1">
              {/* Message Details */}
              <div className="space-y-4 p-4 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white mb-1">{selectedMessage.name}</h4>
                    <p className="text-sm text-slate-400">{selectedMessage.email}</p>
                  </div>
                  <div className="flex gap-2">
                    {!selectedMessage.is_read && (
                      <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                        New
                      </Badge>
                    )}
                    {selectedMessage.reply_status && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Replied
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Subject</p>
                  <p className="text-sm font-medium text-white">{selectedMessage.subject}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Message</p>
                  <p className="text-sm text-slate-300 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                <p className="text-xs text-slate-500">
                  Received {formatDistanceToNow(new Date(selectedMessage.created_at), { addSuffix: true })}
                </p>
              </div>

              {/* Previous Reply */}
              {selectedMessage.reply_status && selectedMessage.reply_message && (
                <div className="space-y-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <p className="text-sm font-medium text-green-300">Previous Reply</p>
                  </div>
                  <p className="text-sm text-slate-300 whitespace-pre-wrap">{selectedMessage.reply_message}</p>
                  {selectedMessage.replied_at && (
                    <p className="text-xs text-slate-500">
                      Sent {formatDistanceToNow(new Date(selectedMessage.replied_at), { addSuffix: true })}
                    </p>
                  )}
                </div>
              )}

              {/* Reply Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    Your Reply
                  </label>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    className="min-h-[120px] bg-white/5 border-white/10 text-white"
                    disabled={isReplying}
                  />
                </div>

                {replySuccess && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <p className="text-sm text-green-300">Reply sent successfully!</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={handleReply}
                    disabled={!replyText.trim() || isReplying}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white"
                  >
                    {isReplying ? 'Sending...' : 'Send Reply'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedMessage(null)}
                    disabled={isReplying}
                  >
                    Cancel
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
