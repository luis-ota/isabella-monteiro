import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  InstagramLogo,
  List,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react'
import { motion as Motion, useReducedMotion } from 'motion/react'

const works = [
  {
    title: 'A Divina Tragicomédia de Dionísio',
    year: '2024',
    medium: 'Teatro',
    direction: 'Vitor Mendes',
    script: 'Grupo Asas de Papel Produções',
    venue: 'Teatro Municipal Paschoal Carlos Magno',
    images: ['/images/divina-tragicomedia-1.webp', '/images/divina-tragicomedia-2.webp'],
    alt: 'Isabella Monteiro em cena em A Divina Tragicomédia de Dionísio',
    tone: 'rose',
  },
  {
    title: 'A História é uma História',
    year: '2024',
    medium: 'Teatro',
    direction: 'Fernando Rodembuch',
    script: 'Millôr Fernandes',
    venue: 'Teatro Municipal Paschoal Carlos Magno',
    images: ['/images/historia-1.webp', '/images/historia-2.webp'],
    alt: 'Elenco de A História é uma História no palco',
    tone: 'blue',
  },
  {
    title: 'Teicoscopia ou Vaudeville do Horror',
    year: '2025',
    medium: 'Teatro',
    direction: 'João Mauro Cruz',
    script: 'Criação do grupo',
    venue: 'Teatro Barracão Encena',
    images: ['/images/teicoscopia-1.webp', '/images/teicoscopia-2.webp'],
    alt: 'Isabella Monteiro em cena em Teicoscopia ou Vaudeville do Horror',
    tone: 'terracotta',
  },
  {
    title: 'Elas não Usam Black-Tie',
    year: '2026',
    medium: 'Teatro',
    direction: 'Felipe Renã',
    script: 'Adaptação de Gianfrancesco Guarnieri',
    venue: 'Teatro Barracão Encena',
    images: ['/images/black-tie-1.webp', '/images/black-tie-2.webp'],
    alt: 'Elenco de Elas não Usam Black-Tie em cena',
    tone: 'sage',
  },
  {
    title: 'Delírio',
    year: '2025',
    medium: 'Audiovisual',
    direction: 'Gabriel Eneas',
    script: 'Gabriel Eneas, Artur Bitencourt e Rafael Avila',
    venue: 'Curta-metragem',
    images: ['/images/delirio-1.webp', '/images/delirio-2.webp'],
    alt: 'Isabella Monteiro em cena no filme Delírio',
    tone: 'ink',
  },
  {
    title: 'Ecos',
    year: '2025',
    medium: 'Audiovisual',
    direction: 'Juscelino Zilio',
    script: 'Criação do grupo',
    venue: 'Curta-metragem',
    images: ['/images/ecos-1.webp', '/images/ecos-2.webp'],
    alt: 'Isabella Monteiro em cena no filme Ecos',
    tone: 'pearl',
  },
]

const backstage = [
  'Iluminação em Os Ninguéns (2023)',
  'Recreação infantil e pintura facial para prefeituras e Sicredi (2023, 2024)',
  'Auxiliar de coxia no festival de dança Dançando (2023, 2024)',
  'Iluminação e captura de som para a minissérie Jardim de Eros (2024)',
  'Sonoplastia no evento Pororoca Cultural para O Método e Estranhas Poesias Celestes (2024)',
  'Fotografia no evento Conserto pro Arturzinho (2024)',
]

