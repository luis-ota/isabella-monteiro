import { useEffect, useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  InstagramLogo,
  List,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react'
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

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
    layout: 'tall',
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
    layout: 'wide',
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
    layout: 'standard',
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
    layout: 'wide',
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
    layout: 'standard',
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
    layout: 'tall',
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
      <span>Isabella</span>
      <strong>Monteiro</strong>
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
        <a href="#sobre" onClick={close}>Sobre</a>
        <a href="#trabalhos" onClick={close}>Trabalhos</a>
        <a href="#trajetoria" onClick={close}>Trajetória</a>
        <a href="#contato" onClick={close}>Contato</a>
      </nav>
    </header>
  )
}

function HeroCollage() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const yPortrait = useTransform(scrollYProgress, [0, 0.22], [0, reduceMotion ? 0 : 42])
  const yStage = useTransform(scrollYProgress, [0, 0.22], [0, reduceMotion ? 0 : -34])
  const rotateStage = useTransform(scrollYProgress, [0, 0.22], [-4, reduceMotion ? -4 : -1])

  const reveal = (delay) => ({
    initial: reduceMotion ? false : { opacity: 1, y: 24, rotate: delay ? -7 : 2 },
    animate: { opacity: 1, y: 0, rotate: delay ? -4 : 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <div className="hero-collage" aria-label="Retratos e cenas de Isabella Monteiro">
      <Motion.figure className="hero-photo hero-photo-main" style={{ y: yPortrait }} {...reveal(0.1)}>
        <img
          src="/images/isabella-retrato-principal.webp"
          alt="Retrato de Isabella Monteiro usando jaqueta preta"
          fetchPriority="high"
        />
      </Motion.figure>
      <Motion.figure className="hero-photo hero-photo-stage" style={{ y: yStage, rotate: rotateStage }} {...reveal(0.28)}>
        <img
          src="/images/black-tie-1.webp"
          alt="Isabella Monteiro no palco em Elas não Usam Black-Tie"
        />
      </Motion.figure>
      <Motion.figure className="hero-photo hero-photo-film" {...reveal(0.42)}>
        <img src="/images/ecos-1.webp" alt="Isabella Monteiro em cena no filme Ecos" />
      </Motion.figure>
      <span className="tape tape-one" aria-hidden="true" />
      <span className="tape tape-two" aria-hidden="true" />
    </div>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero" id="inicio">
      <Motion.div
        className="hero-copy"
        initial={reduceMotion ? false : { opacity: 1, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1>
          <span>Isabella</span>
          <strong>Monteiro</strong>
        </h1>
        <p className="hero-intro">Atriz de teatro e audiovisual. Presença de palco, escuta e histórias construídas entre Curitiba e o Rio Grande do Sul.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#trabalhos">
            Ver trabalhos <ArrowDownRight size={20} weight="bold" />
          </a>
          <a className="text-link" href="https://instagram.com/isamontwiro" target="_blank" rel="noreferrer">
            @isamontwiro <ArrowUpRight size={18} weight="bold" />
          </a>
        </div>
      </Motion.div>
      <HeroCollage />
    </section>
  )
}

function About() {
  return (
    <section className="about section-shell" id="sobre">
      <div className="about-portrait">
        <img src="/images/isabella-retrato-perfil.webp" alt="Retrato de perfil de Isabella Monteiro" loading="eager" />
        <span className="about-year" aria-hidden="true">2026</span>
      </div>
      <div className="about-copy">
        <h2>Uma trajetória entre palco e câmera.</h2>
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

function WorkCard({ work }) {
  return (
    <Motion.article
      className={`work-card work-card-${work.layout}`}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      tabIndex="0"
      aria-label={`${work.title}, ${work.year}`}
    >
      <div className="work-media">
        <Motion.img
          className="work-image work-image-primary"
          src={work.images[0]}
          alt={work.alt}
          loading="eager"
          variants={{ rest: { opacity: 1, scale: 1 }, hover: { opacity: 0, scale: 1.015 } }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
        <Motion.img
          className="work-image work-image-secondary"
          src={work.images[1]}
          alt=""
          loading="eager"
          aria-hidden="true"
          variants={{ rest: { opacity: 0, scale: 1.02 }, hover: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="work-caption">
        <div className="work-title-row">
          <h3>{work.title}</h3>
          <span>{work.year}</span>
        </div>
        <p>{work.medium} / Direção de {work.direction}</p>
        <dl>
          <div><dt>Texto</dt><dd>{work.script}</dd></div>
          <div><dt>Produção</dt><dd>{work.venue}</dd></div>
        </dl>
      </div>
    </Motion.article>
  )
}

function Work() {
  return (
    <section className="work section-shell" id="trabalhos">
      <div className="section-heading">
        <h2>Trabalhos selecionados</h2>
        <p>Passe o cursor ou use o foco do teclado para ver outro momento de cada obra.</p>
      </div>
      <div className="work-grid">
          {works.map((work) => <WorkCard key={work.title} work={work} />)}
      </div>
    </section>
  )
}

function Trajectory() {
  return (
    <section className="trajectory" id="trajetoria">
      <div className="trajectory-inner section-shell">
        <div className="trajectory-intro">
          <h2>O trabalho também acontece fora de cena.</h2>
          <p>Experiências em produção, técnica e bastidores que aprofundam o olhar de Isabella sobre cada montagem.</p>
        </div>
        <div className="backstage-collage" aria-label="Bastidores de produções audiovisuais">
          <img src="/images/bastidores-aquela-cancao.webp" alt="Isabella Monteiro trabalhando em uma produção audiovisual" loading="eager" />
          <img src="/images/bastidores-quem-me-dera.webp" alt="Registro de bastidores feito por Isabella Monteiro" loading="eager" />
        </div>
        <ul className="backstage-list">
          {backstage.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact section-shell" id="contato">
      <div className="contact-heading">
        <h2>Vamos conversar?</h2>
        <p>Para testes, projetos de teatro, cinema e audiovisual.</p>
      </div>
      <div className="contact-links">
        <a href="https://wa.me/5541995027607" target="_blank" rel="noreferrer">
          <WhatsappLogo size={32} weight="regular" />
          <span><small>WhatsApp</small>41 99502-7607</span>
          <ArrowUpRight size={24} weight="bold" />
        </a>
        <a href="https://instagram.com/isamontwiro" target="_blank" rel="noreferrer">
          <InstagramLogo size={32} weight="regular" />
          <span><small>Instagram</small>@isamontwiro</span>
          <ArrowUpRight size={24} weight="bold" />
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
