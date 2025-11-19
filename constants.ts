import { 
  Bot, 
  Megaphone, 
  Workflow, 
  BarChart3, 
  PenTool, 
  Share2 
} from 'lucide-react';
import { Service, Testimonial, WorkItem, PricingPlan } from './types';

export const NAV_LINKS = [
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'Why AI?', href: '#why-ai' },
  { name: 'Contact', href: '#contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'ads',
    title: 'AI-Generated Ads',
    description: 'High-converting video and photo ads featuring realistic AI spokespersons.',
    icon: Megaphone,
  },
  {
    id: 'chatbots',
    title: 'Smart Chatbots',
    description: '24/7 sales and support agents trained on your business data to close leads.',
    icon: Bot,
  },
  {
    id: 'automation',
    title: 'n8n Workflows',
    description: 'Custom business automation that connects your apps and eliminates busy work.',
    icon: Workflow,
  },
  {
    id: 'campaigns',
    title: 'Full Marketing Systems',
    description: 'Done-for-you marketing ecosystems from lead gen to conversion.',
    icon: BarChart3,
  },
  {
    id: 'content',
    title: 'AI Content Creation',
    description: 'Automated generation of carousels, posts, scripts, and personalized emails.',
    icon: PenTool,
  },
  {
    id: 'social',
    title: 'Social Automation',
    description: 'Auto-posting, engagement, and growth strategies powered by AI.',
    icon: Share2,
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$2,500/mo',
    features: [
      'Basic AI Chatbot',
      '2 Automation Workflows',
      'Social Media Content (12 posts/mo)',
      'Email Support',
      'Monthly Strategy Call'
    ],
    highlight: false,
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '$5,000/mo',
    features: [
      'Advanced AI Sales Agent',
      '5 Custom Automations',
      'AI Video Ads (4 videos/mo)',
      'Social Media Management (Daily)',
      'Weekly Strategy Calls',
      'CRM Integration'
    ],
    highlight: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Full AI Ecosystem Buildout',
      'Unlimited Automation Workflows',
      'Custom LLM Fine-tuning',
      'Dedicated Account Manager',
      '24/7 Priority Support',
      'White-label Options'
    ],
    highlight: false,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'CMO',
    company: 'TechFlow',
    content: 'Scale Plus AI completely revolutionized our lead intake. The chatbot alone increased conversions by 40%.',
    avatarUrl: 'https://picsum.photos/100/100?random=1',
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Founder',
    company: 'GrowthX',
    content: 'The n8n workflows they built saved my team 20 hours a week. Professional, fast, and incredibly technical.',
    avatarUrl: 'https://picsum.photos/100/100?random=2',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Director',
    company: 'Nova Retail',
    content: 'Their AI video ads look better than what we used to pay production studios $10k for. Highly recommend.',
    avatarUrl: 'https://picsum.photos/100/100?random=3',
  },
];

export const PORTFOLIO_ITEMS: WorkItem[] = [
  {
    id: '1',
    title: 'Nike Shoes Project',
    category: 'AI Commercial',
    embedSrc: 'https://streamable.com/e/pw6qx0?autoplay=1', 
    tags: ['Generative Video', 'AI Voiceover', 'Motion Tracking']
  },
  {
    id: '2',
    title: 'Falcon Protein Bar',
    category: 'Product Visualization',
    embedSrc: 'https://streamable.com/e/15s7lp?autoplay=0',
    tags: ['3D Rendering', 'AI Scripting', 'Dynamic Lighting']
  }
];