function BrandMark() {
  return (
    <a className="brand-mark" href="#inicio" aria-label="Isabella Monteiro, início">
      Isabella<br />Monteiro
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const navRef = useRef(null)
  const wasOpenRef = useRef(false)
  const close = () => setOpen(false)

  useEffect(() => {
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')

    if (!open) {
      if (wasOpenRef.current) menuButtonRef.current?.focus()
      wasOpenRef.current = false
      return undefined
    }

    wasOpenRef.current = true
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    main?.setAttribute('inert', '')
    footer?.setAttribute('inert', '')

    const focusFirstLink = window.setTimeout(() => {
      navRef.current?.querySelector('a')?.focus()
    }, 80)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }

      if (event.key !== 'Tab') return
      const focusable = [
        menuButtonRef.current,
        ...Array.from(navRef.current?.querySelectorAll('a') ?? []),
      ].filter(Boolean)
      const first = focusable[0]
      const last = focusable.at(-1)

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(focusFirstLink)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      main?.removeAttribute('inert')
      footer?.removeAttribute('inert')
    }
  }, [open])

  return (
    <header className="site-header">
      <BrandMark />
      <button
        ref={menuButtonRef}
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={25} weight="bold" /> : <List size={25} weight="bold" />}
      </button>
      <nav
        ref={navRef}
        id="primary-navigation"
        className={open ? 'site-nav is-open' : 'site-nav'}
        aria-label="Navegação principal"
      >
        <a href="#trabalhos" onClick={close}>Trabalhos</a>
        <a href="#inicio" onClick={close}>Início</a>
        <a href="#sobre" onClick={close}>Sobre</a>
        <a href="#contato" onClick={close}>Contato</a>
      </nav>
    </header>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()
  const rise = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="hero" id="inicio">
      <div className="hero-copy">
        <Motion.h1 {...rise(0.05)}>
          <span>Isabella</span>
          <span>Monteiro</span>
        </Motion.h1>
        <Motion.p className="hero-brush" {...rise(0.13)}>
          <span aria-hidden="true">*</span>PORTFOLIO<span aria-hidden="true">*</span>
        </Motion.p>
        <Motion.div className="hero-details" {...rise(0.22)}>
          <p className="hero-year">2026</p>
          <p>Atriz de teatro e audiovisual em Curitiba. Presença de palco, escuta e trabalho construído entre o Paraná e o Rio Grande do Sul.</p>
          <a href="#trabalhos">Ver trabalhos <ArrowDown size={18} weight="bold" /></a>
        </Motion.div>
      </div>

      <Motion.div className="hero-collage" {...rise(0.18)} aria-label="Retratos e cena de Isabella Monteiro">
        <span className="hero-color-sheet" aria-hidden="true" />
        <figure className="hero-portrait-main">
          <img src="/images/isabella-retrato-principal.webp" alt="Retrato de Isabella Monteiro usando jaqueta preta" fetchPriority="high" />
        </figure>
        <figure className="hero-portrait-side">
          <img src="/images/isabella-retrato-perfil.webp" alt="Retrato de perfil de Isabella Monteiro" />
        </figure>
        <figure className="hero-scene">
          <img src="/images/black-tie-1.webp" alt="Isabella Monteiro no palco em Elas não Usam Black-Tie" />
        </figure>
      </Motion.div>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="sobre">
      <div className="about-image">
        <span className="about-block" aria-hidden="true" />
        <img src="/images/isabella-retrato-frente.webp" alt="Retrato de Isabella Monteiro" loading="eager" />
        <strong aria-hidden="true">ATRIZ</strong>
      </div>
      <div className="about-copy">
        <h2>Palco.<br />Câmera.<br /><em>Presença.</em></h2>
        <p>
          Atriz curitibana, Isabella iniciou sua carreira no Rio Grande do Sul em 2022, no teatro Paranóia Produções. Em 2023, integrou a companhia Asas de Papel, ampliando sua atuação para festivais, novas montagens e conteúdos audiovisuais.
        </p>
        <p>
          De volta a Curitiba em 2025, ingressou no Barracão Encena, onde cursa Teatro e TV com conclusão prevista para 2027. Também atua em curtas e filmes realizados por alunos da PUCPR.
        </p>
        <dl className="casting-data" aria-label="Dados físicos">
          <div><dt>Altura</dt><dd>1,58 m</dd></div>
          <div><dt>Peso</dt><dd>60 kg</dd></div>
          <div><dt>Manequim</dt><dd>M</dd></div>
          <div><dt>Calçado</dt><dd>36</dd></div>
        </dl>
      </div>
    </section>
  )
}

