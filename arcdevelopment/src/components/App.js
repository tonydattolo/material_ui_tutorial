import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import theme from './ui/Theme';
import Header from '../components/ui/Header';

// import Button from '@material-ui/core/Button';
// or
// import {Button} from '@material-ui/core';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <div>Home</div>} />
          <Route exact path="/services" component={() => <div>Serivces</div>} />
          <Route exact path="/customsoftware" component={() => <div>Custom Software</div>} />
          <Route exact path="/mobileapps" component={() => <div>mobile apps</div>} />
          <Route exact path="/websites" component={() => <div>websites</div>} />
          <Route exact path="/revolution" component={() => <div>revolution</div>} />
          <Route exact path="/about" component={() => <div>about us</div>} />
          <Route exact path="/contact" component={() => <div>contact</div>} />
          <Route exact path="/estimate" component={() => <div>estimate</div>} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
