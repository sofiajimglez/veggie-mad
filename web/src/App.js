import { Route, Routes } from "react-router-dom";
import UserRegisterPage from "./pages/UserRegisterPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import AuthUserStore from "./contexts/AuthUserStore";
import PrivateRoute from "./guards/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/footer/Footer";
import BusinessRegisterPage from "./pages/BusinessRegisterPage";
import ExplorePage from "./pages/ExplorePage";
import BusinessPage from "./pages/BusinessPage";
import BusinessUpdateForm from './components/businesses/business-profile/BusinessUpdateForm';
import BusinessReviews from './components/businesses/business-profile/BusinessReviews';
import BusinessCode from './components/businesses/business-profile/BusinessCode';
import BusinessFavs from './components/businesses/business-profile/BusinessFavs';
import BusinessVisits from './components/businesses/business-profile/BusinessVisits';
import BusinessResume from './components/businesses/business-profile/BusinessResume';


function App() {
  

  return (
    <>
      <AuthUserStore>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/users/register' element={<UserRegisterPage />} />
          <Route path='/business/register' element={<BusinessRegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path='/profile' element={<PrivateRoute><ProfilePage><BusinessResume /></ProfilePage></PrivateRoute>} />
          <Route path='/profile/code' element={<PrivateRoute><ProfilePage><BusinessCode /></ProfilePage></PrivateRoute>} />
          <Route path='/profile/business-favs' element={<PrivateRoute><ProfilePage><BusinessFavs /></ProfilePage></PrivateRoute>} /> 
          <Route path='/profile/business-reviews' element={<PrivateRoute><ProfilePage><BusinessReviews /></ProfilePage></PrivateRoute>} /> 
          <Route path='/profile/business-visits' element={<PrivateRoute><ProfilePage><BusinessVisits /></ProfilePage></PrivateRoute>} /> 
          <Route path='/profile/edit' element={<PrivateRoute><ProfilePage><BusinessUpdateForm /></ProfilePage></PrivateRoute>} />
           
          {/* <Route path='/negocio' element={<PrivateRoute role='business'><ProfilePage /></PrivateRoute>} /> */}
          <Route path='/explora-madrid' element={<ExplorePage />} />
          <Route path='/explora-madrid/:businessId' element={<BusinessPage />} />
        </Routes>
        <Footer />
      </AuthUserStore>
    </>
  );
}

export default App;
