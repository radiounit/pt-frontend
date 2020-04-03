import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import PageTabs from './components/PageTabs';
import TrainingCalendar from './components/TrainingCalendar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <PageTabs />
      <Router>
        <Switch>
          <Route exact path="/" component={TrainingCalendar} />
          <Route path="/customers" component={Customerlist} />
          <Route path="/trainings" component={Traininglist} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
