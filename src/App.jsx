import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./Routes/Home";
import Contact from "./Routes/Contact";
import Detail from "./Routes/Detail";
import Favs from "./Routes/Favs";
import { useDentistStates } from "./Components/utils/global.context";

function App() {
  const { themeState } = useDentistStates();

  const homeRoute = "/";
  const contactRoute = "/contacto";
  const favsRoute = "/favs";
  const detailsRoute = "/dentista/:id";

  return (
    <div className={themeState.isDark ? 'App' : 'dark'}>
      <Navbar />
      <Routes>
        <Route path={homeRoute} element={<Home />} />
        <Route path={contactRoute} element={<Contact />} />
        <Route path={favsRoute} element={<Favs />} />
        <Route path={detailsRoute} element={<Detail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
