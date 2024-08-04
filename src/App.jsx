// App.js
import React, { useState } from 'react';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetails';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import '../src/Styles/Styles.css'

const App = () => (
  <Router>
    <div className="app">
      <Routes>
        <Route exact path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </div>
  </Router>
);

export default App;
