import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NoMatch from "./pages/NoMatch";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import Scan from "./components/Scan";
import Retrieve from "./components/Retrieve";
import Payment from "./components/Payment";
import { Container } from 'reactstrap';
import Space from "./components/Space";



function App() {
  return (
      <Router>
        <div>
          <TopNav />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" render={(props) => <Auth {...props} action="signup" />} />
              <Route exact path="/login" render={(props) => <Auth {...props} action="login" />} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/vehicle" render={(props) => <Auth {...props} action="vehicle" />}/>
              <Route exact path="/pay" component={Payment} />
              <Route exact path="/scan" component={Scan} />
              <Route exact path="/retrieve" component={Retrieve} />
              <Route exact path="/space" component={Space} />
              <Route component={NoMatch} />
            </Switch>
          </Container>
          <Footer />
         
        </div>
      </Router>
  
     
  );

 
     
}




export default App;
