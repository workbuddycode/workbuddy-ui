import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/pages/Header';
import Footer from './components/pages/Footer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header onMenuClick={() => console.log("Menu clicked")} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;