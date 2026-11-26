import { useEffect, useState } from 'react';
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Check,
    Clock,
    Cog,
    Gauge,
    Pickaxe,
    Mail,
    MapPin,
    Menu,
    MessageCircle,
    Moon,
    Phone,
    ShieldCheck,
    Siren,
    Sun,
    Users,
    Wrench,
    X,
} from 'lucide-react';

const services = [
    {
        slug: 'adhoc',
        n: '01',
        title: 'Adhoc services',
        Icon: Siren,
        text: 'On-call mining and drilling assistance for urgent technical support, maintenance, supervision and operational guidance.',
    },
    {
        slug: 'maintenance',
        n: '02',
        title: 'Equipment maintenance',
        Icon: Cog,
        text: 'Planned and corrective maintenance focused on availability, reliability and equipment life.',
    },
    {
        slug: 'drilling',
        n: '03',
        title: 'Drilling assistance',
        Icon: Pickaxe,
        text: 'Troubleshooting, maintenance, deployment and field supervision for surface drilling equipment.',
    },
];

const serviceDetails = {
    adhoc: {
        title: 'Adhoc Services',
        intro: 'Mineswell Services provides on-call mining and drilling assistance for clients requiring immediate technical support, maintenance, supervision, or operational guidance at mining locations.',
        cards: [
            [
                Clock,
                'On-Demand Support',
                'Flexible support services whenever required, helping reduce downtime and accelerate operational recovery.',
            ],
            [
                Wrench,
                'Drilling assistance',
                'Technical assistance for troubleshooting, maintenance, deployment and supervision of drilling equipment, especially surface drills.',
            ],
            [
                Users,
                'Experienced Team',
                'Practical field support backed by mining-equipment and drilling experience.',
            ],
        ],
        detail: 'Our non-contract service model is designed for mining sites that need quick and efficient technical assistance without a long-term commitment.',
    },
    maintenance: {
        title: 'Equipment Maintenance',
        intro: 'Structured preventive and corrective maintenance support for mining equipment, with a focus on safe execution, uptime and dependable field performance.',
        cards: [
            [
                Wrench,
                'Preventive Maintenance',
                'Planned inspections and maintenance activities intended to reduce unplanned downtime.',
            ],
            [
                Clock,
                'Breakdown Support',
                'Responsive troubleshooting and repair assistance for equipment failures in the field.',
            ],
            [
                Users,
                'Site Coordination',
                'Practical coordination with site teams to execute maintenance safely and efficiently.',
            ],
        ],
        detail: 'Mineswell combines field-oriented troubleshooting with disciplined maintenance execution to support equipment availability.',
    },
    drilling: {
        title: 'Drilling assistance',
        intro: 'Specialist field support for surface drilling equipment covering troubleshooting, maintenance, deployment, supervision and operational guidance.',
        cards: [
            [
                Wrench,
                'Technical Troubleshooting',
                'Systematic fault finding and technical support for drill systems and components.',
            ],
            [
                Clock,
                'Deployment Support',
                'Assistance during commissioning, deployment and field-service activities.',
            ],
            [
                Users,
                'Operational Guidance',
                'Practical technical guidance for site teams working with drilling equipment.',
            ],
        ],
        detail: 'The service is designed around the realities of mine-site drilling, from urgent fault support to planned technical assistance.',
    },
};

const capabilities = [
    'Preventive maintenance',
    'Breakdown support',
    'Mechanical repairs',
    'Equipment inspection',
    'Shutdown support',
    'Site coordination',
];
// Main nav. Entries are home-page section ids, except those in `pages`, which open a sub-page.
const sections = ['home', 'about', 'services', 'projects', 'clients', 'contact'];
const pages = ['about'];

// About page
const values = [
    [
        ShieldCheck,
        'Work safely',
        'Safe execution comes first on every site, for our team and for the customer’s people and equipment.',
    ],
    [
        Wrench,
        'Solve problems efficiently',
        'Systematic troubleshooting and practical engineering that get to the root cause without wasted time.',
    ],
    [
        Gauge,
        'Keep equipment moving',
        'Everything we do is measured by availability: less downtime and more productive hours on site.',
    ],
];

