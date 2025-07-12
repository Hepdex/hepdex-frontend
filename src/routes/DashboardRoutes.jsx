import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Job from "../pages/Job";
import Jobs from "../pages/Jobs";
import Settings from "../pages/Settings";
import Company from "../pages/Company";
import Sourcing from "../pages/Sourcing";
import FindJobs from "../pages/FindJobs";
import CandidateBio from "../pages/CandidateBio";
import SavedJobs from "../pages/SavedJobs";
import { Route } from "react-router-dom";

export default function DashboardRoutes() {
  return (
    <Route element={<DashboardLayout />} path="dashboard">
      <Route path="home" element={<Dashboard />} />
      <Route path="jobs" element={<Jobs />} />
      <Route path="jobs/:jobID" element={<Job />} />
      <Route path="settings" element={<Settings />} />
      <Route path="company-bio" element={<Company />} />
      <Route path="browse-talent" element={<Sourcing />} />
      <Route path="find-jobs" element={<FindJobs />} />
      <Route path="profile" element={<CandidateBio />} />
      <Route path="saved-jobs" element={<SavedJobs />} />
    </Route>
  );
}
