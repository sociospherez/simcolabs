const projects = [
  {
    slug: "prompt-quality-continuity-scorer",
    title: "Prompt Quality & Continuity Scorer",
    category: "AI Tooling",
    domain: "AI",
    status: "MVP",
    featured: true,
    summary:
      "Evaluates prompt structure, clarity and continuity across AI interactions.",
    problem:
      "Prompt quality is often inconsistent, leading to fragmented outputs, loss of continuity and weaker AI interactions.",
    approach:
      "This MVP explores a structured scoring model that evaluates prompts across clarity, continuity, intent and contextual completeness.",
    impact:
      "Helps improve prompt quality, supports better human-AI collaboration and creates more consistent interaction patterns.",
    tags: ["Prompting", "Scoring", "LLM"],
  },
  {
    slug: "prompt-thinking-fingerprint",
    title: "Prompt → Interpretation + Thinking Fingerprint",
    category: "AI Research",
    domain: "AI",
    status: "Concept",
    featured: true,
    summary:
      "Explores how prompts are interpreted and how reasoning paths might be visualised.",
    problem:
      "Users rarely understand how prompts are interpreted or why different phrasing creates different reasoning paths.",
    approach:
      "The concept maps prompt structure to likely interpretation patterns and visual reasoning fingerprints.",
    impact:
      "Supports better prompt engineering, interpretability and trust in AI-assisted workflows.",
    tags: ["Interpretation", "Reasoning", "Analysis"],
  },
  {
    slug: "persona-builder",
    title: "Persona Builder",
    category: "Strategy Tools",
    domain: "Strategy",
    status: "MVP",
    featured: true,
    summary:
      "Creates structured behavioural personas for planning, communication and decision-making.",
    problem:
      "Teams often rely on vague or inconsistent audience assumptions when planning services, products or communication.",
    approach:
      "This MVP generates structured personas with clearer behavioural, strategic and communication-oriented attributes.",
    impact:
      "Improves planning, empathy, audience alignment and design quality across multiple use cases.",
    tags: ["Personas", "Strategy", "Planning"],
  },
  {
    slug: "supplier-evaluation-mvp",
    title: "Supplier Evaluation MVP",
    category: "Procurement",
    domain: "Governance",
    status: "Prototype",
    featured: true,
    summary:
      "Supports structured supplier scoring, comparison and risk-aware evaluation.",
    problem:
      "Supplier selection can be inconsistent, difficult to compare and overly dependent on fragmented information.",
    approach:
      "A scoring-led framework combines supplier data, weighted criteria and structured comparison logic.",
    impact:
      "Helps procurement teams make more transparent, repeatable and risk-aware decisions.",
    tags: ["Suppliers", "Scoring", "Decision Support"],
  },
  {
    slug: "ai-for-send",
    title: "AI for SEND",
    category: "Education",
    domain: "SEND",
    status: "Concept",
    featured: true,
    summary:
      "Explores practical AI support for SEND planning, communication and insight generation.",
    problem:
      "SEND processes are often time-intensive, communication-heavy and fragmented across multiple stakeholders.",
    approach:
      "The concept investigates how AI could support planning, drafting, summarisation and structured insight generation.",
    impact:
      "Could improve clarity, reduce admin load and support more consistent communication across SEND environments.",
    tags: ["SEND", "Education", "AI"],
  },
  {
    slug: "predict-simulate-warn",
    title: "Predict • Simulate • Warn",
    category: "Civic Security",
    domain: "Civic",
    status: "Concept",
    featured: true,
    summary:
      "An open concept for early warning, system simulation and public safety intelligence.",
    problem:
      "Early signals in civic and security environments are often fragmented, delayed or difficult to interpret collectively.",
    approach:
      "This concept explores predictive signals, simulation logic and warning frameworks for public-interest use cases.",
    impact:
      "Could support earlier insight, more structured preparedness and better civic resilience.",
    tags: ["Civic", "Security", "Simulation"],
  },
];

export default projects;