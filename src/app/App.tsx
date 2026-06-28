import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

const NAV_ITEMS = ["About", "Experience", "Skills", "Education", "Contact"] as const;
type Section = (typeof NAV_ITEMS)[number];

const EXPERIENCE = [
  {
    company: "Miami Heat",
    role: "Internet Services Coordinator / Foreign Content Producer & Distributor",
    period: "Oct 2016 — Present",
    location: "Miami, FL",
    description:
      "Manage and scale the global brand influence of the Miami HEAT across international digital platforms, with a focus on the Chinese market. Oversee content strategy, production, and data analysis for official accounts on Douyin and Weibo, driving consistent engagement and follower growth. Draft strategic press releases, coordinate postgame interview logistics, and facilitate interactions between international media and team personnel. Spearhead partnerships with high-profile global influencers to produce innovative postgame sports content.",
    tags: ["Content Production", "Social Media Strategy", "Data Analytics", "Public Relations", "Douyin", "Weibo"],
  },
  {
    company: "Thunder Express LLC",
    role: "Store Manager",
    period: "May 2016 — Oct 2016",
    location: "Miami, FL",
    description:
      "Managed daily business operations, inventory control, and staff scheduling to optimize operational efficiency. Implemented customer service standards that drove repeat business and enhanced local brand reputation.",
    tags: ["Operations Management", "Inventory Control", "Staff Scheduling", "Customer Service"],
  },
  {
    company: "Pacific Wind Ltd",
    role: "International Sales Manager",
    period: "Jun 2013 — Jan 2014",
    location: "International",
    description:
      "Directed sales initiatives, managed client accounts, and analyzed market data to identify growth opportunities. Coordinated with cross-functional teams to streamline distribution and meet performance targets.",
    tags: ["International Sales", "Account Management", "Market Analysis", "Business Development"],
  },
];

