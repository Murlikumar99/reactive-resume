import type { Layout } from "react-resizable-panels";
import type { BuilderLayout } from "../-store/sidebar";
import { Trans } from "@lingui/react/macro";
import { Outlet } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { usePanelRef } from "react-resizable-panels";
import { ResizableGroup, ResizablePanel, ResizableSeparator } from "@reactive-resume/ui/components/resizable";
import { BuilderSidebarLeft } from "../-sidebar/left";
import { BuilderSidebarRight } from "../-sidebar/right";
import { mapPanelLayoutToBuilderLayout, setBuilderLayout, useBuilderSidebar, useBuilderSidebarStore } from "../-store/sidebar";
import { BuilderHeader } from "./header";

export type BuilderLayoutShellProps = { initialLayout: BuilderLayout };

export function DesktopBuilderShell({ initialLayout }: BuilderLayoutShellProps) {
	const canPersistLayoutRef = useRef(false);
	const leftSidebarRef = usePanelRef();
	const rightSidebarRef = usePanelRef();
	const setLeftSidebar = useBuilderSidebarStore((state) => state.setLeftSidebar);
	const setRightSidebar = useBuilderSidebarStore((state) => state.setRightSidebar);
	const setLayout = useBuilderSidebarStore((state) => state.setLayout);
	const { maxSidebarSize, minSidebarSize, collapsedSidebarSize, groupResizeBehavior } = useBuilderSidebar();

	useEffect(() => { setLayout(initialLayout); canPersistLayoutRef.current = true; }, [initialLayout, setLayout]);
	const onLayoutChanged = (layout: Layout) => {
		const nextLayout = mapPanelLayoutToBuilderLayout(layout);
		if (!canPersistLayoutRef.current) return;
		setLayout(nextLayout); setBuilderLayout(nextLayout);
	};
	useEffect(() => {
		if (!leftSidebarRef || !rightSidebarRef) return;
		setLeftSidebar(leftSidebarRef); setRightSidebar(rightSidebarRef);
	}, [leftSidebarRef, rightSidebarRef, setLeftSidebar, setRightSidebar]);

	return (
		<div className="flex h-svh flex-col bg-background">
			<a href="#main-content" className="sr-only rounded-md bg-popover px-4 py-2 text-sm ring-2 ring-ring focus:not-sr-only focus:absolute focus:inset-s-2 focus:top-2 focus:z-[100]"><Trans>Skip to main content</Trans></a>
			<BuilderHeader />
			<ResizableGroup orientation="horizontal" className="mt-14 flex-1" onLayoutChanged={onLayoutChanged}>
				<ResizablePanel collapsible id="left" panelRef={leftSidebarRef} groupResizeBehavior={groupResizeBehavior} maxSize={`${maxSidebarSize}px`} minSize={`${minSidebarSize}px`} collapsedSize={`${collapsedSidebarSize}px`} defaultSize={`${initialLayout.left}%`} className="z-20 h-[calc(100svh-3.5rem)] bg-sidebar">
					<BuilderSidebarLeft />
				</ResizablePanel>
				<ResizableSeparator withHandle className="z-50 border-s" />
				<ResizablePanel id="artboard" defaultSize={`${initialLayout.artboard}%`} className="h-[calc(100svh-3.5rem)] bg-background">
					<main id="main-content" className="h-full"><Outlet /></main>
				</ResizablePanel>
				<ResizableSeparator withHandle className="z-50 border-e" />
				<ResizablePanel collapsible id="right" panelRef={rightSidebarRef} groupResizeBehavior={groupResizeBehavior} maxSize={`${maxSidebarSize}px`} minSize={`${minSidebarSize}px`} collapsedSize={`${collapsedSidebarSize}px`} defaultSize={`${initialLayout.right}%`} className="z-20 h-[calc(100svh-3.5rem)] bg-sidebar">
					<BuilderSidebarRight />
				</ResizablePanel>
			</ResizableGroup>
		</div>
	);
}
