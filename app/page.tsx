"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Microscope,
  Stethoscope,
  Eye,
  Star,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  FileText,
  Sparkles,
} from "lucide-react";
// Componentes locais (substituem shadcn/ui para rodar sem dependências extras)
function Button({
  asChild,
  variant = "default",
  className = "",
  type,
  onClick,
  children,
  ...props
}: any) {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:pointer-events-none";
  const variants: Record<string, string> = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
  };
  const cls = `${base} ${variants[variant] || variants.default} ${className}`;

  if (asChild) {
    // espera que children seja <a>...</a>
    const child = React.Children.only(children);
    return React.cloneElement(child, {
      className: `${child.props.className || ""} ${cls}`,
      ...props,
    });
  }

  return (
    <button type={type} onClick={onClick} className={cls} {...props}>
      {children}
    </button>
  );
}

function Card({ className = "", children }: any) {
  return <div className={`rounded-2xl border border-slate-200 bg-white ${className}`}>{children}</div>;
}
function CardHeader({ className = "", children }: any) {
  return <div className={`p-6 pb-2 ${className}`}>{children}</div>;
}
function CardContent({ className = "", children }: any) {
  return <div className={`p-6 pt-2 ${className}`}>{children}</div>;
}
function CardTitle({ className = "", children }: any) {
  return <div className={`font-semibold tracking-tight ${className}`}>{children}</div>;
}
function Input({ className = "", ...props }: any) {
  return (
    <input
      className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
      {...props}
    />
  );
}

/**
 * Landing page profissional para cirurgião de catarata.
 * - Paleta baseada em azul
 * - Estrutura pronta para personalizar nome, CRM, cidade, contatos, fotos e links
 * - Conteúdo com tom sério e de autoridade
 */