const SKILLS: Record<string, string[]> = {
  "Digital Media": ["Global Content Creation", "Video Distribution", "Layered PSD Asset Generation", "Advanced Image Editing"],
  "Public Relations": ["Postgame Interview Coordination", "Press Release Drafting", "Media Relations", "Cross-Border Brand Expansion"],
  "Data & Analytics": ["Social Media Performance Tracking", "Audience Insights", "Engagement Optimization", "Publishing Strategy"],
  "Technical": ["Adobe Photoshop", "Adobe Premiere", "Adobe Lightroom", "HTML", "Python", "AI Creative Tools"],
  "Languages": ["English", "Mandarin", "Cantonese"],
};

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRefs = useRef<Record<Section, HTMLElement | null>>({
    About: null,
    Experience: null,
    Skills: null,
    Education: null,
    Contact: null,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as Section);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_ITEMS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: Section) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b border-border flex items-center justify-between px-6 py-4">
        <span
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}
          className="text-lg tracking-tight"
        >
          Shuaihu Zhong
        </span>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="text-foreground text-sm font-medium uppercase tracking-widest"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        {menuOpen && (
          <nav className="absolute top-full left-0 right-0 bg-background border-b border-border flex flex-col">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`px-6 py-4 text-left text-sm uppercase tracking-widest border-b border-border transition-colors ${
                  activeSection === item
                    ? "text-accent font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        )}
      </header>

      <div className="flex">
        {/* Left sidebar — desktop */}
        <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-64 xl:w-72 border-r border-border bg-background px-8 py-12 justify-between z-40">
          <div>
            {/* Identity */}
            <div className="mb-12">
              <h1
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontStyle: "italic" }}
                className="text-3xl xl:text-4xl leading-tight text-foreground mb-1"
              >
                Shuaihu
                <br />
                Zhong
              </h1>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mt-3">
                Content Producer & Digital Media
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-muted-foreground text-xs">
                <MapPin size={12} />
                <span>Miami-Fort Lauderdale Area</span>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className={`text-left py-2 text-sm uppercase tracking-widest transition-colors relative group ${
                    activeSection === item
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-0 h-px bg-accent transition-all duration-300 ${
                      activeSection === item ? "w-6" : "w-0 group-hover:w-3"
                    }`}
                  />
                  <span className={activeSection === item ? "pl-9" : "pl-0 group-hover:pl-5 transition-all duration-300"}>
                    {item}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Contact shortcut */}
          <div className="flex gap-4 items-center">
            <a
              href="mailto:stevinzhong@gmail.com"
              className="text-muted-foreground hover:text-accent transition-colors"
              title="Email"
            >
              <Mail size={16} />
            </a>
            <span className="ml-auto text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
              v2026
            </span>
          </div>
        </aside>

        {/* Main content */}
        <main className="w-full lg:ml-64 xl:ml-72 pt-16 lg:pt-0">
          {/* About */}
          <section
            id="About"
            ref={(el) => { sectionRefs.current.About = el; }}
            className="min-h-screen flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-24 border-b border-border"
          >
            <div className="max-w-2xl">
              <p
                className="text-xs uppercase tracking-widest text-accent mb-8"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                01 / About
              </p>
              <h2
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                className="text-5xl xl:text-6xl leading-[1.05] text-foreground mb-8"
              >
                Bridging cultures through sport — one story at a time.
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Results-driven Content Producer and Digital Media Professional with nearly
                  a decade of experience managing international content distribution, social
                  media strategy, and public relations for a premier professional sports organization.
                </p>
                <p>
                  Currently at <span className="text-foreground font-medium">Miami HEAT</span>,
                  where I manage the team's global brand presence across Chinese digital platforms,
                  driving international audience growth on Douyin and Weibo.
                </p>
                <p>
                  Expert in leveraging data analytics to optimize engagement across global platforms,
                  coordinating high-profile media interactions, and building strategic cross-border
                  partnerships with international influencers.
                </p>
              </div>

              {/* Key stats */}
              <div className="grid grid-cols-3 gap-0 mt-12 border border-border">
                {[
                  { value: "9+", label: "Years experience" },
                  { value: "3", label: "Languages spoken" },
                  { value: "2016", label: "Miami HEAT since" },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`px-6 py-5 ${i < 2 ? "border-r border-border" : ""}`}
                  >
                    <div
                      style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}
                      className="text-3xl text-foreground"
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience */}
          <section
            id="Experience"
            ref={(el) => { sectionRefs.current.Experience = el; }}
            className="px-8 lg:px-16 xl:px-24 py-24 border-b border-border"
          >
            <p
              className="text-xs uppercase tracking-widest text-accent mb-12"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              02 / Experience
            </p>

            <div className="space-y-0">
              {EXPERIENCE.map((job, i) => (
                <div
                  key={job.company}
                  className="border-t border-border py-10 grid grid-cols-1 lg:grid-cols-5 gap-6 group hover:bg-card transition-colors duration-200 -mx-8 lg:-mx-16 xl:-mx-24 px-8 lg:px-16 xl:px-24"
                >
                  {/* Period */}
                  <div className="lg:col-span-1">
                    <span
                      className="text-xs text-muted-foreground"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {job.period}
                    </span>
                    <div className="text-xs text-muted-foreground mt-1">{job.location}</div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3
                          style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                          className="text-2xl text-foreground leading-tight"
                        >
                          {job.role}
                        </h3>
                        <p className="text-accent text-sm font-medium mt-0.5">{job.company}</p>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-muted-foreground flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 border border-border text-muted-foreground"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-border" />
            </div>
          </section>

          {/* Education */}
          <section
            id="Education"
            ref={(el) => { sectionRefs.current.Education = el; }}
            className="px-8 lg:px-16 xl:px-24 py-24 border-b border-border"
          >
            <p
              className="text-xs uppercase tracking-widest text-accent mb-12"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              03 / Education
            </p>

            <div className="border border-border">
              <div className="p-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-1">
                  <span
                    className="text-xs text-muted-foreground"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    2010 — 2015
                  </span>
                  <div className="text-xs text-muted-foreground mt-1">Coral Gables, FL</div>
                </div>
                <div className="lg:col-span-4">
                  <h3
                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                    className="text-2xl text-foreground leading-tight mb-1"
                  >
                    Bachelor of Engineering
                  </h3>
                  <p className="text-accent text-sm font-medium mb-1">Electrical and Electronics Engineering</p>
                  <p className="text-sm text-muted-foreground">University of Miami</p>
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section
            id="Skills"
            ref={(el) => { sectionRefs.current.Skills = el; }}
            className="px-8 lg:px-16 xl:px-24 py-24 border-b border-border"
          >
            <p
              className="text-xs uppercase tracking-widest text-accent mb-12"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              04 / Skills & Competencies
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-0 border border-border">
              {Object.entries(SKILLS).map(([category, skills], i) => (
                <div
                  key={category}
                  className={`p-8 ${i < Object.keys(SKILLS).length - 1 ? "border-b xl:border-b-0 xl:border-r border-border" : ""}`}
                >
                  <h4
                    className="text-xs uppercase tracking-widest text-foreground font-medium mb-6"
                  >
                    {category}
                  </h4>
                  <ul className="space-y-2.5">
                    {skills.map((skill) => (
                      <li
                        key={skill}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-accent flex-shrink-0" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section
            id="Contact"
            ref={(el) => { sectionRefs.current.Contact = el; }}
            className="px-8 lg:px-16 xl:px-24 py-24"
          >
            <p
              className="text-xs uppercase tracking-widest text-accent mb-12"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              05 / Contact
            </p>

            <div className="max-w-xl">
              <h2
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                className="text-4xl xl:text-5xl text-foreground leading-tight mb-6"
              >
                Let's connect and create something together.
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-10">
                Open to new opportunities in digital media, content strategy, and international
                brand partnerships. The best way to reach me is by email or phone.
              </p>

              <a
                href="mailto:stevinzhong@gmail.com"
                className="inline-flex items-center gap-3 bg-foreground text-primary-foreground px-8 py-4 text-sm uppercase tracking-widest hover:bg-accent transition-colors duration-200 group"
              >
                <Mail size={16} />
                stevinzhong@gmail.com
                <ArrowUpRight
                  size={14}
                  className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>

              <div className="flex gap-6 mt-8 pt-8 border-t border-border">
                <a
                  href="tel:9518807684"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail size={15} />
                  (951) 880-7684
                </a>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={15} />
                  Miami-Fort Lauderdale Area
                </span>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="px-8 lg:px-16 xl:px-24 py-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span
              className="text-xs text-muted-foreground"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              © 2026 Shuaihu Zhong
            </span>
            <span
              className="text-xs text-muted-foreground"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Designed & built with precision
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}
