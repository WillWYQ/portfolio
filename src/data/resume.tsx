// src/data/resume.ts
import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Yueqiao Wang",
  initials: "YW",
  url: "https://en.wic.monster",
  location: "Terre Haute, IN",
  locationLink: "https://www.google.com/maps/place/Terre+Haute,+IN",
  description:
    "Computer Engineering @ RHIT ('26). OS & Computer Architecture • Embedded/Robotics • Web.",
  summary:
    "I’m a computer engineering student focused on low-level OS (RISC-V microkernels), computer architecture research, and hands-on embedded/robotics. Recent work includes a teaching-focused microkernel (MorpheOS), PIM/DPU simulation studies, open-source educational robotics, and campus apps like ParkSmart. Explore my [projects](/#projects) and [experience](/#work), or say hi below.",

  avatarUrl: "/me.png",

  skills: [
    "Chinese","English","C", "C++", "Assembly", "Verilog", "RISC-V",
    "Linux", "Git", "Docker",
    "Python", "MATLAB/Simulink",
    "Java", "JavaScript", "TypeScript", "Vue", "Node.js",
    "FPGA", "Quartus", "ModelSim",
    "uPIMulator", "gem5", "Ramulator", "ZSim",
    "Firebase", "MySQL", "MongoDB",
    "TailwindCSS", "shadcn/ui"
  ],

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

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],

  contact: {
    email: "career@wic.monster",
    tel: "+1 (812) 223-2167",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/WillWYQ",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/yueqiaowang/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:career@wic.monster",
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "MERL (Multidisciplinary Educational Robotics Lab), RHIT",
      href: "https://www.rose-hulman.edu/",
      badges: ["Research"],
      location: "Terre Haute, IN",
      title: "Undergraduate Researcher",
      logoUrl: "/merl.png",
      start: "May 2024",
      end: "Present",
      description:
        "Designed human-interactive robot frameworks (Arduino, Raspberry Pi), contributed code/docs, and presented milestones; improved team workflows with Git, shared TODOs, and calendars.",
    },
    {
      company: "Maker Lab (RHIT)",
      href: "https://www.rose-hulman.edu/",
      badges: [],
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
      badges: ["Leadership"],
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
      logoUrl: "/rhit.png",
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
      logoUrl: "/rhit.png",
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
      technologies: ["RISC-V", "C/ASM", "OpenSBI", "QEMU", "GDB", "Make"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Processing-in-Memory DPU Scaling",
      href: "#",
      dates: "Nov 2024 – Mar 2025",
      active: false,
      description:
        "Simulated UPMEM PIM systems (1–16 DPUs/rank) with uPIMulator; analyzed latency, throughput, and BW utilization with Python/Bash automation.",
      technologies: ["uPIMulator", "Python", "Bash", "Linux"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Open-Source Educational Robotics",
      href: "#",
      dates: "May 2024 – Present",
      active: true,
      description:
        "Human-interactive robot frameworks; software in C/JS/Python; PCB design in OrCAD; mechanical parts in SolidWorks; docs and outreach.",
      technologies: ["Arduino", "Raspberry Pi", "C", "JS", "Python", "OrCAD", "SolidWorks"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "ParkSmart — Campus Parking App",
      href: "#",
      dates: "Jul 2024 – Present",
      active: true,
      description:
        "Mobile-friendly web app for reporting/viewing real-time parking availability on campus; UI design, implementation, user feedback loop.",
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
      technologies: ["MSP432", "Embedded C", "SPI", "RTC"],
      links: [],
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
      technologies: ["Unix/Debian", "Apache", "PHP", "MySQL", "Nextcloud"],
      links: [{ type: "Website", href: "https://career.wic.monster/", icon: <Icons.globe className="size-3" /> }],
      image: "",
      video: "",
    },
  ],

  hackathons: [],
} as const;