const projects = [
  {
    slug: "prompt-quality-continuity-scorer",
    title: "Prompt Quality & Continuity Scorer",
    category: "AI Tooling",
    domain: "AI",
    status: "MVP",
    maturity: "Working MVP",
    featured: true,
    summary:
      "Evaluates prompt structure, clarity and continuity across AI interactions.",
    problem:
      "Prompt quality is often inconsistent, leading to fragmented outputs, weaker continuity and unreliable AI collaboration.",
    approach:
      "This MVP explores a structured scoring model that evaluates prompts across clarity, intent, continuity and contextual completeness.",
    impact:
      "Supports stronger human-AI interaction, more consistent prompting and better quality control in iterative workflows.",
    nextSteps: [
      "Introduce visual scoring breakdowns",
      "Compare prompts side by side",
      "Add continuity trend tracking across sessions",
    ],
    tags: ["Prompting", "Scoring", "LLM", "Continuity"],
  },
  {
    slug: "prompt-thinking-fingerprint",
    title: "Prompt → Interpretation + Thinking Fingerprint",
    category: "AI Research",
    domain: "AI",
    status: "Concept",
    maturity: "Exploratory Concept",
    featured: true,
    summary:
      "Explores how prompts are interpreted and how reasoning paths might be visualised.",
    problem:
      "Users rarely understand how phrasing changes AI interpretation or how reasoning paths diverge across similar prompts.",
    approach:
      "The concept maps prompt structure to likely interpretation patterns and visual reasoning fingerprints.",
    impact:
      "Could improve interpretability, prompt engineering and trust in AI-assisted systems.",
    nextSteps: [
      "Create visual reasoning maps",
      "Model prompt path variation",
      "Define scoring dimensions for interpretation shifts",
    ],
    tags: ["Interpretation", "Reasoning", "Analysis", "Prompt Design"],
  },
  {
    slug: "persona-builder",
    title: "Persona Builder",
    category: "Strategy Tools",
    domain: "Strategy",
    status: "MVP",
    maturity: "Structured Prototype",
    featured: true,
    summary:
      "Creates structured behavioural personas for planning, communication and decision-making.",
    problem:
      "Teams often rely on vague or inconsistent audience assumptions when designing services, products or communication.",
    approach:
      "This MVP generates structured personas with behavioural, communication and strategic attributes.",
    impact:
      "Supports clearer planning, stronger audience empathy and more aligned decision-making.",
    nextSteps: [
      "Expand persona dimensions",
      "Add comparative persona views",
      "Introduce spider-chart profiling",
    ],
    tags: ["Personas", "Strategy", "Planning", "Audience"],
  },
  {
    slug: "supplier-evaluation-mvp",
    title: "Supplier Evaluation MVP",
    category: "Procurement",
    domain: "Governance",
    status: "Prototype",
    maturity: "Structured Prototype",
    featured: true,
    summary:
      "Supports structured supplier scoring, comparison and risk-aware evaluation.",
    problem:
      "Supplier evaluation is often fragmented, difficult to compare and lacks transparent weighting logic.",
    approach:
      "A scoring-led framework combines supplier information, weighted criteria and structured decision support.",
    impact:
      "Helps procurement teams make more repeatable, transparent and risk-aware decisions.",
    nextSteps: [
      "Add visual weighting dashboard",
      "Build risk flagging layer",
      "Enable comparative supplier scoring views",
    ],
    tags: ["Suppliers", "Scoring", "Decision Support", "Procurement"],
  },
  {
    slug: "ai-for-send",
    title: "AI for SEND",
    category: "Education",
    domain: "SEND",
    status: "Concept",
    maturity: "Research Concept",
    featured: true,
    summary:
      "Explores practical AI support for SEND planning, communication and insight generation.",
    problem:
      "SEND processes are often admin-heavy, time-intensive and fragmented across multiple professionals and families.",
    approach:
      "The concept investigates how AI could support planning, drafting, summarisation and structured insight generation.",
    impact:
      "Could improve clarity, reduce admin burden and support more consistent communication in SEND workflows.",
    nextSteps: [
      "Map core SEND workflow pain points",
      "Prototype drafting support",
      "Explore stakeholder-friendly communication outputs",
    ],
    tags: ["SEND", "Education", "AI", "Planning"],
  },
  {
    slug: "predict-simulate-warn",
    title: "Predict • Simulate • Warn",
    category: "Civic Security",
    domain: "Civic",
    status: "Concept",
    maturity: "Strategic Concept",
    featured: true,
    summary:
      "An open concept for early warning, system simulation and public safety intelligence.",
    problem:
      "Signals in civic and security environments are often fragmented, delayed or difficult to interpret collectively.",
    approach:
      "This concept explores predictive signals, simulation logic and warning frameworks for public-interest use cases.",
    impact:
      "Could support earlier insight, better preparedness and stronger civic resilience.",
    nextSteps: [
      "Define scenario categories",
      "Explore open-source signal inputs",
      "Prototype warning visualisation logic",
    ],
    tags: ["Civic", "Security", "Simulation", "Warning Systems"],
  },
];

export default projects;