import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Restaurants from './components/restaurants/Restaurants';
import AppState from './context/AppState';
import Login from './components/Login'
import Categories from './components/categories/Categories';
import RestaurantInfo from './components/RestaurantInfo/RestaurantInfo';
import Category from './components/category/Category'
import Register from './components/Register';
import Profile from './components/Profile/Profile';
import Communities from './components/Communities/Communities';
import Community from './components/Community/Community';
import Footer from './components/Footer';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

const App = () => {
  return (
    <AppState>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Login />
          </Route>

          <Route exact path='/register'>
              <Register />
          </Route> 

          <Route exact path='/forgot-password/'>
            <ForgotPassword />
          </Route>

          <Route path='/forgot-password/reset/:id'>
            <ResetPassword/>
          </Route>

          <Route path='/restaurants' exact>
            <Header />
            <Restaurants />
            <Footer />
          </Route>

          <Route path='/restaurants/:id'>
            <Header />
            <RestaurantInfo />
            <Footer />
          </Route>
          
          <Route exact path='/categories'>
            <Header />
            <Categories />
            <Footer />
          </Route>

          <Route exact path='/categories/:id'>
            <Header />
            <Category />
            <Footer />
          </Route>

          <Route exact path='/profile'>
            <Header/>
            <Profile/>
            <Footer />
          </Route>

          <Route exact path='/communities'>
            <Header />
            <Communities />
            <Footer />
          </Route>


          <Route exact path='/communities/:id'>
            <Header />
            <Community />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </AppState>
  );
}

export default App;
