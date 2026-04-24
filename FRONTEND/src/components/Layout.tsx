import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <div className="w-56 bg-[#0a0a0a] border-r border-[#1f1f1f] flex flex-col fixed h-full">
        <div className="p-4 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-white font-semibold text-sm">DevPulse</span>
          </div>
        </div>

        <nav className="flex-1 p-3">
          <div className="text-gray-600 text-xs font-medium px-2 mb-2 uppercase tracking-wider">
            Navigation
          </div>
          <Link
            to="/dashboard"
            className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition mb-0.5 ${
              location.pathname === "/dashboard"
                ? "bg-[#1f1f1f] text-white"
                : "text-gray-500 hover:text-white hover:bg-[#1f1f1f]"
            }`}
          >
            <svg
              className="w-4 h-4"
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
              <img
                src={user.avatar}
                className="w-6 h-6 rounded-full"
                alt="avatar"
              />
            ) : (
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">{user?.name?.[0]}</span>
              </div>
            )}
            <span className="text-gray-400 text-sm truncate">{user?.name}</span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-2 py-1.5 text-gray-600 hover:text-red-400 text-sm transition rounded-lg hover:bg-[#1f1f1f]"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="ml-56 flex-1 p-8">{children}</div>
    </div>
  );
};

export default Layout;
