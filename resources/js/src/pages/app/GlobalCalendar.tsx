import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Users,
  Video,
  MapPin,
  Calendar as CalendarIcon,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import { mockTeamMembers } from '@/api/mocks/_teamHub';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  type: 'meeting' | 'deadline' | 'reminder' | 'scheduled-email';
  color: string;
  attendees?: string[];
  location?: string;
  projectId?: string;
}

const mockEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Sprint Planning',
    description: 'Weekly sprint planning meeting with the team',
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(11, 0, 0, 0)),
    type: 'meeting',
    color: 'bg-blue-500',
    attendees: ['user-1', 'user-2', 'user-3'],
    location: 'Zoom',
  },
  {
    id: 'evt-2',
    title: 'Client Call - TechCorp',
    description: 'Project status update with the client',
    start: new Date(new Date().setHours(14, 0, 0, 0)),
    end: new Date(new Date().setHours(15, 0, 0, 0)),
    type: 'meeting',
    color: 'bg-purple-500',
    attendees: ['user-1', 'user-2'],
    location: 'Google Meet',
  },
  {
    id: 'evt-3',
    title: 'E-commerce Project Deadline',
    start: addDays(new Date(), 3),
    end: addDays(new Date(), 3),
    type: 'deadline',
    color: 'bg-red-500',
    projectId: 'proj-1',
  },
  {
    id: 'evt-4',
    title: 'Design Review',
    description: 'Review new dashboard designs',
    start: addDays(new Date(new Date().setHours(11, 0, 0, 0)), 1),
    end: addDays(new Date(new Date().setHours(12, 0, 0, 0)), 1),
    type: 'meeting',
    color: 'bg-green-500',
    attendees: ['user-1', 'user-4'],
  },
  {
    id: 'evt-5',
    title: 'Follow-up Email to John',
    start: addDays(new Date(new Date().setHours(9, 0, 0, 0)), 2),
    end: addDays(new Date(new Date().setHours(9, 0, 0, 0)), 2),
    type: 'scheduled-email',
    color: 'bg-orange-500',
  },
];

const eventTypeColors: Record<string, { bg: string; text: string }> = {
  meeting: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  deadline: { bg: 'bg-red-500/20', text: 'text-red-400' },
  reminder: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  'scheduled-email': { bg: 'bg-orange-500/20', text: 'text-orange-400' },
};

function EventItem({ event, onClick }: { event: CalendarEvent; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-2 py-1 rounded text-xs truncate transition-colors",
        event.color,
        "text-white hover:opacity-80"
      )}
    >
      {format(event.start, 'h:mm a')} {event.title}
    </button>
  );
}

