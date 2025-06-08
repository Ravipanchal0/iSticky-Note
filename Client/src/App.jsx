import "./App.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Sidebar } from "./components/index.js";

import { Header, Footer } from "./components/index.js";

function App() {
  const authStatus = useSelector((state) => state.auth.authStatus);
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <main className="w-full flex flex-1">
        {authStatus && <Sidebar />}
        <Container>
          <Outlet />
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default App;
