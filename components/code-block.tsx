"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "code" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block" data-language={language}>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 p-2 rounded-lg bg-zinc-900/80 border border-green-500/20 text-gray-400 hover:text-green-400 hover:bg-green-500/10 hover:border-green-500/40 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
        title="Copiar código"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
      <code>{code}</code>
    </div>
  );
}
