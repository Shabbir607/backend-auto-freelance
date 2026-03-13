import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Shield, 
  Camera, 
  Mic, 
  Monitor, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Loader2,
  ChevronRight,
  Volume2,
  Play,
  Square,
  Send,
  Clock,
  User,
  Bot,
  Wifi,
  WifiOff,
  Eye,
  Lock,
  FileText,
  Download,
  Globe,
  MonitorSmartphone,
  AlertCircle,
  RefreshCw,
  Clipboard,
  Maximize,
  ShieldAlert,
  Activity,
  Cpu,
  Keyboard,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

// Types
type InterviewStep = 'loading' | 'system-check' | 'terms' | 'interview' | 'completed' | 'terminated';
type SystemCheckStatus = 'pending' | 'checking' | 'passed' | 'failed' | 'warning';
type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
type SecurityEventType = 'focus_loss' | 'clipboard_access' | 'shortcut_blocked' | 'fullscreen_exit' | 'vm_detected' | 'multi_monitor' | 'process_launch';

interface SystemCheck {
  id: string;
  label: string;
  description: string;
  status: SystemCheckStatus;
  icon: React.ElementType;
  required: boolean;
  errorMessage?: string;
}

interface InterviewQuestion {
  id: string;
  question: string;
  type: 'text' | 'audio' | 'video';
  timeLimit?: number;
}

interface RiskWarning {
  id: string;
  message: string;
  level: RiskLevel;
  timestamp: Date;
  eventType?: SecurityEventType;
}

interface SecurityEvent {
  id: string;
  type: SecurityEventType;
  timestamp: Date;
  details: string;
  severity: RiskLevel;
}

// Mock data
const mockQuestions: InterviewQuestion[] = [
  { id: '1', question: 'Tell me about yourself and your experience in software development.', type: 'audio', timeLimit: 120 },
  { id: '2', question: 'Describe a challenging project you worked on and how you overcame obstacles.', type: 'audio', timeLimit: 180 },
  { id: '3', question: 'How do you approach debugging complex issues in production?', type: 'audio', timeLimit: 150 },
  { id: '4', question: 'What is your experience with agile methodologies?', type: 'audio', timeLimit: 120 },
  { id: '5', question: 'Where do you see yourself in 5 years?', type: 'audio', timeLimit: 90 },
];

