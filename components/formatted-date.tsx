"use client";

import { useEffect, useState } from "react";

interface FormattedDateProps {
  date: string;
}

export function FormattedDate({ date }: FormattedDateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Durante SSR ou antes da montagem, renderiza a data em formato legível simples
  if (!mounted) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return <time suppressHydrationWarning>{`${day}/${month}/${year}`}</time>;
  }

  // Após montagem no cliente, usa formatação locale-specific
  return <time>{new Date(date).toLocaleDateString("pt-BR")}</time>;
}
