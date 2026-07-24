import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  FaHome,
  FaBriefcase,
  FaBuilding,
  FaBell,
  FaUserCircle,
  FaClipboardList,
  FaChartBar,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [notificationCount, setNotificationCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await API.get(`/notifications/${user._id}`);

      const unread = res.data.filter((item) => !item.isRead).length;

      setNotificationCount(unread);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20">

        <Link
          to="/"
          className="text-3xl font-bold text-blue-700"
        >
          Job<span className="text-black">Portal</span>
        </Link>

        {/* Desktop Menu */}

        <div className="hidden lg:flex items-center gap-7">

          <Link to="/" className="flex items-center gap-2 hover:text-blue-600">
            <FaHome />
            Home
          </Link>

          <Link to="/jobs" className="flex items-center gap-2 hover:text-blue-600">
            <FaBriefcase />
            Jobs
          </Link>

          <Link to="/companies" className="flex items-center gap-2 hover:text-blue-600">
            <FaBuilding />
            Companies
          </Link>

          {user?.role === "student" && (
            <>
              <Link to="/saved-jobs">Saved Jobs</Link>

              <Link
                to="/my-applications"
                className="flex items-center gap-2"
              >
                <FaClipboardList />
                My Applications
              </Link>
            </>
          )}

          {user?.role === "recruiter" && (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2"
              >
                <FaChartBar />
                Dashboard
              </Link>

              <Link
                to="/create-company"
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                + Company
              </Link>

              <Link
                to="/add-job"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                + Post Job
              </Link>

              <Link to="/my-jobs">
                My Jobs
              </Link>
            </>
          )}
        </div>

        {/* Desktop Right */}

        <div className="hidden lg:flex items-center gap-5">

          {user && (
            <Link
              to="/notifications"
              className="relative"
            >
              <FaBell size={22} />

              {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2">
                  {notificationCount}
                </span>
              )}
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile">
                <FaUserCircle
                  size={38}
                  className="text-blue-600"
                />
              </Link>

              <div>
                <h3 className="font-semibold">
                  {user.fullName}
                </h3>

                <p className="text-sm text-gray-500 capitalize">
                  {user.role}
                </p>
              </div>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}

        <button
          className="lg:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="lg:hidden bg-white border-t shadow-md px-6 py-5 space-y-4">

          <Link to="/" onClick={() => setMenuOpen(false)} className="block">
            Home
          </Link>

          <Link to="/jobs" onClick={() => setMenuOpen(false)} className="block">
            Jobs
          </Link>

          <Link to="/companies" onClick={() => setMenuOpen(false)} className="block">
            Companies
          </Link>

          {user?.role === "student" && (
            <>
              <Link to="/saved-jobs" onClick={() => setMenuOpen(false)} className="block">
                Saved Jobs
              </Link>

              <Link to="/my-applications" onClick={() => setMenuOpen(false)} className="block">
                My Applications
              </Link>
            </>
          )}

          {user?.role === "recruiter" && (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block">
                Dashboard
              </Link>

              <Link to="/create-company" onClick={() => setMenuOpen(false)} className="block">
                Create Company
              </Link>

              <Link to="/add-job" onClick={() => setMenuOpen(false)} className="block">
                Post Job
              </Link>

              <Link to="/my-jobs" onClick={() => setMenuOpen(false)} className="block">
                My Jobs
              </Link>
            </>
          )}

          {user ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="block">
                Profile
              </Link>

              <Link to="/notifications" onClick={() => setMenuOpen(false)} className="block">
                Notifications ({notificationCount})
              </Link>

              <button
                onClick={logout}
                className="w-full bg-red-500 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block">
                Login
              </Link>

              <Link to="/register" className="block">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;