function WorkCard({ work, index }) {
  const reduceMotion = useReducedMotion()

  return (
    <Motion.article
      className={`work-card tone-${work.tone}`}
      initial={reduceMotion ? false : { opacity: 0.96, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      whileHover="hover"
      whileFocus="hover"
      tabIndex="0"
      aria-label={`${work.title}, ${work.year}`}
    >
      <div className="work-copy">
        <p className="work-kind">{work.medium}</p>
        <h3>{work.title}</h3>
        <p className="work-year">{work.year}</p>
        <dl>
          <div><dt>Direção</dt><dd>{work.direction}</dd></div>
          <div><dt>Texto</dt><dd>{work.script}</dd></div>
          <div><dt>Produção</dt><dd>{work.venue}</dd></div>
        </dl>
      </div>
      <div className="work-media">
        <Motion.img
          className="work-image work-image-primary"
          src={work.images[0]}
          alt={work.alt}
          loading={index < 2 ? 'eager' : 'lazy'}
          variants={{ rest: { opacity: 1, scale: 1 }, hover: { opacity: 0, scale: 1.015 } }}
          initial="rest"
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        />
        <Motion.img
          className="work-image work-image-secondary"
          src={work.images[1]}
          alt=""
          loading={index < 2 ? 'eager' : 'lazy'}
          aria-hidden="true"
          variants={{ rest: { opacity: 0, scale: 1.02 }, hover: { opacity: 1, scale: 1 } }}
          initial="rest"
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        />
        <span className="work-mark" aria-hidden="true">*</span>
      </div>
    </Motion.article>
  )
}

function Work() {
  return (
    <section className="work" id="trabalhos">
      <div className="work-heading">
        <h2>TRABALHOS</h2>
        <p>Teatro e audiovisual. Passe o cursor ou use o foco para trocar o momento de cada obra.</p>
      </div>
      <div className="work-list">
        {works.map((work, index) => <WorkCard key={work.title} work={work} index={index} />)}
      </div>
    </section>
  )
}

function Trajectory() {
  return (
    <section className="trajectory" id="trajetoria">
      <div className="trajectory-heading">
        <h2>FORA<br />DE CENA</h2>
        <p>Produção, técnica e bastidores também formam o olhar de Isabella sobre cada trabalho.</p>
      </div>
      <div className="backstage-collage" aria-label="Bastidores de produções audiovisuais">
        <img src="/images/bastidores-aquela-cancao.webp" alt="Isabella Monteiro trabalhando em uma produção audiovisual" loading="lazy" />
        <img src="/images/bastidores-quem-me-dera.webp" alt="Registro de bastidores feito por Isabella Monteiro" loading="lazy" />
      </div>
      <ul className="backstage-list">
        {backstage.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contato">
      <div className="contact-title">
        <p>Para testes, teatro, cinema e audiovisual.</p>
        <h2>CONTATO</h2>
      </div>
      <div className="contact-links">
        <a href="https://wa.me/5541995027607" target="_blank" rel="noreferrer">
          <WhatsappLogo size={30} weight="regular" />
          <span><small>WhatsApp</small>41 99502-7607</span>
          <ArrowUpRight size={22} weight="bold" />
        </a>
        <a href="https://instagram.com/isamontwiro" target="_blank" rel="noreferrer">
          <InstagramLogo size={30} weight="regular" />
          <span><small>Instagram</small>@isamontwiro</span>
          <ArrowUpRight size={22} weight="bold" />
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <BrandMark />
      <p>Portfólio de atriz / 2026</p>
      <a href="#inicio">Voltar ao início</a>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Work />
        <Trajectory />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
