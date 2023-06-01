
import { useState } from 'react';
import  {FiSearch} from 'react-icons/fi'
import './style.css'; 

import api from './api';
function App() {
  const[input, setInput] = useState ('');
  const[cep, setCep] = useState({});

  async function handleSearch (){
    //01310930/json/
    if(input === ''){
      alert("Digite um CEP")
      return;
    }
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
      console.log(response.data);
    }
    catch{
      alert("Erro de busca");
      setInput('');
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscar CEP</h1>

      <div className = "container-input" onClick={handleSearch}>
        <input 
          type = "text"
          placeholder = "Digite seu CEP"
          value = {input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className ="buttonSearch">
          <FiSearch size ={25} color = "#fff"/>
        </button>
      </div>
      {Object.keys(cep).length > 0 &&(
        <div className="main">
          <h2>CEP: {cep.cep}</h2>   
          <span>Cidade: {cep.localidade}</span>
          <span>UF: {cep.uf}</span>
          <span>DDD: {cep.ddd}</span>
        </div>
      )}
      
    </div>
  );
}

export default App;
