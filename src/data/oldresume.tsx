// src/data/resume.ts
import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { navbar, socials } from "@/config/site";


export const DATA = {
  name: "Yueqiao Wang",
  initials: "YW",
  url: "https://career.yueqiao.dev",
  location: "Terre Haute, IN",
  locationLink: "https://www.google.com/maps/place/Terre+Haute,+IN",
  description:
    "Computer Engineering @ RHIT ('26). OS & Computer Architecture • Embedded/Robotics • Web.",
  summary:
    "I’m a computer engineering student focused on low-level OS (RISC-V microkernels), computer architecture research, and hands-on embedded/robotics—working at the intersection of the humanities and technology. I’m here for the hard problems and the quiet joy when a project finally comes alive. Recent work includes a teaching-focused microkernel (MorpheOS), PIM/DPU simulation studies, open-source educational robotics, and campus apps like ParkSmart. Explore my [projects](/#projects) and [experience](/#work), or [say hi](/#contact) below.",
  avatarUrl: "/me.png",
  avatarStatement: "Explore • build • share",

  skills: ["3D Modeling", "3D Printing", "3D Printing & 3D Printer Repair", "ADC", "ADC/DAC", "AI Model Training & Inference", "ARQ Protocols", "AWS", "Adaptability", "Agile Development", "Analytical Modeling", "Apache", "Arduino", "Assembly", "Async/Await", "Attention Mechanisms", "AWS", "Azure", "Bash Automation", "BLE", "Bluetooth", "Bootstrap", "C", "C++", "CAD", "Cadence OrCAD", "Cadence PSpice", "CMake", "Client-Side Frameworks & Libraries", "Cloud Deployment & Hosting", "Composer", "Concurrency & Synchronization", "Crosstalk Mitigation", "CSS", "Cycle-Accurate Simulators", "DAC", "Data Analysis", "Debian", "Debugging & Verification", "Electrical Component Selection", "Embedded C Development", "Ethernet", "ESP32", "Express.js", "Figma", "File System", "Finite State Machines (FSM)", "Firebase", "Firebase Realtime Database", "Fourier Series & Transform", "FPGA", "Function Generator", "GCC", "GCP", "GDB", "gem5", "Git", "GitHub", "GitLab", "Google Cloud (GCP)", "HTML", "HPC Profiling", "Impedance Matching", "Instruction Set Architecture", "Instrumentation", "Interrupt", "Interrupt Handling", "I2C", "Java", "JavaScript", "Kernel-Level Programming", "Linux", "Local Server", "Low-Level System Security & Access Control", "Low-Power Embedded Design", "MacOS", "Make", "MariaDB", "MATLAB & Simulink", "Matrix-Fused Multiply Accumulate (MFMA)", "Micro Architecture", "micro:bit", "Microcontroller Programming", "ModelSim", "MongoDB", "Multi-GPU", "Multi-GPU Processing", "Multi-Thread/Process Programming", "Multimeter", "MySQL", "Native Chinese", "Networking", "NextCloud", "Nginx", "Node.js", "OAuth", "Omniperf", "Open-Ended Project Management", "OpenSBI", "Oscilloscope", "OSI Model", "PCB Fabrication & Testing", "PCB Layout", "Performance Metrics", "Performance & Power Analysis", "Power Integrity", "Power Supply & Load Programming", "Problem-Solving and Analytical Skills", "Prototyping with Figma", "Python", "QEMU", "Quartus Prime", "RAM Simulators", "Ramulator", "Raspberry Pi", "Research & Experimental Design", "REST API", "Real-Time Event Control", "RISC-V", "Robotics", "Roofline Analysis", "RStudio", "Scheduling", "Scientific Computing", "Sensor and Actuator Integration", "Serial Communication", "Server Hardening", "Shell", "shadcn/ui", "Signal Encoding", "Signal Integrity in PCB and Chip-Level Design", "Signal Integrity", "Silicon Platforms", "Sliding Window Protocols", "Socket Programming", "SolidWorks", "Subsystem Verification", "Swift", "System Calls", "System Design Process", "System Validation", "System Verification", "TailwindCSS", "TCP/IP", "Team Collaboration & Conflict Management", "Technical Report Writing & Poster Presentation", "Test-Driven Development", "Timing Closure Basics", "Transformers", "Transmission Line Analysis", "TypeScript", "UART", "Ubuntu", "uPIMulator", "Unix System Operation", "User Experience (UX) & Design", "Vectorization", "Verilog", "Virtual Memory", "Virtual Private Server", "VPS", "Vue", "Web Hosting", "Web Sockets", "WebSockets", "WebSockets (WS)", "Wi-Fi", "Wireless Communication", "Wireless Networks", "WordPress", "Z-Transform & Discrete-Time Systems", "ZSim", "Chinese", "English", "GCP (Google Cloud)",],

  categorizedSkills: {
    Language: ["Native Chinese", "Professional English"],
    ProgrammingSystem: [
      "Assembly", "Verilog", "bash", "shell", "C", "C++", "CMake", "GCC", "Java", "JavaScript", "Python", "HTML", "CSS", "Swift", "MATLAB & Simulink", "Unix System Operation", "Linux", "Debian", "Ubuntu", "MacOS"
    ],
    SoftwareDevelopment: ["Git", "GitHub", "GitLab", "Docker"],
    GeneralHardware: [
      "Finite State Machines (FSM)", "FPGA", "Quartus Prime", "ModelSim Simulation", "Instrumentation", "Power Supply & Load Programming", "Oscilloscope", "Multimeter", "Function Generator"
    ],
    ComputerArchitecture: [
      "Verilog", "Micro Architecture", "Instruction Set Architecture", "Silicon Platforms", "RTL Simulation", "Cycle-Accurate Simulators", "Gem5", "Ramulator", "ZSim", "uPIMulator", "Performance & Power Analysis", "Research & Experimental Design"
    ],
    HighPerformanceComputing: [
      "Performance Metrics", "Roofline Analysis", "Analytical Modeling", "HPC Profiling", "Omniperf"
    ],
    ParallelComputing: ["Multi-GPU Processing", "Matrix-Fused Multiply Accumulate (MFMA)"],
    EmbeddedSystem: [
      "MSP432 Microcontroller", "ESP32 Microcontroller", "Raspberry Pi", "Micro: Bit", "Arduino", "Microcontroller Programming", "Embedded C Development", "Interrupt Handling", "Timer-Based Scheduling", "Real-Time Event Control", "Sensor and Actuator Integration", "Analog Digital Conversion (ADC & DAC)", "Serial Communication (UART, I2C)", "Wireless Communication (RF, Bluetooth, BLE, Wi-Fi)", "Debugging & Verification", "Low-Power Embedded Design", "Robotics"
    ],
    DigitalDesign: [
      "Cadence OrCAD", "Cadence PSpice", "Electrical Component Selection", "PCB Layout", "PCB Fabrication & Testing", "High-Speed Digital Signal Transmission", "Transmission Line Analysis", "Impedance Matching", "Crosstalk Mitigation", "Power Integrity", "Signal Integrity in PCB and Chip-Level Design"
    ],
    SignalsSystems: [
      "Fourier Series & Transform", "Frequency Domain Analysis", "Filter Design", "Feedback Control Systems", "Z-Transform & Discrete-Time Systems", "Digital Signal Processing Implementation"
    ],
    Networking: [
      "TCP/IP", "OSI Model", "Signal Encoding", "Error Detection", "ARQ Protocols", "Sliding Window Protocols", "Network Switching & Routing", "Multiplexing", "Subnetting", "Ethernet", "Wireless Networks", "Medium Access Control (MAC)"
    ],
    OperationSystem: [
      "Multi-Thread/Process Programming", "System Call", "Interrupt", "Process Creation & Scheduling", "Memory Virtualization", "Virtual Memory Management", "File System", "Concurrency & Synchronization", "Kernel-Level Programming", "Low-Level System Security & Access Control"
    ],
    Server: [
      "Apache", "Nginx", "Linux", "IT Service Management", "Web Hosting", "NextCloud", "Composer", "AWS", "GCP", "Azure"
    ],
    Databases: [
      "MySQL", "MariaDB", "MongoDB", "Firebase Realtime Database"
    ],
    WebDevelopment: [
      "User Experience (UX) & Design", "Prototyping with Figma", "Front-End Development with HTML, CSS, JavaScript, Vue.js, Bootstrap", "Client-Side Frameworks & Libraries", "Server-Side Development with Node.js, Express.js, Firebase, WordPress", "Authentication & Security with OAuth, SSL/TLS, Web Sockets", "REST API Development & Integration", "Asynchronous Programming with Callbacks, Promises, and Async/Await", "Cloud Deployment & Hosting", "AWS", "Google", "Local Server", "Virtual Private Server"
    ],
    AIAndMachineLearning: [
      "Transformer-Based Neural Networks (TNN)", "Attention Mechanisms", "Multilayer Perceptron", "AI Model Training & Inference", "Running AI Workloads on HPC Systems"
    ],
    AIApplication: [
      "Integrating AI into software solutions", "local model deployment and optimization"
    ],
    SystemEngineering: [
      "System Validation", "System Verification", "Subsystem Verification", "Unit Test", "Functional Architecture Modeling", "Test-Driven Development", "Agile Development"
    ],
    EngineeringDesignEthics: [
      "System Design Process", "Open-Ended Project Management", "Team Collaboration & Conflict Management", "Stakeholder-Requirement Analysis", "Technical Report Writing & Poster Presentation", "Ethical Decision Making in Engineering"
    ],
    Other: [
      "Data Analysis", "Problem-Solving and Analytical Skills", "SolidWorks", "3D Modeling", "3D Printing & 3D Printer Repair", "Group Work", "Teamwork", "Adaptability"
    ]
  },

  roles: {
    SystemsKernelEngineer: {
      label: "Systems / Kernel",
      skills: [
        "C", "C++", "Assembly", "RISC-V", "QEMU", "OpenSBI", "GDB", "Make",
        "Linux", "Unix System Operation", "Interrupts", "System Calls",
        "Scheduling", "Virtual Memory", "File System",
        "Concurrency & Synchronization", "GCC", "CMake", "bash", "shell"
      ]
    },
    ComputerArchitectureRTL: {
      label: "Computer Architecture / RTL",
      skills: [
        "Verilog", "RISC-V", "Micro Architecture", "Instruction Set Architecture",
        "FPGA", "RTL Simulation", "ModelSim", "Quartus Prime",
        "gem5", "Ramulator", "ZSim", "uPIMulator",
        "Performance & Power Analysis", "Research & Experimental Design"
      ]
    },
    FPGAEngineer: {
      label: "FPGA / Digital Design",
      skills: [
        "Verilog", "FPGA", "Quartus Prime", "ModelSim",
        "Finite State Machines (FSM)", "Timing Closure Basics",
        "PCB Layout", "Cadence OrCAD", "PSpice", "Signal Integrity"
      ]
    },
    EmbeddedFirmwareEngineer: {
      label: "Embedded / Firmware",
      skills: [
        "C", "Embedded C Development", "MSP432", "ESP32", "Raspberry Pi", "Arduino", "micro:bit",
        "Interrupt Handling", "Timer-Based Scheduling", "Real-Time Event Control",
        "I2C", "UART", "BLE", "Wi-Fi", "ADC", "DAC", "Low-Power Embedded Design", "Robotics"
      ]
    },
    HPCPerformanceEngineer: {
      label: "HPC / Performance",
      skills: [
        "Linux", "Python", "MATLAB & Simulink",
        "Omniperf", "Performance Metrics", "Roofline Analysis", "Analytical Modeling",
        "Multi-GPU", "MFMA", "gem5", "uPIMulator", "Bash Automation", "Data Analysis"
      ]
    },
    RoboticsMechatronics: {
      label: "Robotics / Mechatronics",
      skills: [
        "Raspberry Pi", "ESP32", "Arduino", "Sensor and Actuator Integration",
        "Real-Time Event Control", "Robotics", "SolidWorks", "3D Modeling", "3D Printing"
      ]
    },
    FullStackWebEngineer: {
      label: "Full-Stack Web",
      skills: [
        "JavaScript", "TypeScript", "HTML", "CSS", "Vue", "Node.js", "Express.js",
        "TailwindCSS", "shadcn/ui", "Firebase", "MySQL", "MariaDB", "MongoDB",
        "REST API", "Async/Await", "OAuth", "SSL/TLS", "WebSockets", "Figma"
      ]
    },
    DevOpsInfra: {
      label: "DevOps / Infra",
      skills: [
        "Linux", "Docker", "Git", "GitHub", "GitLab",
        "Nginx", "Apache", "VPS", "Server Hardening",
        "AWS", "GCP", "Azure", "Debian", "Ubuntu"
      ]
    },
    DataMLEngineer: {
      label: "Data / ML",
      skills: [
        "Python", "Transformer-Based Neural Networks (TNN)", "Attention Mechanisms",
        "Multilayer Perceptron", "AI Model Training & Inference",
        "Running AI Workloads on HPC Systems", "Data Analysis"
      ]
    },

  },

  navbar,
  contact: { /* … */ social: socials },

  work: [
    {
      company: "MERL (Multidisciplinary Educational Robotics Lab), RHIT",
      href: "https://www.rose-hulman.edu/",
      badges: ["Research", "Leadership"],
      location: "Terre Haute, IN",
      title: "Undergraduate Researcher",
      logoUrl: "/MERL/logo.png",
      start: "May 2024",
      end: "Present",
      description:
        "Designed human-interactive robot frameworks (Arduino, Raspberry Pi), contributed code/docs, and presented milestones; improved team workflows with Git, shared TODOs, and calendars.",
    },
    {
      company: "Maker Lab (RHIT)",
      href: "https://www.rose-hulman.edu/",
      badges: ["Leadership", "Documentation"],
      location: "Terre Haute, IN",
      title: "Archivist",
      logoUrl: "/makerlab.png",
      start: "Mar 2023",
      end: "Present",
      description:
        "Maintained lab assets and documentation; supported student projects and maker activities.",
    },
    {
      company: "International Student Association (RHIT)",
      href: "https://www.rose-hulman.edu/",
      badges: ["Leadership", "Finances"],
      location: "Terre Haute, IN",
      title: "Treasury",
      logoUrl: "/isa.png",
      start: "Mar 2023",
      end: "Jun 2025",
      description:
        "Handled org budgeting and finances; coordinated with campus stakeholders.",
    },
    {
      company: "RHIT ECE",
      href: "https://www.rose-hulman.edu/",
      badges: ["Teaching"],
      location: "Terre Haute, IN",
      title: "Embedded Systems Development — Teaching Assistant",
      logoUrl: "/rhitece.png",
      start: "Nov 2024",
      end: "Mar 2025",
      description:
        "Supported labs on MSP432/embedded C, interrupts, timers, and real-time event control.",
    },
    {
      company: "RHIT ECE",
      href: "https://www.rose-hulman.edu/",
      badges: ["Teaching"],
      location: "Terre Haute, IN",
      title: "Direct Current Circuits — Lab Assistant",
      logoUrl: "/rhitece.png",
      start: "Mar 2024",
      end: "May 2024",
      description:
        "Assisted DC circuits labs; instrumentation, measurement, troubleshooting.",
    },
    {
      company: "RHIT CSSE",
      href: "https://www.rose-hulman.edu/",
      badges: ["Teaching"],
      location: "Terre Haute, IN",
      title: "Object-Oriented Software Development — TA",
      logoUrl: "/rhit.png",
      start: "Sep 2023",
      end: "Nov 2023",
      description:
        "Helped students with Java OOP, data structures, testing, and tooling.",
    },
  ],

  education: [
    {
      school: "Rose-Hulman Institute of Technology",
      href: "https://www.rose-hulman.edu/",
      degree: "B.S. in Computer Engineering (Minor: CS, Economics)",
      logoUrl: "/rhit.png",
      start: "2022",
      end: "2026",
      gpa: "3.28",
      honors: "Dean’s List *4 | Rose-Hulman Merit Scholar ",
      relatedCourses: {
        "Signals & Systems": [
          "Signal Processing",
          "Continuous-Time Signals & Systems"
        ],
        "Circuit Theory": [
          "Direct Current Circuits",
          "Alternating Current Circuits",
          "Circuit and System"
        ],
        "Electronic Devices": [
          "Electronic Device Modeling"
        ],
        "Digital Systems": [
          "Digital System",
          "High-Speed Digital Design"
        ],
        "Embedded Systems": [
          "Embedded Systems"
        ],
        "Computer Systems": [
          "Operating Systems",
          "Computer Architecture I",
          "Computer Architecture II",
          "Advanced Computer Architecture"
        ],
        "Networking & Communication": [
          "Communication Networks"
        ],
        "Software Development": [
          "Object-Oriented Software Development",
          "Web Development"
        ],
        "Algorithms & Programming": [
          "Competitive Programming",
          "Data structure & Algorithm Analysis"
        ],
        "High Performance Computing": [
          "High Performance Computing & AI"
        ],
        "Others": [
          "Principles of Design",
          "Technical Communication"
        ]
      }
    },
  ],

  projects: [
    {
      title: "MorpheOS — Teaching-Focused RISC-V Microkernel",
      href: "#",
      dates: "Jun 2025 – Present",
      active: true,
      description:
        "Boot/bring-up, trap/exception paths, timer-driven preemption, and PLIC external interrupts on RISC-V; integrates OpenSBI and verified on QEMU with GDB; authored teaching docs and labs.",
      longDescription:
        "MorpheOS is a teaching-focused microkernel for RISC-V. It covers early boot/bring-up, trap/exception handling, timer-driven preemption, and PLIC external interrupts. The kernel integrates OpenSBI and is validated on QEMU with GDB-based bring-up and debugging. I also authored hands-on documentation and lab materials to guide students through kernel subsystems and debugging workflows.",
      technologies: ["RISC-V", "C/ASM", "OpenSBI", "QEMU", "GDB", "Make"],
      links: [],
      image: "/MorpheOS/MorpheOS.png",
      video: "",
    },
    {
      title: "Processing-in-Memory DPU Scaling",
      href: "#",
      dates: "Nov 2024 – Mar 2025",
      active: false,
      description:
        "Simulated UPMEM PIM systems (1–16 DPUs/rank) with uPIMulator; analyzed latency, throughput, and BW utilization with Python/Bash automation.",
      longDescription:
        "Explored UPMEM PIM systems using uPIMulator across configurations from 1 to 16 DPUs per rank. Built Python/Bash automation to run parameter sweeps and collect metrics, analyzing end-to-end latency, throughput, and bandwidth utilization tradeoffs. Summarized findings with reproducible scripts and plots.",
      technologies: ["uPIMulator", "Python", "Bash", "Linux"],
      links: [],
      image: "/pimdpu.png",
      video: "",
    },
    {
      title: "Open-Source Educational Robotics",
      href: "#",
      dates: "May 2024 – Present",
      active: true,
      description:
        "Human-interactive robot frameworks; software in C/JS/Python; PCB design in OrCAD; mechanical parts in SolidWorks; docs and outreach.",
      longDescription:
        "Open-source educational robotics stack spanning firmware (C), control and tooling (JS/Python), electronics (OrCAD), and mechanicals (SolidWorks). Focused on approachable, hands-on learning: hardware abstractions, safe defaults, and rich docs/tutorials. Supported community outreach and classroom usage, balancing simplicity and real capability.",
      technologies: ["Arduino", "Raspberry Pi", "C", "JS", "Python", "OrCAD", "SolidWorks"],
      links: [{ type: "Website", href: "https://merl-rose-hulman.github.io", icon: <Icons.globe className="size-3" /> }],
      image: "/MERL/logo.png",
      video: "",
    },
    {
      title: "ParkSmart — Campus Parking App",
      href: "#",
      dates: "Jul 2024 – Present",
      active: true,
      description:
        "Mobile-friendly web app for reporting/viewing real-time parking availability on campus; UI design, implementation, user feedback loop.",
      longDescription:
        "ParkSmart is a mobile-first web app for reporting and viewing campus parking availability in real time. I iterated on UI/UX, implemented the frontend, and ran a user feedback loop to refine reporting flows, map overlays, and moderation. Focus on low-friction interactions and quick glanceability.",
      technologies: ["JavaScript", "HTML", "CSS", "Firebase"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Model United Nations App (CYMUNC)",
      href: "#",
      dates: "Aug 2024 – Oct 2024",
      active: false,
      description:
        "Event management mini-app built with Vue + WeChat platform; improved registration efficiency for 200+ users.",
      longDescription:
        "A WeChat mini program built with Vue and cloud functions for event registration, scheduling, and announcements. Streamlined registration and roster management for 200+ users with simple flows and admin tooling.",
      technologies: ["Vue", "Cloud Functions", "WeChat Mini Program"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Socket Chat Program",
      href: "#",
      dates: "Sep 2024 – Nov 2024",
      active: false,
      description:
        "Two-person chat using TCP sockets in C; custom reliability protocol over UDP; focused on error handling and robustness.",
      longDescription:
        "Built a simple chat system in C using TCP for reliable streams and an experimental UDP layer with a custom reliability protocol (sequence numbers, retransmission, and ACKs). Emphasis on error handling, timeouts, and robustness under lossy conditions.",
      technologies: ["C", "TCP/UDP", "Sockets"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "LazyPlant — Embedded Plant Care",
      href: "#",
      dates: "Nov 2023 – Mar 2024",
      active: false,
      description:
        "MSP432-based automated plant care; low-power modes, interrupts, DAC, SPI, RTC, NeoPixel, and instrumentation.",
      longDescription:
        "Embedded plant care controller on MSP432: sensor sampling and control loops with low-power modes and interrupts; peripherals including DAC, SPI, RTC, and NeoPixel for feedback. Instrumented power/perf behavior and tuned duty cycles for longevity.",
      technologies: ["MSP432", "Embedded C", "SPI", "RTC"],
      links: [{ type: "Website", href: "https://github.com/WillWYQ/LazyPlant", icon: <Icons.github className="size-3" /> }],
      image: "",
      video: "",
    },
    {
      title: "Lime ISA — Multi-cycle CPU (RISC-V-like)",
      href: "#",
      dates: "Nov 2023 – Mar 2024",
      active: false,
      description:
        "Designed datapath/control; Verilog implementation, ModelSim simulation, tests/benchmarks, and simple compiler pipeline.",
      longDescription:
        "Designed a multi-cycle CPU (RISC-V-like) including datapath and control, implemented in Verilog and verified in ModelSim with tests/benchmarks. Built a minimal compiler/assembler pipeline to run small programs and diagnose hazards.",
      technologies: ["Verilog", "ModelSim", "Computer Architecture"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "EV Battery Pack — Cell Test Automation",
      href: "#",
      dates: "Sep 2023 – Sep 2024",
      active: false,
      description:
        "Automated power supply/load control and data collection via MATLAB/Simulink, Python, PyVISA, and Raspberry Pi; ~30% efficiency gain.",
      longDescription:
        "Automated cell test workflows: instrument control and data capture via MATLAB/Simulink, Python, and PyVISA with Raspberry Pi integration. Reduced manual overhead and improved throughput by ~30%, with scripts for repeatable experiments and safety checks.",
      technologies: ["MATLAB", "Simulink", "Python", "PyVISA", "Raspberry Pi"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Guitar Arcade Hero (FPGA)",
      href: "#",
      dates: "Mar 2023 – May 2023",
      active: false,
      description:
        "Altera DE2 design with combinational/sequential logic, SRAM, and FSM for real-time gameplay.",
      longDescription:
        "An FPGA rhythm game on Altera DE2 using combinational and sequential logic with SRAM and a central FSM for real-time gameplay and scoring.",
      technologies: ["FPGA", "Verilog", "Quartus", "SRAM", "FSM"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Genetic Algorithm Simulator",
      href: "#",
      dates: "Nov 2022 – Mar 2023",
      active: false,
      description:
        "Java-based evolutionary simulator with real-time GUI visualization; OOP design and parallelization.",
      longDescription:
        "Java evolutionary simulator with real-time Swing GUI. Emphasized clean OOP design, fitness/selection operators, and optional parallelization to accelerate generations.",
      technologies: ["Java", "Swing/GUI", "OOP"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "WIC Personal Website & Services",
      href: "https://career.wic.monster/",
      dates: "2019 – Present",
      active: true,
      description:
        "Self-hosted WordPress + Nextcloud + mail + file distribution; hardened and optimized on Debian/Apache/PHP/MySQL.",
      longDescription:
        "Self-hosted WordPress, Nextcloud, mail, and file services on Debian/Apache/PHP/MySQL. Hardened and tuned for reliability and performance with backups and monitoring; custom domain and TLS.",
      technologies: ["Unix/Debian", "Apache", "PHP", "MySQL", "Nextcloud"],
      links: [{ type: "Website", href: "https://career.wic.monster/", icon: <Icons.globe className="size-3" /> }],
      image: "",
      video: "",
    },
  ],

  hackathons: [],
} as const;
