import {useState} from "react";
import { FiSearch } from "react-icons/fi";
import './styles.css'; 

import api from "./services/api";

function App() {

  const [input, setInput] = useState('');
  const [postalCode, setPostal] = useState({});

  async function handleSearch(){
    if (input === ''){
      alert("Please provide a postal code")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setPostal(response.data)
      setInput('');
    } catch{
      alert('Opps....ERROR!!!');
      setInput('');
    }

  }

  return (
    <div className="container">
     <h1 className="title">Searcher Postal Code</h1>

      <div className="containerInput">
        <input type="text"
        placeholder="Enter the Postal Code"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="#FFF"/>
        </button>
          
      </div>

      {Object.keys(postalCode).length > 0 && (
        <main className="main">
          <h2>Postal Code:{postalCode.cep}</h2>

          <span>{postalCode.logradouro}</span>
          <span>Additional information: {postalCode.complemento}</span>
         <span>Neighbordhood: {postalCode.bairro}</span>
          <span>{postalCode.localidade} - {postalCode.uf}</span>
        </main>
      )}
      

    </div>
  );
}

export default App;