// Managing Director profile.
// `photo` is optional: put a file in public/team/ and use e.g. '/team/sumeet-kumar.jpg'.
const md = { name: 'Sumeet Kumar', role: 'Managing Director', photo: '/sumeet-kumar.jpg' };
const mdHighlights = [
    ['~20', 'Years of experience'],
    ['Service', 'Team leadership'],
    ['Sales', 'Business development'],
];
const mdCareer = [
    [
        'Technical support',
        'Started in a hands-on technical support role, building a sound, practical understanding of surface drilling equipment in the field.',
    ],
    [
        'Service management',
        'Held management roles at Sandvik and Revathi Equipment India Limited, leading service teams responsible for drilling equipment maintenance and support.',
    ],
    [
        'Business development',
        'Worked closely with sales teams on business development, connecting customer needs with the right service and equipment solutions.',
    ],
    [
        'Managing Director, Mineswell Services',
        'Today leads Mineswell, bringing field experience and management discipline to every customer site.',
    ],
];

// TEMPLATE DATA: replace with real clients before going live.
// `logo` is optional: put files in public/clients/ and use e.g. '/clients/acme.svg'.
// Without a logo, the card shows the client's initials.
const clients = [
    { name: 'Apeksha Mining Engineers', sector: 'Mining', location: 'Odisha, India', logo: 'clients/apeksha-logo-updated.jpg' },
    { name: 'Kalinga Commercial Corporation Limited', sector: 'Iron ore mining', location: 'Jharkhand, India', logo: 'clients/kcc.png' },

    { name: '', sector: '', location: '', logo: null },
    // { name: 'Client Name', sector: 'Infrastructure & tunnelling', location: 'India', logo: null },
];
// Contact details
const email = 'sumeet.kumar@mineswell.co.in';
const phone = '+91 91992 62531';
const tel = 'tel:+91 91992 62531';

// WhatsApp chat links with a pre-filled first message
const waLink = message => `https://wa.me/919199262531?text=${encodeURIComponent(message)}`;
const whatsapp = waLink('Hello Mineswell Services, I would like to request support.');
const talkToUs = waLink('Hello Mineswell Services, I would like to discuss a project.');

