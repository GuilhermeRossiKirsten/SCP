"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import emailjs from "@emailjs/browser";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;

    console.log(form);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID || "", // troque pelo seu Service ID
        process.env.NEXT_PUBLIC_TEMPLATE_ID || "", // troque pelo seu Template ID
        form,
        {
          publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY || "",
        }, // troque pela sua Public Key
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
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Contato
          </h2>
          <p className="text-gray-300 text-lg">
            Vamos construir algo seguro e incrível juntos!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Nome
            </label>
            <Input
              id="name"
              name="nome"
              type="text"
              required
              className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              E-mail
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Mensagem
            </label>
            <Textarea
              id="message"
              name="mensagem"
              required
              rows={5}
              className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500 resize-none"
              placeholder="Sua mensagem..."
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-6 text-lg rounded-lg shadow-lg shadow-emerald-500/50 transition-all hover:shadow-emerald-500/70 disabled:opacity-50"
          >
            {isSubmitting ? (
              <motion.div
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Send className="w-5 h-5" />
              </motion.div>
            ) : isSubmitted ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Enviado!
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensagem
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
