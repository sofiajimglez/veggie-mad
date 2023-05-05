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
import UsersUpdateForm from "./components/users/UsersUpdateForm";
import UserPoints from "./components/users/user-profile/UserPoints";
import UserFavs from "./components/users/user-profile/UserFavs";
import UserReviews from "./components/users/user-profile/UserReviews";
import UserVisits from "./components/users/user-profile/UserVisits";
import UserResume from "./components/users/user-profile/UserResume";

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

          <Route path='/business-profile' element={<PrivateRoute><ProfilePage><BusinessResume /></ProfilePage></PrivateRoute>} />
          <Route path='/profile/code' element={<PrivateRoute><ProfilePage><BusinessCode /></ProfilePage></PrivateRoute>} />
          <Route path='/profile/business-favs' element={<PrivateRoute><ProfilePage><BusinessFavs /></ProfilePage></PrivateRoute>} /> 
          <Route path='/profile/business-reviews' element={<PrivateRoute><ProfilePage><BusinessReviews /></ProfilePage></PrivateRoute>} /> 
          <Route path='/profile/business-visits' element={<PrivateRoute><ProfilePage><BusinessVisits /></ProfilePage></PrivateRoute>} /> 
          <Route path='/profile/edit-business' element={<PrivateRoute><ProfilePage><BusinessUpdateForm /></ProfilePage></PrivateRoute>} />

          <Route path='/user-profile' element={<PrivateRoute><ProfilePage><UserResume /></ProfilePage></PrivateRoute>} />
          <Route path='/profile/user-visits' element={<PrivateRoute><ProfilePage><UserVisits /></ProfilePage></PrivateRoute>} /> 
          <Route path='/profile/user-reviews' element={<PrivateRoute><ProfilePage><UserReviews /></ProfilePage></PrivateRoute>} /> 
          <Route path='/profile/user-favs' element={<PrivateRoute><ProfilePage><UserFavs /></ProfilePage></PrivateRoute>} />
          <Route path='/profile/points' element={<PrivateRoute><ProfilePage><UserPoints /></ProfilePage></PrivateRoute>} />
          <Route path='/profile/edit-user' element={<PrivateRoute><ProfilePage><UsersUpdateForm /></ProfilePage></PrivateRoute>} />
           
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
