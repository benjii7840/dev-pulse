import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col justify-between items-center">
      {/* NAVBAR */}
      <nav className=" top-0 w-full z-50 bg-[#0a0a0a]/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-semibold text-white text-sm tracking-wide">
              DevPulse
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/login"
              className="text-gray-400 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-white text-red-600 rounded-md font-medium hover:bg-gray-200 transition px-6 py-3 "
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-40 md:pt-48 pb-24">
        {/* Gradient Glow */}
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[140px] rounded-full" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-xl md:text-7xl font-bold leading-tight tracking-tight">
            Understand your codebase{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              in real time
            </span>
          </h1>

          <p className="mt-6 text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            DevPulse gives your team instant visibility into commits, pull
            requests, and development activity — all in one clean dashboard.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition"
            >
              Start for free
            </Link>

            <Link
              to="/login"
              className="px-6 py-3 border border-white/10 rounded-md text-gray-300 hover:text-white hover:border-white/30 transition"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-28 border-t border-white/5 ">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 ml-10">
          {[
            {
              title: "Live Activity",
              desc: "See commits and PRs as they happen across your team.",
            },
            {
              title: "Team Visibility",
              desc: "Know who is working on what without asking.",
            },
            {
              title: "Velocity Insights",
              desc: "Track progress and productivity over time.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur hover:bg-white/[0.05] transition"
            >
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start building with clarity
        </h2>

        <p className="mt-4 text-gray-400">
          Join teams that track their development in real time.
        </p>

        <div className="mt-8">
          <Link
            to="/register"
            className="px-8 py-4 bg-blue-600 text-white text-md rounded-md hover:bg-blue-500 transition mx-auto hover: cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} DevPulse. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
