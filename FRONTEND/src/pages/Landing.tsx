import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navbar */}
      <nav className=" flex items-center justify-between sticky top-0 bg-[#0a0a0a] z-10 px-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-white font-semibold tracking-tight">
            DevPulse
          </span>
        </div>
        <div className="flex items-center gap-4 mr-4">
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
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-28">
        <div className="inline-flex items-center gap-2 bg-[#111111] border border-[#1f1f1f] rounded-full px-4 py-1.5 mb-10">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-gray-400 text-xs">
            Live GitHub activity tracking
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold text-white leading-[1.08] tracking-tight mb-6 max-w-4xl">
          Your GitHub activity,
          <br />
          <span className="text-gray-500">beautifully organized.</span>
        </h1>

        <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed mb-10">
          DevPulse gives developers and teams a real-time view of their GitHub
          repositories. Track commits, pull requests, issues and contributors —
          all in one place.
        </p>

        <div className="flex items-center gap-5 pt-20 mt-10">
          <Link
            to="/register"
            className="bg-red-600 text-black font-sm px-10 py-2.5 rounded-md hover:bg-gray-100 transition text-sm"
          >
            Start for free
          </Link>
          <Link
            to="/login"
            className="text-gray-400 hover:text-white text-sm px-7 py-2.5 rounded-lg border border-[#1f1f1f] hover:border-[#2d2d2d] transition"
          >
            Sign in →
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[#1f1f1f] py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-xs uppercase tracking-widest text-center mb-14">
            How it works
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-7">
              <div className="w-8 h-8 bg-blue-600/10 border border-blue-600/20 rounded-lg flex items-center justify-center mb-5">
                <span className="text-blue-400 text-sm">👤</span>
              </div>
              <h3 className="text-white font-medium mb-1">Individual</h3>
              <p className="text-gray-600 text-xs mb-5">
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
                    <div className="w-5 h-5 rounded-full bg-[#1a1a1a] border border-[#2d2d2d] flex items-center justify-center shrink-0">
                      <span className="text-gray-500 text-xs">{i + 1}</span>
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

            <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-7">
              <div className="w-8 h-8 bg-purple-600/10 border border-purple-600/20 rounded-lg flex items-center justify-center mb-5">
                <span className="text-purple-400 text-sm">👥</span>
              </div>
              <h3 className="text-white font-medium mb-1">Team</h3>
              <p className="text-gray-600 text-xs mb-5">
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
                    <div className="w-5 h-5 rounded-full bg-[#1a1a1a] border border-[#2d2d2d] flex items-center justify-center shrink-0">
                      <span className="text-gray-500 text-xs">{i + 1}</span>
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

      {/* Features */}
      <section className="border-t border-[#1f1f1f] py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-xs uppercase tracking-widest text-center mb-14">
            Features
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "⚡",
                title: "Live activity",
                desc: "Real-time updates without refreshing the page",
              },
              {
                icon: "🔀",
                title: "Pull requests",
                desc: "Track open PRs across all your repositories",
              },
              {
                icon: "🐛",
                title: "Issues",
                desc: "Monitor open issues and their status instantly",
              },
              {
                icon: "👥",
                title: "Contributors",
                desc: "See who is contributing and how much",
              },
              {
                icon: "📝",
                title: "Commit history",
                desc: "Full commit feed with authors and messages",
              },
              {
                icon: "🔗",
                title: "GitHub OAuth",
                desc: "One click login with your GitHub account",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5 hover:border-[#2d2d2d] transition"
              >
                <span className="text-xl mb-3 block">{f.icon}</span>
                <p className="text-white text-sm font-medium mb-1">{f.title}</p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1f1f1f] py-28 px-6 flex flex-col items-center text-center">
        <h2 className="text-4xl font-semibold text-white mb-4 tracking-tight">
          Start tracking today
        </h2>
        <p className="text-gray-600 text-sm mb-8 max-w-sm">
          Free for individuals. Team plans available. No credit card required.
        </p>
        <Link
          to="/register"
          className="bg-white text-black font-medium px-10 py-3 rounded-lg hover:bg-gray-100 transition text-sm"
        >
          Get started free →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1f1f1f] px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">D</span>
          </div>
          <span className="text-gray-600 text-sm">DevPulse</span>
        </div>
        <p className="text-gray-700 text-xs">
          Built by Benjamin Baraza · Nairobi, Kenya
        </p>
      </footer>
    </div>
  );
};

export default Landing;
