"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Share2 } from "lucide-react";

interface BlogActionButtonsProps {
  title: string;
  description: string;
}

export function BlogActionButtons({ title, description }: BlogActionButtonsProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title,
      text: description || "Check out this amazing article!",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (typeof navigator !== "undefined" && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.debug("Share cancelled");
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy link", err);
      }
    }
  };

  return (
    <Button
      onClick={handleShare}
      className="w-full md:w-auto bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white gap-2 h-12 px-6 rounded-xl transition-all shadow-lg"
    >
      {isCopied ? (
        <>
          <Check className="w-4 h-4 text-green-400" /> <span className="text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 text-slate-300" /> Share Article
        </>
      )}
    </Button>
  );
}
