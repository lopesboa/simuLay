"use client";

import type * as React from "react";
import {
	BarChartIcon,
	CameraIcon,
	ClipboardListIcon,
	DatabaseIcon,
	FileCodeIcon,
	FileIcon,
	FileTextIcon,
	FolderIcon,
	HelpCircleIcon,
	LayoutDashboardIcon,
	ListIcon,
	SearchIcon,
	SettingsIcon,
	UsersIcon,
	AudioWaveform,
	Command,
	GalleryVerticalEnd,
	Home as HomeIcon,
	FileText,
	Zap,
	Contact,
	Link as LinkIcon,
	Image as ImageIcon,
	HelpCircle,
	MessageSquare,
	Settings,
	Bot,
} from "lucide-react";

import { NavExplore } from "./nav-explore";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "@/components/ui/sidebar";
// import { TeamSwitcher } from "./team-switcher";
import { NavApps } from "./nav-apps";
import Link from "next/link";
// import { Logo } from "@/components/Logo";

const data = {
	user: {
		name: "Lopes Boa",
		email: "lopesoba@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navApps: [
		{
			title: "Dashboard",
			url: "/overview",
			icon: LayoutDashboardIcon,
		},
		{
			title: "Documentos",
			url: "/documents",
			icon: FileText,
		},
		{
			title: "Automacoes",
			url: "/automations",
			icon: Zap,
		},
		{
			title: "Contatos",
			url: "/contacts",
			icon: Contact,
		},
		{
			title: "Team",
			url: "/teams",
			icon: UsersIcon,
		},
	],
	navSecondary: [
		{
			title: "Help",
			url: "#",
			icon: HelpCircleIcon,
		},
		{
			title: "Feedback",
			url: "#",
			icon: MessageSquare,
		},
		// {
		// 	title: "Settings",
		// 	url: "/settings",
		// 	icon: SettingsIcon,
		// },
	],
	explore: [
		{
			name: "Integracoes",
			url: "/integrations",
			icon: LinkIcon,
		},
		{
			name: "Galeria",
			url: "#",
			icon: ImageIcon,
		},
		{
			//TODO: Favorites should be a dropdown menu with a list of favorites
			//this list should not shouw more than 5 items.
			name: "Favoritos",
			url: "#",
			icon: FileIcon,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar
			collapsible="offcanvas"
			// collapsible="icon"
			{...props}
		>
			<SidebarHeader>
				<nav>
					<Link href="/" className="flex items-center gap-2">
						<MessageSquare className="h-6 w-6 text-primary" />
						{/* <h2 className="text-primary-100">SimuLay</h2> */}
						<span className="text-xl font-bold">Simulay</span>
					</Link>
				</nav>
			</SidebarHeader>
			{/* <TeamSwitcher teams={data.teams} /> */}
			<SidebarContent>
				<NavMain />
				{/* <NavApps items={data.navApps} /> */}
				{/* <NavExplore items={data.explore} /> */}
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
