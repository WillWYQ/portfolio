// src/data/resume.ts
import { Icons } from "@/components/icons";
import type { Language } from "@/lib/i18n";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { navbar, socials } from "@/config/site";


export const DATA = {
  name: "Yueqiao Wang",
  initials: "YW",
  url: "https://career.yueqiao.dev",
  location: "Terre Haute, IN",
  locationLink: "https://www.google.com/maps/place/Terre+Haute,+IN",
  description:
    "Computer Engineering @ RHIT ('26), cum laude.\nMinor in Computer Science & Economics.\nOS & Computer Architecture • Embedded/Robotics • Web.",
  summary:
    "I'm a computer engineering graduate focused on low-level OS (RISC-V microkernels), computer architecture research, and hands-on firmware/embedded/robotics. I love to work at the intersection of the humanities and technology. I'm here for the hard problems and the quiet joy when a project finally comes alive. Recent work includes a teaching-focused microkernel (MorpheOS), PIM/DPU simulation studies, open-source educational robotics, a full VPN tunnel in C, an ML pipeline predicting job-search outcomes, and campus apps like ParkSmart. Explore my [projects](/#projects) and [experience](/#work), or [say hi](/#contact) below.",
  avatarUrl: "/me.png",
  avatarStatement: "Explore • Build • Share • ",
  heroResumeButtons: [
    // {
    //   label: "Full Resume",
    //   filePath: "/Full_Resume_Yueqiao_Wang_Oct_1.docx",
    //   downloadName: "Yueqiao-Wang-General-Resume.docx",
    // },
    {
      label: "Comp Arch & OS Resume",
      filePath: "/E_CompArch_OS_Resume_Yueqiao_Wang_Jun26.docx",
      downloadName: "Yueqiao-Wang-CompArch-OS-Resume.docx",
    },
    {
      label: "Embedded/Firmware/Robotics Resume",
      filePath: "/OS_Firmware_Resume_Yueqiao_Wang_Jun26.docx",
      downloadName: "Yueqiao-Wang-Embedded-Resume.docx",
    },
    {
      label: "AI Software Resume",
      filePath: "/AI_Software_Resume_Yueqiao_Wang.docx",
      downloadName: "Yueqiao-Wang-AI-Resume.docx",
    }
  ],

  skills: [
    "3D Modeling", "3D Printing", "3D Printing & 3D Printer Repair", "ADC", "ADC/DAC", "AI Model Training & Inference", "ARQ Protocols", "AWS", "Adaptability", "Agile Development", "Analytical Modeling", "Apache", "Arduino", "Assembly", "Async/Await", "Attention Mechanisms", "AWS", "Azure", "Bash Automation", "BLE", "Bluetooth", "Bootstrap", "C", "C++", "CAD", "Cadence OrCAD", "Cadence PSpice", "CMake", "Client-Side Frameworks & Libraries", "Cloud Deployment & Hosting", "Composer", "Concurrency & Synchronization", "Crosstalk Mitigation", "CSS", "Cycle-Accurate Simulators", "DAC", "Data Analysis", "Debian", "Debugging & Verification", "Electrical Component Selection", "Embedded C Development", "Ethernet", "ESP32", "Express.js", "Feature Engineering", "Figma", "File System", "Finite State Machines (FSM)", "Firebase", "Firebase Realtime Database", "Fourier Series & Transform", "FPGA", "Function Generator", "GCC", "GCP", "GDB", "gem5", "Git", "GitHub", "GitLab", "Google Cloud (GCP)", "GridSearchCV", "HTML", "HPC Profiling", "Impedance Matching", "Instruction Set Architecture", "Instrumentation", "Interrupt", "Interrupt Handling", "I2C", "Java", "JavaScript", "Kernel-Level Programming", "Linux", "LVGL", "Local Server", "Low-Level System Security & Access Control", "Low-Power Embedded Design", "MacOS", "Make", "MariaDB", "MATLAB & Simulink", "Matrix-Fused Multiply Accumulate (MFMA)", "Micro Architecture", "micro:bit", "Microcontroller Programming", "ModelSim", "MongoDB", "Multi-GPU", "Multi-GPU Processing", "Multi-Thread/Process Programming", "Multimeter", "MySQL", "Native Chinese", "Networking", "Next.js", "NextCloud", "Nginx", "Node.js", "NumPy", "OAuth", "ONNX", "ONNX Runtime", "Omniperf", "Open-Ended Project Management", "OpenSBI", "Oscilloscope", "OSI Model", "pandas", "PCB Fabrication & Testing", "PCB Layout", "Performance Metrics", "Performance & Power Analysis", "Power Integrity", "Power Supply & Load Programming", "Problem-Solving and Analytical Skills", "Prototyping with Figma", "Python", "PyVISA", "QEMU", "Quartus Prime", "RAM Simulators", "Ramulator", "Raspberry Pi", "Research & Experimental Design", "REST API", "Real-Time Event Control", "RISC-V", "Robotics", "Roofline Analysis", "RStudio", "scikit-learn", "Scheduling", "Scientific Computing", "SCPI", "Sensor and Actuator Integration", "Serial Communication", "Server Hardening", "Shell", "shadcn/ui", "Signal Encoding", "Signal Integrity in PCB and Chip-Level Design", "Signal Integrity", "Silicon Platforms", "Sliding Window Protocols", "Socket Programming", "SolidWorks", "Subsystem Verification", "Swift", "System Calls", "System Design Process", "System Validation", "System Verification", "TailwindCSS", "TCP/IP", "Team Collaboration & Conflict Management", "Technical Report Writing & Poster Presentation", "Test-Driven Development", "Timing Closure Basics", "Transformers", "Transmission Line Analysis", "TypeScript", "UART", "Ubuntu", "uPIMulator", "Unix System Operation", "User Experience (UX) & Design", "Vectorization", "Verilog", "Virtual Memory", "Virtual Private Server", "VPN", "Vue", "Web Hosting", "Web Sockets", "WebSockets", "WebSockets (WS)", "Wi-Fi", "Wireless Communication", "Wireless Networks", "WordPress", "Z-Transform & Discrete-Time Systems", "ZSim", "Chinese", "English", "GCP (Google Cloud)",
  ],

  categorizedSkills: {
    Language: ["Native Chinese", "Professional English"],
    ProgrammingSystem: [
      "Assembly", "Verilog", "bash", "shell", "C", "C++", "CMake", "GCC", "Java", "JavaScript", "TypeScript", "Python", "HTML", "CSS", "Swift", "MATLAB & Simulink", "Unix System Operation", "Linux", "Debian", "Ubuntu", "MacOS"
    ],
    SoftwareDevelopment: ["Git", "GitHub", "GitLab", "Docker", "GitHub Actions"],
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
      "MSP432 Microcontroller", "ESP32 Microcontroller", "Raspberry Pi", "Micro: Bit", "Arduino", "Microcontroller Programming", "Embedded C Development", "Interrupt Handling", "Timer-Based Scheduling", "Real-Time Event Control", "Sensor and Actuator Integration", "Analog Digital Conversion (ADC & DAC)", "Serial Communication (UART, I2C, SPI)", "Wireless Communication (RF, Bluetooth, BLE, Wi-Fi)", "LVGL", "Debugging & Verification", "Low-Power Embedded Design", "Robotics"
    ],
    DigitalDesign: [
      "Cadence OrCAD", "Cadence PSpice", "Electrical Component Selection", "PCB Layout", "PCB Fabrication & Testing", "High-Speed Digital Signal Transmission", "Transmission Line Analysis", "Impedance Matching", "Crosstalk Mitigation", "Power Integrity", "Signal Integrity in PCB and Chip-Level Design"
    ],
    SignalsSystems: [
      "Fourier Series & Transform", "Frequency Domain Analysis", "Filter Design", "Feedback Control Systems", "Z-Transform & Discrete-Time Systems", "Digital Signal Processing Implementation"
    ],
    Networking: [
      "TCP/IP", "OSI Model", "Signal Encoding", "Error Detection", "ARQ Protocols", "Sliding Window Protocols", "Network Switching & Routing", "Multiplexing", "Subnetting", "Ethernet", "Wireless Networks", "Medium Access Control (MAC)", "VPN", "TUN/TAP", "Socket Programming", "Wireshark", "Network Security"
    ],
    OperationSystem: [
      "Multi-Thread/Process Programming", "System Call", "Interrupt", "Process Creation & Scheduling", "Memory Virtualization", "Virtual Memory Management", "File System", "Concurrency & Synchronization", "Kernel-Level Programming", "Low-Level System Security & Access Control", "Boot Flow", "OpenSBI", "PLIC", "Linker Scripts", "Context Switching", "Device Drivers"
    ],
    Server: [
      "Apache", "Nginx", "Linux", "IT Service Management", "Web Hosting", "NextCloud", "Composer", "AWS", "GCP", "Azure"
    ],
    Databases: [
      "MySQL", "MariaDB", "MongoDB", "Firebase Realtime Database"
    ],
    WebDevelopment: [
      "User Experience (UX) & Design", "Prototyping with Figma", "Next.js", "React", "Vue.js", "TypeScript", "JavaScript", "Tailwind CSS", "shadcn/ui", "Bootstrap", "Node.js", "Express.js", "Firebase", "WordPress", "OAuth", "SSL/TLS", "REST API Development & Integration", "Asynchronous Programming with Callbacks, Promises, and Async/Await", "Cloud Deployment & Hosting", "AWS", "Google", "Local Server", "Virtual Private Server", "Cloudflare R2"
    ],
    AIAndMachineLearning: [
      "Transformer-Based Neural Networks (TNN)", "Attention Mechanisms", "Multilayer Perceptron", "AI Model Training & Inference", "Running AI Workloads on HPC Systems", "scikit-learn", "pandas", "NumPy", "Gradient Boosting", "Random Forests", "SVM", "KNN", "Logistic Regression", "GridSearchCV", "Feature Engineering", "ONNX", "ONNX Runtime", "Data Leakage Detection", "Model Evaluation"
    ],
    AIApplication: [
      "Integrating AI into software solutions", "Local model deployment and optimization", "Claude Code", "Spec-Driven AI-Assisted Development", "AI Agent Tooling & Skills", "Multi-Pass AI Design Review"
    ],
    SystemEngineering: [
      "System Validation", "System Verification", "Subsystem Verification", "Unit Test", "Functional Architecture Modeling", "Test-Driven Development", "Agile Development"
    ],
    EngineeringDesignEthics: [
      "System Design Process", "Open-Ended Project Management", "Team Collaboration & Conflict Management", "Stakeholder-Requirement Analysis", "Technical Report Writing & Poster Presentation", "Ethical Decision Making in Engineering"
    ],
    Other: [
      "Data Analysis", "Problem-Solving and Analytical Skills", "SolidWorks", "3D Modeling", "3D Printing & 3D Printer Repair", "Group Work", "Teamwork", "Adaptability", "PyVISA", "SCPI"
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
        "I2C", "UART", "SPI", "BLE", "Wi-Fi", "ADC", "DAC", "Low-Power Embedded Design", "LVGL", "Robotics",
        "PyVISA", "SCPI"
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
        "JavaScript", "TypeScript", "HTML", "CSS", "Next.js", "React", "Vue", "Node.js", "Express.js",
        "TailwindCSS", "shadcn/ui", "Firebase", "MySQL", "MariaDB", "MongoDB",
        "REST API", "Async/Await", "OAuth", "SSL/TLS", "WebSockets", "Figma",
        "Cloudflare R2", "GitHub Actions"
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
        "Python", "scikit-learn", "pandas", "NumPy",
        "Gradient Boosting", "Random Forests", "SVM", "KNN", "Logistic Regression",
        "GridSearchCV", "Feature Engineering", "ONNX", "ONNX Runtime",
        "Transformer-Based Neural Networks (TNN)", "Attention Mechanisms",
        "Multilayer Perceptron", "AI Model Training & Inference",
        "Running AI Workloads on HPC Systems", "Data Analysis"
      ]
    },
    NetworkSecurityEngineer: {
      label: "Network / Security",
      skills: [
        "C", "TCP/IP", "UDP", "Socket Programming", "TUN/TAP",
        "VPN", "Network Security", "Wireshark", "pcap",
        "SHA3-256", "Docker", "Linux"
      ]
    },

  },

  navbar,
  contact: { /* … */ social: socials },

  work: [
    {
      department:"Department of Computer Science & Software Engineering",
      company: "Rose-Hulman Institute of Technology",
      href: "https://www.rose-hulman.edu/",
      badges: ["Teaching"],
      location: "Terre Haute, IN",
      title: "CSSE332 Operating Systems — Grader",
      logoUrl: "/rhit.png",
      start: "Mar 2026",
      end: "May 2026",
      description:
        "Graded CSSE332 Operating Systems assignments and projects covering boot flow, process scheduling, virtual memory management, system calls, concurrency, synchronization, and file systems; provided targeted written feedback on design decisions, race conditions, and memory-safety issues. Coordinated with faculty to maintain consistent evaluation standards across sections.",
    },
    {
      department:"Department of Computer Science & Software Engineering",
      company: "Rose-Hulman Institute of Technology",
      href: "https://www.rose-hulman.edu/",
      badges: ["Teaching"],
      location: "Terre Haute, IN",
      title: "CSSE230 Data Structures & Algorithm Analysis — Grader",
      logoUrl: "/rhit.png",
      start: "Nov 2025",
      end: "Mar 2026",
      description:
        "Graded CSSE230 by reviewing programming labs, proofs, and analysis writeups on recursion, balanced trees, heaps, graphs, and asymptotic reasoning. Checked correctness and runtime claims against rubric expectations, documented clarifications for the instructional team, and turned around actionable written feedback that tied code structure to algorithmic tradeoffs. Coordinated with faculty to sync grading scripts and maintain consistency across sections.",
    },
    {
      department:"Department of Electrical & Computer Engineering",
      company: "Rose-Hulman Institute of Technology",
      href: "https://www.rose-hulman.edu/",
      badges: ["Teaching"],
      location: "Terre Haute, IN",
      title: "ECE312 Communication Networks — Grader",
      logoUrl: "/rhitece.png",
      start: "Nov 2025",
      end: "Mar 2026",
      description:
        "Supported ECE 312 by grading assignments covering layered architectures, circuit vs. packet switching, ISO/OSI reference model flow, point-to-point protocols, framing/error control, shared-medium access, LANs, routing, congestion control, queuing theory, and reliable transport/internetworking. Verified numerical analyses, protocol diagrams, and queuing derivations; provided targeted feedback that linked theory to implementation tradeoffs and kept turnaround under 48 hours.",
    },
    {
      department: "Rose-Hulman Summer Undergraduate Research Fellowships",
      company: "Rose-Hulman Institute of Technology",
      href: "https://www.rose-hulman.edu/",
      badges: ["Research", "Leadership"],
      location: "Terre Haute, IN",
      title: "Researcher ",
      logoUrl: "/rhit.png",
      start: "May 2025",
      end: "Present",
      description:
        "Designed and implemented core microkernel components on a RISC-V SoC, including boot, trap/exception handling, timer-driven preemption, and PLIC-based external interrupts. Integrated OpenSBI (FW_DYNAMIC) and verified the system on QEMU with GDB. Authored documentation, lab exercises, and code comments for an educational OS stack; maintained reproducible build tooling (Makefiles, scripts) to support students. Practiced low-level debugging (RISC-V assembly, linker scripts, interrupt controller configuration) under faculty mentorship; collaborated remotely with the research team. (Remote; Terre Haute, IN)"
    },
    {
      department: "MERL (Multidisciplinary Educational Robotics Lab)",
      company: "Rose-Hulman Institute of Technology",
      href: "https://www.rose-hulman.edu/",
      badges: ["Research", "Leadership"],
      location: "Terre Haute, IN",
      title: "Lab Manager & Researcher ",
      logoUrl: "/MERL/logo.png",
      start: "May 2024",
      end: "May 2026",
      description:
        "Designed and programmed human-interactive robot frameworks using Arduino and Raspberry Pi; implemented software architectures in C, JavaScript, and Python. Built end-to-end embedded systems (circuit design & soldering, HW–SW integration, product design). Used Cadence OrCAD for PCB and SolidWorks for mechanical design. Introduced a Git branching model, TODO tracker, team calendar, and an internal wiki; mentored 5 new student researchers and improved onboarding time by ~20%."
    },
    {
      department: "Maker Lab (Student Organization)",
      company: "Rose-Hulman Institute of Technology",
      href: "https://www.rose-hulman.edu/",
      badges: ["Leadership", "Documentation"],
      location: "Terre Haute, IN",
      title: "Archivist",
      logoUrl: "/makerlab.png",
      start: "Mar 2024",
      end: "Mar 2026",
      description:
        "Maintained lab assets and documentation; supported student projects and maker activities.",
    },
    {
      department: "International Student Association (Student Organization)",
      company: "Rose-Hulman Institute of Technology",
      href: "https://www.rose-hulman.edu/",
      badges: ["Leadership", "Finances"],
      location: "Terre Haute, IN",
      title: "Treasury",
      logoUrl: "/isa.png",
      start: "Mar 2023",
      end: "Jun 2025",
      description:
        "Oversaw budgeting and transparent reporting for a 50-member student association. Coordinated with campus offices to secure funding for cultural events, while improving documentation practices for continuity. Gained leadership, budgeting, and organizational skills.",
    },
    {
      department: "Department of Electrical & Computer Engineering",
      company: "Rose-Hulman Institute of Technology",
      href: "https://www.rose-hulman.edu/",
      badges: ["Teaching"],
      location: "Terre Haute, IN",
      title: "Embedded Systems Development — Teaching Assistant",
      logoUrl: "/rhitece.png",
      start: "Nov 2024",
      end: "Mar 2025",
      description:
        "Assisted in an Embedded Systems course. Helped students debug C/assembly code on microcontrollers, including build setup and peripheral use; guided practices for interrupts, timing, and resource-constrained programming. Checked off labs and graded reports with consistent rubrics. Reinforced systematic debugging habits and clear documentation; collaborated with the instructor to keep sessions on schedule.",
    },
    {
      department: "Department of Electrical & Computer Engineering",
      company: "Rose-Hulman Institute of Technology",
      href: "https://www.rose-hulman.edu/",
      badges: ["Teaching"],
      location: "Terre Haute, IN",
      title: "Direct Current Circuits — Lab Assistant",
      logoUrl: "/rhitece.png",
      start: "Mar 2024",
      end: "May 2024",
      description:
        "Supported undergraduate DC Circuits lab sections as a Lab Assistant. Prepared and checked lab stations; set up bench power supplies, digital multimeters, oscilloscopes, and function generators. Assisted students with breadboarding and safe measurement techniques; verified circuit behavior against expected values; helped debug wiring and instrumentation issues. Documented common issues and clarified lab procedures with the instructor."

    },
    {
      department: "Department of Computer Science & Software Engineering",
      company: "Rose-Hulman Institute of Technology",
      href: "https://www.rose-hulman.edu/",
      badges: ["Teaching"],
      location: "Terre Haute, IN",
      title: "Object-Oriented Software Development — TA",
      logoUrl: "/rhit.png",
      start: "Sep 2023",
      end: "Nov 2023",
      description:
        "Supported an undergraduate Object-Oriented Software Development course as a Teaching Assistant and project manager for the course project. Provided lab and office-hour support; helped students debug object-oriented code and reason about program design (abstraction, encapsulation, inheritance, polymorphism). Reviewed submissions and graded programming assignments using clear rubrics; delivered targeted feedback. Coordinated with the instructor to clarify requirements and maintain course materials. Organized weekly project meetings, set milestones, tracked risks, and guided teams to completion while reinforcing unit-testing and version-control practices."
    },
  ],

  education: [
    {
      school: "Rose-Hulman Institute of Technology",
      href: "https://www.rose-hulman.edu/",
      degree: "B.S. in Computer Engineering, cum laude",
      minors: ["Computer Science", "Economics"],
      certifications: ["Semiconductor Materials and Devices"],
      logoUrl: "/rhit.png",
      start: "2022",
      end: "2026",
      gpa: "3.41",
      honors: "Dean's List | Rose-Hulman Merit Scholar",
      relatedCourses: {
        "Signals & Systems": [
          "Signal Processing",
          "Continuous-Time Signals & Systems",
          "Linear Control Systems"
        ],
        "Circuit Theory": [
          "Direct Current Circuits",
          "Alternating Current Circuits",
          "Circuit and System"
        ],
        "Electronic Devices": [
          "Electronic Device Modeling",
          "Semiconductor Materials & Applications",
          "Semiconductor Devices & Fabrication"
        ],
        "Digital Systems": [
          "Digital System",
          "High-Speed Digital Design",
          "Intro to MEMs: Fabrication & Applications"
        ],
        "Embedded Systems": [
          "Embedded Systems"
        ],
        "Computer Systems": [
          "Operating Systems",
          "Operating System Design",
          "Computer Architecture I",
          "Computer Architecture II",
          "Advanced Computer Architecture"
        ],
        "Networking & Security": [
          "Communication Networks",
          "Network Security"
        ],
        "Software Development": [
          "Object-Oriented Software Development",
          "Web Development"
        ],
        "Algorithms & Programming": [
          "Competitive Programming",
          "Data Structures & Algorithm Analysis"
        ],
        "High Performance Computing & AI": [
          "High Performance Computing & AI",
          "Machine Learning"
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
      links: [{ type: "GitHub", href: "https://github.com/rhit-netsos/morpheos", icon: <Icons.github className="size-3" /> }],
      images: ["/MorpheOS/MorpheOS.png", "/MorpheOS/MorpheOSQemu.png"],
      imageFolder: "MorpheOS",
      video: "",
    },
    {
      title: "UsedExchange — AI-Assisted Static Marketplace",
      href: "https://github.com/WillWYQ/usedExchange",
      dates: "Apr 2026 – Present",
      active: true,
      description:
        "Database-free, statically generated marketplace in Next.js 15/TypeScript; client-side geolocation pricing via haversine; spec-first AI-assisted workflow with Claude Code and 10+ consistency audits.",
      longDescription:
        "Architected a database-free marketplace (Next.js 15/TypeScript) where all content is driven from a single content folder, letting non-technical sellers manage inventory without touching application code. Designed a distance-tiered pricing engine that resolves buyer location entirely client-side via the browser Geolocation API (haversine, zero server calls), keeping visitor coordinates private. Engineered a git-free image pipeline using Cloudflare R2 CDN with a lightweight JSON manifest, keeping deploys within free static-hosting limits on GitHub Pages. Drove a spec-first, AI-assisted workflow with Claude Code, hardening a ~270 KB internally consistent design corpus (7 versioned docs, v0.2.0–v0.9.0) through 10+ AI-led multi-pass consistency audits that caught orphaned schema fields, broken build ordering, and dependency cycles before any code was written. Authored a 14-phase, agent-executable implementation plan with machine-checkable acceptance criteria (type-check + lint gates). Shipped two portable AI assistant skills (/setup, /update-items) that generate site config and item metadata from seller photos and notes.",
      technologies: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "Cloudflare R2", "GitHub Actions", "Claude Code"],
      links: [{ type: "GitHub", href: "https://github.com/WillWYQ/usedExchange", icon: <Icons.github className="size-3" /> }],
      image: "",
      video: "",
    },
    {
      title: "Job-Offer Outcome Prediction — ML Pipeline & Browser App",
      href: "https://jobprediction-project.willsleep.dev/",
      dates: "Mar 2026 – May 2026",
      active: false,
      description:
        "End-to-end ML pipeline on 100K records; 7 classifier families with GridSearchCV; 91% accuracy via gradient boosting; ONNX-exported model deployed in a serverless Next.js browser app.",
      longDescription:
        "Led model development for a 3-person team (MA 415 final project, Rose-Hulman, Spring 2026). Built a full Python ML pipeline on a 100,000-record public dataset: data cleaning (leakage control, dropped high-missingness columns), preprocessing (one-hot encoding, StandardScaler, 80/20 split), and feature engineering (degree-2 polynomial terms, greedy forward feature selection). Trained and tuned 7 classifier families with GridSearchCV—logistic regression (Ridge/Lasso), linear SVM, KNN, decision tree, random forest, gradient boosting—raising binary offer-prediction accuracy from a 66% baseline to 91% with gradient boosting. Independently diagnosed and investigated data leakage from interview-count features through cascade experiments; framed this openly as a modeling maturity highlight. Also improved harder 4-class accuracy from 34% to ~45%, correctly diagnosing the ceiling as genuine class overlap. Exported the best model to ONNX for fully client-side browser inference; built a Next.js 14 + TypeScript + Tailwind + shadcn/ui prediction app deployed via GitHub Actions CI/CD. Produced a reusable CLI training pipeline (data prep → train → GridSearchCV → serialized models + comparison reports). Achieved 94.64% project score.",
      technologies: ["Python", "scikit-learn", "pandas", "NumPy", "ONNX", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "GitHub Actions"],
      links: [
        { type: "Website", href: "https://jobprediction-project.willsleep.dev/", icon: <Icons.globe className="size-3" /> }
      ],
      image: "",
      video: "",
    },
    
    {
      title: "Cryogenic Superconducting Film Characterization Apparatus",
      href: "#",
      dates: "Sep 2025 – May 2026",
      active: false,
      description:
        "Owns the EGS/TSS control stack for a superconducting thin-film tester: ESP32-P4 edge controller, PT1000/ADS124S08 readout, LVGL touchscreen UI, WebUSB host dashboard, and YAML measurement plans.",
      longDescription:
        "Leading the electronics/software that power Rose-Hulman's cryogenic superconducting film tester. Designed the ESP32-P4 Edge Computing Subsystem that drives the PSU/DMM over isolated RS-232 (SCPI), samples the cryogenic PT1000 via ADS124S08, enforces guards/interlocks, and streams telemetry over a single WebUSB/CDC link. Implemented the Temperature Sensing Subsystem with a 4-wire Kelvin interface, calibration routines, and SPI driver to hold ±0.5 K accuracy at 77 K. Built the semiautomatic measurement software: an on-device touchscreen graphical UI (LVGL) and a WebUSB host dashboard for connect→configure→run→export, a YAML recipe format that compiles into MCU state machines, and logging that emits CSV+JSON with firmware hashes, instrument IDs, and guard outcomes.",
      technologies: ["ESP32-P4", "ADS124S08", "PT1000", "TinyUSB/WebUSB", "SCPI", "YAML", "LVGL"],
      links: [],
      image: "",
      imageFolder: "CYRO",
      video: "",
    },
    {
      title: "VPN Tunnel Program",
      href: "#",
      dates: "Jan 2026 – Mar 2026",
      active: false,
      description:
        "Full VPN tunnel in C over UDP; custom WireChild protocol with SHA3-256 encryption, sequence-number anti-replay, server-assigned virtual IPs, TUN device bring-up, and Docker-based integration test.",
      longDescription:
        "Implemented a full VPN tunnel in C over UDP with a custom WireChild protocol: SHA3-256 symmetric encryption, sequence-number anti-replay protection, and server-assigned virtual IPs. Built TUN device bring-up (TUN/TAP interface configuration), multi-client session management via hash maps, keepalive reaping for session cleanup, and a Docker-based integration demo with concurrent ping validation. Sole developer—independently selected cryptographic primitives, defined the virtual IP assignment and session state model, and tested through containerized integration testing. Deepened understanding of OS-level networking subsystems, VPN protocol architecture, and applied cryptography.",
      technologies: ["C", "UDP", "TUN/TAP", "SHA3-256", "Docker", "Linux Networking"],
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
      longDescription:
        "Open-source educational robotics stack spanning firmware (C), control and tooling (JS/Python), electronics (OrCAD), and mechanicals (SolidWorks). Focused on approachable, hands-on learning: hardware abstractions, safe defaults, and rich docs/tutorials. Supported community outreach and classroom usage, balancing simplicity and real capability.",
      technologies: ["Arduino", "Raspberry Pi", "C", "JS", "Python", "OrCAD", "SolidWorks"],
      links: [{ type: "Website", href: "https://merl-rose-hulman.github.io", icon: <Icons.globe className="size-3" /> }],
      imageFolder: "MERL",
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
      title: "OAO Autonomous Vehicle Firmware",
      dates: "Mar 2025 – May 2025",
      description:
        "ESP32 modular firmware with PID steering, Wi-Fi telemetry, and real-time web dashboard.",
      longDescription:
        "Developed C++ firmware for an ESP32-based autonomous vehicle. Implemented a modular RUN/STOP/PIT-STOP state machine, PID steering control, and proportional throttle. Integrated HuskyLens for line tracking, INA219 sensors for power monitoring, and PWM drivers for actuators. Built an on-device Wi-Fi dashboard (ESPAsyncWebServer + WebSocket + LittleFS) for real-time telemetry, parameter tuning, and CSV export. Served as software lead in a 4-person team, owning firmware and controls logic while collaborating on circuit integration and bench testing. Practiced embedded C++, I²C drivers, Wi-Fi networking, CSV logging, and Git-based code review workflow.",
      technologies: ["ESP32", "C++", "PID Control", "WebSocket", "LittleFS", "I²C"],
      imageFolder: "OAOfirmware",
      video: "",
      links: [{ type: "GitHub", href: "https://github.com/Rose-Hulman-ECE-Junior-Design/junior-design-project-team13-brtw", icon: <Icons.github className="size-3" /> }],

    },
    {
      title: "ParkSmart — Campus Parking App",
      href: "#",
      dates: "Jul 2024 – Present",
      active: true,
      description:
        "Mobile-friendly web app for reporting/viewing real-time parking availability on campus; UI design, implementation, user feedback loop.",
      longDescription:
        "Engineered a mobile-friendly app using JavaScript/HTML/CSS and Firebase to display live campus parking availability. Implemented both reporting of available spaces and real-time visualization for users. Sole developer responsible for UI/UX design, back-end integration, and stakeholder communication. Gathered requirements from campus management and iterated features to improve adoption. Strengthened skills in full-stack development, requirement analysis, and stakeholder communication.",
      technologies: ["JavaScript", "HTML", "CSS", "Firebase", "UX Design"],
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
        "Developed a Model UN management app as a WeChat Mini Program using Vue.js front-end and WeChat cloud functions as back-end. The app replaced manual registration and improved sign-up efficiency by ~50% for 200+ users. Implemented features for delegate registration, scheduling, and real-time announcements. Served as the sole software developer in a 4-person cross-time-zone team, translating non-technical requirements into software and iterating based on organizer feedback. Enhanced skills in full-stack JavaScript (Vue, cloud functions, database management) and cross-functional communication.",
      technologies: ["Vue.js", "WeChat Cloud", "JavaScript", "Database"],
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
        "Built an IP-based chat application in C supporting both TCP and UDP. Designed and implemented a custom reliable UDP messaging protocol that ensured message ordering and integrity over unreliable channels. Debugged with packet captures and refined error handling for networked systems. Collaborated in a 2-person team, sharing workload evenly; took primary responsibility for protocol design and sockets API usage. Strengthened skills in low-level network programming, custom protocol design, and debugging distributed systems.",
      technologies: ["C", "TCP/UDP", "Sockets API", "Wireshark"],
      links: [
        { type: "PDF", href: "/pdf/socketChat.pdf", icon: <Icons.text className="size-3" /> },
      ],
      image: "",
      imageFolder: "SocketChatProgram",
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
        "Built an embedded system on a TI MSP432 to automate plant care. Integrated soil moisture, light, and temperature sensors; controlled pump, grow light, and fan via configurable profiles. Wrote drivers for NeoPixel LEDs and sensor interfacing, using interrupts and ADC sampling. Implemented real-time scheduling with the microcontroller RTC. Led a 2-person team, collaborating on mechanical and hardware integration. Practiced low-power firmware design, SPI/UART/I²C protocols, and oscilloscope-based debugging.",
      technologies: ["MSP432", "Embedded C", "SPI", "I²C", "RTC"],
      links: [{ type: "GitHub", href: "https://github.com/WillWYQ/LazyPlant", icon: <Icons.github className="size-3" /> }],
      imageFolder: "LazyPlant",
      images: [
        "/LazyPlant/IMG_8267.png",
        "/LazyPlant/IMG_8352.png",
        "/LazyPlant/IMG_8353.png",
      ],
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
        "Co-designed and implemented a simplified multi-cycle RISC-V ISA in Verilog with a 4-person team. Focused on branch instructions, control unit, ALU, and pipeline datapath integration. Validated correctness via ModelSim with benchmark programs and compiler integration. Practiced RTL design trade-offs between multi-cycle vs pipelined approaches, reinforcing understanding of assembly-level execution and microarchitecture fundamentals.",
      technologies: ["Verilog", "ISA Design", "ALU/Control Unit", "ModelSim", "Computer Architecture"],
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
        "Developed an automated test program to control power supply/load and collect data via MATLAB, Simulink, Python, PyVISA, and Raspberry Pi. Standardized testing workflows across sub-teams, improving efficiency by ~30% and reducing manual effort. Implemented CSV logging, automated batch runs, and register-level device interfacing. Collaborated with cross-functional hardware/software teams to unify procedures, enhance data reliability, and increase throughput.",
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
        "Implemented a Guitar Hero-style game on an Altera DE2 FPGA in Verilog. Developed sequential and combinational logic for note timing and state-machine driven game flow. Led a 2-person team, coordinating feature planning and module integration. Gained experience in FPGA workflow, Verilog design, and real-time digital logic implementation.",
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
        "Developed a simulator with Java Swing to visualize population evolution under genetic algorithm operators (selection, crossover, mutation). Designed the class structure with one teammate, integrating components through regular design reviews. Practiced Java OOP, GUI development, exception handling, and concurrency for parallel fitness evaluations. Strengthened ability to translate algorithmic design into interactive visualization.",
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
        "Established and maintained a WordPress-based site and NextCloud collaboration suite for a student community. Configured VPS servers with Debian/Ubuntu, Apache/Nginx, and MySQL/MariaDB. Integrated security controls (SSL/TLS, access permissions) to ensure reliability. Troubleshot server issues through forums and online resources. Gained practical skills in system administration, web infrastructure, and security hardening.",
      technologies: ["Unix/Debian", "Apache", "PHP", "MySQL", "Nextcloud", "Self-initiated", "WordPress", "Email Server"],
      links: [{ type: "Website", href: "https://web.archive.org/web/20240718112637/https://wic.monster/", icon: <Icons.globe className="size-3" /> }, { type: "Website", href: "https://web.archive.org/web/20240716044735/https://storage.wic.monster/index.php/login", icon: <Icons.googleDrive className="size-3" /> }],
      image: "",
      video: "",
    },
  ],

  hackathons: [],
} as const;

export type ResumeData = typeof DATA;

const RESUME_DATA_MAP: Record<Language, ResumeData> = {
  en: DATA,
  zh: DATA,
};

export const getResumeData = (language: Language): ResumeData =>
  RESUME_DATA_MAP[language] ?? DATA;