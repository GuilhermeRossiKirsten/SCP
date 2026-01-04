"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, ArrowUpRight } from "lucide-react";
import emailjs from "@emailjs/browser";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_TEMPLATE_ID || "",
        form,
        {
          publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY || "",
        },
      );

      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      alert("Ocorreu um erro ao enviar a mensagem.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section
      id="contact"
      data-theme="dark"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-[#0a0a0a]"
    >
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

      <div className="max-w-[1000px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-lorenzo-accent text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
            Contato
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-lorenzo-light uppercase tracking-tight leading-[1.1] mb-6">
            Vamos
            <br />
            <span className="text-lorenzo-accent font-brier italic">
              Conversar?
            </span>
          </h2>
          <p className="text-lorenzo-light/60 text-lg max-w-xl mx-auto">
            Estou disponível para novos projetos, oportunidades e parcerias.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-lorenzo-light/5 p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-bold uppercase tracking-wider text-lorenzo-light/60 mb-3"
              >
                Nome
              </label>
              <input
                id="name"
                name="nome"
                type="text"
                required
                placeholder="Seu nome"
                className="w-full px-5 py-4 bg-lorenzo-light/5 text-lorenzo-light placeholder:text-lorenzo-light/30 focus:bg-lorenzo-light/10 focus:outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-lorenzo-light/60 mb-3"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="seu@email.com"
                className="w-full px-5 py-4 bg-lorenzo-light/5 text-lorenzo-light placeholder:text-lorenzo-light/30 focus:bg-lorenzo-light/10 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <label
              htmlFor="message"
              className="block text-xs font-bold uppercase tracking-wider text-lorenzo-light/60 mb-3"
            >
              Mensagem
            </label>
            <textarea
              id="message"
              name="mensagem"
              required
              rows={5}
              placeholder="Conte-me sobre seu projeto..."
              className="w-full px-5 py-4 bg-lorenzo-light/5 text-lorenzo-light placeholder:text-lorenzo-light/30 focus:bg-lorenzo-light/10 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider py-5 text-sm hover:bg-lorenzo-light hover:text-lorenzo-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Send size={20} />
              </motion.div>
            ) : isSubmitted ? (
              <>
                <Check size={20} />
                Enviado com Sucesso!
              </>
            ) : (
              <>
                Enviar Mensagem
                <ArrowUpRight size={20} />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Alternative Contact
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lorenzo-light/40 text-sm mb-3">
            Ou entre em contato direto
          </p>
          <a
            href="mailto:guilherme.rossikirsten@gmail.com"
            className="text-lorenzo-accent font-bold hover:text-lorenzo-light transition-colors"
          >
            guilherme.rossikirsten@gmail.com
          </a>
        </motion.div> */}
      </div>
    </section>
  );
}
