import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
import { Pet } from './models/pets';
import { adopt, getContract, getPets } from './blockchainUtils';
import { BrowserProvider, Contract, ethers, Signer } from "ethers";


function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [petIds, setPetIds] = useState<number[]>([]);

  useEffect(() => {
    fetch("./assets/pets.json").then(res => res.json()).then(data => {
      setPets(data);
    });
    init();
  }, []);

  const init = async () => {
    setPetIds(await getPets());
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-sm-push-2">
            <h1 className="text-center">Pete's Pet Shop</h1>
            <hr />
            <br />
          </div>
        </div>

        <div className="row">
          {pets.map(i =>
            <Card
              key={i.id}
              item={i}
              adopted={petIds.includes(i.id)}
              afterAdopt={init}
            />)}
        </div>
      </div>
    </>
  )
}

export default App
