import {
  Activity, BarChart3, Bot, Boxes, Briefcase, Building2, Cable, Cloud, Code2, Compass, Cpu, Database, Factory,
  GitBranch, GraduationCap, HeartPulse, Layers, LayoutDashboard, LifeBuoy, Lightbulb, Link2, Network, Package,
  PencilRuler, Rocket, ScanLine, Search, ShieldCheck, ShoppingBag, ShoppingCart, Smartphone, Sparkles, Sprout,
  Store, TestTube2, Truck, Users, UtensilsCrossed, Workflow, Wrench, Globe, Server, TrendingUp, Gauge, Puzzle,
  RefreshCw, Target, Handshake, type LucideIcon,
} from "lucide-react";

/**
 * Content files reference icons by name (plain strings) so the data stays
 * serialisable and can later come from a CMS / admin API.
 */
export const icons = {
  activity: Activity, chart: BarChart3, bot: Bot, boxes: Boxes, briefcase: Briefcase, building: Building2,
  cable: Cable, cloud: Cloud, code: Code2, compass: Compass, cpu: Cpu, database: Database, factory: Factory,
  git: GitBranch, education: GraduationCap, health: HeartPulse, layers: Layers, dashboard: LayoutDashboard,
  support: LifeBuoy, idea: Lightbulb, link: Link2, network: Network, package: Package, design: PencilRuler,
  rocket: Rocket, scan: ScanLine, search: Search, shield: ShieldCheck, bag: ShoppingBag, cart: ShoppingCart,
  mobile: Smartphone, sparkles: Sparkles, sprout: Sprout, store: Store, test: TestTube2, truck: Truck,
  users: Users, restaurant: UtensilsCrossed, workflow: Workflow, wrench: Wrench, globe: Globe, server: Server,
  trending: TrendingUp, gauge: Gauge, puzzle: Puzzle, refresh: RefreshCw, target: Target, handshake: Handshake,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function getIcon(name: IconName): LucideIcon {
  return icons[name] ?? Sparkles;
}
