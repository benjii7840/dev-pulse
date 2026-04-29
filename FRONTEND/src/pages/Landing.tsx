import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col p-4">
      <nav className="top-0 z-10 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Landing;
