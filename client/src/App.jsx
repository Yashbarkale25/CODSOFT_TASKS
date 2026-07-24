import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Company from "./pages/Company";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyApplications from "./pages/MyApplications";
import MyJobs from "./pages/MyJobs";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import CreateCompany from "./pages/CreateCompany";
import ViewApplicants from "./pages/ViewApplicants";
import Notifications from "./pages/Notifications";
import SavedJobs from "./pages/SavedJobs";
import UpdateProfile from "./pages/UpdateProfile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditCompany from "./pages/EditCompany";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/companies" element={<Company />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-profile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />

        {/* Student */}
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute role="student">
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute role="student">
              <SavedJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute role="student">
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* Recruiter */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="recruiter">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-company"
          element={
            <ProtectedRoute role="recruiter">
              <CreateCompany />
            </ProtectedRoute>
          }
        />
        <Route
  path="/edit-company/:id"
  element={
    <ProtectedRoute role="recruiter">
      <EditCompany />
    </ProtectedRoute>
  }
/>
        <Route
          path="/add-job"
          element={
            <ProtectedRoute role="recruiter">
              <AddJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute role="recruiter">
              <MyJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute role="recruiter">
              <EditJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-applicants/:jobId"
          element={
            <ProtectedRoute role="recruiter">
              <ViewApplicants />
            </ProtectedRoute>
          }
        />
        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
<Route
  path="/verify-otp"
  element={<VerifyOTP />}
/>
<Route
  path="/reset-password"
  element={<ResetPassword />}
/>
      </Routes>

      

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </>
    
  );
}

export default App;