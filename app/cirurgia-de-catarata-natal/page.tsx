import type { Metadata } from "next";

const DOMAIN = "https://drbrunomedeiros.com.br";
const PAGE_PATH = "/cirurgia-de-catarata-natal";

export const metadata: Metadata = {
  title: "Cirurgia de Catarata em Natal e Parnamirim | Dr. Bruno Medeiros",
  description:
    "Cirurgia de catarata com planejamento individualizado da lente intraocular, foco em segurança e previsibilidade visual. Atendimento em Natal (Tirol) e Parnamirim (Centro). Hospitais IOMR e CSO.",
  alternates: {
    canonical: `${DOMAIN}${PAGE_PATH}`,
  },
  openGraph: {
    title: "Cirurgia de Catarata em Natal e Parnamirim | Dr. Bruno Medeiros",
    description:
      "Tecnologia moderna, planejamento da lente intraocular e acompanhamento próximo. Hospitais IOMR e CSO.",
    url: `${DOMAIN}${PAGE_PATH}`,
    type: "website",
    locale: "pt_BR",
  },
};

const BRAND = {
  name: "Dr. Bruno Medeiros",
  crmLine: "CRM/RN 7845 • RQE 3674",
  phoneDisplay: "(84) 99708-0000",
  whatsappNumber: "5584997080000",
  hospitals: ["IOMR", "CSO"],
  locations: [
    {
      label: "Natal (Tirol)",
      address1: "Av. Afonso Pena, 1212",
      address2: "Tirol — Natal/RN",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=Av.%20Afonso%20Pena%2C%201212%2C%20Tirol%2C%20Natal%20RN",
    },
    {
      label: "Parnamirim (Centro)",
      address1: "Rua Sargento Norberto Marques, 44",
      address2: "Centro — Parnamirim/RN",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=Rua%20Sargento%20Norberto%20Marques%2C%2044%2C%20Centro%2C%20Parnamirim%20RN",
    },
  ],
};

