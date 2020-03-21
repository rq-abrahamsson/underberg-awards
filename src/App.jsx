import React from 'react';
import './App.css';
import Calculator from './components/Calculator'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                Calculate bottle tops left for your Underberg award
            </header>
            <section className="App-section">
                <Calculator />
            </section>
        </div>
    );
}

export default App;
