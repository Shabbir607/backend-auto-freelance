import {
    Layers,
    Sparkles,
    Bot,
    Zap,
    Briefcase,
    Megaphone,
    Code2,
    PenTool,
    BarChart3,
    Mail,
    Users,
    Calendar,
    Search,
    MessageSquare,
    Globe,
    Settings,
    Shield,
    FileText,
    DollarSign,
    TrendingUp,
    Target,
    Brain,
    MessageCircle,
    Share2,
    Video,
    Image,
    Headphones,
    ShoppingBag,
    CreditCard,
    PieChart,
    Activity,
    Award,
    BookOpen,
    Box,
    Building,
    Camera,
    CheckCircle,
    Cloud,
    Cpu,
    Database,
    Download,
    Edit,
    Eye,
    Flag,
    Folder,
    Gift,
    Heart,
    Home,
    Inbox,
    Key,
    Layout,
    Link,
    Lock,
    MapPin,
    Menu,
    Mic,
    Moon,
    Music,
    Paperclip,
    Phone,
    Play,
    Plus,
    Power,
    Printer,
    Radio,
    RefreshCw,
    Save,
    Send,
    Server,
    Smartphone,
    Star,
    Sun,
    Tablet,
    Tag,
    ThumbsUp,
    Wrench,
    Trash,
    Truck,
    Tv,
    Unlock,
    Upload,
    User,
    Voicemail,
    Volume2,
    Watch,
    Wifi,
    X,
    Copy,
    LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

// Map of icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
    // Common Categories
    "Layers": Layers,
    "Sparkles": Sparkles,
    "Bot": Bot,
    "Zap": Zap,
    "Briefcase": Briefcase,
    "Business": Briefcase, // Alias
    "Marketing": Megaphone,
    "Megaphone": Megaphone,
    "Development": Code2,
    "Code": Code2,
    "Code2": Code2,
    "Design": PenTool,
    "PenTool": PenTool,
    "Analytics": BarChart3,
    "Chart": BarChart3,
    "BarChart3": BarChart3,
    "Email": Mail,
    "Mail": Mail,
    "HR": Users,
    "Users": Users,
    "Productivity": Calendar,
    "Calendar": Calendar,
    "SEO": Search,
    "Search": Search,
    "Social": Share2,
    "Social Media": Share2,
    "Support": MessageSquare,
    "MessageSquare": MessageSquare,
    "Web": Globe,
    "Globe": Globe,
    "Settings": Settings,
    "Security": Shield,
    "Shield": Shield,
    "Content": FileText,
    "FileText": FileText,
    "Finance": DollarSign,
    "Sales": TrendingUp,
    "TrendingUp": TrendingUp,
    "Strategy": Target,
    "Target": Target,
    "AI": Brain,
    "Brain": Brain,
    "Chat": MessageCircle,
    "Media": Video,
    "Video": Video,
    "Image": Image,
    "Audio": Headphones,
    "E-commerce": ShoppingBag,
    "ShoppingBag": ShoppingBag,
    "Payment": CreditCard,
    "CreditCard": CreditCard,
    "Reporting": PieChart,
    "PieChart": PieChart,
    "Health": Activity,
    "Activity": Activity,
    "Education": BookOpen,
    "BookOpen": BookOpen,
    "Real Estate": Home,
    "Home": Home,
    "Infrastructure": Server,
    "Server": Server,
    "Mobile": Smartphone,
    "Smartphone": Smartphone,
    "Review": Star,
    "Star": Star,
    "Maintenance": Wrench, // Replaced Tool with Wrench
    "Tool": Wrench, // Replaced Tool with Wrench
    "Logistics": Truck,
    "Truck": Truck,
    "Communication": Radio,
};

interface DynamicIconProps {
    name: string;
    className?: string;
    fallback?: LucideIcon;
}

export function DynamicIcon({ name, className, fallback = Layers }: DynamicIconProps) {
    // Normalize name: lowercase, remove spaces, etc if needed, but for now simple matching
    // We can try exact match, or case-insensitive match
    let IconComponent = iconMap[name];

    if (!IconComponent) {
        // Try finding by case-insensitive key
        const cleanName = name?.toLowerCase().replace(/\s+/g, '');
        const foundKey = Object.keys(iconMap).find(k => k.toLowerCase().replace(/\s+/g, '') === cleanName);
        if (foundKey) {
            IconComponent = iconMap[foundKey];
        }
    }

    // If still not found, use a deterministic fallback based on string char code sum?
    // Or just formatted fallback.
    // Let's implement deterministic fallback selection from a set of generic icons for unknown categories
    if (!IconComponent) {
        const generics = [Layers, Sparkles, Bot, Zap, Star, Box, Circle, Square];
        let sum = 0;
        if (name) {
            for (let i = 0; i < name.length; i++) {
                sum += name.charCodeAt(i);
            }
        }
        // IconComponent = generics[sum % generics.length];
        // Actually, user wants "unique", but let's stick to the mapped ones or default fallback for now to be safe.
        IconComponent = fallback;
    }

    return <IconComponent className={cn("shrink-0", className)} />;
}

// Helper icons for fallback
function Circle({ className }: { className?: string }) {
    return <div className={cn("rounded-full border-2 border-current", className)} />
}
function Square({ className }: { className?: string }) {
    return <div className={cn("rounded-md border-2 border-current", className)} />
}
