import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, Clock, Mail, MapPin, Menu, Moon, Phone, Sun, Users, Wrench, X } from 'lucide-react';

const services = [
    { slug: 'adhoc', n: '01', title: 'Adhoc services', text: 'On-call mining and drilling assistance for urgent technical support, maintenance, supervision and operational guidance.', image: '/hero-drill.jpg' },
    { slug: 'maintenance', n: '02', title: 'Equipment maintenance', text: 'Planned and corrective maintenance focused on availability, reliability and equipment life.', image: '/hero-drill.jpg' },
    { slug: 'drilling', n: '03', title: 'Drill assistance', text: 'Troubleshooting, maintenance, deployment and field supervision for surface drilling equipment.', image: '/hero-drill.jpg' }
];

const serviceDetails = {
    adhoc: {
        title: 'Adhoc Services',
        intro: 'Mineswell Services provides on-call mining and drilling assistance for clients requiring immediate technical support, maintenance, supervision, or operational guidance at mining locations.',
        cards: [
            [Clock, 'On-Demand Support', 'Flexible support services whenever required, helping reduce downtime and accelerate operational recovery.'],
            [Wrench, 'Drill Assistance', 'Technical assistance for troubleshooting, maintenance, deployment and supervision of drilling equipment, especially surface drills.'],
            [Users, 'Experienced Team', 'Practical field support backed by mining-equipment and drilling experience.']
        ],
        detail: 'Our non-contract service model is designed for mining sites that need quick and efficient technical assistance without a long-term commitment.'
    },
    maintenance: {
        title: 'Equipment Maintenance',
        intro: 'Structured preventive and corrective maintenance support for mining equipment, with a focus on safe execution, uptime and dependable field performance.',
        cards: [
            [Wrench, 'Preventive Maintenance', 'Planned inspections and maintenance activities intended to reduce unplanned downtime.'],
            [Clock, 'Breakdown Support', 'Responsive troubleshooting and repair assistance for equipment failures in the field.'],
            [Users, 'Site Coordination', 'Practical coordination with site teams to execute maintenance safely and efficiently.']
        ],
        detail: 'Mineswell combines field-oriented troubleshooting with disciplined maintenance execution to support equipment availability.'
    },
    drilling: {
        title: 'Drill Assistance',
        intro: 'Specialist field support for surface drilling equipment covering troubleshooting, maintenance, deployment, supervision and operational guidance.',
        cards: [
            [Wrench, 'Technical Troubleshooting', 'Systematic fault finding and technical support for drill systems and components.'],
            [Clock, 'Deployment Support', 'Assistance during commissioning, deployment and field-service activities.'],
            [Users, 'Operational Guidance', 'Practical technical guidance for site teams working with drilling equipment.']
        ],
        detail: 'The service is designed around the realities of mine-site drilling, from urgent fault support to planned technical assistance.'
    }
};

const capabilities = ['Preventive maintenance', 'Breakdown support', 'Mechanical repairs', 'Equipment inspection', 'Shutdown support', 'Site coordination'];
const sections = ['home', 'about', 'services', 'projects', 'contact'];
const whatsapp = 'https://wa.me/919199362531?text=Hello%20Mineswell%20Services%2C%20I%20would%20like%20to%20request%20support.';
const email = 'sumeet.kumar@mineswell.co.in';