// Sub-pages use hash routes so the browser Back button and shared links work:
// #/services/<slug> → service detail, #/about → about page. Anything else → home.
const routeFromHash = () => {
    const h = window.location.hash;
    const p = h.match(/^#\/(\w+)\/?$/);
    if (p && pages.includes(p[1])) return p[1];
    const m = h.match(/^#\/services\/([\w-]+)/);
    return m && serviceDetails[m[1]] ? `service:${m[1]}` : null;
};

const initials = name =>
    name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(w => w[0].toUpperCase())
        .join('');

const initialDark = () => {
    try {
        if (localStorage.theme) return localStorage.theme !== 'light';
    } catch {
        /* storage unavailable */
    }
    return !window.matchMedia?.('(prefers-color-scheme: light)').matches;
};

function App() {
    const [route, setRoute] = useState(routeFromHash);
    const [dark, setDark] = useState(initialDark);
    const [open, setOpen] = useState(false);
    const servicePage = route?.startsWith('service:') ? route.slice(8) : null;

    // Scroll reveal: elements marked data-reveal get the `in` class
    // the first time they enter the viewport.
    useEffect(() => {
        const els = document.querySelectorAll('[data-reveal]:not(.in)');
        if (!('IntersectionObserver' in window)) {
            els.forEach(el => el.classList.add('in'));
            return;
        }
        const io = new IntersectionObserver(
            entries =>
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in');
                        io.unobserve(e.target);
                    }
                }),
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );
        els.forEach(el => io.observe(el));
        return () => io.disconnect();
    }, [route]);

    useEffect(() => {
        const theme = dark ? 'dark' : 'light';
        document.documentElement.dataset.theme = theme;
        document
            .querySelector('meta[name=theme-color]')
            ?.setAttribute('content', dark ? '#090b10' : '#f6f7f9');
        try {
            localStorage.theme = theme;
        } catch {
            /* storage unavailable */
        }
    }, [dark]);

    useEffect(() => {
        const onHash = () => setRoute(routeFromHash());
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);

    useEffect(() => {
        const title =
            { about: 'About Us' }[route] || (servicePage && serviceDetails[servicePage].title);
        document.title = title
            ? `${title} | Mineswell Services`
            : 'Mineswell Services | Engineering that keeps mining moving';
        if (route) window.scrollTo({ top: 0, behavior: 'instant' });
    }, [route]);

    const go = id => {
        setOpen(false);
        if (pages.includes(id)) {
            window.location.hash = `#/${id}`;
            return;
        }
        if (route) {
            history.pushState(null, '', window.location.pathname);
            setRoute(null);
        }
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 0);
    };
    const openService = slug => {
        window.location.hash = `#/services/${slug}`;
    };

    // Decorative corner graphic, fixed above all content on every page.
    const cornerArt = (
        <img src="/web.png" alt="" aria-hidden="true" className="fixed-bottom-left" />
    );

    const header = (
        <header className="nav">
            <a
                className="brand"
                href="#home"
                onClick={e => {
                    e.preventDefault();
                    go('home');
                }}
                aria-label="Mineswell Services – home"
            >
                <img src="/logo.svg" alt="" width="54" height="54" />
                <span>
                    <b>MINESWELL</b>
                    <small>SERVICES</small>
                </span>
            </a>
            {!route && (
                <nav id="site-nav" className={open ? 'links open' : 'links'} aria-label="Main">
                    {sections.map(x => (
                        <button key={x} onClick={() => go(x)}>
                            {x}
                        </button>
                    ))}
                </nav>
            )}
            <div className="navActions">
                <button
                    className="theme"
                    onClick={() => setDark(!dark)}
                    aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
                >
                    {dark ? <Sun /> : <Moon />}
                </button>
                <a className="quote" href={whatsapp} target="_blank" rel="noreferrer">
                    Request support <ArrowUpRight />
                </a>
                {!route && (
                    <button
                        className="hamb"
                        onClick={() => setOpen(!open)}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        aria-controls="site-nav"
                    >
                        {open ? <X /> : <Menu />}
                    </button>
                )}
            </div>
        </header>
    );

    if (servicePage) {
        const data = serviceDetails[servicePage];
        return (
            <div className="site">
                {header}
                <main className="servicePage">
                    <button className="back" onClick={() => go('services')}>
                        <ArrowLeft /> All services
                    </button>
                    <span className="kicker">Mineswell field services</span>
                    <h1>{data.title}</h1>
                    <p className="serviceIntro">{data.intro}</p>
                    <div className="detailCards" data-reveal="stagger">
                        {data.cards.map(([Icon, t, d]) => (
                            <article key={t}>
                                <Icon aria-hidden="true" />
                                <h3>{t}</h3>
                                <p>{d}</p>
                            </article>
                        ))}
                    </div>
                    <section className="serviceDetail" data-reveal="up">
                        <h2>Reliable mining support.</h2>
                        <p>{data.detail}</p>
                        <a className="primary" href={whatsapp} target="_blank" rel="noreferrer">
                            Discuss your requirement <ArrowUpRight />
                        </a>
                    </section>
                    <nav className="otherServices" aria-label="Other services" data-reveal="up">
                        {services
                            .filter(s => s.slug !== servicePage)
                            .map(s => (
                                <a key={s.slug} href={`#/services/${s.slug}`}>
                                    <span>{s.n}</span>
                                    {s.title}
                                    <ArrowUpRight />
                                </a>
                            ))}
                    </nav>
                </main>
                <Footer />
                {cornerArt}
            </div>
        );
    }

    if (route === 'about') {
        return (
            <div className="site">
                {header}
                <main className="servicePage aboutPage">
                    <button className="back" onClick={() => go('home')}>
                        <ArrowLeft /> Home
                    </button>
                    <span className="kicker">Who we are</span>
                    <h1>About Us</h1>
                    <p className="serviceIntro">
                        Mineswell Services supports mining operations with dependable equipment
                        maintenance, responsive technical support and practical engineering
                        capability.
                    </p>

                    <section className="aboutLead" data-reveal="up">
                        <h2>
                            ENGINEERING FOR
                            <br />
                            <span>DEMANDING OPERATIONS.</span>
                        </h2>
                        <p>
                            Our focus is simple: work safely, solve problems efficiently and help
                            customers keep critical equipment moving.
                        </p>
                    </section>

                    <div className="detailCards" data-reveal="stagger">
                        {values.map(([Icon, t, d]) => (
                            <article key={t}>
                                <Icon aria-hidden="true" />
                                <h3>{t}</h3>
                                <p>{d}</p>
                            </article>
                        ))}
                    </div>

                    <section className="mdProfile" aria-labelledby="md-name">
                        <div className="mdAside" data-reveal="up">
                            <div className="mdPhoto">
                                {md.photo ? (
                                    <img src={md.photo} alt={md.name} />
                                ) : (
                                    <span aria-hidden="true">{initials(md.name)}</span>
                                )}
                            </div>
                            <div className="mdStats">
                                {mdHighlights.map(([v, l]) => (
                                    <div key={l}>
                                        <strong>{v}</strong>
                                        <span>{l}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mdBody">
                            <div data-reveal="up">
                                <span className="kicker">Leadership</span>
                                <h2 id="md-name">{md.name}</h2>
                                <p className="mdRole">{md.role}</p>
                                <p>
                                    {md.name} brings close to 20 years of experience in the
                                    maintenance and service of surface drilling equipment. He began
                                    his career in a technical support role, building a sound,
                                    hands-on understanding of drill systems in the field.
                                </p>
                                <p>
                                    He went on to hold management roles at Sandvik and Revathi
                                    Equipment India Limited, leading service teams and working
                                    alongside sales teams on business development. That mix of field
                                    engineering, team leadership and customer focus shapes how
                                    Mineswell works today.
                                </p>
                            </div>
                            <ol className="timeline" data-reveal="stagger">
                                {mdCareer.map(([t, d]) => (
                                    <li key={t}>
                                        <h3>{t}</h3>
                                        <p>{d}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </section>

                    <section className="serviceDetail" data-reveal="up">
                        <h2>Work with us.</h2>
                        <p>
                            Tell us about your equipment, site or service requirement. We will
                            respond with a practical next step.
                        </p>
                        <a className="primary" href={talkToUs} target="_blank" rel="noreferrer">
                            Talk to us <ArrowUpRight />
                        </a>
                    </section>
                </main>
                <Footer />
                {cornerArt}
            </div>
        );
    }

    return (
        <div className="site">
            <a className="skip" href="#services">
                Skip to content
            </a>
            {header}
            <main>
                <section id="home" className="hero">
                    <div className="heroMedia" />
                    <div className="heroShade" />
                    <div className="heroGrid" />
                    <div className="heroContent">
                        <div className="eyebrow">
                            <i /> Mining & engineering support
                        </div>
                        <h1>
                            RELIABLE
                            <br />
                            ENGINEERING.
                            <br />
                            <em>BUILT FOR MINING.</em>
                        </h1>
                        <p>
                            Maintenance, repair and field support for drilling equipment operating
                            in demanding mining environments.
                        </p>
                        <div className="heroCtas">
                            <button className="primary" onClick={() => go('services')}>
                                Explore services <ArrowUpRight />
                            </button>
                            <button className="textBtn" onClick={() => go('about')}>
                                Discover Mineswell <ArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className="heroFoot">
                        <span>Rourkela, India</span>
                        <span className="scroll">
                            Scroll to explore <i />
                        </span>
                    </div>
                </section>
                <section id="services" className="section services">
                    <div className="sectionHead" data-reveal="up">
                        <div>
                            <span className="kicker">What we do</span>
                            <h2>OUR SERVICES.</h2>
                        </div>
                        <p>
                            Practical expertise delivered where performance, safety and uptime
                            matter most.
                        </p>
                    </div>
                    <div className="serviceGrid" data-reveal="group">
                        {services.map((s, i) => (
                            <article
                                className="card"
                                key={s.slug}
                                style={{ '--i': i }}
                                onClick={() => openService(s.slug)}
                            >
                                <div className="cardTop">
                                    {/* <span className="cardNum">{s.n}</span> */}
                                    <s.Icon className="cardIcon" aria-hidden="true" />
                                </div>
                                <div className="cardBody">
                                    <h3>{s.title}</h3>
                                    <div className="cardReveal">
                                        <div>
                                            <p>{s.text}</p>
                                            <a
                                                className="cardLink"
                                                href={`#/services/${s.slug}`}
                                                onClick={e => e.stopPropagation()}
                                            >
                                                View service<span className="sr"> – {s.title}</span>{' '}
                                                <ArrowUpRight />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
                <section id="projects" className="feature">
                    <div className="featureContent">
                        <div data-reveal="up">
                            <span className="kicker">Field capability</span>
                            <h2>
                                EXPERTISE THAT
                                <br />
                                KEEPS MINING
                                <br />
                                <span>MOVING.</span>
                            </h2>
                            <p>
                                From scheduled maintenance to urgent site support, our teams bring
                                disciplined execution and a practical understanding of heavy
                                equipment.
                            </p>
                        </div>
                        <div className="checks" data-reveal="stagger">
                            {capabilities.map(x => (
                                <span key={x}>
                                    <Check aria-hidden="true" />
                                    {x}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="stats" aria-label="Our commitments" data-reveal="stagger">
                    <div>
                        <strong>24/7</strong>
                        <span>Support mindset</span>
                    </div>
                    <div>
                        <strong>100%</strong>
                        <span>Safety focused</span>
                    </div>
                    <div>
                        <strong>360°</strong>
                        <span>Service approach</span>
                    </div>
                    <div>
                        <strong>1</strong>
                        <span>Accountable partner</span>
                    </div>
                </section>
                <section id="clients" className="section clients">
                    <div className="sectionHead" data-reveal="up">
                        <div>
                            <span className="kicker">Who we work with</span>
                            <h2>OUR CLIENTS.</h2>
                        </div>
                        <p>
                            Mining operators, quarries and drilling contractors who trust Mineswell
                            on site.
                        </p>
                    </div>
                    {/*
                        Auto-scrolling strip: the list is rendered twice so the loop is
                        seamless; the second copy is hidden from screen readers.
                    */}
                    <div className="marquee" data-reveal="up">
                        <div className="marqueeTrack">
                            {[0, 1].map(copy => (
                                <ul
                                    className="marqueeGroup"
                                    key={copy}
                                    aria-hidden={copy === 1 || undefined}
                                >
                                    {clients.map((c, i) => (
                                        <li className="clientCard" key={i}>
                                            <div className="clientLogo">
                                                {c.logo ? (
                                                    <img
                                                        src={c.logo}
                                                        alt={copy ? '' : `${c.name} logo`}
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <span aria-hidden="true">
                                                        {initials(c.name)}
                                                    </span>
                                                )}
                                            </div>
                                            <h3>{c.name}</h3>
                                            <p>{c.sector}</p>
                                            <span className="clientLoc">
                                                <MapPin aria-hidden="true" />
                                                {c.location}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="contact" className="contact">
                    <div className="contactBg" aria-hidden="true" />
                    <div className="contactMain">
                        <div data-reveal="up">
                            <span className="kicker">Start a conversation</span>
                            <h2>
                                HAVE A PROJECT
                                <br />
                                IN MIND?
                            </h2>
                            <p>
                                Tell us about your equipment, site or service requirement. We will
                                respond with a practical next step.
                            </p>
                        </div>
                        <div className="contactMethods" data-reveal="stagger">
                            <a href={talkToUs} target="_blank" rel="noreferrer">
                                <MessageCircle aria-hidden="true" />
                                <span>
                                    <small>WhatsApp</small>
                                    {phone}
                                </span>
                            </a>
                            <a href={tel}>
                                <Phone aria-hidden="true" />
                                <span>
                                    <small>Call us</small>
                                    {phone}
                                </span>
                            </a>
                            <a href={`mailto:${email}`}>
                                <Mail aria-hidden="true" />
                                <span>
                                    <small>Email</small>
                                    {email}
                                </span>
                            </a>
                            <div>
                                <MapPin aria-hidden="true" />
                                <span>
                                    <small>Visit</small>Jalda, Rourkela, Odisha
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="contactCta" data-reveal="up">
                        <svg className="contactRing" viewBox="0 0 200 200" aria-hidden="true">
                            <defs>
                                <path
                                    id="ringPath"
                                    d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0"
                                />
                            </defs>
                            <text>
                                <textPath href="#ringPath" textLength="535" lengthAdjust="spacing">
                                    TALK TO US • FIELD SUPPORT • QUICK RESPONSE •
                                </textPath>
                            </text>
                        </svg>
                        <a
                            className="contactCircle"
                            href={talkToUs}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span>Talk to us</span>
                            <ArrowUpRight />
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
            {cornerArt}
        </div>
    );
}

function Footer() {
    return (
        <footer>
            <div className="footerBrand">
                <img src="/logo.svg" alt="" width="64" height="64" />
                <div>
                    <b>MINESWELL SERVICES</b>
                    <p>Engineering that keeps mining moving.</p>
                </div>
            </div>
            {/*
            <div>
                <h4>Contact</h4>
                <a href={tel}>
                    <Phone aria-hidden="true" />
                    {phone}
                </a>
                <a href={`mailto:${email}`}>
                    <Mail aria-hidden="true" />
                    {email}
                </a>
                <span>
                    <MapPin aria-hidden="true" />
                    1st Floor, Plot No. 379/3698, Partatoli, Jalda, Rourkela, Odisha 769043
                </span>
            </div>
            */}
            <div className="legal">
                © {new Date().getFullYear()} Mineswell Services
                <br />
                All rights reserved.
            </div>
        </footer>
    );
}

export default App;
