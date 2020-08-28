import React, { useState } from 'react';
import './App.css';

function App() {
  
  const [numbers, setNumber] = useState([]);
  const [a, setA] = useState(0);
  const [m, setM] = useState(1);
  const [c, setC] = useState(0);
  const [x, setX] = useState(0); 
  
  const generateNumbers = event => {
    event.preventDefault();
    let number = x;
    let list = [];
    
    for (let index = 0; index < m; index++) {
      number = ((a*number)+c)%m;
      list[index] = number;
    }
    setNumber(list);
  }
  
  return (
    <div className='App'>
        
      <header>
        <h1>Gerador de Números Pseudo-Aleatórios</h1>
        <p>João Flores de Leão</p>
      </header>
        
      <div className='content'>

        <form className='dataInput' onSubmit={generateNumbers}>
          <h1>Insira os dados</h1>
          <section>
            <p>Multiplicador (a)</p>
            <input value={a} onChange={e => setA(e.target.value)} placeholder='A' type='number'/>
          </section>
          <section>
            <p>Valor Máximo (M)</p>
            <input value={m} onChange={e => setM(e.target.value)} placeholder='M' type='number'min='1'/>
          </section>
          <section>
            <p>Semente (X₀)</p>
            <input value={x} onChange={e => setX(e.target.value)} placeholder='X' type='number'/>
          </section>
          <section>
            <p>Constante (c)</p>
            <input value={c} onChange={e => setC(e.target.value)} placeholder='C' type='number'/>
          </section>
          <button type='input'>Gerar Números</button>
        </form>

        <div className='dataTable'>
          <h1>Números Gerados</h1>
          
          {numbers.length === 0 ?
            <p id='noResults'>Nenhum Número</p>
            : 
            <div className='list'>
              {numbers.map((number) => <p key={number.toString}>{number}</p>)}
            </div>
          }
        </div>

      </div>

      <footer>
        <p>Simulação e Métodos Analíticos - PUCRS</p>
      </footer>

    </div>
  );
}

export default App;