// Service pages live at #/services/<slug> so the browser Back button and shared links work.
const slugFromHash = () => {
    const m = window.location.hash.match(/^#\/services\/([\w-]+)/);
    return m && serviceDetails[m[1]] ? m[1] : null;
};

const initialDark = () => {
    try {
        if (localStorage.theme) return localStorage.theme !== 'light';
    } catch { /* storage unavailable */ }
    return !window.matchMedia?.('(prefers-color-scheme: light)').matches;
};

function App() {
    const [servicePage, setServicePage] = useState(slugFromHash);
    const [dark, setDark] = useState(initialDark);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const theme = dark ? 'dark' : 'light';
        document.documentElement.dataset.theme = theme;
        document.querySelector('meta[name=theme-color]')?.setAttribute('content', dark ? '#090b10' : '#f6f7f9');
        try { localStorage.theme = theme } catch { /* storage unavailable */ }
    }, [dark]);

    useEffect(() => {
        const onHash = () => setServicePage(slugFromHash());
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);

    useEffect(() => {
        const data = servicePage && serviceDetails[servicePage];
        document.title = data ? `${data.title} | Mineswell Services` : 'Mineswell Services | Engineering that keeps mining moving';
        if (data) window.scrollTo({ top: 0, behavior: 'instant' });
    }, [servicePage]);

    const go = id => {
        setOpen(false);
        if (servicePage) {
            history.pushState(null, '', window.location.pathname);
            setServicePage(null);
        }
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 0);
    };
    const openService = slug => { window.location.hash = `#/services/${slug}` };

    const header = (
        <header className="nav">
            <a className="brand" href="#home" onClick={e => { e.preventDefault(); go('home') }} aria-label="Mineswell Services – home">
                <img src="/logo.svg" alt="" width="54" height="54" /><span><b>MINESWELL</b><small>SERVICES</small></span>
            </a>
            {!servicePage && (
                <nav id="site-nav" className={open ? 'links open' : 'links'} aria-label="Main">
                    {sections.map(x => <button key={x} onClick={() => go(x)}>{x}</button>)}
                </nav>
            )}
            <div className="navActions">
                <button className="theme" onClick={() => setDark(!dark)} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>{dark ? <Sun /> : <Moon />}</button>
                <a className="quote" href={whatsapp} target="_blank" rel="noreferrer">Request support <ArrowUpRight /></a>
                {!servicePage && (
                    <button className="hamb" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="site-nav">{open ? <X /> : <Menu />}</button>
                )}
            </div>
        </header>
    );

    if (servicePage) {
        const data = serviceDetails[servicePage];
        return <div className="site">
            {header}
            <main className="servicePage">
                <button className="back" onClick={() => go('services')}><ArrowLeft /> All services</button>
                <span className="kicker">Mineswell field services</span>
                <h1>{data.title}</h1>
                <p className="serviceIntro">{data.intro}</p>
                <div className="detailCards">{data.cards.map(([Icon, t, d]) => <article key={t}><Icon aria-hidden="true" /><h3>{t}</h3><p>{d}</p></article>)}</div>
                <section className="serviceDetail">
                    <h2>Reliable mining support.</h2>
                    <p>{data.detail}</p>
                    <a className="primary" href={whatsapp} target="_blank" rel="noreferrer">Discuss your requirement <ArrowUpRight /></a>
                </section>
                <nav className="otherServices" aria-label="Other services">
                    {services.filter(s => s.slug !== servicePage).map(s => (
                        <a key={s.slug} href={`#/services/${s.slug}`}><span>{s.n}</span>{s.title}<ArrowUpRight /></a>
                    ))}
                </nav>
            </main>
            <Footer go={go} />
        </div>;
    }

    return <div className="site">
        <a className="skip" href="#about">Skip to content</a>
        {header}
        <main>
            <section id="home" className="hero"><div className="heroMedia" /><div className="heroShade" /><div className="heroGrid" />
                <div className="heroContent">
                    <div className="eyebrow"><i /> Mining & engineering support</div>
                    <h1>RELIABLE<br />ENGINEERING.<br /><em>BUILT FOR MINING.</em></h1>
                    <p>Maintenance, repair and field support for drilling equipment operating in demanding mining environments.</p>
                    <div className="heroCtas">
                        <button className="primary" onClick={() => go('services')}>Explore services <ArrowUpRight /></button>
                        <button className="textBtn" onClick={() => go('about')}>Discover Mineswell <ChevronDown /></button>
                    </div>
                </div>
                <div className="heroFoot"><span>Ranchi, India</span><span className="scroll">Scroll to explore <i /></span></div>
            </section>
            <section id="about" className="section about"><div><span className="kicker">Who we are</span><h2>ENGINEERING FOR<br /><span>DEMANDING OPERATIONS.</span></h2></div><div className="aboutCopy"><p>Mineswell Services supports mining operations with dependable equipment maintenance, responsive technical support and practical engineering capability.</p><p>Our focus is simple: work safely, solve problems efficiently and help customers keep critical equipment moving.</p><button className="linkBtn" onClick={() => go('contact')}>Work with us <ArrowUpRight /></button></div></section>
            <section id="services" className="section services">
                <div className="sectionHead"><div><span className="kicker">What we do</span><h2>OUR SERVICES.</h2></div><p>Practical expertise delivered where performance, safety and uptime matter most.</p></div>
                <div className="serviceGrid">{services.map((s, i) => (
                    <article className={'card c' + i} key={s.slug} onClick={() => openService(s.slug)}>
                        <img src={s.image} alt="" loading="lazy" decoding="async" />
                        <div className="cardOverlay" />
                        <span>{s.n}</span>
                        <div>
                            <h3>{s.title}</h3>
                            <p>{s.text}</p>
                            <a className="cardLink" href={`#/services/${s.slug}`} onClick={e => e.stopPropagation()}>View service<span className="sr"> – {s.title}</span> <ArrowUpRight /></a>
                        </div>
                    </article>
                ))}</div>
            </section>
            <section id="projects" className="feature"><div className="featureImage" role="img" aria-label="Engineer working on industrial equipment" /><div className="featureContent"><span className="kicker">Field capability</span><h2>EXPERTISE THAT<br />KEEPS MINING<br /><span>MOVING.</span></h2><p>From scheduled maintenance to urgent site support, our teams bring disciplined execution and a practical understanding of heavy equipment.</p><div className="checks">{capabilities.map(x => <span key={x}><Check aria-hidden="true" />{x}</span>)}</div></div></section>
            <section className="stats" aria-label="Our commitments"><div><strong>24/7</strong><span>Support mindset</span></div><div><strong>100%</strong><span>Safety focused</span></div><div><strong>360°</strong><span>Service approach</span></div><div><strong>1</strong><span>Accountable partner</span></div></section>
            <section id="contact" className="contact"><div><span className="kicker">Start a conversation</span><h2>HAVE A PROJECT<br />IN MIND?</h2><p>Tell us about your equipment, site or service requirement. We will respond with a practical next step.</p></div><a className="contactCircle" href={`mailto:${email}`}><span>Talk to us</span><ArrowUpRight /></a></section>
        </main>
        <Footer go={go} />
        <img src="/web.png" alt="" aria-hidden="true" className="fixed-bottom-left" />
    </div>;
}

function Footer({ go }) {
    return <footer>
        <div className="footerBrand"><img src="/logo.svg" alt="" width="64" height="64" /><div><b>MINESWELL SERVICES</b><p>Engineering that keeps mining moving.</p></div></div>
        <div><h4>Contact</h4><a href="tel:+919199262531"><Phone aria-hidden="true" />+91 91992 62531</a><a href={`mailto:${email}`}><Mail aria-hidden="true" />{email}</a><span><MapPin aria-hidden="true" />Partatoli, Jaldra, Rourkela, Odisha</span></div>
        <div><h4>Navigation</h4>{['About', 'Services', 'Projects', 'Contact'].map(x => <button key={x} onClick={() => go(x.toLowerCase())}>{x}</button>)}</div>
        <div className="legal">© {new Date().getFullYear()} Mineswell Services<br />All rights reserved.</div>
    </footer>;
}

export default App;