const riskLevelConfig = {
  low: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  medium: { color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  high: { color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  critical: { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' },
};

// Security utility functions
const detectVirtualMachine = (): boolean => {
  // In real implementation, this would check for VM indicators
  // Check for common VM artifacts in user agent, screen dimensions, etc.
  const ua = navigator.userAgent.toLowerCase();
  const vmIndicators = ['vmware', 'virtualbox', 'qemu', 'xen', 'parallels'];
  return vmIndicators.some(indicator => ua.includes(indicator));
};

const detectRemoteDesktop = (): boolean => {
  // Check for remote desktop indicators
  // In Electron, this would use native APIs
  return false;
};

const getMonitorCount = (): number => {
  // In web, we can only estimate based on screen dimensions
  // In Electron, we'd use screen.getAllDisplays()
  return window.screen.availWidth > 3000 ? 2 : 1;
};

function SecureInterviewClient() {
  const [currentStep, setCurrentStep] = useState<InterviewStep>('loading');
  const [systemChecks, setSystemChecks] = useState<SystemCheck[]>([
    { id: 'internet', label: 'Internet Connection', description: 'Checking connection stability...', status: 'pending', icon: Wifi, required: true },
    { id: 'camera', label: 'Webcam', description: 'Verifying camera access...', status: 'pending', icon: Camera, required: true },
    { id: 'microphone', label: 'Microphone', description: 'Testing audio input...', status: 'pending', icon: Mic, required: true },
    { id: 'screen', label: 'Screen Share', description: 'Enabling screen capture...', status: 'pending', icon: Monitor, required: true },
    { id: 'monitor', label: 'Single Monitor', description: 'Detecting display configuration...', status: 'pending', icon: MonitorSmartphone, required: true },
    { id: 'vm', label: 'Environment Check', description: 'Verifying native environment...', status: 'pending', icon: Cpu, required: true },
    { id: 'fullscreen', label: 'Fullscreen Mode', description: 'Enabling kiosk mode...', status: 'pending', icon: Maximize, required: true },
  ]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [riskWarnings, setRiskWarnings] = useState<RiskWarning[]>([]);
  const [activeWarning, setActiveWarning] = useState<RiskWarning | null>(null);
  const [isWebFallback, setIsWebFallback] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'reconnecting' | 'disconnected'>('connected');
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [focusLossCount, setFocusLossCount] = useState(0);
  const [clipboardAttempts, setClipboardAttempts] = useState(0);
  const [blockedShortcuts, setBlockedShortcuts] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  const [interviewStartTime, setInterviewStartTime] = useState<Date | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Log security event
  const logSecurityEvent = useCallback((type: SecurityEventType, details: string, severity: RiskLevel) => {
    const event: SecurityEvent = {
      id: Date.now().toString(),
      type,
      timestamp: new Date(),
      details,
      severity,
    };
    setSecurityEvents(prev => [...prev, event]);
    
    // Update risk score based on severity
    const severityScores = { low: 5, medium: 15, high: 30, critical: 50 };
    setRiskScore(prev => Math.min(100, prev + severityScores[severity]));
    
    // Show warning for high/critical events
    if (severity === 'high' || severity === 'critical') {
      const warning: RiskWarning = {
        id: event.id,
        message: details,
        level: severity,
        timestamp: new Date(),
        eventType: type,
      };
      setRiskWarnings(prev => [...prev, warning]);
      setActiveWarning(warning);
      setTimeout(() => setActiveWarning(null), 5000);
    }
    
    // Terminate on critical events
    if (severity === 'critical' && riskScore > 80) {
      setCurrentStep('terminated');
    }
  }, [riskScore]);

  // Keyboard shortcut blocking
  useEffect(() => {
    if (currentStep !== 'interview') return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block common cheating shortcuts
      const blockedCombos = [
        { key: 'Tab', alt: true }, // Alt+Tab
        { key: 'Escape', ctrl: true, shift: true }, // Ctrl+Shift+Esc (Task Manager)
        { key: 'PrintScreen' }, // Print Screen
        { key: 'F12' }, // Dev Tools
        { key: 'r', ctrl: true }, // Refresh
        { key: 'r', meta: true }, // Cmd+R
        { key: 'Tab', meta: true }, // Cmd+Tab
        { key: 'c', ctrl: true }, // Copy
        { key: 'v', ctrl: true }, // Paste
        { key: 'c', meta: true }, // Cmd+C
        { key: 'v', meta: true }, // Cmd+V
      ];
      
      const isBlocked = blockedCombos.some(combo => {
        const keyMatch = e.key === combo.key || e.code === combo.key;
        const ctrlMatch = combo.ctrl ? e.ctrlKey : true;
        const altMatch = combo.alt ? e.altKey : true;
        const shiftMatch = combo.shift ? e.shiftKey : true;
        const metaMatch = combo.meta ? e.metaKey : true;
        return keyMatch && ctrlMatch && altMatch && shiftMatch && metaMatch;
      });
      
      if (isBlocked) {
        e.preventDefault();
        e.stopPropagation();
        setBlockedShortcuts(prev => prev + 1);
        logSecurityEvent('shortcut_blocked', `Blocked shortcut: ${e.key}`, 'medium');
        return false;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [currentStep, logSecurityEvent]);

  // Focus loss detection
  useEffect(() => {
    if (currentStep !== 'interview') return;
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setFocusLossCount(prev => prev + 1);
        logSecurityEvent('focus_loss', 'Application lost focus - possible tab switch', 'high');
      }
    };
    
    const handleBlur = () => {
      setFocusLossCount(prev => prev + 1);
      logSecurityEvent('focus_loss', 'Window lost focus', 'medium');
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [currentStep, logSecurityEvent]);

  // Clipboard monitoring
  useEffect(() => {
    if (currentStep !== 'interview') return;
    
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      setClipboardAttempts(prev => prev + 1);
      logSecurityEvent('clipboard_access', 'Copy attempt blocked', 'medium');
    };
    
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      setClipboardAttempts(prev => prev + 1);
      logSecurityEvent('clipboard_access', 'Paste attempt blocked', 'high');
    };
    
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      setClipboardAttempts(prev => prev + 1);
      logSecurityEvent('clipboard_access', 'Cut attempt blocked', 'medium');
    };
    
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('cut', handleCut);
    
    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('cut', handleCut);
    };
  }, [currentStep, logSecurityEvent]);

  // Fullscreen monitoring
  useEffect(() => {
    if (currentStep !== 'interview') return;
    
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
      
      if (!isNowFullscreen && currentStep === 'interview') {
        logSecurityEvent('fullscreen_exit', 'Exited fullscreen mode', 'high');
        // Attempt to re-enter fullscreen
        containerRef.current?.requestFullscreen?.().catch(() => {});
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [currentStep, logSecurityEvent]);

  // Context menu blocking
  useEffect(() => {
    if (currentStep !== 'interview') return;
    
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      logSecurityEvent('shortcut_blocked', 'Right-click context menu blocked', 'low');
      return false;
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [currentStep, logSecurityEvent]);

  // Simulate loading and initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep('system-check');
      runSystemChecks();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Run system checks sequentially with actual checks
  const runSystemChecks = async () => {
    const checks = [...systemChecks];
    
    for (let i = 0; i < checks.length; i++) {
      setSystemChecks(prev => prev.map((check, idx) => 
        idx === i ? { ...check, status: 'checking' } : check
      ));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let status: SystemCheckStatus = 'passed';
      let errorMessage: string | undefined;
      
      // Perform actual checks
      switch (checks[i].id) {
        case 'internet':
          // Check internet connectivity
          try {
            const online = navigator.onLine;
            status = online ? 'passed' : 'failed';
            if (!online) errorMessage = 'No internet connection detected';
          } catch {
            status = 'passed'; // Assume connected if check fails
          }
          break;
          
        case 'camera':
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            status = 'passed';
          } catch {
            status = 'failed';
            errorMessage = 'Camera access denied or not available';
          }
          break;
          
        case 'microphone':
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            status = 'passed';
          } catch {
            status = 'failed';
            errorMessage = 'Microphone access denied or not available';
          }
          break;
          
        case 'screen':
          // Screen share will be requested when interview starts
          status = 'passed';
          break;
          
        case 'monitor':
          const monitorCount = getMonitorCount();
          if (monitorCount > 1) {
            status = 'warning';
            errorMessage = 'Multiple monitors detected. Please use single monitor.';
          } else {
            status = 'passed';
          }
          break;
          
        case 'vm':
          const isVM = detectVirtualMachine();
          const isRDP = detectRemoteDesktop();
          if (isVM || isRDP) {
            status = 'failed';
            errorMessage = isVM ? 'Virtual machine detected' : 'Remote desktop detected';
          } else {
            status = 'passed';
          }
          break;
          
        case 'fullscreen':
          // Will be enabled when interview starts
          status = 'passed';
          break;
          
        default:
          status = 'passed';
      }
      
      setSystemChecks(prev => prev.map((check, idx) => 
        idx === i ? { ...check, status, errorMessage } : check
      ));
    }
  };

  // Start webcam and screen share
  useEffect(() => {
    if (currentStep === 'interview' && videoRef.current) {
      // Request webcam
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error('Media access error:', err));
      
      // Request screen share
      navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(stream => {
          screenStreamRef.current = stream;
          // Monitor for screen share stop
          stream.getVideoTracks()[0].onended = () => {
            logSecurityEvent('fullscreen_exit', 'Screen sharing stopped', 'critical');
          };
        })
        .catch(err => {
          console.error('Screen share error:', err);
          logSecurityEvent('fullscreen_exit', 'Screen sharing denied', 'critical');
        });
      
      // Enter fullscreen
      containerRef.current?.requestFullscreen?.().catch(() => {});
      setInterviewStartTime(new Date());
    }
    
    return () => {
      screenStreamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, [currentStep, logSecurityEvent]);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      setRecordingTime(0);
    }
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording]);

  // Simulate random risk warnings during interview (AI detection simulation)
  useEffect(() => {
    if (currentStep !== 'interview') return;
    
    const warningMessages = [
      { message: 'Multiple faces detected. Please ensure you are alone.', level: 'high' as RiskLevel },
      { message: 'Background noise detected. Please move to a quieter location.', level: 'medium' as RiskLevel },
      { message: 'Eye gaze deviation detected.', level: 'low' as RiskLevel },
      { message: 'Face not clearly visible. Please adjust your camera.', level: 'medium' as RiskLevel },
      { message: 'Unusual head movement detected.', level: 'low' as RiskLevel },
    ];
    
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const warning = warningMessages[Math.floor(Math.random() * warningMessages.length)];
        const newWarning: RiskWarning = {
          id: Date.now().toString(),
          message: warning.message,
          level: warning.level,
          timestamp: new Date(),
        };
        setRiskWarnings(prev => [...prev, newWarning]);
        setActiveWarning(newWarning);
        
        // Update risk score
        const severityScores = { low: 2, medium: 5, high: 10, critical: 25 };
        setRiskScore(prev => Math.min(100, prev + severityScores[warning.level]));
        
        setTimeout(() => setActiveWarning(null), 5000);
      }
    }, 20000);
    
    return () => clearInterval(interval);
  }, [currentStep]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const allChecksPassed = systemChecks.every(check => check.status === 'passed' || check.status === 'warning');
  const hasFailedChecks = systemChecks.some(check => check.status === 'failed' && check.required);
  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

  const handleNextQuestion = () => {
    setIsRecording(false);
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentStep('completed');
    }
  };

  // Loading Screen
  if (currentStep === 'loading') {
    return (
      <div className="min-h-screen bg-[#0D0D15] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">EdgeLancer Interview</h1>
            <p className="text-muted-foreground">Initializing secure environment...</p>
          </div>
          <Loader2 className="w-8 h-8 mx-auto text-primary animate-spin" />
        </div>
      </div>
    );
  }

  // System Check Screen
  if (currentStep === 'system-check') {
    return (
      <div className="min-h-screen bg-[#0D0D15] p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">System Check</h1>
            <p className="text-muted-foreground">Please wait while we verify your system requirements</p>
          </div>

          {/* Web Fallback Warning */}
          {isWebFallback && (
            <Card className="p-4 bg-amber-500/10 border-amber-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-500">Web Browser Mode</p>
                  <p className="text-sm text-amber-400/80 mt-1">
                    You are using the web fallback. For enhanced security, please{' '}
                    <button className="underline hover:no-underline">download the desktop app</button>.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* System Checks */}
          <Card className="p-6 bg-[#1A1A23] border-[#2A2A33]">
            <div className="space-y-4">
              {systemChecks.map((check) => {
                const Icon = check.icon;
                return (
                  <div 
                    key={check.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border transition-all",
                      check.status === 'passed' && "bg-emerald-500/5 border-emerald-500/30",
                      check.status === 'failed' && "bg-red-500/5 border-red-500/30",
                      check.status === 'warning' && "bg-amber-500/5 border-amber-500/30",
                      check.status === 'checking' && "bg-primary/5 border-primary/30",
                      check.status === 'pending' && "bg-muted/5 border-border"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      check.status === 'passed' && "bg-emerald-500/10",
                      check.status === 'failed' && "bg-red-500/10",
                      check.status === 'warning' && "bg-amber-500/10",
                      check.status === 'checking' && "bg-primary/10",
                      check.status === 'pending' && "bg-muted"
                    )}>
                      <Icon className={cn(
                        "w-5 h-5",
                        check.status === 'passed' && "text-emerald-500",
                        check.status === 'failed' && "text-red-500",
                        check.status === 'warning' && "text-amber-500",
                        check.status === 'checking' && "text-primary",
                        check.status === 'pending' && "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white">{check.label}</p>
                      <p className={cn(
                        "text-sm",
                        check.status === 'failed' && "text-red-400",
                        check.status === 'warning' && "text-amber-400",
                        check.status !== 'failed' && check.status !== 'warning' && "text-muted-foreground"
                      )}>
                        {check.errorMessage || check.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {check.status === 'pending' && (
                        <div className="w-6 h-6 rounded-full border-2 border-muted" />
                      )}
                      {check.status === 'checking' && (
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      )}
                      {check.status === 'passed' && (
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                      )}
                      {check.status === 'warning' && (
                        <AlertTriangle className="w-6 h-6 text-amber-500" />
                      )}
                      {check.status === 'failed' && (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Failed Checks Warning */}
          {hasFailedChecks && (
            <Card className="p-4 bg-red-500/10 border-red-500/30">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-500">System Requirements Not Met</p>
                  <p className="text-sm text-red-400/80 mt-1">
                    One or more required system checks have failed. Please resolve the issues above before proceeding.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Continue Button */}
          <Button 
            className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white h-12 text-base font-medium"
            disabled={!allChecksPassed || hasFailedChecks}
            onClick={() => setCurrentStep('terms')}
          >
            {allChecksPassed && !hasFailedChecks ? (
              <>
                Continue to Terms
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            ) : hasFailedChecks ? (
              <>
                <XCircle className="w-5 h-5 mr-2" />
                Cannot Proceed
              </>
            ) : (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Checking System...
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  // Terms and Conditions Screen
  if (currentStep === 'terms') {
    return (
      <div className="min-h-screen bg-[#0D0D15] p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Terms & Conditions</h1>
            <p className="text-muted-foreground">Please review and accept before proceeding</p>
          </div>

          {/* Terms Content */}
          <Card className="bg-[#1A1A23] border-[#2A2A33]">
            <ScrollArea className="h-[400px] p-6">
              <div className="space-y-6 text-sm text-muted-foreground">
                <section>
                  <h3 className="text-white font-semibold mb-2">1. Proctoring and Monitoring</h3>
                  <p>By proceeding with this interview, you acknowledge and consent to the following monitoring measures:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Continuous webcam recording throughout the interview</li>
                    <li>Audio recording of all verbal responses</li>
                    <li>Screen capture and monitoring of your display</li>
                    <li>AI-powered behavior analysis and anomaly detection</li>
                    <li>Real-time risk assessment and flagging</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-2">2. Anti-Cheating Measures</h3>
                  <p>The following activities are strictly prohibited and will result in immediate interview termination:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Switching applications or browser tabs during the interview</li>
                    <li>Using external resources, notes, or assistance</li>
                    <li>Having other individuals present in the room</li>
                    <li>Using virtual machines or remote desktop software</li>
                    <li>Attempting to disable or circumvent monitoring systems</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-2">3. Data Collection and Privacy</h3>
                  <p>All data collected during this interview will be:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Encrypted and securely transmitted to our servers</li>
                    <li>Stored for a period of 90 days for review purposes</li>
                    <li>Accessible only to authorized personnel</li>
                    <li>Deleted upon request after the hiring decision is made</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-2">4. Technical Requirements</h3>
                  <p>You confirm that you have:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>A stable internet connection (minimum 5 Mbps)</li>
                    <li>A working webcam and microphone</li>
                    <li>A quiet, well-lit environment</li>
                    <li>Only one monitor connected to your device</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-2">5. Interview Conduct</h3>
                  <p>By accepting these terms, you agree to:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Answer all questions honestly and to the best of your ability</li>
                    <li>Remain visible on camera throughout the interview</li>
                    <li>Not use any unauthorized aids or assistance</li>
                    <li>Complete the interview in one sitting without interruption</li>
                  </ul>
                </section>
              </div>
            </ScrollArea>
          </Card>

          {/* Accept Checkbox */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-[#1A1A23] border border-[#2A2A33]">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
              I have read and agree to the terms and conditions. I understand that this interview will be monitored and recorded, and I consent to all anti-cheating measures described above.
            </label>
          </div>

          {/* Continue Button */}
          <Button 
            className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white h-12 text-base font-medium"
            disabled={!termsAccepted}
            onClick={() => setCurrentStep('interview')}
          >
            Start Interview
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  // Interview Screen
  if (currentStep === 'interview') {
    return (
      <div ref={containerRef} className="min-h-screen bg-[#0D0D15] flex flex-col">
        {/* Web Fallback Banner */}
        {isWebFallback && (
          <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-2">
            <div className="flex items-center justify-center gap-2 text-sm text-amber-500">
              <AlertTriangle className="w-4 h-4" />
              <span>Web Browser Mode - This interview is being monitored with reduced security</span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="border-b border-[#2A2A33] bg-[#1A1A23] px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-white">EdgeLancer Interview</h1>
                <p className="text-xs text-muted-foreground">Software Engineer Position</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Connection Status */}
              <div className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
                connectionStatus === 'connected' && "bg-emerald-500/10 text-emerald-500",
                connectionStatus === 'reconnecting' && "bg-amber-500/10 text-amber-500",
                connectionStatus === 'disconnected' && "bg-red-500/10 text-red-500"
              )}>
                {connectionStatus === 'connected' && <Wifi className="w-3.5 h-3.5" />}
                {connectionStatus === 'reconnecting' && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                {connectionStatus === 'disconnected' && <WifiOff className="w-3.5 h-3.5" />}
                <span className="capitalize">{connectionStatus}</span>
              </div>
              {/* Progress */}
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {mockQuestions.length}</span>
                <Progress value={progress} className="w-24 h-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Warning Overlay */}
        {activeWarning && (
          <div className={cn(
            "absolute top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg border shadow-lg animate-in fade-in slide-in-from-top-2",
            riskLevelConfig[activeWarning.level].bg,
            riskLevelConfig[activeWarning.level].border
          )}>
            <div className="flex items-center gap-3">
              <AlertCircle className={cn("w-5 h-5", riskLevelConfig[activeWarning.level].color)} />
              <span className={cn("font-medium", riskLevelConfig[activeWarning.level].color)}>
                {activeWarning.message}
              </span>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Left Panel - Interviewer */}
          <div className="flex-1 p-4 md:p-6 flex flex-col">
            <Card className="flex-1 bg-[#1A1A23] border-[#2A2A33] p-6 flex flex-col">
              {/* AI Interviewer */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">AI Interviewer</p>
                  <p className="text-xs text-muted-foreground">EdgeLancer</p>
                </div>
              </div>

              {/* Question */}
              <div className="flex-1 flex items-center justify-center">
                <div className="max-w-xl text-center space-y-4">
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    Question {currentQuestionIndex + 1}
                  </Badge>
                  <h2 className="text-xl md:text-2xl font-medium text-white leading-relaxed">
                    {currentQuestion.question}
                  </h2>
                  {currentQuestion.timeLimit && (
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time limit: {formatTime(currentQuestion.timeLimit)}
                    </p>
                  )}
                </div>
              </div>

              {/* Recording Controls */}
              <div className="flex items-center justify-center gap-4 pt-6 border-t border-[#2A2A33]">
                {!isRecording ? (
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white gap-2"
                    onClick={() => setIsRecording(true)}
                  >
                    <Play className="w-5 h-5" />
                    Start Recording
                  </Button>
                ) : (
                  <>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-mono text-red-400">{formatTime(recordingTime)}</span>
                    </div>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 gap-2"
                      onClick={() => setIsRecording(false)}
                    >
                      <Square className="w-5 h-5" />
                      Stop
                    </Button>
                    <Button 
                      size="lg"
                      className="bg-primary text-primary-foreground gap-2"
                      onClick={handleNextQuestion}
                    >
                      <Send className="w-5 h-5" />
                      Submit & Next
                    </Button>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Right Panel - Candidate Video */}
          <div className="w-full lg:w-80 p-4 md:p-6 lg:border-l border-[#2A2A33] space-y-4">
            {/* Video Preview */}
            <Card className="bg-[#1A1A23] border-[#2A2A33] overflow-hidden">
              <div className="aspect-video bg-black relative">
                <video 
                  ref={videoRef}
                  autoPlay 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/60 text-xs text-white">
                    <Camera className="w-3 h-3 text-emerald-500" />
                    <span>Live</span>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2">
                  <div className={cn(
                    "flex items-center gap-1.5 px-2 py-1 rounded text-xs",
                    isRecording ? "bg-red-500/80 text-white" : "bg-black/60 text-white"
                  )}>
                    <Mic className={cn("w-3 h-3", isRecording && "animate-pulse")} />
                    <span>{isRecording ? 'Recording' : 'Ready'}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-[#2A2A33]">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-white">You</span>
                </div>
              </div>
            </Card>

            {/* Status Indicators */}
            <Card className="bg-[#1A1A23] border-[#2A2A33] p-4 space-y-3">
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                Monitoring Status
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Vision AI</span>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30">Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Audio AI</span>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30">Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Behavior AI</span>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30">Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Screen Share</span>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30">Active</Badge>
                </div>
              </div>
            </Card>

            {/* Risk Score */}
            <Card className="bg-[#1A1A23] border-[#2A2A33] p-4 space-y-3">
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Risk Score
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-2xl font-bold",
                    riskScore < 30 && "text-emerald-500",
                    riskScore >= 30 && riskScore < 60 && "text-amber-500",
                    riskScore >= 60 && riskScore < 80 && "text-orange-500",
                    riskScore >= 80 && "text-red-500"
                  )}>
                    {riskScore}%
                  </span>
                  <Badge variant="outline" className={cn(
                    riskScore < 30 && "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
                    riskScore >= 30 && riskScore < 60 && "bg-amber-500/10 text-amber-500 border-amber-500/30",
                    riskScore >= 60 && riskScore < 80 && "bg-orange-500/10 text-orange-500 border-orange-500/30",
                    riskScore >= 80 && "bg-red-500/10 text-red-500 border-red-500/30"
                  )}>
                    {riskScore < 30 ? 'Low' : riskScore < 60 ? 'Medium' : riskScore < 80 ? 'High' : 'Critical'}
                  </Badge>
                </div>
                <Progress 
                  value={riskScore} 
                  className={cn(
                    "h-2",
                    riskScore < 30 && "[&>div]:bg-emerald-500",
                    riskScore >= 30 && riskScore < 60 && "[&>div]:bg-amber-500",
                    riskScore >= 60 && riskScore < 80 && "[&>div]:bg-orange-500",
                    riskScore >= 80 && "[&>div]:bg-red-500"
                  )} 
                />
              </div>
            </Card>

            {/* Security Events Summary */}
            <Card className="bg-[#1A1A23] border-[#2A2A33] p-4 space-y-3">
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                Security Events
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-muted/50">
                  <p className="text-muted-foreground">Focus Loss</p>
                  <p className={cn("font-bold", focusLossCount > 0 ? "text-amber-500" : "text-emerald-500")}>{focusLossCount}</p>
                </div>
                <div className="p-2 rounded bg-muted/50">
                  <p className="text-muted-foreground">Clipboard</p>
                  <p className={cn("font-bold", clipboardAttempts > 0 ? "text-amber-500" : "text-emerald-500")}>{clipboardAttempts}</p>
                </div>
                <div className="p-2 rounded bg-muted/50">
                  <p className="text-muted-foreground">Shortcuts</p>
                  <p className={cn("font-bold", blockedShortcuts > 0 ? "text-amber-500" : "text-emerald-500")}>{blockedShortcuts}</p>
                </div>
                <div className="p-2 rounded bg-muted/50">
                  <p className="text-muted-foreground">Fullscreen</p>
                  <p className={cn("font-bold", isFullscreen ? "text-emerald-500" : "text-red-500")}>{isFullscreen ? 'Active' : 'Exited'}</p>
                </div>
              </div>
            </Card>

            {/* Risk Warnings Log */}
            {riskWarnings.length > 0 && (
              <Card className="bg-[#1A1A23] border-[#2A2A33] p-4 space-y-3">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Warnings ({riskWarnings.length})
                </h3>
                <ScrollArea className="h-32">
                  <div className="space-y-2">
                    {riskWarnings.map(warning => (
                      <div 
                        key={warning.id}
                        className={cn(
                          "p-2 rounded text-xs",
                          riskLevelConfig[warning.level].bg
                        )}
                      >
                        <p className={riskLevelConfig[warning.level].color}>{warning.message}</p>
                        <p className="text-muted-foreground mt-1">
                          {warning.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            )}
          </div>
        </div>

        {/* Mobile Progress */}
        <div className="lg:hidden border-t border-[#2A2A33] bg-[#1A1A23] px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {mockQuestions.length}</span>
            <Progress value={progress} className="w-32 h-2" />
          </div>
        </div>
      </div>
    );
  }

  // Completed Screen
  if (currentStep === 'completed') {
    const sessionDuration = interviewStartTime 
      ? Math.round((new Date().getTime() - interviewStartTime.getTime()) / 60000)
      : 15;
    
    return (
      <div className="min-h-screen bg-[#0D0D15] flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">Interview Completed</h1>
            <p className="text-muted-foreground">
              Thank you for completing your interview. Your responses have been securely submitted for review.
            </p>
          </div>
          <Card className="bg-[#1A1A23] border-[#2A2A33] p-6 text-left space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Questions Answered</span>
              <span className="font-medium text-white">{mockQuestions.length}/{mockQuestions.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Session Duration</span>
              <span className="font-medium text-white">~{sessionDuration} minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Final Risk Score</span>
              <span className={cn(
                "font-medium",
                riskScore < 30 && "text-emerald-500",
                riskScore >= 30 && riskScore < 60 && "text-amber-500",
                riskScore >= 60 && "text-orange-500"
              )}>{riskScore}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Warnings Received</span>
              <span className="font-medium text-white">{riskWarnings.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Security Events</span>
              <span className="font-medium text-white">{securityEvents.length}</span>
            </div>
          </Card>
          <p className="text-sm text-muted-foreground">
            You will receive an email notification once your interview has been reviewed. This typically takes 2-3 business days.
          </p>
          <Button 
            variant="outline" 
            className="border-[#2A2A33] text-muted-foreground hover:text-white"
            onClick={() => window.close()}
          >
            Close Window
          </Button>
        </div>
      </div>
    );
  }

  // Terminated Screen
  if (currentStep === 'terminated') {
    return (
      <div className="min-h-screen bg-[#0D0D15] flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <XCircle className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">Interview Terminated</h1>
            <p className="text-muted-foreground">
              Your interview has been terminated due to a critical policy violation.
            </p>
          </div>
          <Card className="bg-red-500/10 border-red-500/30 p-6 text-left space-y-4">
            <p className="text-sm text-red-400 font-medium">
              Multiple unauthorized activities were detected during your session:
            </p>
            <div className="space-y-2 text-sm">
              {focusLossCount > 0 && (
                <div className="flex items-center gap-2 text-red-400">
                  <XCircle className="w-4 h-4" />
                  <span>{focusLossCount} focus loss event(s)</span>
                </div>
              )}
              {clipboardAttempts > 0 && (
                <div className="flex items-center gap-2 text-red-400">
                  <XCircle className="w-4 h-4" />
                  <span>{clipboardAttempts} clipboard access attempt(s)</span>
                </div>
              )}
              {blockedShortcuts > 0 && (
                <div className="flex items-center gap-2 text-red-400">
                  <XCircle className="w-4 h-4" />
                  <span>{blockedShortcuts} blocked shortcut(s)</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Final risk score: {riskScore}%</span>
              </div>
            </div>
          </Card>
          <Card className="bg-[#1A1A23] border-[#2A2A33] p-4">
            <p className="text-sm text-muted-foreground">
              This incident has been logged and reported. If you believe this was an error, please contact support.
            </p>
          </Card>
          <p className="text-sm text-muted-foreground">
            If you believe this was an error, please contact support@nexus.ai
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default SecureInterviewClient;
