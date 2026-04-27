import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      <div className="w-52 bg-[#0a0a0a] border-r border-[#1f1f1f] flex flex-col fixed h-full">
        <div className="p-4 border-b border-[#1f1f1f]">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">D</span>
            </div>
            <span className="text-white font-semibold text-sm">DevPulse</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="text-gray-700 text-xs font-medium px-2 mb-2 uppercase tracking-wider">
            Workspace
          </div>
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition mb-0.5 ${
              location.pathname === "/dashboard"
                ? "bg-[#1f1f1f] text-white"
                : "text-gray-600 hover:text-white hover:bg-[#1a1a1a]"
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
            Repositories
          </Link>
        </nav>

        <div className="p-3 border-t border-[#1f1f1f]">
          <div className="flex items-center gap-2 px-2 py-1.5 mb-1">
            {user?.avatar ? (
              <img src={user.avatar} className="w-5 h-5 rounded-full" alt="" />
            ) : (
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">{user?.name?.[0]}</span>
              </div>
            )}
            <span className="text-gray-500 text-xs truncate">{user?.name}</span>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="w-full text-left px-2 py-1.5 text-gray-700 hover:text-red-400 text-xs transition rounded-lg"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="ml-52 flex-1">{children}</div>
    </div>
  );
};

export default Layout;
