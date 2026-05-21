/* ============================================================
   PORTFOLIO — main.js
   Handles: i18n (FR/EN), mobile menu, sticky nav,
            scroll-reveal animations, current year
   ============================================================ */

/* ---------- TRANSLATIONS ----------
   Embedded directly in JS so the site works without a local server
   (browsers block fetch() of local JSON files via file:// protocol).
   To add a new language: copy one block and translate the values.
*/
const TRANSLATIONS = {
  fr: {
    nav: {
      logo_tag: "Portfolio",
      about: "À propos",
      projects: "Projets",
      skills: "Compétences",
      experience: "Expérience",
      contact: "Contact",
      cv: "CV"
    },
    hero: {
      tag: "Étudiant ingénieur en mécatronique · 4ᵉ année",
      subtitle: "Systèmes autonomes · Robotique · IA embarquée",
      cta_projects: "Voir mes projets",
      cta_contact: "Me contacter",
      meta_status_label: "Disponibilité",
      meta_status_value: "Stage · Avr – Sep 2026",
      meta_mobility_label: "Mobilité",
      meta_mobility_value: "Internationale",
      meta_location_label: "Basé à",
      meta_school_label: "École"
    },
    about: {
      heading: "À propos",
      lead: "Étudiant ingénieur motivé en mécatronique, avec une solide expérience pratique en conception de véhicules autonomes et en intelligence artificielle embarquée.",
      body: "Mes compétences couvrent la modélisation, la simulation et l'intégration de systèmes, appuyées par des bases solides en électronique et en informatique. Je recherche actuellement un stage de 4ᵉ année — partout dans le monde — pour approfondir mon expertise en robotique et en automatisation.",
      stat1: "Précision agent DQN",
      stat2: "Ans en IA & robotique",
      stat3: "Langues parlées",
      stat4: "Projets techniques"
    },
    projects: {
      heading: "Projets sélectionnés",
      sub: "Trois projets représentatifs de mon travail en robotique, IA et conception mécatronique.",
      cta_github: "Code GitHub →",
      cta_details: "En savoir plus →",
      robotic_arm: {
        context: "EEIA Summer School · Bénin",
        title: "Bras robotique — Tic-Tac-Toe par renforcement",
        desc: "Développement d'un agent de Deep Reinforcement Learning (DQN/PPO) pour le contrôle autonome d'un bras robotique jouant au tic-tac-toe, avec détection visuelle de l'état du plateau.",
        r1: "Agent DQN entraîné — précision 98 % sur partie complète",
        r2: "Pipeline vision YOLO pour la détection du plateau et des pièces",
        r3: "Inférence temps réel embarquée sur Raspberry Pi 5"
      },
      av: {
        context: "EEIA Summer School · Bénin",
        title: "Véhicule autonome — De la CAO à l'embarqué",
        desc: "Conception complète d'un véhicule autonome miniature : modélisation CAO, impression 3D, conception des circuits électroniques, modèles TinyML et vision par ordinateur sous TensorFlow.",
        r1: "Modèle vision TensorFlow — précision 97 %",
        r2: "Modèles TinyML déployés sur microcontrôleur",
        r3: "Chaîne complète CAO → électronique → embarqué"
      },
      flyrenov: {
        context: "Projet académique · ENSIL-ENSCI",
        title: "Flyrenov — Bobine motorisée pour drone",
        desc: "Conception d'un système de contrôle de tension et de longueur pour une bobine motorisée destinée au nettoyage de toitures par drone, modélisé sur la suite 3DEXPERIENCE.",
        r1: "Modélisation multi-physique sous 3DEXPERIENCE",
        r2: "Contrôle de tension à boucle fermée",
        r3: "Intégration mécanique / électronique / asservissement"
      }
    },
    skills: {
      heading: "Compétences techniques",
      ai_title: "Intelligence artificielle & vision",
      ai_rl: "Apprentissage par renforcement",
      robotics_title: "Robotique & perception",
      robotics_signal: "Traitement du signal",
      robotics_kalman: "Filtre de Kalman",
      robotics_planning: "Path Planning",
      robotics_sensors: "Capteurs (IMU, GPS, Lidar, caméras)",
      programming_title: "Programmation & électronique",
      programming_linux: "Linux embarqué",
      design_title: "Conception & R&D"
    },
    experience: {
      heading: "Expérience professionnelle",
      stellantis: {
        dates: "Juin – Juillet 2025",
        role: "Opérateur ligne d'assemblage — Stage",
        p1: "Opérations sur la ligne d'assemblage finale (Mokka, DS 3 Crossback).",
        p2: "Respect strict des quotas de production, des standards qualité et des protocoles sécurité."
      },
      vallet: {
        role: "Formateur — Robotique & IA",
        p1: "Formation d'étudiants aux concepts fondamentaux d'IA et de robotique via des ateliers pratiques."
      }
    },
    education: {
      heading: "Formation",
      engineering: "Cycle ingénieur — Mécatronique & Robotique (4ᵉ/5)",
      prep: "Classes préparatoires intégrées — Génie électrique",
      bac: "Baccalauréat scientifique — GPA 3.332"
    },
    contact: {
      heading: "Travaillons ensemble",
      lead: "À la recherche d'un stage en robotique, automatisation ou IA embarquée — disponible d'avril à septembre 2026, mobilité internationale."
    },
    footer: {
      build: "Construit avec HTML, CSS & JavaScript"
    }
  },

  en: {
    nav: {
      logo_tag: "Portfolio",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      experience: "Experience",
      contact: "Contact",
      cv: "CV"
    },
    hero: {
      tag: "Mechatronics Engineering Student · 4th Year",
      subtitle: "Autonomous Systems · Robotics · Embedded AI",
      cta_projects: "View my projects",
      cta_contact: "Get in touch",
      meta_status_label: "Availability",
      meta_status_value: "Internship · Apr – Sep 2026",
      meta_mobility_label: "Mobility",
      meta_mobility_value: "Worldwide",
      meta_location_label: "Based in",
      meta_school_label: "School"
    },
    about: {
      heading: "About",
      lead: "Motivated mechatronics engineering student with strong hands-on experience in autonomous vehicle design and embedded AI.",
      body: "My skills span modeling, simulation and system integration, backed by solid foundations in electrical engineering and computer science. I am currently seeking a 4th-year internship — worldwide — to deepen my expertise in robotics and automation.",
      stat1: "DQN agent accuracy",
      stat2: "Years in AI & robotics",
      stat3: "Languages spoken",
      stat4: "Technical projects"
    },
    projects: {
      heading: "Selected work",
      sub: "Three projects that best represent my work across robotics, AI and mechatronic design.",
      cta_github: "GitHub code →",
      cta_details: "Learn more →",
      robotic_arm: {
        context: "EEIA Summer School · Benin",
        title: "Robotic arm — Reinforcement-learned Tic-Tac-Toe",
        desc: "Development of a Deep Reinforcement Learning agent (DQN/PPO) for the autonomous control of a robotic arm playing tic-tac-toe, with vision-based board state detection.",
        r1: "Trained DQN agent — 98% accuracy on full games",
        r2: "YOLO vision pipeline for board and piece detection",
        r3: "Real-time on-device inference on Raspberry Pi 5"
      },
      av: {
        context: "EEIA Summer School · Benin",
        title: "Autonomous vehicle — From CAD to embedded",
        desc: "End-to-end design of a miniature autonomous vehicle: CAD modeling, 3D printing, electronic circuit design, TinyML models and TensorFlow computer vision.",
        r1: "TensorFlow vision model — 97% accuracy",
        r2: "TinyML models deployed on microcontroller",
        r3: "Full chain: CAD → electronics → embedded"
      },
      flyrenov: {
        context: "Academic project · ENSIL-ENSCI",
        title: "Flyrenov — Motorized drone reel",
        desc: "Design of a tension and length control system for a motorized reel used in drone-based roof cleaning, modeled in the 3DEXPERIENCE suite.",
        r1: "Multi-physics modeling in 3DEXPERIENCE",
        r2: "Closed-loop tension control",
        r3: "Mechanical / electronic / control integration"
      }
    },
    skills: {
      heading: "Technical skills",
      ai_title: "AI & vision",
      ai_rl: "Reinforcement learning",
      robotics_title: "Robotics & perception",
      robotics_signal: "Signal processing",
      robotics_kalman: "Kalman filter",
      robotics_planning: "Path planning",
      robotics_sensors: "Sensors (IMU, GPS, Lidar, cameras)",
      programming_title: "Programming & electronics",
      programming_linux: "Embedded Linux",
      design_title: "Design & R&D"
    },
    experience: {
      heading: "Professional experience",
      stellantis: {
        dates: "June – July 2025",
        role: "Assembly line operator — Internship",
        p1: "Operated on the final assembly line (Mokka, DS 3 Crossback).",
        p2: "Strict adherence to production quotas, quality standards and safety protocols."
      },
      vallet: {
        role: "Robotics & AI trainer",
        p1: "Trained students on core concepts of AI and robotics through practical workshops."
      }
    },
    education: {
      heading: "Education",
      engineering: "Engineering cycle — Mechatronics & Robotics (4th of 5)",
      prep: "Integrated preparatory courses — Electrical engineering",
      bac: "Scientific high school diploma — GPA 3.332"
    },
    contact: {
      heading: "Let's work together",
      lead: "Seeking an internship in robotics, automation or embedded AI — available April to September 2026, worldwide mobility."
    },
    footer: {
      build: "Built with HTML, CSS & JavaScript"
    }
  }
};

