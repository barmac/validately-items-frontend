import * as React from 'react';
import './App.css';

import ItemsList from 'src/ItemsList/ItemsList';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Validately Items App</h1>
        </header>
        <ItemsList />
      </div>
    );
  }
}

export default App;
