import type { Icon } from "@phosphor-icons/react";
import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { ArrowUpRightIcon, DiscordLogoIcon, GithubLogoIcon, LinkedinLogoIcon, RedditLogoIcon, XLogoIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { m } from "motion/react";
import { cn } from "@reactive-resume/utils/style";
import { wrap } from "./classes";

const githubUrl = "https://github.com/Murlikumar99/reactive-resume";
const licenseUrl = `${githubUrl}/blob/main/LICENSE`;

type FooterLink = { label: string } & ({ external: string } | { anchor: string } | { to: "/dashboard" | "/ats-checker" });
type FooterColumn = { title: string; links: FooterLink[] };
type SocialLink = { url: string; label: string; icon: Icon };

const getColumns = (): FooterColumn[] => [
	{ title: t`Product`, links: [{ anchor: "#templates", label: t`Templates` }, { anchor: "#features", label: t`Features` }, { to: "/ats-checker", label: t`ATS Checker` }, { to: "/dashboard", label: t`Get Started` }] },
	{ title: t`Resources`, links: [{ external: githubUrl, label: t`Source Code` }, { external: `${githubUrl}/issues`, label: t`Issues` }, { external: "https://github.com/Murlikumar99/reactive-resume/forks", label: t`Fork the project` }, { external: licenseUrl, label: t`MIT License` }] },
	{ title: t`Community`, links: [{ external: "https://discord.gg/aSyA5ZSxpb", label: t`Discord` }, { external: "https://reddit.com/r/reactiveresume", label: t`Community` }, { external: "https://crowdin.com/project/reactive-resume", label: t`Translations` }, { external: `${githubUrl}/discussions`, label: t`Discussions` }] },
	{ title: t`Legal`, links: [{ external: licenseUrl, label: t`MIT License` }, { external: "https://docs.rxresu.me/legal/privacy-policy", label: t`Privacy Policy` }] },
];

const getSocialLinks = (): SocialLink[] => [
	{ url: githubUrl, label: t`GitHub`, icon: GithubLogoIcon },
	{ url: "https://x.com/KingOKings", label: t`X (Twitter)`, icon: XLogoIcon },
	{ url: "https://linkedin.com/in/amruthpillai", label: t`LinkedIn`, icon: LinkedinLogoIcon },
	{ url: "https://discord.gg/aSyA5ZSxpb", label: t`Discord`, icon: DiscordLogoIcon },
	{ url: "https://reddit.com/r/reactiveresume", label: t`Community`, icon: RedditLogoIcon },
];

const linkClass = "group/link inline-flex min-h-9 items-center gap-1 text-muted-foreground text-sm transition-colors hover:text-foreground";
const arrowClass = "opacity-0 transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-70";
const socialClass = "inline-grid size-10 place-items-center rounded-xl border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-accent hover:text-foreground";
const metaLinkClass = "text-foreground underline-offset-[3px] hover:underline";

function FooterColumnLink({ link }: { link: FooterLink }) {
	if ("external" in link) return <a href={link.external} target="_blank" rel="noopener noreferrer" className={linkClass}>{link.label}<span className="sr-only"><Trans>(opens in new tab)</Trans></span><ArrowUpRightIcon size={13} aria-hidden="true" className={arrowClass} /></a>;
	if ("anchor" in link) return <a href={link.anchor} className={linkClass}>{link.label}</a>;
	return <Link to={link.to} className={linkClass}>{link.label}</Link>;
}

export function SiteFooter() {
	return (
		<footer id="footer" className="relative isolate overflow-clip border-border border-t bg-background">
			<div className="pointer-events-none absolute inset-x-0 bottom-0 -z-1 h-[65%] bg-[radial-gradient(60%_90%_at_50%_100%,rgba(99,102,241,0.08),transparent_72%)]" aria-hidden="true" />
			<div className={cn(wrap, "grid grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))] gap-x-8 gap-y-12 pt-20 max-[1100px]:grid-cols-3 max-[700px]:grid-cols-2 max-[540px]:pt-14")}>
				<div className="max-[1100px]:col-span-full">
					<Link to="/" className="inline-flex items-center gap-2.5 font-semibold text-lg tracking-[-0.04em]"><span className="resumeforge-mark" aria-hidden="true">R</span><span>ResumeForge</span></Link>
					<p className="mt-4 max-w-[320px] text-muted-foreground text-sm leading-7"><Trans>A free, open-source resume builder for people who want a better way to tell their story.</Trans></p>
					<ul className="mt-6 flex flex-wrap gap-1">{getSocialLinks().map((social) => <li key={social.label}><a href={social.url} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label={`${social.label} (${t`opens in new tab`})`}><social.icon aria-hidden="true" size={18} weight="fill" /></a></li>)}</ul>
				</div>
				{getColumns().map((column) => <nav key={column.title} aria-label={column.title}><h2 className="font-semibold text-sm tracking-tight">{column.title}</h2><ul className="mt-4 space-y-0.5">{column.links.map((link) => <li key={link.label}><FooterColumnLink link={link} /></li>)}</ul></nav>)}
			</div>
			<div className={cn(wrap, "mt-16 flex items-center justify-between gap-x-8 gap-y-3 border-border border-t pt-6 text-muted-foreground text-xs max-[700px]:mt-12 max-[700px]:flex-col max-[700px]:items-start")}>
				<p><Trans>ResumeForge is a rebrand and independent derivative built from the original open-source project.</Trans><br /><Trans>The original project and its attribution remain under the <a href={licenseUrl} target="_blank" rel="noopener noreferrer" className={metaLinkClass}>MIT License</a>.</Trans></p>
				<p><Trans>Original project by <a href="https://amruthpillai.com" target="_blank" rel="noopener noreferrer" className={metaLinkClass}>Amruth Pillai</a></Trans><span aria-hidden="true" className="px-2 text-border">/</span><bdi className="tabular-nums">v{__APP_VERSION__}</bdi></p>
			</div>
			<div className={cn(wrap, "@container mt-10 max-[540px]:mt-7")}><m.p aria-hidden="true" className="select-none bg-gradient-to-b from-foreground/70 to-foreground/5 bg-clip-text font-[Manrope_Variable,sans-serif] font-bold text-[14cqw] text-transparent leading-[0.78] tracking-[-0.07em]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}>ResumeForge</m.p></div>
		</footer>
	);
}
