import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string;
}

export interface WorkItem {
  id: string;
  title: string;
  category: string;
  imageUrl?: string; // Made optional
  embedSrc?: string; // Added for video embeds
  tags?: string[]; // Added for tech stack display
}