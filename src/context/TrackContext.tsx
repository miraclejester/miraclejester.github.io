// ============================================================
// Track state — "Web" vs "Games".
//
// The site carries two parallel bodies of work. Rather than split
// them across separate routes, one active track filters the
// experience and projects listings wherever they appear, and the
// choice follows the visitor between pages.
//
// The choice is persisted to localStorage so a return visit lands
// on the track the visitor picked last. It is deliberately NOT in
// the URL: every existing deep link (/projects/vizard) still
// resolves, and EntryPage flips the track to match whatever entry
// was opened, so arriving from a shared link stays coherent.
// ============================================================

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { tracks, type TrackData, type TrackId } from "@/data/types";

const STORAGE_KEY = "portfolio:track";

/** Track shown before the visitor has expressed a preference. */
export const DEFAULT_TRACK: TrackId = "web";

function isTrackId(value: unknown): value is TrackId {
  return tracks.some((t) => t.id === value);
}

/** localStorage throws outright in some privacy modes, so every access is guarded. */
function readStoredTrack(): TrackId {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isTrackId(stored) ? stored : DEFAULT_TRACK;
  } catch {
    return DEFAULT_TRACK;
  }
}

interface TrackContextValue {
  track: TrackId;
  setTrack: (id: TrackId) => void;
}

const TrackContext = createContext<TrackContextValue | null>(null);

export function TrackProvider({ children }: { children: ReactNode }) {
  const [track, setTrackState] = useState<TrackId>(readStoredTrack);

  const setTrack = useCallback((id: TrackId) => {
    setTrackState(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Preference simply does not persist; the session still works.
    }
  }, []);

  const value = useMemo(() => ({ track, setTrack }), [track, setTrack]);

  return (
    <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
  );
}

export function useTrack(): TrackContextValue {
  const ctx = useContext(TrackContext);
  if (!ctx) throw new Error("useTrack must be used inside a TrackProvider");
  return ctx;
}

/** The active track's metadata: label, blurb, and its section copy. */
export function useTrackData(): TrackData {
  const { track } = useTrack();
  // tracks is static data and always contains every TrackId, so this
  // lookup cannot miss; the fallback only satisfies the type.
  return tracks.find((t) => t.id === track) ?? tracks[0];
}
