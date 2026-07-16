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
      tag: "Élève-ingénieur · Mécatronique & systèmes complexes · M2 / 5ᵉ année",
      subtitle: "Embodied AI · Perception & navigation autonome · Robotique",
      cta_projects: "Voir mes projets",
      cta_contact: "Me contacter",
      meta_status_label: "Disponibilité",
      meta_status_value: "Stage de 6 mois : Mars – Sep 2027",
      meta_mobility_label: "Mobilité",
      meta_mobility_value: "Internationale",
      meta_location_label: "Basé à",
      meta_school_label: "École"
    },
    about: {
      heading: "À propos",
      lead: "Élève-ingénieur en mécatronique passionné par l'Embodied AI : donner à des robots la perception et le contrôle nécessaires pour agir de façon autonome dans le monde réel.",
      body: "Mon travail se situe à la frontière entre la perception et la décision — de la segmentation sémantique embarquée jusqu'au contrôle prédictif sous incertitude. Actuellement au Politecnico di Torino (DIMEAS), je développe une couche de perception sémantique qui permet à un contrôleur MPPI de distinguer ce qui est franchissable de ce qui ne l'est pas. Je rejoins l'ISAE-Supméca (« Mécatronique & systèmes complexes ») à la rentrée 2026 pour mon année d'échange de fin d'études, et je recherche un stage de fin d'études (mars – septembre 2027) au sein d'une équipe de pointe en Embodied AI et robotique.",
      stat2: "Ans en IA & robotique",
      stat3: "Langues parlées",
      stat4: "Projets techniques"
    },
    projects: {
      heading: "Projets sélectionnés",
      sub: "Quatre projets représentatifs de mon travail en robotique, IA et conception mécatronique.",
      cta_github: "Code GitHub →",
      cta_details: "En savoir plus →",
      polito: {
        context: "Politecnico di Torino · DIMEAS · Italie",
        title: "MPPI sémantique & risk-aware — Navigation autonome d'un UGV",
        desc: "Un contrôleur MPPI classique raisonne sur la seule géométrie : il ignore si un obstacle est franchissable (flaque, feuilles mortes, bordure basse), et il ne voit pas les dangers plats que le LiDAR ne détecte pas (boue, sol mouillé ou glissant). J'ajoute une couche de perception sémantique embarquée qui évalue la traversabilité du terrain et alimente une fonction de coût risk-aware — pour une navigation à la fois plus sûre et moins conservatrice.",
        r1: "Pipeline de segmentation sémantique — benchmark SegFormer / MobileNet / YOLO pour le déploiement temps réel sur Raspberry Pi",
        r2: "Coût de traversabilité risk-aware injecté dans le MPPI — distingue obstacle infranchissable et terrain franchissable",
        r3: "Environnements urbains aux configurations complexes simulés sous Gazebo Harmonic + ROS 2 Jazzy (TurtleBot 4, LiDAR + caméra de profondeur OAK-D)"
      },
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
        title: "Véhicule autonome — Du kit à la conception de zéro",
        desc: "En 2021, j'ai monté une voiture autonome à partir d'un kit. Elle roulait, mais je ne comprenais pas comment. L'année suivante, je suis revenu la reconstruire entièrement : les pièces, l'électronique, le code. Rien acheté tout fait.",
        r1: "Voiture conçue de zéro : CAO, impression 3D, électronique et code.",
        r2: "Elle apprend à conduire en m'imitant : je pilote, elle observe, elle reproduit.",
        r3: "D'abord guidée par trois capteurs de distance, puis par une caméra."
      },
      flyrenov: {
        context: "Projet industriel · ENSIL-ENSCI × FlyRenov",
        title: "FlyRenov — Enrouleur de tuyau asservi pour drone",
        desc: "L'entreprise FlyRenov nettoie les toitures avec un drone. Le drone reste relié au sol par un tuyau de 60 mètres, enroulé sur une machine. Cette machine pesait plus de 40 kg et il fallait être deux pour la déplacer. Avec un camarade, nous l'avons reconçue entièrement.",
        r1: "Trois fois plus légère : 40 kg à 14 kg. Une seule personne suffit.",
        r2: "Deux moteurs au lieu de quatre, sans perdre aucune fonction.",
        r3: "Électronique simplifiée : une carte ESP32 remplace tout un réseau CAN."
      }
    },
    skills: {
      heading: "Compétences techniques",
      ai_title: "Intelligence artificielle & vision",
      ai_segmentation: "Segmentation sémantique (SegFormer · MobileNet)",
      ai_regression: "Modèles de régression",
      ai_rl: "Apprentissage par renforcement",
      robotics_title: "Robotique & perception",
      robotics_mppi: "MPPI · Contrôle prédictif",
      robotics_signal: "Traitement du signal",
      robotics_kalman: "Filtre de Kalman",
      robotics_planning: "Path Planning",
      robotics_sensors: "Capteurs (IMU, GPS, LiDAR, caméra de profondeur OAK-D)",
      programming_title: "Programmation & électronique",
      programming_ai: "Développement assisté par IA (LLMs)",
      programming_linux: "Linux embarqué",
      design_title: "Conception & R&D"
    },
    experience: {
      heading: "Expérience professionnelle",
      polito: {
        dates: "Mai – Juillet 2026",
        role: "Stagiaire R&D — Robotique autonome",
        p1: "Développement d'un contrôleur risk-aware MPPI (Model Predictive Path Integral) pour la navigation autonome d'un UGV.",
        p2: "Implémentation en C++ / ROS 2, validation en simulation et étude des performances sous incertitude."
      },
      stellantis: {
        dates: "Juin – Juillet 2025",
        role: "Opérateur ligne d'assemblage — Stage",
        p1: "Opérations sur la ligne d'assemblage finale (Mokka, DS 3 Crossback).",
        p2: "Respect strict des quotas de production, des standards de qualité et des protocoles de sécurité."
      },
      vallet: {
        role: "Formateur — Robotique & IA",
        p1: "Animation d'ateliers pratiques d'IA et de robotique auprès d'un public de profils variés — collégiens (de la 6ᵉ à la 3ᵉ), étudiants et professionnels.",
        participant_role: "Participant — 2ᵉ prix national",
        participant_p1: "Lauréat du 2ᵉ prix de la cohorte EEIA 2021 — parcours intensif d'apprentissage en intelligence artificielle et robotique embarquée.",
        ceremony_link: "Voir la cérémonie de remise →"
      }
    },
    education: {
      heading: "Formation",
      isae: "5ᵉ année (M2) — Année d'échange · Mécatronique & systèmes complexes",
      engineering: "Cycle ingénieur — Mécatronique & Robotique (4ᵉ année)",
      prep: "Classes préparatoires intégrées — Génie électrique",
      bac: "Baccalauréat scientifique — GPA 3.332"
    },
    certifications: {
      heading: "Certifications",
      cta: "Voir le certificat →",
      vallet: {
        name: "Bourse d'excellence",
        desc: "Distinction attribuée aux étudiants africains à fort potentiel académique et scientifique — Fondation de France."
      },
      matlab: {
        name: "MATLAB Onramp",
        desc: "Initiation au workflow MATLAB : scripts, fonctions et visualisation de données."
      },
      simulink: {
        name: "Simulink Onramp",
        desc: "Modélisation et simulation de systèmes dynamiques sous Simulink."
      },
      rl: {
        name: "Reinforcement Learning Onramp",
        desc: "Entraînement d'agents par apprentissage par renforcement avec MATLAB & Simulink."
      },
      simscape: {
        name: "Simscape Onramp",
        desc: "Simulation physique de systèmes mécaniques, électriques et hydrauliques."
      },
      arduino: {
        name: "Arduino",
        desc: "Programmation et contrôle de systèmes embarqués avec Arduino."
      }
    },
    contact: {
      heading: "Travaillons ensemble",
      lead: "À la recherche d'un stage de fin d'études en robotique, automatisation ou IA embarquée — disponible de mars à septembre 2027, mobilité internationale."
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
      tag: "Engineering student · Mechatronics & Complex Systems · Final year (M2)",
      subtitle: "Embodied AI · Perception & Autonomous Navigation · Robotics",
      cta_projects: "View my projects",
      cta_contact: "Get in touch",
      meta_status_label: "Availability",
      meta_status_value: "6-month internship: Mar – Sep 2027",
      meta_mobility_label: "Mobility",
      meta_mobility_value: "Worldwide",
      meta_location_label: "Based in",
      meta_school_label: "School"
    },
    about: {
      heading: "About",
      lead: "Mechatronics engineering student driven by Embodied AI — giving robots the perception and control they need to act autonomously in the real world.",
      body: "My work sits at the boundary between perception and decision-making — from on-device semantic segmentation to predictive control under uncertainty. At Politecnico di Torino (DIMEAS), I am building a semantic perception layer that lets an MPPI controller tell traversable terrain from genuine obstacles. I join ISAE-Supméca (\"Mechatronics & Complex Systems\") in autumn 2026 for my final exchange year, and I am seeking a final-year internship (March – September 2027) with a leading Embodied AI and robotics team.",
      stat2: "Years in AI & robotics",
      stat3: "Languages spoken",
      stat4: "Technical projects"
    },
    projects: {
      heading: "Selected work",
      sub: "Four projects that best represent my work across robotics, AI and mechatronic design.",
      cta_github: "GitHub code →",
      cta_details: "Learn more →",
      polito: {
        context: "Politecnico di Torino · DIMEAS · Italy",
        title: "Semantic risk-aware MPPI — Autonomous UGV navigation",
        desc: "A classic MPPI controller reasons on geometry alone: it can't tell whether an obstacle is traversable (a puddle, dead leaves, a low curb), and it misses flat hazards a LiDAR simply cannot see (mud, wet or slippery ground). I add an on-device semantic perception layer that scores terrain traversability and feeds a risk-aware cost function — for navigation that is both safer and less conservative.",
        r1: "Semantic segmentation pipeline — SegFormer / MobileNet / YOLO benchmarked for real-time deployment on Raspberry Pi",
        r2: "Risk-aware traversability cost fed into the MPPI — separates hard obstacles from traversable terrain",
        r3: "Urban environments with complex layouts simulated in Gazebo Harmonic + ROS 2 Jazzy (TurtleBot 4, LiDAR + OAK-D depth camera)"
      },
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
        title: "Autonomous vehicle — From kit to built-from-scratch",
        desc: "In 2021 I built a self-driving car from a kit. It drove, but I had no idea how. The year after, I came back and rebuilt it entirely: the parts, the electronics, the code. Nothing bought ready-made.",
        r1: "Car designed from scratch: CAD, 3D printing, electronics and code.",
        r2: "It learns to drive by copying me: I drive, it watches, it reproduces.",
        r3: "First guided by three distance sensors, then by a camera."
      },
      flyrenov: {
        context: "Industry project · ENSIL-ENSCI × FlyRenov",
        title: "FlyRenov — Position-controlled hose reel for drones",
        desc: "FlyRenov cleans rooftops with a drone. The drone stays tethered to the ground by a 60-metre hose, wound onto a machine. That machine weighed over 40 kg and took two people to move. With a classmate, I redesigned it from the ground up.",
        r1: "Three times lighter: 40 kg down to 14 kg. One person is now enough.",
        r2: "Two motors instead of four, without losing a single function.",
        r3: "Simpler electronics: one ESP32 board replaces an entire CAN network."
      }
    },
    skills: {
      heading: "Technical skills",
      ai_title: "AI & vision",
      ai_segmentation: "Semantic segmentation (SegFormer · MobileNet)",
      ai_regression: "Regression models",
      ai_rl: "Reinforcement learning",
      robotics_title: "Robotics & perception",
      robotics_mppi: "MPPI · Predictive control",
      robotics_signal: "Signal processing",
      robotics_kalman: "Kalman filter",
      robotics_planning: "Path planning",
      robotics_sensors: "Sensors (IMU, GPS, LiDAR, OAK-D depth camera)",
      programming_title: "Programming & electronics",
      programming_ai: "AI-assisted development (LLMs)",
      programming_linux: "Embedded Linux",
      design_title: "Design & R&D"
    },
    experience: {
      heading: "Professional experience",
      polito: {
        dates: "May – July 2026",
        role: "R&D Intern — Autonomous Robotics",
        p1: "Development of a risk-aware MPPI (Model Predictive Path Integral) controller for autonomous UGV navigation.",
        p2: "Implementation in C++ / ROS 2, simulation validation and performance analysis under uncertainty."
      },
      stellantis: {
        dates: "June – July 2025",
        role: "Assembly line operator — Internship",
        p1: "Operated on the final assembly line (Mokka, DS 3 Crossback).",
        p2: "Strict adherence to production quotas, quality standards and safety protocols."
      },
      vallet: {
        role: "Robotics & AI trainer",
        p1: "Ran hands-on AI and robotics workshops for a diverse audience — secondary-school students (grades 6–9), university students and working professionals.",
        participant_role: "Participant — 2nd national prize",
        participant_p1: "Winner of the 2nd prize at the EEIA 2021 cohort — intensive training in artificial intelligence and embedded robotics.",
        ceremony_link: "Watch the award ceremony →"
      }
    },
    education: {
      heading: "Education",
      isae: "Final year (M2) — Exchange year · Mechatronics & Complex Systems",
      engineering: "Engineering cycle — Mechatronics & Robotics (4th year)",
      prep: "Integrated preparatory courses — Electrical engineering",
      bac: "Scientific high school diploma — GPA 3.332"
    },
    certifications: {
      heading: "Certifications",
      cta: "View certificate →",
      vallet: {
        name: "Excellence scholarship",
        desc: "Award granted to high-achieving African students with strong academic and scientific potential — Fondation de France."
      },
      matlab: {
        name: "MATLAB Onramp",
        desc: "Introduction to the MATLAB workflow: scripts, functions and data visualization."
      },
      simulink: {
        name: "Simulink Onramp",
        desc: "Modeling and simulation of dynamic systems with Simulink."
      },
      rl: {
        name: "Reinforcement Learning Onramp",
        desc: "Training agents via reinforcement learning with MATLAB & Simulink."
      },
      simscape: {
        name: "Simscape Onramp",
        desc: "Physical simulation of mechanical, electrical and hydraulic systems."
      },
      arduino: {
        name: "Arduino",
        desc: "Programming and control of embedded electronic systems with Arduino."
      }
    },
    contact: {
      heading: "Let's work together",
      lead: "Seeking a final-year internship in robotics, automation or embedded AI — available March to September 2027, worldwide mobility."
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

  // Update CV link to match active language
  const cvLink = document.getElementById("cv-link");
  if (cvLink) {
    cvLink.href = lang === "fr"
      ? "assets/docs/Cv%20Justin%20fr.pdf"
      : "assets/docs/Cv%20Justin%20en.pdf";
  }

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
    ".section__head, .about__grid, .project, .skill-cat, .timeline__item, .edu-item, .cert-card, .contact__lead, .contact__links"
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

/* ---------- CARROUSEL DES CARTES PROJET ----------
   Fait défiler les visuels de la galerie sur les cartes de la page d'accueil.
   Les cartes à image unique sont ignorées : elles gardent leur affichage statique.
*/
const SLIDE_INTERVAL = 4500;

function initProjectSlideshows() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".project__media").forEach((media) => {
    const slides = Array.from(media.querySelectorAll("img"));
    if (slides.length < 2) return;

    media.classList.add("is-slideshow");
    slides.forEach((img, i) => img.classList.toggle("is-active", i === 0));

    const dots = document.createElement("div");
    dots.className = "media-dots";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "media-dots__dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Visuel ${i + 1} sur ${slides.length}`);
      dot.addEventListener("click", () => {
        goTo(i);
        restart();
      });
      dots.appendChild(dot);
    });
    media.appendChild(dots);

    const allDots = Array.from(dots.children);
    let index = 0;
    let timer = null;

    function goTo(n) {
      index = (n + slides.length) % slides.length;
      slides.forEach((img, i) => img.classList.toggle("is-active", i === index));
      allDots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    }

    function start() {
      if (reduceMotion || timer) return;
      timer = setInterval(() => goTo(index + 1), SLIDE_INTERVAL);
    }
    function stop() {
      clearInterval(timer);
      timer = null;
    }
    function restart() {
      stop();
      start();
    }

    // Laisse le visiteur observer un visuel sans qu'il change sous ses yeux
    media.addEventListener("mouseenter", stop);
    media.addEventListener("mouseleave", start);

    // N'anime que les cartes réellement à l'écran
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => (entry.isIntersecting ? start() : stop()));
        },
        { threshold: 0.25 }
      );
      io.observe(media);
    } else {
      start();
    }
  });
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
  initProjectSlideshows();
  initYear();
});
