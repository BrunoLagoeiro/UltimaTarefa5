import { useEffect, useState } from "react";
import Card from "./Card.jsx";

function App() {
  const [cards, setCards] = useState([]);
  const [erro, setErro] = useState("");

  const [name, setName] = useState("");
  const [type, setType] = useState("Criatura");
  const [attack, setAttack] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/cartas")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        setErro(error.message);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/api/cartas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, type, attack: Number(attack) }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        return res.json();
      })
      .then((card) => {
        setCards([...cards, card]);

        setName("");
        setType("Criatura");
        setAttack("");
      })
      .catch((error) => {
        setErro(error.message);
      });
  }

  if (erro) {
    return <h1>Erro: {erro}</h1>;
  }

  return (
    <div>
      <h1>A minha coleção</h1>
      <p>Tenho {cards.length} cartas.</p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Criatura">Criatura</option>
          <option value="Feitiço">Feitiço</option>
        </select>
        <input
          type="number"
          placeholder="Ataque"
          value={attack}
          onChange={(e) => setAttack(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {cards.map((card, i) => (
          <Card key={`${card.name}-${i}`} {...card} />
        ))}
      </ul>
    </div>
  );
}

export default App;