function classNames(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

export default function Page() {
  const waLink = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
    "Olá! Gostaria de agendar uma avaliação para catarata."
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: BRAND.name,
    medicalSpecialty: "Ophthalmology",
    areaServed: ["Natal", "Parnamirim", "Rio Grande do Norte"],
    telephone: BRAND.phoneDisplay,
    url: `${DOMAIN}${PAGE_PATH}`,
    identifier: [
      { "@type": "PropertyValue", name: "CRM/RN", value: "7845" },
      { "@type": "PropertyValue", name: "RQE", value: "3674" },
    ],
    address: BRAND.locations.map((l) => ({
      "@type": "PostalAddress",
      streetAddress: `${l.address1}, ${l.address2}`,
      addressRegion: "RN",
      addressCountry: "BR",
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-blue-600 text-white font-semibold">
              BM
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">{BRAND.name}</div>
              <div className="text-xs text-slate-600">{BRAND.crmLine}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-5 text-sm text-slate-700 md:flex">
            <a className="hover:text-blue-700" href="#quando-operar">
              Quando operar
            </a>
            <a className="hover:text-blue-700" href="#lentes">
              Lentes
            </a>
            <a className="hover:text-blue-700" href="#seguranca">
              Segurança
            </a>
            <a className="hover:text-blue-700" href="#faq">
              FAQ
            </a>
            <a className="hover:text-blue-700" href="#contato">
              Contato
            </a>
          </nav>

          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            WhatsApp
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute -bottom-32 right-[-6rem] h-96 w-96 rounded-full bg-sky-100 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:py-16">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-slate-700">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Cirurgias em {BRAND.hospitals.join(" e ")}
            </div>

            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Cirurgia de catarata em{" "}
              <span className="text-blue-700">Natal</span> e{" "}
              <span className="text-blue-700">Parnamirim</span>
            </h1>

            <p className="max-w-xl text-slate-600">
              Planejamento individualizado da lente intraocular, foco em segurança e
              previsibilidade visual — com acompanhamento próximo em todas as etapas.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
              >
                Agendar avaliação pelo WhatsApp
              </a>
              <a
                href="#contato"
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
              >
                Ver endereços
              </a>
            </div>

            <div className="pt-2 text-xs text-slate-500">
              Comunicação ética: informações para orientar sua decisão. A confirmação do
              seu caso depende de consulta e exames.
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/60 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold">Diferenciais do cuidado</div>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {[
                "Avaliação completa e indicação bem fundamentada.",
                "Discussão transparente de riscos, benefícios e alternativas.",
                "Seleção criteriosa da lente conforme exames e estilo de vida.",
                "Pós-operatório organizado e acompanhamento próximo.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl bg-blue-50 p-4">
              <div className="text-sm font-medium text-blue-900">
                Objetivo: qualidade visual com previsibilidade
              </div>
              <p className="mt-2 text-sm text-blue-900/80">
                Cada olho tem particularidades. As melhores decisões vêm do alinhamento
                entre exames, indicação e expectativas realistas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200/60 bg-white p-6 shadow-sm md:col-span-2">
              <h2 className="text-xl font-semibold">O que é catarata?</h2>
              <p className="mt-3 text-slate-600">
                Catarata é a opacificação do cristalino, lente natural do olho. Pode causar
                visão embaçada, halos, mais sensibilidade à luz e dificuldade para dirigir,
                principalmente à noite. Quando há impacto funcional, a cirurgia é o tratamento
                eficaz.
              </p>

              <h2 id="quando-operar" className="mt-8 text-xl font-semibold">
                Quando é o momento ideal para operar?
              </h2>
              <p className="mt-3 text-slate-600">
                A indicação é baseada no quanto a catarata interfere na sua rotina, e não
                apenas na idade. Sinais comuns:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                <li>Visão embaçada mesmo com óculos</li>
                <li>Trocas frequentes de grau</li>
                <li>Sensibilidade à luz / halos</li>
                <li>Dificuldade para leitura ou direção noturna</li>
              </ul>

              <h2 id="lentes" className="mt-8 text-xl font-semibold">
                Lentes intraoculares premium
              </h2>
              <p className="mt-3 text-slate-600">
                A lente ideal não é “uma só para todos”. A escolha considera exames,
                astigmatismo e objetivos visuais (longe, intermediário e leitura).
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {[
                  {
                    t: "Monofocal",
                    d: "Alta qualidade para uma distância principal; pode exigir óculos para perto dependendo do objetivo.",
                  },
                  {
                    t: "Tórica",
                    d: "Indicada quando há astigmatismo significativo, ajudando a reduzir dependência de óculos para longe.",
                  },
                  {
                    t: "Multifocal / EDOF",
                    d: "Pode aumentar independência de óculos em diferentes distâncias quando bem indicada e com expectativas alinhadas.",
                  },
                ].map((c) => (
                  <div
                    key={c.t}
                    className="rounded-[2rem] border border-slate-200/60 bg-white p-5 shadow-sm"
                  >
                    <div className="text-sm font-semibold">{c.t}</div>
                    <div className="mt-2 text-sm text-slate-600">{c.d}</div>
                    <div className="mt-4 text-xs text-slate-500">
                      * Indicação definitiva depende de consulta e exames.
                    </div>
                  </div>
                ))}
              </div>

              <h2 id="seguranca" className="mt-8 text-xl font-semibold">
                Segurança e experiência cirúrgica
              </h2>
              <p className="mt-3 text-slate-600">
                Procedimento planejado, com protocolos e checklists, buscando reduzir variabilidade e
                aumentar previsibilidade dentro do que a medicina permite. Cirurgias realizadas nos
                hospitais <strong>{BRAND.hospitals.join(" e ")}</strong>.
              </p>
              <p className="mt-3 text-slate-600">
                O Dr. Bruno Medeiros possui atuação dedicada à cirurgia de catarata, com experiência
                acumulada em grande volume de procedimentos e foco em reabilitação visual.
              </p>
            </div>

            <aside className="space-y-4">
              <div className="rounded-[2rem] border border-slate-200/60 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold">Agendamento</div>
                <div className="mt-2 text-sm text-slate-600">
                  Atendimento em Natal e Parnamirim.
                </div>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Falar no WhatsApp
                </a>

                <div className="mt-4 text-xs text-slate-500">
                  {BRAND.name} • {BRAND.crmLine}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200/60 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold">Recuperação</div>
                <p className="mt-2 text-sm text-slate-600">
                  A melhora visual costuma iniciar nos primeiros dias, com estabilização progressiva.
                  O pós-operatório é parte essencial do resultado.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold tracking-tight">Perguntas frequentes</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "A cirurgia dói?",
                a: "O procedimento é realizado com anestesia local e costuma ser confortável. Os detalhes são explicados na consulta.",
              },
              {
                q: "Precisa internar?",
                a: "Geralmente não. Em muitos casos é ambulatorial, com alta no mesmo dia, conforme avaliação médica.",
              },
              {
                q: "Vou deixar de usar óculos?",
                a: "Depende da lente indicada, dos exames e do objetivo visual. A decisão é individualizada e discutida com transparência.",
              },
              {
                q: "Quanto tempo para recuperar?",
                a: "A melhora visual pode começar nos primeiros dias, com estabilização gradual. O acompanhamento pós-operatório orienta retorno às atividades.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-[2rem] border border-slate-200/60 bg-slate-50 p-6"
              >
                <div className="text-sm font-semibold">{item.q}</div>
                <div className="mt-2 text-sm text-slate-600">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Endereços</h2>
              <p className="mt-1 text-slate-600">
                Selecione o local mais conveniente e abra o mapa.
              </p>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="w-fit rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Agendar pelo WhatsApp
            </a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {BRAND.locations.map((l) => (
              <div
                key={l.label}
                className="rounded-[2rem] border border-slate-200/60 bg-white p-6 shadow-sm"
              >
                <div className="text-sm font-semibold">{l.label}</div>
                <div className="mt-2 text-sm text-slate-600">
                  {l.address1}
                  <br />
                  {l.address2}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={l.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      "rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    Abrir no mapa
                  </a>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-xs text-slate-500">
            Dr. Bruno Medeiros • {BRAND.crmLine} • {BRAND.phoneDisplay}
          </div>
        </div>
      </section>

      {/* WhatsApp floating (mobile) */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-blue-700 md:hidden"
      >
        WhatsApp
      </a>
    </main>
  );
}
