// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? <Login setUser={setUser} /> : <Chat user={user} />}
    </div>
  );
};

export default App;