const BRAND = {
  name: "Dr. Bruno Medeiros",
  specialty: "Cirurgião de Catarata",
  crmLine: "CRM/RN 7845 • RQE 3674",
  regionLine: "Natal e Parnamirim/RN",
  phoneDisplay: "(84) 99828-0000",
  // Use o formato internacional (somente números) para WhatsApp.
  whatsappNumber: "5584998280000",
  bookingLink: "#contato",
  heroImageAlt: "Dr. Bruno Medeiros em consultório",
  // Foto: substitua por um link público (ex.: site/CDN) ou importe via seu projeto.
  photoUrl: "",
  locations: [
    {
      id: "natal",
      label: "Natal (Tirol)",
      addressLine1: "Av. Afonso Pena, 1212",
      addressLine2: "Tirol — Natal/RN",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=Av.%20Afonso%20Pena%2C%201212%2C%20Tirol%2C%20Natal%20RN",
    },
    {
      id: "parnamirim",
      label: "Parnamirim (Centro)",
      addressLine1: "Rua Sargento Norberto Marques, 44",
      addressLine2: "Centro — Parnamirim/RN",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=Rua%20Sargento%20Norberto%20Marques%2C%2044%2C%20Centro%2C%20Parnamirim%20RN",
    },
  ],
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatWhatsAppLink(number: string, text: string) {
  const base = `https://wa.me/${number}`;
  const params = new URLSearchParams({ text });
  return `${base}?${params.toString()}`;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function CataractSurgeonWebsite() {
  const [lead, setLead] = useState({ name: "", phone: "" });
  const [locationIndex, setLocationIndex] = useState(0);

  const selectedLocation = useMemo(
    () => BRAND.locations[Math.min(locationIndex, BRAND.locations.length - 1)],
    [locationIndex]
  );

  // SEO básico (title, description, canonical) + dados estruturados (JSON-LD)
  React.useEffect(() => {
    const title = `${BRAND.name} • ${BRAND.specialty} • ${BRAND.regionLine}`;
    document.title = title;

    const upsertMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const upsertProperty = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const description =
      "Cirurgia de catarata com foco em segurança, qualidade e previsibilidade. Avaliação completa, planejamento de lente intraocular e pós-operatório próximo em Natal e Parnamirim/RN.";

    upsertMeta("description", description);

    // Open Graph
    upsertProperty("og:title", title);
    upsertProperty("og:description", description);
    upsertProperty("og:type", "website");

    // Canonical (usa a URL atual)
    const preferredDomain = "https://drbrunomedeiros.com.br";
    const canonicalHref = preferredDomain;
    if (canonicalHref) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalHref);
    }

    // JSON-LD (dados estruturados)
    const jsonLdId = "jsonld-doctor";
    const existing = document.getElementById(jsonLdId);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = jsonLdId;

    const data = {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: BRAND.name,
      medicalSpecialty: "Ophthalmology",
      areaServed: ["Natal", "Parnamirim", "Rio Grande do Norte"],
      telephone: BRAND.phoneDisplay,
      url: canonicalHref || undefined,
      identifier: [{ "@type": "PropertyValue", name: "CRM/RN", value: "7845" }, { "@type": "PropertyValue", name: "RQE", value: "3674" }],
      address: BRAND.locations.map((l) => ({
        "@type": "PostalAddress",
        streetAddress: `${l.addressLine1}, ${l.addressLine2}`,
        addressLocality: l.id === "natal" ? "Natal" : "Parnamirim",
        addressRegion: "RN",
        addressCountry: "BR",
      })),
    };

    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById(jsonLdId);
      if (s) s.remove();
    };
  }, [locationIndex]);

  const waLink = useMemo(
    () =>
      formatWhatsAppLink(
        BRAND.whatsappNumber,
        "Olá, gostaria de agendar uma avaliação para cirurgia de catarata."
      ),
    []
  );

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá, me chamo ${lead.name || "(não informado)"}. Meu telefone é ${
      lead.phone || "(não informado)"
    }. Gostaria de agendar uma avaliação.`;
    window.open(formatWhatsAppLink(BRAND.whatsappNumber, text), "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <div className="border-b bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Atendimento humanizado • Tecnologia moderna • Ética e segurança</span>
            <span className="sm:hidden">Ética • Segurança • Tecnologia</span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="rounded-2xl">
              <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-600 text-white shadow-sm">
              <Eye className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">{BRAND.name}</div>
              <div className="text-xs text-slate-600">{BRAND.specialty}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
            <a className="hover:text-blue-700" href="#sobre">Sobre</a>
            <a className="hover:text-blue-700" href="#servicos">Serviços</a>
            <a className="hover:text-blue-700" href="#como-funciona">Como funciona</a>
            <a className="hover:text-blue-700" href="#diferenciais">Diferenciais</a>
            <a className="hover:text-blue-700" href="#faq">FAQ</a>
            <a className="hover:text-blue-700" href="#contato">Contato</a>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild className="rounded-2xl bg-blue-600 hover:bg-blue-700">
              <a href="#contato" className="flex items-center gap-2">
                Agendar avaliação <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute -bottom-32 right-[-6rem] h-96 w-96 rounded-full bg-sky-100 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-blue-700" />
              <span>Precisão cirúrgica, segurança e previsibilidade</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Cirurgia de catarata com foco em <span className="text-blue-700">segurança</span>,
              <br className="hidden sm:block" />
              <span className="text-blue-700">precisão</span> e previsibilidade\.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-slate-600">
              Atendimento médico sério e criterioso, com orientação clara em todas as etapas — avaliação, indicação,
              escolha da lente e pós-operatório. A proposta é oferecer uma jornada organizada, segura e transparente,
              alinhando expectativas com base nos seus exames e no seu estilo de vida.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-2xl bg-blue-600 hover:bg-blue-700">
                <a href="#contato" className="flex items-center gap-2">
                  Agendar avaliação <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl">
                <a href="#servicos" className="flex items-center gap-2">
                  Ver serviços <FileText className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {["Consulta com exame completo", "Orientação transparente", "Pós-operatório próximo"].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-2 rounded-2xl border bg-white px-3 py-2 text-sm text-slate-700 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-blue-700" />
                  <span>{t}</span>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-500">
              {BRAND.crmLine} • {BRAND.regionLine}
            </div>

            <div className="pt-1 text-xs text-slate-500">
              Comunicação ética: informações para orientar sua decisão. A confirmação do seu caso depende de consulta e exames.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="relative"
          >
            {/* Foto profissional (opcional) */}
            <div className="mb-4 overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white shadow-sm">
              {BRAND.photoUrl ? (
                <img
                  src={BRAND.photoUrl}
                  alt={BRAND.heroImageAlt}
                  className="h-64 w-full object-cover"
                />
              ) : (
                <div className="grid h-64 w-full place-items-center bg-gradient-to-br from-blue-50 to-sky-50">
                  <div className="text-center">
                    <div className="text-sm font-medium text-slate-700">Foto profissional</div>
                    <div className="mt-1 text-xs text-slate-500">Adicione um link em BRAND.photoUrl</div>
                  </div>
                </div>
              )}
            </div>

            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-200/60 to-sky-100/60 blur-2xl" />
            <Card className="rounded-[2rem] border-slate-200/60 shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-base">Agendamento rápido</CardTitle>
                <div className="text-sm text-slate-600">Envie seus dados e fale direto no WhatsApp.</div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-600">Nome</label>
                    <Input
                      value={lead.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLead((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Seu nome"
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-600">Telefone/WhatsApp</label>
                    <Input
                      value={lead.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLead((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="(DDD) 9xxxx-xxxx"
                      className="rounded-2xl"
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700">
                    Enviar no WhatsApp
                  </Button>
                  <div className="text-xs text-slate-500">
                    Ao enviar, você será direcionado para o WhatsApp. Seus dados não ficam armazenados no site.
                  </div>
                </form>

                <div className="mt-6 grid gap-3 rounded-2xl border bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-blue-700" />
                    <div>
                      <div className="text-sm font-medium">Telefone</div>
                      <div className="text-sm text-slate-600">{BRAND.phoneDisplay}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-blue-700" />
                    <div>
                      <div className="text-sm font-medium">Local</div>
                      <div className="text-sm text-slate-600">
                        {selectedLocation.addressLine1}
                       <br />
                       {selectedLocation.addressLine2}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 text-blue-700" />
                    <div>
                      <div className="text-sm font-medium">Horários</div>
                      <div className="text-sm text-slate-600">Seg–Sex: 08:00–17:00 • Sáb: 08:00–12:00</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="border-t bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold tracking-tight">Sobre o médico</h2>
            <p className="text-slate-600">
              Sou oftalmologista com atuação focada em cirurgia de catarata. Meu compromisso é unir técnica, ciência e
              cuidado humano para oferecer uma jornada segura — desde a primeira consulta até a estabilidade visual no
              pós-operatório. A conduta é individualizada, com explicação clara sobre indicação, alternativas e limites de cada opção.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Award, title: "Formação e atualização", desc: "Rotina de estudo contínuo e prática baseada em evidências." },
                { icon: ShieldCheck, title: "Segurança em primeiro lugar", desc: "Protocolos claros e decisão individualizada." },
                { icon: Microscope, title: "Tecnologia", desc: "Avaliação com exames e planejamento precisos." },
                { icon: Stethoscope, title: "Acompanhamento", desc: "Pós-operatório próximo e comunicação objetiva." },
              ].map((i) => (
                <div key={i.title} className="rounded-2xl border bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <i.icon className="h-4 w-4 text-blue-700" />
                    <div className="text-sm font-medium">{i.title}</div>
                  </div>
                  <div className="mt-2 text-sm text-slate-600">{i.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="space-y-4"
          >
            <Card className="rounded-[2rem] border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">O que você pode esperar</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-700">
                  {[
                    "Consulta completa com explicação clara do diagnóstico.",
                    "Indicação cirúrgica criteriosa e baseada no seu caso.",
                    "Planejamento de lente intraocular conforme objetivos e estilo de vida.",
                    "Orientações objetivas para antes e depois da cirurgia.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-700" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl bg-blue-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-900">
                    <Star className="h-4 w-4" />
                    <span>Foco em qualidade e previsibilidade</span>
                  </div>
                  <p className="mt-2 text-sm text-blue-900/80">
                    O plano cirúrgico é individualizado. A escolha da lente e a expectativa de resultado são discutidas de
                    forma transparente.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-2xl border bg-white p-4 text-xs text-slate-500">
              Observação: este site tem caráter informativo e não substitui consulta médica.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">Serviços</h2>
              <p className="max-w-2xl text-slate-600">
                Atendimento oftalmológico completo, com foco em catarata, planejamento de lente intraocular e cuidado visual
                ao longo da vida.
              </p>
            </div>
            <Button asChild variant="outline" className="w-fit rounded-2xl">
              <a href="#contato" className="flex items-center gap-2">
                Falar com a equipe <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Avaliação de catarata",
                desc: "Exame completo, definição de indicação cirúrgica e orientação transparente sobre riscos e benefícios.",
                icon: Eye,
              },
              {
                title: "Cirurgia de catarata",
                desc: "Procedimento moderno com foco em segurança, previsibilidade e recuperação visual.",
                icon: ShieldCheck,
              },
              {
                title: "Planejamento de lente intraocular",
                desc: "Escolha criteriosa da lente conforme seu olho, objetivos e rotina (trabalho, direção, leitura).",
                icon: Microscope,
              },
              {
                title: "Pós-operatório",
                desc: "Acompanhamento próximo para estabilidade visual e ajustes de conduta quando necessário.",
                icon: Stethoscope,
              },
              {
                title: "Consulta oftalmológica",
                desc: "Avaliação clínica completa e orientação preventiva para saúde ocular.",
                icon: Award,
              },
              {
                title: "Segunda opinião",
                desc: "Revisão de exames, dúvidas sobre indicação, tipo de lente e expectativas de resultado.",
                icon: FileText,
              },
            ].map((s) => (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <Card className="h-full rounded-[2rem] border-slate-200/60 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-600 text-white shadow-sm">
                        <s.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-base">{s.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600">{s.desc}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Seção: Lentes intraoculares */}
          <div className="mt-10 rounded-[2rem] border border-slate-200/60 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Lentes intraoculares</h3>
                <p className="mt-1 max-w-3xl text-sm text-slate-600">
                  A lente ideal não é “uma só para todos”. A indicação depende dos seus exames, do grau de astigmatismo e
                  do seu objetivo visual (longe, intermediário e leitura). A decisão é discutida de forma transparente.
                </p>
              </div>
              <Button asChild className="w-fit rounded-2xl bg-blue-600 hover:bg-blue-700">
                <a href="#contato" className="flex items-center gap-2">
                  Quero orientação <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Monofocal",
                  bullets: [
                    "Excelente qualidade de visão para uma distância principal.",
                    "Pode requerer óculos para perto (dependendo do objetivo).",
                  ],
                },
                {
                  title: "Tórica (para astigmatismo)",
                  bullets: [
                    "Indicada quando há astigmatismo significativo.",
                    "Ajuda a reduzir dependência de óculos para longe.",
                  ],
                },
                {
                  title: "Multifocal / EDOF",
                  bullets: [
                    "Pode ampliar independência de óculos em diferentes distâncias.",
                    "Exige seleção cuidadosa e alinhamento de expectativas.",
                  ],
                },
              ].map((c) => (
                <Card key={c.title} className="rounded-[2rem] border-slate-200/60 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">{c.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {c.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-700" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-xs text-slate-500">* A indicação definitiva depende da avaliação e dos exames.</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              className="space-y-3"
            >
              <h2 className="text-2xl font-semibold tracking-tight">Diferenciais</h2>
              <p className="text-slate-600">
                Um atendimento com linguagem clara e decisões baseadas em critérios técnicos — sem promessas irreais.
              </p>

              <div className="mt-4 space-y-3">
                {[
                  {
                    title: "Planejamento individualizado",
                    desc: "Avaliação criteriosa e alinhamento de expectativas antes da cirurgia.",
                  },
                  {
                    title: "Transparência na escolha da lente",
                    desc: "Você entende o porquê da indicação e o que esperar do resultado.",
                  },
                  {
                    title: "Padrões de segurança",
                    desc: "Protocolos e checklists para reduzir riscos e aumentar previsibilidade.",
                  },
                  {
                    title: "Acompanhamento próximo",
                    desc: "Pós-operatório com orientações objetivas e disponibilidade para dúvidas.",
                  },
                ].map((d) => (
                  <div key={d.title} className="rounded-2xl border bg-slate-50 p-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-700" />
                      <div>
                        <div className="text-sm font-medium">{d.title}</div>
                        <div className="mt-1 text-sm text-slate-600">{d.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="space-y-4"
            >
              <Card className="rounded-[2rem] border-slate-200/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Depoimentos (exemplo)</CardTitle>
                  <div className="text-sm text-slate-600">Substitua por avaliações reais (Google, Doctoralia, etc.).</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-2xl border bg-white p-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className="h-4 w-4 text-blue-700" />
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-slate-700">
                        “Atendimento muito claro e seguro. Fui bem orientado desde a consulta até o pós-operatório.”
                      </p>
                      <div className="mt-2 text-xs text-slate-500">Paciente • {BRAND.regionLine}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="rounded-2xl border bg-blue-600 p-6 text-white shadow-sm">
                <div className="text-base font-semibold">Quer tirar dúvidas antes de decidir?</div>
                <p className="mt-2 text-sm text-white/90">
                  Chame no WhatsApp e receba orientações iniciais sobre avaliação, lentes e próximos passos.
                </p>
                <div className="mt-4">
                  <Button asChild className="rounded-2xl bg-white text-blue-700 hover:bg-white/90">
                    <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                      Falar no WhatsApp <MessageCircle className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {/* Como funciona (alto padrão) */}
      <section id="como-funciona" className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              className="space-y-3"
            >
              <h2 className="text-2xl font-semibold tracking-tight">Como funciona a cirurgia de catarata</h2>
              <p className="text-slate-600">
                A cirurgia é um procedimento planejado. O objetivo é remover o cristalino opaco (catarata) e implantar uma
                lente intraocular escolhida de acordo com seu perfil e seus exames.
              </p>
              <div className="mt-4 space-y-3">
                {[
                  {
                    t: "1) Avaliação e indicação",
                    d: "Consulta com exame completo, confirmação do diagnóstico e discussão dos objetivos visuais.",
                  },
                  {
                    t: "2) Planejamento da lente",
                    d: "Cálculos e análise do seu olho para definir a lente mais adequada (monofocal, tórica, multifocal/EDOF quando indicado).",
                  },
                  {
                    t: "3) Procedimento e segurança",
                    d: "Rotina com protocolos e checklists, buscando previsibilidade e conforto.",
                  },
                  {
                    t: "4) Pós-operatório próximo",
                    d: "Acompanhamento para orientar colírios, cuidados e retorno gradual às atividades.",
                  },
                ].map((s) => (
                  <div key={s.t} className="rounded-2xl border bg-slate-50 p-4">
                    <div className="text-sm font-medium text-slate-900">{s.t}</div>
                    <div className="mt-1 text-sm text-slate-600">{s.d}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="space-y-4"
            >
              <Card className="rounded-[2rem] border-slate-200/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Tecnologia e padrões de segurança</CardTitle>
                  <div className="text-sm text-slate-600">
                    O foco é reduzir variabilidade e aumentar previsibilidade dentro do que a medicina permite.
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-slate-700">
                    {[
                      "Avaliação com exames e planejamento personalizados.",
                      "Protocolos e checklists de segurança.",
                      "Discussão transparente sobre riscos, benefícios e alternativas.",
                      "Orientações objetivas e acompanhamento pós-operatório.",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-700" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-2xl bg-blue-50 p-4">
                    <div className="text-sm font-medium text-blue-900">Expectativas realistas</div>
                    <p className="mt-2 text-sm text-blue-900/80">
                      Cada olho tem particularidades. A meta é melhorar visão e qualidade de vida, mas o resultado final
                      depende de exames, condições associadas e resposta individual.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-2xl border bg-white p-4 text-xs text-slate-500">
                Importante: não utilizamos “antes e depois” nem promessas de resultado. Conduta sempre individualizada.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="faq" className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold tracking-tight">Perguntas frequentes</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Respostas objetivas para as dúvidas mais comuns. A confirmação do seu caso depende da consulta.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Quando devo operar a catarata?",
                a: "Em geral, quando a catarata passa a impactar sua qualidade de vida e o exame confirma indicação. A decisão é individualizada.",
              },
              {
                q: "A cirurgia dói?",
                a: "Normalmente, não. Utiliza-se anestesia local e sedação quando necessário. O desconforto costuma ser mínimo.",
              },
              {
                q: "Qual lente intraocular é melhor?",
                a: "Não existe uma única ‘melhor’. A lente ideal depende do seu olho, rotina, objetivos visuais e exame pré-operatório.",
              },
              {
                q: "Quanto tempo para recuperar a visão?",
                a: "Muitos pacientes notam melhora rápida, mas a estabilização pode levar dias a semanas, dependendo do caso.",
              },
            ].map((f) => (
              <Card key={f.q} className="rounded-[2rem] border-slate-200/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">{f.q}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">{f.a}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="border-t bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            className="space-y-3"
          >
            <h2 className="text-2xl font-semibold tracking-tight">Contato</h2>
            <p className="text-slate-600">
              Para agendar consulta ou avaliação de catarata, fale pelo WhatsApp ou ligue. Se preferir, use o formulário
              para iniciar a conversa.
            </p>

            <div className="grid gap-3 rounded-[2rem] border bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-blue-700" />
                <div>
                  <div className="text-sm font-medium">Telefone/WhatsApp</div>
                  <div className="text-sm text-slate-600">{BRAND.phoneDisplay}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-blue-700" />
                <div>
                  <div className="text-sm font-medium">Endereço</div>
                  <div className="text-sm text-slate-600">
                    {selectedLocation.addressLine1}
                    <br />
                    {selectedLocation.addressLine2}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-blue-700" />
                <div>
                  <div className="text-sm font-medium">Horários</div>
                  <div className="text-sm text-slate-600">Seg–Sex: 08:00–17:00 • Sáb: 08:00–12:00</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <Button asChild className="rounded-2xl bg-blue-600 hover:bg-blue-700">
                  <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    WhatsApp <MessageCircle className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-2xl">
                  <a href={selectedLocation.mapLink} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    Abrir no mapa <MapPin className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="space-y-4"
          >
            <Card className="rounded-[2rem] border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Iniciar conversa</CardTitle>
                <div className="text-sm text-slate-600">Você será redirecionado para o WhatsApp.</div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-600">Nome</label>
                    <Input
                      value={lead.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLead((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Seu nome"
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-600">Telefone/WhatsApp</label>
                    <Input
                      value={lead.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLead((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="(DDD) 9xxxx-xxxx"
                      className="rounded-2xl"
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700">
                    Enviar e falar com a equipe
                  </Button>
                  <div className="text-xs text-slate-500">
                    Dica: personalize o texto do WhatsApp no código (formatWhatsAppLink) para campanhas.
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="rounded-2xl border bg-white p-4 text-xs text-slate-500">
              <div className="font-medium text-slate-700">Conformidade</div>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Conteúdo informativo; não substitui avaliação médica.</li>
                <li>Evite promessas de resultado e antes/depois. Use linguagem ética e responsável.</li>
                <li>Inclua CRM/RQE, cidade e identificação profissional conforme regras locais.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      {/* Botão flutuante do WhatsApp (mobile-first) */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-blue-700 md:hidden"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-600 text-white shadow-sm">
                <Eye className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <div className="font-semibold tracking-tight">{BRAND.name}</div>
                <div className="text-xs text-slate-600">{BRAND.specialty} • {BRAND.regionLine}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <span>{BRAND.crmLine}</span>
              <span className="hidden md:inline">•</span>
              <a className="hover:text-blue-700" href="#sobre">Sobre</a>
              <span>•</span>
              <a className="hover:text-blue-700" href="#servicos">Serviços</a>
              <span>•</span>
              <a className="hover:text-blue-700" href="#contato">Contato</a>
            </div>
          </div>

          <div className="mt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
