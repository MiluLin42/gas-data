import "./App.css";
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMe } from "./redux/reducers/userReducer";
import Homepage from "./pages/Homepage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SignIn from "./pages/SignIn";
import MembersPage from "./pages/MembersPage";
import MemberPage from "./pages/MemberPage";
import MemberEditPage from "./pages/MemberEditPage";
import SearchMembersPage from "./pages/SearchMembersPage";
import BusinessesPage from "./pages/BusinessesPage";
import BusinessPage from "./pages/BusinessPage";
import BusinessEditPage from "./pages/BusinessEditPage";
import SearchBusinessesPage from "./pages/SearchBusinessesPage";
import Contact from "./pages/Contact";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    dispatch(getMe());
  }, [dispatch]);

  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/member" element={<MemberPage />} />
        <Route path="/members/update/:id" element={<MemberEditPage />} />
        <Route path="/businesses" element={<BusinessesPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/businesses/update/:id" element={<BusinessEditPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/members/search/:keyword"
          element={<SearchMembersPage />}
        />
        <Route
          path="/businesses/search/:keyword"
          element={<SearchBusinessesPage />}
        />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
