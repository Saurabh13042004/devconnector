import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";

import { loadUser } from "./action/auth";
import PrivateRoute from "./components/routing/PrivateRoute";

// Redux

import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import CreateProfile from "./components/profile-forms/CreateProfile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => (
  useEffect(() => {
    store.dispatch(loadUser());
  }, []),
  (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
           <Route
            path="create-profile"
            element={<PrivateRoute component={CreateProfile} />}
          />
        </Routes>
      </Router>
    </Provider>
  )
);

export default App;
