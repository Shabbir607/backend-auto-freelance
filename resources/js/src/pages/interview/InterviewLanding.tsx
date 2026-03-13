import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Shield, 
  Download, 
  Globe, 
  CheckCircle, 
  AlertTriangle,
  Monitor,
  Lock,
  Eye,
  Mic,
  Camera,
  ChevronRight,
  Apple,
  Laptop,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function InterviewLanding() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [isAppDetected, setIsAppDetected] = useState(false);
  const [isCheckingApp, setIsCheckingApp] = useState(true);

  useEffect(() => {
    // Simulate checking for desktop app
    const checkForApp = async () => {
      setIsCheckingApp(true);
      // Try to launch custom protocol
      try {
        // In real implementation, this would try to open nexusai-interview://
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsAppDetected(false); // Simulating app not found
      } catch {
        setIsAppDetected(false);
      }
      setIsCheckingApp(false);
    };
    checkForApp();
  }, []);

  const handleDownloadApp = (platform: 'windows' | 'mac' | 'linux') => {
    // In real implementation, this would trigger download
    console.log(`Downloading for ${platform}`);
  };

  const handleContinueInBrowser = () => {
    navigate(`/interview${token ? `/${token}` : ''}`);
  };

  const securityFeatures = [
    { icon: Camera, label: 'Webcam Monitoring', description: 'AI-powered face detection and gaze tracking' },
    { icon: Mic, label: 'Audio Analysis', description: 'Voice pattern and background noise detection' },
    { icon: Monitor, label: 'Screen Recording', description: 'Full screen capture and activity monitoring' },
    { icon: Eye, label: 'Behavior Analysis', description: 'Real-time anomaly and cheating detection' },
    { icon: Lock, label: 'Environment Lock', description: 'Prevents app switching and unauthorized access' },
  ];

  const appBenefits = [
    'Full OS-level security lockdown',
    'Blocks Alt+Tab, screenshots, and task manager',
    'Detects virtual machines and remote desktop',
    'Multi-monitor detection and enforcement',
    'Lower baseline risk score',
  ];

  const webLimitations = [
    'Limited security enforcement',
    'Cannot block OS shortcuts',
    'No VM/RDP detection',
    'Higher baseline risk score',
    'Relies on browser permissions',
  ];

  if (isCheckingApp) {
    return (
      <div className="min-h-screen bg-[#0D0D15] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center animate-pulse">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">EdgeLancer Interview</h1>
            <p className="text-muted-foreground">Checking for desktop application...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D15] p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">EdgeLancer Secure Interview</h1>
            <p className="text-muted-foreground mt-2">Choose how you'd like to proceed with your interview</p>
          </div>
        </div>

        {/* Security Features */}
        <Card className="p-6 bg-[#1A1A23] border-[#2A2A33]">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Interview Monitoring Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {securityFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.label} className="p-4 rounded-lg bg-background border border-border">
                  <Icon className="w-6 h-6 text-primary mb-2" />
                  <p className="font-medium text-white text-sm">{feature.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Desktop App Option */}
          <Card className="p-6 bg-[#1A1A23] border-[#2A2A33] relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
                Recommended
              </Badge>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Desktop Application</h3>
                  <p className="text-sm text-muted-foreground">Maximum security & best experience</p>
                </div>
              </div>

              <div className="space-y-3">
                {appBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Download for your platform:</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    className="border-[#2A2A33] hover:border-primary/50 flex-col h-auto py-3"
                    onClick={() => handleDownloadApp('windows')}
                  >
                    <Laptop className="w-5 h-5 mb-1" />
                    <span className="text-xs">Windows</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-[#2A2A33] hover:border-primary/50 flex-col h-auto py-3"
                    onClick={() => handleDownloadApp('mac')}
                  >
                    <Apple className="w-5 h-5 mb-1" />
                    <span className="text-xs">macOS</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-[#2A2A33] hover:border-primary/50 flex-col h-auto py-3"
                    onClick={() => handleDownloadApp('linux')}
                  >
                    <Monitor className="w-5 h-5 mb-1" />
                    <span className="text-xs">Linux</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Web Fallback Option */}
          <Card className="p-6 bg-[#1A1A23] border-[#2A2A33]">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <Globe className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Web Browser</h3>
                  <p className="text-sm text-muted-foreground">Continue without installing</p>
                </div>
              </div>

              <Card className="p-4 bg-amber-500/10 border-amber-500/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-500 text-sm">Reduced Security</p>
                    <p className="text-xs text-amber-400/80 mt-1">
                      Web-based interviews have limited security enforcement and will receive a higher baseline risk score.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="space-y-3">
                {webLimitations.map((limitation, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{limitation}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant="outline"
                className="w-full border-[#2A2A33] hover:border-primary/50"
                onClick={handleContinueInBrowser}
              >
                Continue in Browser
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Requirements */}
        <Card className="p-6 bg-[#1A1A23] border-[#2A2A33]">
          <h2 className="text-lg font-semibold text-white mb-4">System Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Internet</p>
              <p className="text-white">Minimum 5 Mbps stable connection</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Browser</p>
              <p className="text-white">Chrome 90+ or Firefox 90+</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Hardware</p>
              <p className="text-white">Webcam & microphone required</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Display</p>
              <p className="text-white">Single monitor only</p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>By proceeding, you agree to our interview monitoring and anti-cheating policies.</p>
          <p className="mt-1">Need help? Contact <a href="mailto:support@nexus.ai" className="text-primary hover:underline">support@nexus.ai</a></p>
        </div>
      </div>
    </div>
  );
}

export default InterviewLanding;
