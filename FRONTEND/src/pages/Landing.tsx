import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-10 bg-[#0a0a0a] border-b border-[#1f1f1f]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-semibold tracking-tight">DevPulse</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-gray-400 hover:text-white text-sm transition"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="bg-white text-black text-sm font-medium px-5 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-28">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#111111] border border-[#1f1f1f] rounded-full px-4 py-1.5 mb-10">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-gray-400 text-xs">
              Live GitHub activity tracking
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight mb-6">
            Your GitHub activity,
            <br />
            <span className="text-gray-500">beautifully organized.</span>
          </h1>

          {/* Paragraph */}
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-10">
            DevPulse gives developers and teams a real-time view of their GitHub
            repositories. Track commits, pull requests, issues and contributors
            — all in one place.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Link
              to="/register"
              className="bg-white text-black text-sm font-medium px-6 py-2.5 rounded-md hover:bg-gray-100 transition"
            >
              Start for free
            </Link>
            <Link
              to="/login"
              className="text-gray-400 hover:text-white text-sm px-6 py-2.5 rounded-md border border-[#1f1f1f] hover:border-[#2d2d2d] transition"
            >
              Sign in →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[#1f1f1f] px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <p className="text-gray-600 text-xs uppercase tracking-widest text-center mb-14">
            How it works
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card */}
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-7">
              <div className="w-8 h-8 bg-blue-600/10 border border-blue-600/20 rounded-lg flex items-center justify-center mb-5">
                👤
              </div>
              <h3 className="font-medium mb-1">Individual</h3>
              <p className="text-gray-500 text-sm mb-5">
                Perfect for solo developers who want to track their own
                repositories.
              </p>

              <div className="flex flex-col gap-3 mb-6">
                {[
                  "Connect your GitHub account",
                  "Add repositories to track",
                  "View live commit activity",
                ].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#1a1a1a] border border-[#2d2d2d] flex items-center justify-center text-xs text-gray-500">
                      {i + 1}
                    </div>
                    <span className="text-gray-400 text-sm">{step}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/register?type=individual"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition"
              >
                Start as Individual →
              </Link>
            </div>

            {/* Card */}
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-7">
              <div className="w-8 h-8 bg-purple-600/10 border border-purple-600/20 rounded-lg flex items-center justify-center mb-5">
                👥
              </div>
              <h3 className="font-medium mb-1">Team</h3>
              <p className="text-gray-500 text-sm mb-5">
                Built for engineering teams who need visibility across all
                codebases.
              </p>

              <div className="flex flex-col gap-3 mb-6">
                {[
                  "Create a team workspace",
                  "Invite members with a code",
                  "Track all repos together",
                ].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#1a1a1a] border border-[#2d2d2d] flex items-center justify-center text-xs text-gray-500">
                      {i + 1}
                    </div>
                    <span className="text-gray-400 text-sm">{step}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/register?type=team"
                className="block text-center bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2.5 rounded-lg transition"
              >
                Start as Team →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1f1f1f] px-6 py-28">
        <div className="max-w-xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold mb-4">Start tracking today</h2>
          <p className="text-gray-500 text-sm mb-8">
            Free for individuals. Team plans available. No credit card required.
          </p>

          <Link
            to="/register"
            className="bg-white text-black text-sm font-medium px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Get started free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1f1f1f] px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded-md flex items-center justify-center text-xs text-white font-bold">
              D
            </div>
            DevPulse
          </div>

          <p>Built by Benjamin Baraza · Nairobi, Kenya</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
