"use client";

import { Button } from "@/components/ui/button";
import { LANGUAGE_METADATA, type Language } from "@/lib/i18n";
import { Languages } from "lucide-react";
import { useLanguage, useTranslations } from "./language-provider";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslations();

  const nextLanguage: Language = language === "en" ? "zh" : "en";
  const currentMeta = LANGUAGE_METADATA[language];

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative px-2"
      onClick={() => setLanguage(nextLanguage)}
      aria-label={t("languageToggle.aria", {
        language: currentMeta.nativeLabel,
      })}
    >
      <Languages className="h-[1.1rem] w-[1.1rem]" />
      <span className="absolute bottom-1 right-1 text-[10px] font-semibold">
        {currentMeta.shortLabel}
      </span>
    </Button>
  );
}
