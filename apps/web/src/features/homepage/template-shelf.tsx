import type { Template } from "@reactive-resume/schema/templates";
import type { CSSProperties } from "react";
import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { templateSchema } from "@reactive-resume/schema/templates";
import { textLink } from "./classes";

type TemplateShelfProps = { template: Template; onChange: (template: Template) => void };
const templates = templateSchema.options;
const displayName = (name: string) => name[0].toUpperCase() + name.slice(1);
const roundLinkClass = "inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground transition hover:border-primary/50 hover:bg-accent active:scale-[0.97]";

export function TemplateShelf({ template, onChange }: TemplateShelfProps) {
	const index = templates.indexOf(template);
	const [instant, setInstant] = useState(false);
	const select = (next: Template, keyboard: boolean) => { setInstant(keyboard); onChange(next); };
	return (
		<div className="group/shelf [--home-paper-step:230px] [--home-paper-width:284px] max-[1100px]:[--home-paper-step:190px] max-[540px]:[--home-paper-step:140px] max-[540px]:[--home-paper-width:218px] max-[900px]:[--home-paper-step:178px] max-[900px]:[--home-paper-width:250px]" data-instant={instant}>
			<fieldset className="perspective-[1200px] relative isolate h-[465px] max-[540px]:h-[360px] max-[900px]:h-[420px]" aria-label={t`Resume templates`}>
				{templates.map((item, itemIndex) => {
					const offset = ((itemIndex - index + templates.length + 7) % templates.length) - 7;
					return <button key={item} type="button" className="transform-[translateX(calc(var(--position)_*_var(--home-paper-step)))_translateY(calc(var(--distance)_*_15px))_translateZ(calc(var(--distance)_*_-80px))_rotateY(calc(var(--position)_*_-12deg))_rotateZ(calc(var(--position)_*_2deg))] absolute top-5 left-[calc(50%_-_var(--home-paper-width)_/_2)] z-[calc(10_-_var(--distance))] aspect-[510/720] w-(--home-paper-width) overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_25px_40px_rgba(0,0,0,0.25)] brightness-[calc(1_-_var(--distance)_*_0.18)] [transition:transform_550ms_cubic-bezier(0.23,1,0.32,1),filter_350ms_ease,opacity_220ms_ease] not-aria-pressed:hover:brightness-95 aria-hidden:invisible aria-hidden:opacity-0 group-data-[instant=true]/shelf:transition-none" aria-label={t`Choose ${displayName(item)}`} aria-pressed={item === template} aria-hidden={Math.abs(offset) > 2} tabIndex={Math.abs(offset) > 2 ? -1 : 0} disabled={Math.abs(offset) > 2} style={{ "--position": offset, "--distance": Math.abs(offset) } as CSSProperties} onClick={(event) => select(item, event.detail === 0)}><img src={`/templates/jpg/${item}.jpg`} alt="" width="510" height="720" loading="lazy" decoding="async" draggable={false} className="pointer-events-none block size-full" /></button>;
				})}
			</fieldset>
			<div className="flex items-center justify-center gap-5"><button type="button" className={roundLinkClass} aria-label={t`Previous template`} onClick={(event) => select(templates[(index - 1 + templates.length) % templates.length], event.detail === 0)}><ArrowLeftIcon size={20} /></button><div className="grid w-[110px] justify-items-center gap-1" aria-live="polite"><strong className="font-semibold text-xl">{displayName(template)}</strong><span className="text-muted-foreground text-xs tabular-nums">{index + 1} / {templates.length}</span></div><button type="button" className={roundLinkClass} aria-label={t`Next template`} onClick={(event) => select(templates[(index + 1) % templates.length], event.detail === 0)}><ArrowRightIcon size={20} /></button></div>
			<fieldset className="mx-auto mt-8 flex max-w-[860px] flex-wrap justify-center gap-1" aria-label={t`Choose a template`}>
				{templates.map((item) => <button type="button" key={item} className="min-h-10 rounded-lg bg-transparent px-3 py-2 text-muted-foreground text-xs transition hover:bg-accent hover:text-foreground aria-pressed:bg-primary/15 aria-pressed:text-primary" aria-pressed={item === template} onClick={(event) => select(item, event.detail === 0)}>{displayName(item)}</button>)}
			</fieldset>
			<div className="mt-7 flex items-center justify-end gap-5 border-border border-t pt-6"><a href={`/templates/pdf/${template}.pdf`} target="_blank" rel="noopener noreferrer" className={textLink}><Trans>Open template PDF</Trans><ArrowUpRightIcon size={16} aria-hidden="true" /></a></div>
		</div>
	);
}
