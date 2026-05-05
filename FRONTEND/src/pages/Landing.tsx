import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[20%] right-[0%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] animate-float-reverse" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-purple-500/15 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-[5%] left-[15%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[110px] animate-float-reverse" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgMjBoMjB2MjBIMjB6TTAgMjBoMjB2MjBIMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-20" />
      </div>
      <Navbar />
      {/* HERO SECTION */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-gray-300 text-xs font-medium">
              Live intelligence · Now for teams
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] md:leading-[1.15]">
            <span className="bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent">
              Ship faster with
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-pulse inline-block mt-2">
              real-time code insights
            </span>
          </h1>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            DevPulse connects your GitHub, GitLab, and Bitbucket — turning
            commits, PRs, and review cycles into a single source of truth for
            engineering leaders.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 items-center">
            <Link
              to="/register"
              className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-semibold shadow-xl shadow-blue-600/25 hover:shadow-blue-500/40 transition-all duration-200 flex items-center gap-2 group text-base"
            >
              Start free trial
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <a
              href="#"
              className="px-7 py-3.5 border border-white/20 rounded-xl text-gray-200 hover:bg-white/5 transition backdrop-blur-sm font-medium flex items-center gap-2"
            >
              Watch demo
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </div>

          {/* Social Proof Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12 items-center">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["JD", "MK", "SR"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold border-2 border-black"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-400">
                <span className="text-white font-semibold">2,400+</span> dev
                teams
              </span>
            </div>
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Real-time sync ·{" "}
                <span className="text-white">250k+ PRs analyzed</span>
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview Mock */}
        <div className="relative mt-20 max-w-5xl mx-auto px-4 hidden md:block">
          <div className="relative rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-2 shadow-2xl shadow-blue-900/20">
            <div className="bg-gradient-to-b from-gray-900/40 to-transparent rounded-xl p-4 flex items-center justify-between text-xs text-gray-400">
              <div className="flex gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <span>devpulse/dashboard · live activity</span>
              <span className="text-blue-400">● 12 updates</span>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4 text-left">
              <div>
                <div className="text-green-300 font-mono text-sm">
                  + 47 commits
                </div>
                <div className="text-gray-500 text-xs">in last 2h</div>
              </div>
              <div>
                <div className="text-blue-300 font-mono text-sm">
                  📦 18 PRs open
                </div>
                <div className="text-gray-500 text-xs">3 awaiting review</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-blue-400 text-sm uppercase tracking-wider font-semibold bg-blue-500/10 px-3 py-1 rounded-full">
              Core features
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-5 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Everything you need to
              <br />
              optimize engineering flow
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-7 lg:gap-9">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-7 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition duration-300" />
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg ${feature.shadow}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-3 text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
                <div
                  className={`mt-5 flex items-center text-sm ${feature.linkColor} group-hover:translate-x-1 transition-transform`}
                >
                  {feature.linkText} →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="py-16 border-y border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm uppercase tracking-wide font-semibold">
            Trusted by forward-thinking engineering teams
          </p>
          <div className="flex flex-wrap justify-center gap-10 mt-8 opacity-70 hover:opacity-100 transition-all duration-500">
            {["linear.app", "vercel", "supabase", "hashicorp"].map((brand) => (
              <span
                key={brand}
                className="text-2xl font-bold text-white/40 hover:text-white/70 transition"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPS SECTION */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
              Better together
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 leading-tight">
              From fragmented workflows
              <br />
              to unified pulse
            </h2>
            <p className="text-gray-400 mt-5 leading-relaxed">
              Stop jumping between dashboards, Slack threads, and spreadsheets.
              DevPulse pulls everything into a single dashboard that updates in
              real time, so your team stays aligned and productive.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "GitHub, GitLab, Bitbucket sync",
                "Customizable team dashboards",
                "Smart notifications & weekly digests",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-8 text-blue-400 font-medium hover:text-blue-300 transition"
            >
              Explore integrations →
            </a>
          </div>

          {/* Stats Card */}
          <div className="relative bg-gradient-to-br from-gray-900/40 to-gray-800/20 rounded-2xl border border-white/10 p-6 backdrop-blur-md">
            <div className="flex justify-between border-b border-white/10 pb-3">
              <div className="font-mono text-sm text-blue-300">/ insights</div>
              <div className="text-gray-500 text-xs">live</div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Avg. PR merge time</span>
                <span className="text-white font-mono font-semibold">6.2h</span>
                <span className="text-green-400 text-xs">▼ 28%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Active contributors</span>
                <span className="text-white font-mono font-semibold">14</span>
                <span className="text-blue-400 text-xs">↑ +3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Unblocked tasks</span>
                <span className="text-white font-mono font-semibold">92%</span>
                <span className="text-green-400 text-xs">healthy</span>
              </div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Live sync: 2 new commits
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-24 md:py-32 z-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="relative rounded-3xl overflow-hidden p-0.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 animate-shimmer">
            <div className="rounded-3xl bg-[#050505] p-10 md:p-14 backdrop-blur-lg">
              <h2 className="text-3xl md:text-5xl font-bold">
                Ready to transform how your team{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  builds software?
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
                Join thousands of developers who ship with confidence and
                clarity. Start your 14-day free trial — no credit card required.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/register"
                  className="px-8 py-3.5 bg-white text-black font-bold rounded-xl shadow-xl hover:bg-gray-100 transition"
                >
                  Start for free →
                </Link>
                <a
                  href="#"
                  className="px-8 py-3.5 border border-white/20 rounded-xl text-gray-200 hover:bg-white/5 transition"
                >
                  Talk to sales
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-6">
                Free tier includes up to 10 seats. No hidden fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="font-bold">D</span>
              </div>
              <span className="font-bold text-lg">DevPulse</span>
            </div>
            <p className="text-gray-500 text-sm mt-3 max-w-xs">
              Real-time intelligence for high‑performance engineering teams.
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold text-sm">
                {section.title}
              </h4>
              <ul className="mt-3 space-y-2 text-gray-400 text-sm">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-8 mt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <span>
            © {new Date().getFullYear()} DevPulse — All rights reserved.
          </span>
          <div className="flex gap-5 mt-3 md:mt-0">
            {["Twitter", "GitHub", "LinkedIn", "Discord"].map((social) => (
              <a key={social} href="#" className="hover:text-white transition">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

// Data arrays for better maintainability
const features = [
  {
    title: "Lightning Activity Feed",
    description:
      "Stream commits, PRs, code reviews, and deployments as they happen — zero latency visibility for your whole org.",
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/20",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    linkText: "Explore live feed",
    linkColor: "text-blue-400",
  },
  {
    title: "Team Visibility Matrix",
    description:
      "See who's working on what, bottlenecks, and contributions — no more status meetings. DORA metrics ready.",
    gradient: "from-indigo-500 to-purple-600",
    shadow: "shadow-indigo-500/20",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    linkText: "Unlock insights",
    linkColor: "text-indigo-400",
  },
  {
    title: "Velocity & Predictability",
    description:
      "Smart analytics: cycle time, throughput, PR merge trends — data-driven decisions to boost delivery.",
    gradient: "from-purple-500 to-pink-600",
    shadow: "shadow-purple-500/20",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    linkText: "View analytics",
    linkColor: "text-purple-400",
  },
];

const footerSections = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security"],
  },
];

export default Landing;
