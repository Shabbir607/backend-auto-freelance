import { useConfirmation } from '@/components/ConfirmationDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useToast } from '@/contexts/ToastContext';
import { CourseReview, courseService } from '@/services/courseService';
import { Check, Loader2, MessageSquare, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminCourseReviewsPage() {
    const { showToast } = useToast();
    const { confirm } = useConfirmation();

    const [reviews, setReviews] = useState<CourseReview[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadReviews = async () => {
        setIsLoading(true);
        try {
            const response = await courseService.getAdminReviews();
            if (response.success && response.data) {
                setReviews(response.data.data);
            }
        } catch (error) {
            console.error('Failed to load reviews:', error);
            showToast('Failed to load reviews', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleApprove = async (id: number) => {
        try {
            await courseService.approveReview(id);
            showToast('Review approved', 'success');
            await loadReviews();
        } catch (error) {
            console.error('Failed to approve review:', error);
            showToast('Failed to approve review', 'error');
        }
    };

    const handleReject = async (id: number) => {
        try {
            await courseService.rejectReview(id);
            showToast('Review rejected', 'success');
            await loadReviews();
        } catch (error) {
            console.error('Failed to reject review:', error);
            showToast('Failed to reject review', 'error');
        }
    };

    const handleDelete = async (id: number) => {
        const confirmed = await confirm({
            title: 'Delete Review',
            description: 'Are you sure you want to permanently delete this review?',
            confirmText: 'Delete',
            cancelText: 'Cancel',
        });

        if (!confirmed) return;

        try {
            await courseService.deleteReview(id);
            showToast('Review deleted successfully', 'success');
            await loadReviews();
        } catch (error) {
            console.error('Failed to delete review:', error);
            showToast('Failed to delete review', 'error');
        }
    };

    // Helper to render stars
    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center text-amber-500 text-xs">
                {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < rating ? 'opacity-100' : 'opacity-30'}>
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold gradient-text">Course Reviews</h1>
                    <p className="text-nexus-muted mt-1">
                        Moderate and manage user reviews for your courses.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-nexus-card border-nexus-border">
                    <CardHeader className="pb-3">
                        <CardDescription>Total Reviews</CardDescription>
                        <CardTitle className="text-3xl">{reviews.length}</CardTitle>
                    </CardHeader>
                </Card>
                <Card className="bg-nexus-card border-nexus-border">
                    <CardHeader className="pb-3">
                        <CardDescription>Approved</CardDescription>
                        <CardTitle className="text-3xl">
                            {reviews.filter((r) => r.is_approved).length}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="bg-nexus-card border-nexus-border">
                    <CardHeader className="pb-3">
                        <CardDescription>Pending / Rejected</CardDescription>
                        <CardTitle className="text-3xl">
                            {reviews.filter((r) => !r.is_approved).length}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Reviews Table */}
            <Card className="bg-nexus-card border-nexus-border">
                <CardContent className="pt-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-nexus-blue" />
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageSquare className="w-12 h-12 mx-auto text-nexus-muted mb-4" />
                            <h3 className="text-lg font-medium mb-2">No reviews found</h3>
                            <p className="text-nexus-muted mb-4">You don't have any course reviews to moderate right now.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Review</TableHead>
                                    <TableHead>Course ID</TableHead>
                                    <TableHead>Reviewer</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reviews.map((review) => (
                                    <TableRow key={review.id}>
                                        <TableCell className="max-w-xs">
                                            <div className="font-medium text-sm text-white">{review.title}</div>
                                            {renderStars(review.rating)}
                                            <p className="text-xs text-nexus-muted mt-1 line-clamp-2" title={review.comment}>
                                                {review.comment}
                                            </p>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">ID: {review.course_id}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm font-medium">{review.user?.name || review.guest_email || 'Guest'}</div>
                                            <div className="text-xs text-nexus-muted">{new Date(review.created_at).toLocaleDateString()}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={review.is_approved ? 'default' : 'secondary'}
                                                className={
                                                    review.is_approved
                                                        ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                                                        : 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                                                }
                                            >
                                                {review.is_approved ? 'Approved' : 'Pending'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {!review.is_approved ? (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        title="Approve Review"
                                                        onClick={() => handleApprove(review.id)}
                                                        className="text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        title="Reject Review"
                                                        onClick={() => handleReject(review.id)}
                                                        className="text-amber-500 hover:text-amber-600 hover:bg-amber-500/10"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                )}

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    title="Delete Review"
                                                    onClick={() => handleDelete(review.id)}
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
