"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import type { Language } from "@/lib/types"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const languages: { code: Language; label: string }[] = [
    { code: "fr", label: "FR" },
    { code: "en", label: "EN" },
    { code: "wo", label: "WO" },
  ]

  return (
    <div className="flex gap-1 rounded-lg bg-background/50 p-1 backdrop-blur-sm border">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage(lang.code)}
          className="min-w-[44px] font-medium"
        >
          {lang.label}
        </Button>
      ))}
    </div>
  )
}