function DayCell({
  date,
  currentMonth,
  events,
  onEventClick,
  onAddEvent,
}: {
  date: Date;
  currentMonth: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onAddEvent: (date: Date) => void;
}) {
  const dayEvents = events.filter(e => isSameDay(e.start, date));
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isCurrentDay = isToday(date);

  return (
    <div
      className={cn(
        "min-h-[120px] p-2 border-r border-b border-nexus-border transition-colors group",
        !isCurrentMonth && "bg-nexus-black/50",
        isCurrentDay && "bg-nexus-blue/5"
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <span className={cn(
          "text-sm font-medium",
          isCurrentDay && "w-7 h-7 rounded-full bg-nexus-blue text-white flex items-center justify-center",
          !isCurrentMonth && "text-nexus-muted/50"
        )}>
          {format(date, 'd')}
        </span>
        <button
          onClick={() => onAddEvent(date)}
          className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-nexus-border transition-all"
        >
          <Plus className="w-3 h-3 text-nexus-muted" />
        </button>
      </div>
      <div className="space-y-1">
        {dayEvents.slice(0, 3).map(event => (
          <EventItem key={event.id} event={event} onClick={() => onEventClick(event)} />
        ))}
        {dayEvents.length > 3 && (
          <span className="text-xs text-nexus-muted">+{dayEvents.length - 3} more</span>
        )}
      </div>
    </div>
  );
}

function EventModal({
  event,
  isOpen,
  onClose
}: {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!event) return null;

  const attendees = event.attendees?.map(id =>
    mockTeamMembers.find(m => m.id === id)
  ).filter(Boolean);

  const typeStyle = eventTypeColors[event.type];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-nexus-card border-nexus-border">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className={cn("w-3 h-3 rounded-full mt-1.5", event.color)} />
            <div className="flex-1">
              <DialogTitle className="text-white">{event.title}</DialogTitle>
              <Badge className={cn("mt-2", typeStyle.bg, typeStyle.text, "border-0 capitalize")}>
                {event.type.replace('-', ' ')}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Time */}
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-nexus-muted" />
            <span className="text-nexus-text">
              {format(event.start, 'EEEE, MMMM d, yyyy')}
              <br />
              {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
            </span>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-center gap-3 text-sm">
              <Video className="w-4 h-4 text-nexus-muted" />
              <span className="text-nexus-text">{event.location}</span>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div className="text-sm text-nexus-muted">
              {event.description}
            </div>
          )}

          {/* Attendees */}
          {attendees && attendees.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-sm text-nexus-muted mb-2">
                <Users className="w-4 h-4" />
                <span>{attendees.length} attendees</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {attendees.map(member => member && (
                  <div key={member.id} className="flex items-center gap-2 px-2 py-1 rounded-full bg-nexus-border">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="text-[10px]">{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-nexus-text">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button className="gradient-primary text-white border-0">Edit Event</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CreateEventModal({
  isOpen,
  onClose,
  initialDate,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
}) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(initialDate ? format(initialDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [eventType, setEventType] = useState<CalendarEvent['type']>('meeting');

  const handleSave = () => {
    if (!title.trim()) return;

    const startDate = new Date(`${date}T${startTime}`);
    const endDate = new Date(`${date}T${endTime}`);

    onSave({
      title,
      description,
      start: startDate,
      end: endDate,
      type: eventType,
      color: eventType === 'meeting' ? 'bg-blue-500' : eventType === 'deadline' ? 'bg-red-500' : 'bg-orange-500',
      attendees: selectedAttendees,
    });

    setTitle('');
    setDescription('');
    setSelectedAttendees([]);
    onClose();
  };

  const toggleAttendee = (id: string) => {
    setSelectedAttendees(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-nexus-card border-nexus-border">
        <DialogHeader>
          <DialogTitle className="text-white">{t('calendar.scheduleEvent')}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium text-nexus-muted mb-2 block">
              {t('calendar.eventTitle')}
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              className="bg-nexus-black border-nexus-border"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-nexus-muted mb-2 block">
              Event Type
            </label>
            <div className="flex gap-2">
              {(['meeting', 'deadline', 'reminder'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setEventType(type)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm capitalize transition-colors",
                    eventType === type
                      ? "bg-nexus-blue text-white"
                      : "bg-nexus-border text-nexus-muted hover:text-white"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium text-nexus-muted mb-2 block">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-nexus-black border-nexus-border"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-nexus-muted mb-2 block">
                {t('calendar.startTime')}
              </label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-nexus-black border-nexus-border"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-nexus-muted mb-2 block">
                {t('calendar.endTime')}
              </label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-nexus-black border-nexus-border"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-nexus-muted mb-2 block">
              {t('calendar.eventDescription')}
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description..."
              className="bg-nexus-black border-nexus-border min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-nexus-muted mb-2 block">
              {t('calendar.inviteMembers')}
            </label>
            <div className="space-y-2">
              {mockTeamMembers.map(member => (
                <label key={member.id} className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={selectedAttendees.includes(member.id)}
                    onCheckedChange={() => toggleAttendee(member.id)}
                  />
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="text-xs">{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-nexus-text">{member.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>{t('common.cancel')}</Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim()}
            className="gradient-primary text-white border-0"
          >
            {t('common.save')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function GlobalCalendar() {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createDate, setCreateDate] = useState<Date | undefined>();

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days: Date[] = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentMonth]);

  const handleAddEvent = (date: Date) => {
    setCreateDate(date);
    setShowCreateModal(true);
  };

  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `evt-${Date.now()}`,
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const todayEvents = events.filter(e => isToday(e.start));

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{t('calendar.title')}</h1>
          <p className="text-nexus-muted">
            Manage your meetings, deadlines, and scheduled tasks
          </p>
        </div>
        <Button
          onClick={() => {
            setCreateDate(new Date());
            setShowCreateModal(true);
          }}
          className="gradient-primary text-white border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('calendar.scheduleEvent')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card className="bg-nexus-card border-nexus-border overflow-hidden">
            {/* Month Navigation */}
            <div className="flex items-center justify-between p-4 border-b border-nexus-border">
              <h2 className="text-lg font-semibold text-white">
                {format(currentMonth, 'MMMM yyyy')}
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date())}
                >
                  Today
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b border-nexus-border">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-nexus-muted border-r border-nexus-border last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, idx) => (
                <DayCell
                  key={idx}
                  date={day}
                  currentMonth={currentMonth}
                  events={events}
                  onEventClick={setSelectedEvent}
                  onAddEvent={handleAddEvent}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar - Today's Events */}
        <div className="lg:col-span-1">
          <Card className="bg-nexus-card border-nexus-border p-4">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Today's Schedule
            </h3>

            {todayEvents.length > 0 ? (
              <div className="space-y-3">
                {todayEvents.map(event => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="w-full text-left p-3 rounded-lg bg-nexus-border/50 hover:bg-nexus-border transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("w-2 h-2 rounded-full mt-1.5", event.color)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{event.title}</p>
                        <p className="text-xs text-nexus-muted">
                          {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                        </p>
                        {event.attendees && event.attendees.length > 0 && (
                          <div className="flex -space-x-1 mt-2">
                            {event.attendees.slice(0, 3).map(id => {
                              const member = mockTeamMembers.find(m => m.id === id);
                              return member ? (
                                <Avatar key={id} className="w-5 h-5 border border-nexus-card">
                                  <AvatarImage src={member.avatar} />
                                  <AvatarFallback className="text-[8px]">{member.name[0]}</AvatarFallback>
                                </Avatar>
                              ) : null;
                            })}
                            {event.attendees.length > 3 && (
                              <div className="w-5 h-5 rounded-full bg-nexus-border flex items-center justify-center text-[8px] text-nexus-muted">
                                +{event.attendees.length - 3}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-nexus-muted/30 mx-auto mb-3" />
                <p className="text-sm text-nexus-muted">No events today</p>
              </div>
            )}
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="bg-nexus-card border-nexus-border p-4 mt-4">
            <h3 className="font-semibold text-white mb-4">Upcoming Deadlines</h3>
            <div className="space-y-2">
              {events
                .filter(e => e.type === 'deadline' && e.start > new Date())
                .slice(0, 3)
                .map(event => (
                  <div key={event.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-nexus-border/50 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{event.title}</p>
                      <p className="text-xs text-nexus-muted">{format(event.start, 'MMM d')}</p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Event Detail Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setCreateDate(undefined);
        }}
        initialDate={createDate}
        onSave={handleSaveEvent}
      />
    </div>
  );
}
