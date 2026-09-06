window.DEFAULT_RESUME = {
  name: "NAVEEN US",
  roll: "DA25M020",
  pr: "PR/12/DA/26/020",
  institute: "INDIAN INSTITUTE OF TECHNOLOGY MADRAS",
  github: "https://github.com/usnaveen",
  githubLabel: "GitHub",
  linkedin: "http://www.linkedin.com/in/naveenus",
  linkedinLabel: "LinkedIn",
  education: [
    {
      program: "M.Tech. (Data Science & AI)",
      institute: "Indian Institute of Technology, Madras",
      score: "8.35",
      year: "2027",
    },
    {
      program: "B.Tech. (Electrical & Computer Engineering)",
      institute: "Amrita Vishwa Vidyapeetham, Coimbatore",
      score: "8.48",
      year: "2024",
    },
    {
      program: "Class XII",
      institute: "Sri Chaitanya Jr Kalasala, Hyderabad",
      score: "83.5%",
      year: "2019",
    },
    {
      program: "Class X (CBSE)",
      institute: "Chettinad Vidya Mandir, Karur",
      score: "10.00",
      year: "2017",
    },
  ],
  scholastic: [
    "Secured **All India Rank 134 (Top 0.23%)** in GATE Data Science and Artificial Intelligence 2025",
    "**Runner-up, Extension Mania (Mar'24)** — YouTube productivity monitor using the OpenAI API",
  ],
  experience: [
    {
      org: "Walmart, Bangalore",
      role: "Generative AI Intern",
      dates: "Aug'26 – Present",
      summary: "Agentic **SLM¹** framework for autonomous **multimodal drift** detection and remediation",
      bullets: [
        "Developing an agentic Small Language Model with **MCP²** access to monitoring, data and model tools",
        "Extending drift monitoring from alert-only dashboards to agent-triggered diagnosis and remediation",
      ],
    },
    {
      org: "Expedia Group, Bangalore",
      role: "Machine Learning Science Intern",
      dates: "Jun'26 – Jul'26",
      bullets: [
        "Benchmarked **8 day-zero strategies** for cold-starting a product head in a discrete-treatment **TARNet⁴**",
        "Cut day-zero attach error from **0.083 to 0.0019** at **0.655 ROC-AUC⁵** via same-market score transfer",
        "Designed an **anchor-centered Bayesian updater** that learns one scalar intercept, not a full product head",
      ],
    },
    {
      org: "Valeo, Chennai",
      role: "Software Developer Intern",
      dates: "Jan'24 – Jun'24",
      bullets: [
        "Developed and optimised **AUTOSAR⁶-compliant ECU⁷ software** for BMW vehicles in **C++**",
        "Implemented a custom **std::map-based FsVectorMap** container, cutting ECU memory usage on BMW builds",
      ],
    },
  ],
  projects: [
    {
      title: "Multimodal Reward-Hacking Auditor",
      subtitle: "Research Harness",
      dates: "Sep'26 – Present",
      link: "https://github.com/usnaveen/multimodal-reward-hacking-auditor",
      linkLabel: "GitHub",
      summary: "**Chart-VQA stress harness** for measuring **proxy–true divergence** under evidence and judge-bait attacks",
      bullets: [
        "Executable chart oracles with dual **invariance / re-answer** protocols; attack families include evidence swap/destroy, wrong caption, judge bait, and nuisance",
        "**RHR / blind-spot / NRFR** scaffolding plus an **MLX** runner for local VLMs — framed for genAI reliability research",
      ],
    },
    {
      title: "TubeFocus",
      subtitle: "Chrome Extension",
      dates: "Jul'25 – Present",
      link: "https://github.com/usnaveen/TubeFocus-Extension",
      linkLabel: "GitHub",
      summary: "**Local-first Gatekeeper** scoring with **Transformers.js** and confidence-gated cloud fallback",
      bullets: [
        "On-device **all-MiniLM-L6-v2** via **WebGPU→WASM**; Cloud Run/Gemini only on low confidence or audit/coach; **offline mode** never hits the API",
        "**SetFit → ONNX (INT8)** train/export pipeline plus an offline eval harness (local-vs-Gemini agreement, latency, route simulation)",
      ],
    },
    {
      title: "GraphRecall",
      subtitle: "AI Knowledge Management System",
      dates: "Jan'26 – Present",
      link: "https://github.com/usnaveen/GraphRecall",
      linkLabel: "GitHub",
      summary: "Notes → **Neo4j** knowledge graph with spaced-repetition feed and **GraphRAG** chat",
      bullets: [
        "LangGraph ingestion with **HITL** concept approval, conflict synthesis, and SM-2 active-recall cards",
        "Hybrid retrieval over **Neo4j** traversal + **pgvector**, with checkpointers and source-cited streaming answers",
      ],
    },
  ],
  courseProjects: [
    {
      title: "Na'vi Translator",
      subtitle: "MLOps · Low-Resource MT/ASR",
      dates: "Apr'26",
      link: "https://github.com/usnaveen/navi-translator",
      linkLabel: "GitHub",
      summary: "End-to-end **Na'vi→English** translator under low-resource data constraints",
      bullets: [
        "Fine-tuned **MarianMT** + **Whisper-LoRA** ASR with Reykunyu dictionary fallback when neural confidence is low",
        "Served production models from an **MLflow** registry behind **FastAPI**; **DVC** data stages, Prometheus/Grafana monitoring, Airflow training DAG, and GitHub Actions CI",
      ],
    },
    {
      title: "LLM Response Metric Learning",
      subtitle: "DA5401 Data Challenge",
      dates: "Nov'25",
      link: "https://github.com/usnaveen/DA5401-EndSem-Challenge",
      linkLabel: "GitHub",
      summary: "Predict fitness scores for **multilingual LLM** responses under train–test score shift",
      bullets: [
        "**multilingual-e5-large** embeddings with interaction features into a **LightGBM/XGBoost** ensemble",
        "Synthetic negatives + **quantile calibration** to close distribution shift; **RMSE 0.82** (**17.2%** vs mean baseline)",
      ],
    },
    {
      title: "Deep Learning Systems",
      subtitle: "DA6401 · Transformer + Multitask CV",
      dates: "2026",
      link: "https://github.com/usnaveen/deeplearning_assignment3",
      linkLabel: "GitHub",
      summary: "From-scratch **Transformer** MT and shared-backbone **multitask** vision",
      bullets: [
        "Implemented **Attention Is All You Need** in PyTorch for Multi30k **DE→EN** (Noam schedule, label smoothing, BLEU)",
        "Shared **VGG11-BN** Pets model: classification (**F1 ≥ 0.93**), localization (**Acc@IoU0.5 ≥ 91%**), segmentation (**Dice ≥ 0.82**)",
      ],
    },
  ],
  publication: {
    label: "IEEE CONNECT 2024",
    dates: "Jul 2024",
    text: "Co-authored a comparison of **Bidirectional A*, D*, and D* Lite**, with Python simulations and a **NodeMCU mecanum-wheel robot** implementation",
  },
  por: [
    {
      title: "Deputy Placement Coordinator",
      org: "Academic Affairs Secretary, Placement & Internship Cell, DSAI, IIT Madras",
      dates: "Aug'25 – Present",
      bullets: [
        "Handled industry outreach, campus logistics, and **end-to-end recruitment**; built workflows to streamline placement operations",
      ],
    },
    {
      title: "Lead Coordinator, Gokulashtami",
      org: "Amrita Vishwa Vidyapeetham",
      dates: "Oct'23 & Oct'24",
      bullets: [
        "Led the department contingent across two editions; won **Best Decoration**; **Runner-up (2023)** and **Winner (2024)** overall",
      ],
    },
  ],
  courses: [
    "Linear Algebra, Probability & Statistics",
    "Machine Learning & Deep Learning",
    "Data Analytics Lab",
    "MLOps",
    "Natural Language Processing",
    "Modern Computer Vision",
    "Data Science for Finance",
    "Artificial Intelligence",
  ],
  skills: [
    { category: "Languages", items: "Python, SQL, C, C++, JavaScript" },
    {
      category: "GenAI & Agentic",
      items: "LangChain, LangGraph, RAG³, MCP², HuggingFace",
    },
    {
      category: "ML & DL",
      items: "PyTorch, scikit-learn, NumPy / Pandas, Matplotlib, Gemini / OpenAI",
    },
    {
      category: "Backend & Data",
      items: "FastAPI, PostgreSQL (pgvector), Neo4j, ChromaDB / Redis, Firestore",
    },
    {
      category: "Cloud & Tooling",
      items: "Docker, Google Cloud Run, Vertex AI, Git / GitHub, LangSmith",
    },
  ],
  extras: [
    "School **swimming team (5 years, 15+ medals)**; school and college **cricket** at district and state level",
  ],
  footnotes:
    "SLM¹: Small Language Model | MCP²: Model Context Protocol | RAG³: Retrieval-Augmented Generation | TARNet⁴: Treatment-Agnostic Representation Network | ROC-AUC⁵: Area Under the Receiver Operating Characteristic Curve | AUTOSAR⁶: Automotive Open System Architecture | ECU⁷: Electronic Control Unit | ReAct⁸: Reasoning and Acting",
};
