import "./App.css";
import { Outlet } from "react-router-dom";
import { Container } from "./components/index.js";

import { Header, Footer } from "./components/index.js";

function App() {
  return (
    <div className="w-full flex flex-col">
      <div className="header w-full">
        <Header />
      </div>

      <main className="w-full">
        <Container>
          <Outlet />
        </Container>
      </main>

      <div className="footer ">
        <Footer />
      </div>
    </div>
  );
}

export default App;
