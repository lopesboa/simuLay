"use client";

import type { LucideIcon } from "lucide-react";

import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarGroupLabel,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavApps({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
	}[];
}) {
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>APPS</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton tooltip={item.title}>
							{item.icon && <item.icon />}
							<Link href={item.url} title={item.title} prefetch>
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>

			{/* <SidebarMenu> */}
			{/* 	{items.map((item) => ( */}
			{/* 		<SidebarMenuItem key={item.name}> */}
			{/* 			<SidebarMenuButton asChild> */}
			{/* 				<a href={item.url}> */}
			{/* 					<item.icon /> */}
			{/* 					<span>{item.name}</span> */}
			{/* 				</a> */}
			{/* 			</SidebarMenuButton> */}
			{/* 		</SidebarMenuItem> */}
			{/* 	))} */}
			{/* </SidebarMenu> */}
		</SidebarGroup>
	);
}