/* ---------- I18N ENGINE ---------- */
const STORAGE_KEY = "portfolio_lang";

function getNested(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}

function applyTranslations(lang) {
  const dict = TRANSLATIONS[lang];
  if (!dict) return;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = getNested(dict, key);
    if (typeof value === "string") el.textContent = value;
  });

  // Update active state on language switcher
  document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.langSwitch === lang);
  });

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute("content", dict.about.lead);
  }
}

function initI18n() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const browserLang = navigator.language.startsWith("fr") ? "fr" : "en";
  const initial = saved || browserLang;
  applyTranslations(initial);

  document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.langSwitch;
      applyTranslations(lang);
      localStorage.setItem(STORAGE_KEY, lang);
    });
  });
}

/* ---------- STICKY NAV STATE ---------- */
function initStickyNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- MOBILE MENU ---------- */
function initMobileMenu() {
  const nav = document.getElementById("nav");
  const toggle = nav?.querySelector(".nav__toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close menu after clicking a link
  nav.querySelectorAll(".nav__links a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- SCROLL REVEAL ---------- */
function initReveal() {
  const targets = document.querySelectorAll(
    ".section__head, .about__grid, .project, .skill-cat, .timeline__item, .edu-item, .contact__lead, .contact__links"
  );
  targets.forEach((el) => el.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );

  targets.forEach((el) => io.observe(el));
}

/* ---------- CURRENT YEAR ---------- */
function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- BOOT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initI18n();
  initStickyNav();
  initMobileMenu();
  initReveal();
  initYear();
});
