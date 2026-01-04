"use client";

import { Github, Linkedin, Code2, Shield, Server } from "lucide-react";

export function AboutSection() {
  return (
    <section
      id="about"
      data-theme="dark"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-darkcinzabg"
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

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            {/* Section Label */}
            <span className="text-lorenzo-accent text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
              Sobre Mim
            </span>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-lorenzo-light uppercase tracking-tight leading-[1.1] mb-8">
              Construindo
              <br />
              <span className="text-lorenzo-accent font-brier">Soluções</span>
              <br />
              Seguras
            </h2>

            {/* Description */}
            <p className="text-lorenzo-light/80 text-lg leading-relaxed mb-6">
              Sou desenvolvedor fullstack com experiência em C++, Golang, React
              e Next.js. Atuo em projetos críticos do Banco Central e PIX, com
              foco em segurança, escalabilidade e automação DevSecOps.
            </p>
            <p className="text-lorenzo-light/60 leading-relaxed mb-10">
              Apaixonado por criar sistemas robustos e seguros, sempre buscando
              as melhores práticas em desenvolvimento e operações. Minha
              experiência abrange desde criptografia e certificados digitais até
              arquiteturas cloud e CI/CD.
            </p>

            {/* Social Buttons */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/guilhermerossikirsten/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-lorenzo-light/10 text-lorenzo-light font-bold uppercase px-6 py-3 text-sm tracking-wider hover:bg-lorenzo-accent hover:text-black transition-colors duration-300"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>

              <a
                href="https://github.com/GuilhermeRossiKirsten"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-lorenzo-light/10 text-lorenzo-light font-bold uppercase px-6 py-3 text-sm tracking-wider hover:bg-lorenzo-accent hover:text-black transition-colors duration-300"
              >
                <Github size={18} />
                GitHub
              </a>
            </div>
          </div>

          {/* Stats/Features Cards */}
          <div className="grid gap-6">
            {[
              {
                icon: Code2,
                title: "Desenvolvimento",
                description: "C++, Golang, TypeScript, React, Next.js",
              },
              {
                icon: Shield,
                title: "Segurança",
                description: "Criptografia, HSM, DevSecOps",
              },
              {
                icon: Server,
                title: "Infraestrutura",
                description: "Docker, Kubernetes, CI/CD, Cloud",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group p-6 transition-all duration-300 bg-lorenzo-light/5 hover:bg-lorenzo-light/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-lorenzo-accent/10">
                    <item.icon size={24} className="text-lorenzo-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-wide mb-1 text-lorenzo-light">
                      {item.title}
                    </h3>
                    <p className="text-sm text-lorenzo-light/60">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
