import type { Template } from "@reactive-resume/schema/templates";
import type { ReactNode } from "react";
import type { SculptureTemplate } from "./resume-sculpture";
import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { ArrowDownIcon, ArrowRightIcon, ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useInView } from "motion/react";
import { lazy, Suspense, useRef, useState } from "react";
import { cn } from "@reactive-resume/utils/style";
import { section, sectionHeading, sectionText, sectionTitle, textLink, wrap } from "./classes";
import { CommunityStats } from "./community-stats";
import { FeatureExplorer } from "./feature-explorer";
import LanguagesShowcase from "./languages-showcase";
import { PageBackground } from "./page-background";
import { ResumeSculpture } from "./resume-sculpture";
import { SiteFooter } from "./site-footer";
import { TemplateShelf } from "./template-shelf";
import "./styles.css";

const ExportPlayground = lazy(() => import("./export-playground"));
const AtsPlayground = lazy(() => import("./ats-playground"));
const githubUrl = "https://github.com/Murlikumar99/reactive-resume";
const buttonClass =
	"inline-flex min-h-[52px] items-center justify-center gap-3 rounded-xl border border-primary bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_28px_rgba(139,92,246,0.2)] transition hover:bg-primary/90 active:scale-[0.98] max-[540px]:min-h-12";
const brandClass = "inline-flex shrink-0 items-center gap-2.5 font-semibold tracking-[-0.04em]";
const paperLinkClass =
	"group/link flex min-h-[62px] items-center gap-3 border-t border-slate-200/70 text-sm transition-colors hover:bg-slate-50";
const paperArrowClass = "ml-auto transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5";
const contributeLinkClass = "inline-flex min-h-11 items-center gap-2 text-foreground underline-offset-4 hover:underline";
type DeferredDemoProps = { children: ReactNode };

function DeferredDemo({ children }: DeferredDemoProps) {
	const ref = useRef<HTMLDivElement>(null);
	const visible = useInView(ref, { once: true, margin: "300px" });
	return (
		<div ref={ref} className="min-h-[460px]">
			{visible && (
				<Suspense fallback={<p className="py-[140px] text-center text-muted-foreground">Loading preview…</p>}>
					{children}
				</Suspense>
			)}
		</div>
	);
}

