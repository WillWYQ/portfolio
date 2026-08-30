export const ROLE_HIGHLIGHT_STORAGE_KEY = "portfolio-target-role";

export type RoleHighlightStorage = {
  role: string | null;
  answered: boolean;
};

const DEFAULT_STORAGE: RoleHighlightStorage = { role: null, answered: false };

export function readRoleHighlightStorage(): RoleHighlightStorage {
  if (typeof window === "undefined") return DEFAULT_STORAGE;
  try {
    const raw = window.localStorage.getItem(ROLE_HIGHLIGHT_STORAGE_KEY);
    if (!raw) return DEFAULT_STORAGE;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof parsed.answered === "boolean"
    ) {
      const role =
        typeof parsed.role === "string" && VALID_ROLE_KEYS.includes(parsed.role)
          ? parsed.role
          : null;
      return { role, answered: parsed.answered };
    }
    return DEFAULT_STORAGE;
  } catch {
    return DEFAULT_STORAGE;
  }
}

export function writeRoleHighlightStorage(state: RoleHighlightStorage): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      ROLE_HIGHLIGHT_STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch {
    // localStorage blocked (private mode, etc.) — highlight state just won't persist.
  }
}

// Order shown in the modal and the hero selector. Kept here (not in resume.tsx)
// because it's presentation ordering, not resume data.
export const PRIMARY_ROLE_KEYS = [
  "SystemsKernelEngineer",
  "EmbeddedFirmwareEngineer",
  "ComputerArchitectureRTL",
  "NetworkSecurityEngineer",
  "DataMLEngineer",
  "FullStackWebEngineer",
] as const;

export const MORE_ROLE_KEYS = [
  "FPGAEngineer",
  "HPCPerformanceEngineer",
  "RoboticsMechatronics",
  "DevOpsInfra",
] as const;

const VALID_ROLE_KEYS: readonly string[] = [...PRIMARY_ROLE_KEYS, ...MORE_ROLE_KEYS];
