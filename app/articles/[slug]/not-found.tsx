"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen, Ghost } from "lucide-react";
import { useState, useEffect } from "react";

const funnyMessages = [
  "Este artigo está em modo stealth",
  "O artigo decidiu tirar férias sem avisar",
  "Procurei em todos os commits... nada!",
  "Este slug não passou no code review",
  "O artigo foi minificado demais e sumiu",
  "Talvez o artigo esteja em draft eterno",
];

export default function NotFound() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
  }, []);

  return (
    <main className="min-h-screen bg-lorenzo-dark text-lorenzo-light relative overflow-hidden flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(200, 245, 80, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 bg-lorenzo-accent/10 mb-8"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Ghost className="w-12 h-12 text-lorenzo-accent" />
          </motion.div>

          {/* Section Label */}
          <span className="text-lorenzo-accent text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
            Artigo Fantasma
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-lorenzo-light uppercase tracking-tight leading-tight mb-6">
            Artigo{" "}
            <span className="text-lorenzo-accent font-brier italic lowercase">
              não encontrado
            </span>
          </h1>

          {/* Funny Message */}
          <p className="text-lorenzo-light/60 text-lg mb-4">{message}</p>

          <p className="text-lorenzo-light/40 text-sm mb-10">
            Mas não desista! Temos vários outros artigos interessantes esperando
            por você.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/articles"
              className="group inline-flex items-center justify-center gap-3 bg-lorenzo-accent px-8 py-4 transition-all duration-300 hover:bg-lorenzo-light"
            >
              <BookOpen className="w-5 h-5 text-lorenzo-dark" />
              <span className="text-lorenzo-dark font-bold uppercase tracking-wider text-sm">
                Ver todos os artigos
              </span>
            </Link>

            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-3 bg-lorenzo-light/10 px-8 py-4 transition-all duration-300 hover:bg-lorenzo-accent"
            >
              <ArrowLeft className="w-5 h-5 text-lorenzo-light group-hover:text-lorenzo-dark transition-colors" />
              <span className="text-lorenzo-light font-bold uppercase tracking-wider text-sm group-hover:text-lorenzo-dark transition-colors">
                Página inicial
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
