"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "@/context/locale-context";

import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { Confetti } from "@/components/magicui/confetti";
import { AuroraText } from "@/components/magicui/aurora-text";

export default function Welcome() {
  const router = useRouter();
  const { t } = useLocale();
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
          <span
            className={cn(
              "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
            )}
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
              WebkitClipPath: "padding-box",
            }}
          />
          <span className="relative z-10 flex items-center">
            <span className="mr-2 text-xl">📣</span>
            <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
            <AnimatedGradientText className="text-sm font-medium">
              FieldLink by GoDeskless
            </AnimatedGradientText>
            <ChevronRight
              className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center w-full pt-2 pb-4">
        <Confetti />
        <span className="text-5xl font-extrabold tracking-tight text-foreground mt-0 mb-1">
          Introducing <AuroraText className="font-extrabold">FieldLink by GoDeskless</AuroraText>
        </span>
        <span className="text-lg font-medium text-muted-foreground mb-8">Your modern CRM for field teams, powered by GoDeskless</span>
      </div>
      <button
        className="px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
        onClick={() => router.push("/login")}
      >
        {t("welcome.button")}
      </button>
    </div>
  );
}
