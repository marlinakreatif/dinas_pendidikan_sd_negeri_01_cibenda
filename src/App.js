import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './login/Login';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Login}></Route>
      <div className="supported-by">
        Supported By <span>MARLINA_KREATIF &trade;</span>
      </div>
    </BrowserRouter>
  );
}

export default App;
