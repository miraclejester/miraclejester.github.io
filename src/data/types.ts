// ============================================================
// Portfolio data types — derived from portfolio.json schema
// ============================================================

export type EntryKind = "project" | "experience";

export type EngineFamily = "godot" | "unity" | "web" | "other";

/**
 * The two bodies of work the site can be filtered to. Every entry
 * belongs to exactly one; the visitor picks which one they are
 * looking at (see context/TrackContext).
 */
export type TrackId = "web" | "game";

export type EntryStatus =
  | "released"
  | "prototype"
  | "in-development"
  | "live-service"
  | "archived";

export type LinkVariant = "primary" | "secondary" | "ghost";

export type CtaVariant = "primary" | "secondary";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  kind: "github" | "itch" | "email" | string;
}

export interface FooterData {
  copyright: string;
  note: string;
}

export interface SiteData {
  title: string;
  description: string;
  author: string;
  nav: NavItem[];
  social: SocialLink[];
  footer: FooterData;
}

export interface TrackPickerData {
  heading: string;
  hint: string;
}

export interface HeroData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  tagline: string;
  ctas: Array<{
    label: string;
    href: string;
    variant: CtaVariant;
  }>;
  trackPicker: TrackPickerData;
}

export interface AboutData {
  heading: string;
  bio: string[];
  skills: Record<string, string[]>;
}

export interface ContactData {
  heading: string;
  body: string;
  links: Array<{
    label: string;
    href: string;
    variant: LinkVariant;
  }>;
}

export interface SectionMeta {
  title: string;
  blurb: string;
}

export interface SectionsData {
  experience: SectionMeta;
  projects: SectionMeta;
}

export interface TrackData {
  id: TrackId;
  label: string;
  blurb: string;
  stack: string[];
  /** Section titles and blurbs used while this track is active. */
  sections: SectionsData;
}

export interface MediaAsset {
  src: string;
  alt: string;
}

export interface VideoAsset {
  src: string;
  alt: string;
  poster: string | null;
}

export interface EntryMedia {
  hero: MediaAsset | null;
  screenshots: MediaAsset[];
  videos: VideoAsset[];
}

export interface JamInfo {
  name: string;
  theme: string;
  placement: string;
}

export interface CreditItem {
  name: string;
  role: string;
  url: string | null;
}

export interface TeamInfo {
  composition: string;
  credits: CreditItem[];
}

export interface EntryLink {
  label: string;
  href: string;
  kind: string;
}

export interface Entry {
  id: string;
  kind: EntryKind;
  track: TrackId;
  title: string;
  role: string | null;
  tagline: string;
  summary: string;
  description: string[];
  genre: string | null;
  engineFamily: EngineFamily;
  status: EntryStatus;
  statusLabel: string;
  dateLabel: string;
  sortDate: string;
  year: number;
  platforms: string[];
  techStack: string[];
  highlights: string[];
  features: string[];
  jam: JamInfo | null;
  team: TeamInfo;
  media: EntryMedia;
  links: EntryLink[];
  whatILearned: string;
  featured: boolean;
  order: number | null;
}

export interface PortfolioData {
  site: SiteData;
  hero: HeroData;
  about: AboutData;
  contact: ContactData;
  sections: SectionsData;
  tracks: TrackData[];
  experience: Entry[];
  projects: Entry[];
}

// ============================================================
// Typed loader — imports portfolio.json with resolveJsonModule
// ============================================================

import rawData from "./portfolio.json";

const data = rawData as PortfolioData;

export const site      = data.site;
export const hero      = data.hero;
export const about     = data.about;
export const contact   = data.contact;
export const sections  = data.sections;
export const tracks    = data.tracks;
export const projects  = data.projects;
export const experience = data.experience;

/** Track metadata by id. Returns undefined for an unknown id. */
export function getTrack(id: TrackId): TrackData | undefined {
  return data.tracks.find((t) => t.id === id);
}

/**
 * Look up a single entry by kind + id.
 * Returns undefined if not found.
 */
export function getEntry(kind: EntryKind, id: string): Entry | undefined {
  const pool = kind === "project" ? data.projects : data.experience;
  return pool.find((e) => e.id === id);
}

/**
 * All entries from both pools combined.
 */
export function allEntries(): Entry[] {
  return [...data.experience, ...data.projects];
}

/**
 * Entries of a given kind sorted reverse-chronologically, optionally
 * narrowed to one track.
 * Primary sort: order (null sorts after numbered entries).
 * Secondary sort: sortDate descending (YYYY-MM string compare).
 */
export function sortedEntries(kind: EntryKind, track?: TrackId): Entry[] {
  const source = kind === "project" ? data.projects : data.experience;
  const pool = track ? source.filter((e) => e.track === track) : [...source];
  return pool.sort((a, b) => {
    const aOrder = a.order ?? Infinity;
    const bOrder = b.order ?? Infinity;
    if (aOrder !== bOrder) return aOrder - bOrder;
    // descending date
    if (b.sortDate < a.sortDate) return -1;
    if (b.sortDate > a.sortDate) return 1;
    return 0;
  });
}
