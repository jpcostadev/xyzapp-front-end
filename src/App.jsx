import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Api from "./api/api";
import Header from "./components/headerFooter/Header";
import Footer from "./components/headerFooter/Footer";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import { UserStorage } from "./userContext";
import User from "./components/user/User";
import ProtectedRouter from "./components/utils/ProtectedRouter";
import MenuMobile from "./components/menu/MenuMobile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />

            <Route
              path="conta/*"
              element={
                <ProtectedRouter>
                  <User />
                </ProtectedRouter>
              }
            />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
