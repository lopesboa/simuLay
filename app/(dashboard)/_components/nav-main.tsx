"use client";

import { MailIcon, PlusCircleIcon } from "lucide-react";
import { redirect } from "next/navigation";

import {
	SidebarMenu,
	SidebarGroup,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function NavMain() {
	const handleOnClick = () => {
		// redirect("/interview");
	};

	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					<SidebarMenuItem className="flex items-center gap-2">
						<SidebarMenuButton
							onClick={handleOnClick}
							tooltip="Quick Create"
							className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
						>
							<PlusCircleIcon />
							<span>Start an interview</span>
						</SidebarMenuButton>
						<Button
							size="icon"
							className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
							variant="outline"
						>
							<MailIcon />
							<span className="sr-only">Caixa de entrada</span>
						</Button>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
