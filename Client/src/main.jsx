import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { AuthLayout } from "./components/index.js";
import {
  AboutPage,
  AddNotePage,
  AllNotesPage,
  DashboardPage,
  HomePage,
  LoginPage,
  SignupPage,
} from "./pages/index.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route
        path="login"
        element={<AuthLayout children={<LoginPage />} authentication={false} />}
      />
      <Route
        path="signup"
        element={
          <AuthLayout children={<SignupPage />} authentication={false} />
        }
      />
      <Route
        path="dashboard"
        element={
          <AuthLayout children={<DashboardPage />} authentication={true} />
        }
      />
      <Route
        path="allNotes"
        element={
          <AuthLayout children={<AllNotesPage />} authentication={true} />
        }
      />
      <Route
        path="addNote"
        element={
          <AuthLayout children={<AddNotePage />} authentication={true} />
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
