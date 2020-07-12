import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './login/Login';
import Home from './home/Home';
import EventPage from './event/EventPage'

function App() {
  return (
    <BrowserRouter >
      {/* Main Routes */}
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Home} />
      <Route path="/event-page" component={EventPage} />


      <div className="supported-by">
        Supported By <span>MARLINA_KREATIF &trade;</span>
      </div>
    </BrowserRouter>
  );
}

export default App;
