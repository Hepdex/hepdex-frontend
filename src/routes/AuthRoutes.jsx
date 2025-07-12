import Signin from "../pages/Signin";
import SignupPage from "../pages/Signup";
import EmployerSignup from "../pages/EmployerSignup";
import CandidateSignup from "../pages/CandidateSignup";
import CompanySignup from "../pages/CompanySignup";
import AddBio from "../pages/AddBio";
import ConfirmEmail from "../pages/ConfirmEmail";
import ForgotPassword from "../pages/Forgotpassword";
import AuthLayout from "../layouts/AuthLayout";
import { Route } from "react-router-dom";

export default function AuthRoutes() {
  return (
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Signin />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="employer/signup" element={<EmployerSignup />} />
      <Route path="candidate/signup" element={<CandidateSignup />} />
      <Route path="company/signup" element={<CompanySignup />} />
      <Route path="add-bio" element={<AddBio />} />
      <Route path="confirm-email" element={<ConfirmEmail />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Route>
  );
}
