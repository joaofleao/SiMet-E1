import React, { useState } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import './App.css';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function App() {
  
  const [numbers, setNumber] = useState([]);
  const [a, setA] = useState(0);
  const [m, setM] = useState(1000);
  const [c, setC] = useState(0);
  const [x, setX] = useState(0); 
  const [graph, setGraph] = useState({theme: "dark1", backgroundColor: "rgba(0,0,0,0)", data: [{}]});
  const [fileContent, setFileContent] = useState();
  
  function generateNumbers() {

    let number = x;
    let list = [];
    let listUniform = [];

    for (let index = 0; index < m; index++) {
      let result = (a*number+c)%m; 
      listUniform[index] = (result/m).toFixed(3);
      list[index] = result;
      number = result;
    }

    setNumber(listUniform);
    generateGraph(list);
    generateFile(listUniform);
  }

  function generateGraph(list) {
    let data = [];
    let index = 0;
    
    list.forEach(element => {
      data[index] = {label: index, y:element}   
      index++;   
    });  
    
    setGraph({
      theme: "dark1",
      color:  "rgba(255,255,255,0)",
      backgroundColor: "rgba(0,0,0,0)",
      data: [{		
        markerType: "cross",
        type: "scatter",
        color: "#FF0000",
        backgroundColor: "rgb(255,0,0)",
        dataPoints: data
      }]});
    
  } 

  function generateFile(list) {
    let text = '';
    
    list.forEach(element => {
      text = (text + '\n' + element);
    }); 
    setFileContent(text)
  }

  function downloadNumbers() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
    element.setAttribute('download', 'numbers.yml');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  
  return (
    <div className='App'>
        
      <header>
        <h1>Gerador de Números Pseudo-Aleatórios</h1>
        <p>João Flores de Leão</p>
      </header>
        
      <div className='content'>

          <div className='dataInput'>
            <h1>Insira os dados</h1>
            <div onSubmit={generateNumbers}>
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
              <button onClick={generateNumbers}>Gerar Números</button>
              <button onClick={downloadNumbers}>Download .yml</button>
            </div>
          </div>

        <div className='dataTable'>
          <h1>Gráfico de Dispersão</h1>
          <CanvasJSChart options = {graph}/>
          <h1>Números Gerados</h1>
          
          {numbers.length === 0 ?
            <p id='noResults'>Nenhum Número</p>
            : 
            <div className='list'>
              {numbers.map((number) => <p key={number.index}>{number}</p>)}
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