export function Homepage() {
	const [name, setName] = useState("Alex Morgan");
	const [accent, setAccent] = useState("#7c3aed");
	const [typeface, setTypeface] = useState<"sans" | "serif">("sans");
	const [template, setTemplate] = useState<Template>("ditgar");
	const [heroTemplate, setHeroTemplate] = useState<SculptureTemplate>("ditgar");
	return (
		<div className="homepage scheme-dark relative isolate overflow-clip bg-background font-[IBM_Plex_Sans_Variable,IBM_Plex_Sans,sans-serif] text-foreground text-base leading-6 selection:bg-primary/30">
			<PageBackground />
			<a href="#main-content" className="fixed top-3 left-5 z-100 -translate-y-[150%] rounded-lg bg-foreground px-4 py-3 text-background focus:translate-y-0">
				<Trans>Skip to main content</Trans>
			</a>
			<header className={cn(wrap, "relative z-1 flex h-20 items-center justify-between gap-3 md:h-24") }>
				<Link to="/" className={`${brandClass} text-lg`} aria-label="ResumeForge">
					<span className="resumeforge-mark" aria-hidden="true">R</span>
					<span>ResumeForge</span>
				</Link>
				<nav className="ml-auto flex items-center gap-4 text-muted-foreground text-sm" aria-label={t`Main navigation`}>
					<a href="#features" className="hidden min-h-10 items-center px-2 transition-colors hover:text-foreground md:inline-flex"><Trans>Features</Trans></a>
					<a href="#templates" className="hidden min-h-10 items-center px-2 transition-colors hover:text-foreground sm:inline-flex"><Trans>Templates</Trans></a>
					<a href="https://github.com/Murlikumar99/reactive-resume" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border bg-card px-3 text-foreground transition hover:border-primary/50 hover:bg-accent">
						<GithubLogoIcon size={17} aria-hidden="true" />
						<span className="hidden sm:inline"><Trans>Open source</Trans></span>
					</a>
				</nav>
			</header>
			<main id="main-content" className="relative z-1">
				<section className={cn(wrap, "grid min-h-[650px] grid-cols-1 items-center gap-10 pt-8 pb-16 lg:grid-cols-[0.9fr_1.1fr]")} aria-labelledby="hero-title">
					<div className="relative z-1 max-w-xl">
						<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"><span className="size-1.5 rounded-full bg-primary" />Free & open source</div>
						<h1 id="hero-title" className="font-[Manrope_Variable,sans-serif] text-[clamp(3.4rem,7vw,6.8rem)] font-semibold leading-[0.94] tracking-[-0.065em]">
							<Trans>Build a resume<br />that gets <span className="text-primary">noticed.</span></Trans>
						</h1>
						<p className="mt-7 max-w-lg text-lg leading-8 text-muted-foreground">Create a professional, ATS-friendly resume in minutes. Customize every detail and export it beautifully.</p>
						<div className="mt-8 flex flex-wrap items-center gap-3">
							<Link to="/dashboard" className={buttonClass}><Trans>Create My Resume</Trans><ArrowRightIcon size={19} aria-hidden="true" /></Link>
							<a href="#templates" className="inline-flex min-h-[52px] items-center rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-medium transition hover:border-primary/40 hover:bg-accent"><Trans>Explore Templates</Trans></a>
						</div>
						<div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
							<span>✓ ATS-friendly</span><span>✓ PDF export</span><span>✓ Privacy focused</span>
						</div>
					</div>
					<ResumeSculpture template={heroTemplate} onTemplateChange={(next) => { setHeroTemplate(next); setTemplate(next); }} name={name} onNameChange={setName} accent={accent} onAccentChange={setAccent} typeface={typeface} onTypefaceChange={setTypeface} />
				</section>
				<CommunityStats />
				<section className={cn(section, "border-y border-border bg-card/40")} id="templates" aria-labelledby="templates-title">
					<div className={wrap}>
						<div className={sectionHeading}><div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">Templates</p><h2 id="templates-title" className={sectionTitle}><Trans>Pick a look.<br />Keep the focus on you.</Trans></h2></div><p className={sectionText}>Professional templates designed for students, developers, engineers, designers, academics, and professionals. Customize the type, color, and layout.</p></div>
						<TemplateShelf template={template} onChange={setTemplate} />
					</div>
				</section>
				<section className={cn(section, wrap)} id="playground" aria-labelledby="export-title">
					<div className={sectionHeading}><div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">Export</p><h2 id="export-title" className={sectionTitle}><Trans>Ready anywhere.</Trans></h2></div><p className={sectionText}>Export your finished resume in the format you need, with your layout preserved.</p></div>
					<DeferredDemo><ExportPlayground name={name} accent={accent} typeface={typeface} template={template} /></DeferredDemo>
				</section>
				<section className={cn(section, "border-y border-border bg-card/40")} aria-labelledby="ats-title">
					<div className={wrap}><div className={sectionHeading}><div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">ATS checker</p><h2 id="ats-title" className={sectionTitle}><Trans>Know how software sees your resume.</Trans></h2></div><p className={sectionText}>Check structure, readability, keywords, and job-description alignment before you apply.</p></div><DeferredDemo><AtsPlayground /></DeferredDemo></div>
				</section>
				<section className={cn(section, wrap)} id="features" aria-labelledby="features-title">
					<div className={sectionHeading}><div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">Built for the job search</p><h2 id="features-title" className={sectionTitle}><Trans>Everything you need.<br />Nothing in the way.</Trans></h2></div><p className={sectionText}>Live editing, template controls, AI assistance, sharing, applications, and more in one focused workspace.</p></div>
					<FeatureExplorer />
				</section>
				<LanguagesShowcase />
				<section className={cn(wrap, "grid grid-cols-1 items-center gap-10 border-t border-border py-24 lg:grid-cols-[1.1fr_1fr]")} id="support" aria-labelledby="open-title">
					<div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">Open source</p><h2 id="open-title" className={sectionTitle}><Trans>Your resume stays yours.</Trans></h2><p className="mt-6 max-w-xl text-muted-foreground text-lg leading-8">ResumeForge is a free and open-source project. Keep your data under your control, inspect the code, self-host it, and contribute improvements.</p><a href={githubUrl} target="_blank" rel="noopener noreferrer" className={cn(textLink, "mt-6")}><GithubLogoIcon size={21} aria-hidden="true" /><Trans>View the source on GitHub</Trans><ArrowUpRightIcon size={16} aria-hidden="true" /></a></div>
					<div className="rounded-2xl border border-border bg-card p-7 shadow-2xl shadow-black/10"><div className="flex items-center gap-3"><span className="resumeforge-mark" aria-hidden="true">R</span><div><p className="font-semibold">Privacy by design</p><p className="text-sm text-muted-foreground">Open-source, portable, and built to keep you in control.</p></div></div><div className="mt-7 space-y-3 text-sm"><div className="flex justify-between rounded-xl border border-border px-4 py-3"><span>No tracking by default</span><span className="text-primary">✓</span></div><div className="flex justify-between rounded-xl border border-border px-4 py-3"><span>Export your data anytime</span><span className="text-primary">✓</span></div><div className="flex justify-between rounded-xl border border-border px-4 py-3"><span>MIT licensed</span><span className="text-primary">✓</span></div></div></div>
				</section>
				<div className={cn(wrap, "flex items-center justify-between gap-6 border-y border-border py-12 max-[540px]:flex-col max-[540px]:items-start")}>
					<p className="font-[Manrope_Variable,sans-serif] text-3xl font-semibold tracking-[-0.04em]"><Trans>Make your next application count.</Trans></p><Link to="/dashboard" className={buttonClass}><Trans>Create My Resume</Trans><ArrowRightIcon size={20} aria-hidden="true" /></Link>
				</div>
			</main>
			<SiteFooter />
		</div>
	);
}
