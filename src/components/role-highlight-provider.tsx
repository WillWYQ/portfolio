"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  readRoleHighlightStorage,
  writeRoleHighlightStorage,
} from "@/lib/role-highlight";

type RoleHighlightContextValue = {
  selectedRole: string | null;
  hasAnswered: boolean;
  selectRole: (role: string) => void;
  skip: () => void;
  clear: () => void;
};

const RoleHighlightContext = createContext<RoleHighlightContextValue | null>(
  null
);

export function RoleHighlightProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  // Default true so the modal never flashes before we've read localStorage;
  // flips to the real stored value once the effect below runs.
  const [hasAnswered, setHasAnswered] = useState(true);

  useEffect(() => {
    const stored = readRoleHighlightStorage();
    setSelectedRole(stored.role);
    setHasAnswered(stored.answered);
  }, []);

  const selectRole = useCallback((role: string) => {
    setSelectedRole(role);
    setHasAnswered(true);
    writeRoleHighlightStorage({ role, answered: true });
  }, []);

  const skip = useCallback(() => {
    setSelectedRole(null);
    setHasAnswered(true);
    writeRoleHighlightStorage({ role: null, answered: true });
  }, []);

  const clear = useCallback(() => {
    setSelectedRole(null);
    setHasAnswered(true);
    writeRoleHighlightStorage({ role: null, answered: true });
  }, []);

  const value = useMemo(
    () => ({ selectedRole, hasAnswered, selectRole, skip, clear }),
    [selectedRole, hasAnswered, selectRole, skip, clear]
  );

  return (
    <RoleHighlightContext.Provider value={value}>
      {children}
    </RoleHighlightContext.Provider>
  );
}

export function useRoleHighlight(): RoleHighlightContextValue {
  const ctx = useContext(RoleHighlightContext);
  if (!ctx) {
    throw new Error(
      "useRoleHighlight must be used within a RoleHighlightProvider"
    );
  }
  return ctx;
}
