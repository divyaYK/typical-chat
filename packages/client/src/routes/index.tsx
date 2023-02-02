import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Authentication from "../pages/Authentication";
import NotFoundPage from "../pages/NotFoundPage";
import EmailVerification from "../pages/EmailVerification";
import ProtectedRoute from "./ProtectedRoute";

const AllRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={(
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      )}
    />
    <Route path="/login" element={<Authentication formToLoad="LOGIN" />} />
    <Route path="/sign-up" element={<Authentication formToLoad="SIGNUP" />} />
    <Route path="/email-verify" element={<EmailVerification />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AllRoutes;
