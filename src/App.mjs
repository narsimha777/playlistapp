import logo from './logo.svg';
import './App.css';
import Searchbar from './Components/SearchBar.mjs';
import React, { useState } from 'react';
import SearchResult from './Components/Searchresult.mjs';

function App() {
  const [name, setName] = useState('');
  const [viewhead,setViewHead] = useState(false);
  const [heading,setHeading] = useState('');
  function handleclick(query) {
    setName(query);
    setViewHead(true);
  }

  function handleheading(query){
    setHeading(query);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 style={{fontSize: 80}}>
          Music-Mania🎧
        </h1>
        <Searchbar clicked={handleclick} />
        {viewhead&&<SearchResult name={name} heading={heading} clicked={handleheading}/>}
      </header>
    </div>
  );
}

export default App;

