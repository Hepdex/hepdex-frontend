import AltLayout from "../layouts/AltLayout";
import AddJob from "../pages/AddJob";
import EditJob from "../pages/EditJob";
import EditCompany from "../pages/EditCompany";
import UploadResume from "../pages/UploadResume";
import EditCandidate from "../pages/EditCandidate";
import JobApplication from "../pages/JobApplication";
import { Route } from "react-router-dom";

export default function AltRoutes() {
  return (
    <Route element={<AltLayout />}>
      <Route element={<AddJob />} path="post-a-job" />
      <Route element={<EditJob />} path="edit-job/:jobID" />
      <Route element={<EditCompany />} path="edit-company" />
      <Route element={<UploadResume />} path="upload-resume" />
      <Route element={<EditCandidate />} path="edit-profile" />
      <Route path="jobs/:slug" element={<JobApplication />} />
    </Route>
  );
}
