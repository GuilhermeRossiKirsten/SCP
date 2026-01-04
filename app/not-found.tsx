"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Home, Coffee, Compass } from "lucide-react";

export default function NotFound() {
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

      {/* Floating 404s in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { x: 10, y: 20, rotate: -5, duration: 25 },
          { x: 70, y: 60, rotate: 10, duration: 30 },
          { x: 30, y: 80, rotate: -8, duration: 22 },
          { x: 85, y: 15, rotate: 12, duration: 28 },
          { x: 50, y: 45, rotate: -3, duration: 26 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute text-lorenzo-accent/5 font-black text-[20vw] select-none"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [pos.rotate, pos.rotate + 5, pos.rotate],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            404
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {/* Glitchy 404 */}
          <div className="relative mb-8">
            <h1 className="text-[10rem] md:text-[14rem] font-black text-lorenzo-accent leading-none tracking-tighter">
              404
            </h1>
          </div>

          {/* Section Label */}
          <motion.span
            className="text-lorenzo-accent text-xs tracking-[0.3em] uppercase font-bold mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Página não encontrada
          </motion.span>

          {/* Title */}
          <motion.h2
            className="text-3xl md:text-4xl font-black text-lorenzo-light uppercase tracking-tight leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Você se{" "}
            <span className="text-lorenzo-accent font-brier italic lowercase">
              perdeu?
            </span>
          </motion.h2>

          {/* Funny Message */}
          <motion.p
            className="text-lorenzo-light/60 text-lg mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Parece que você encontrou um buraco negro no código...
          </motion.p>

          {/* Dev Joke */}
          <motion.p
            className="text-lorenzo-light/40 text-sm mb-12 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Coffee className="w-4 h-4" />
            Enquanto isso, um dev está debugando em produção...
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-3 bg-lorenzo-accent px-8 py-4 transition-all duration-300 hover:bg-lorenzo-light"
            >
              <Home className="w-5 h-5 text-lorenzo-dark" />
              <span className="text-lorenzo-dark font-bold uppercase tracking-wider text-sm">
                Voltar ao Início
              </span>
            </Link>

            <Link
              href="/articles"
              className="group inline-flex items-center justify-center gap-3 bg-lorenzo-light/10 px-8 py-4 transition-all duration-300 hover:bg-lorenzo-accent"
            >
              <Compass className="w-5 h-5 text-lorenzo-light group-hover:text-lorenzo-dark transition-colors" />
              <span className="text-lorenzo-light font-bold uppercase tracking-wider text-sm group-hover:text-lorenzo-dark transition-colors">
                Explorar Artigos
              </span>
            </Link>
          </motion.div>

          {/* Back Link */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-lorenzo-light/40 hover:text-lorenzo-accent transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold uppercase tracking-wider text-sm">
                Voltar para onde eu estava
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
