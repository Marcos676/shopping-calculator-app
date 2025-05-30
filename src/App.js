import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Burguer button icon</div>
      </header>
      <main>
        <div className="title-description">
          <h1>Título</h1>
          <p>Descripción de uso</p>
        </div>
        <div className="functional-app">
          <div className="inputs-box">
            <input
              className="original-price"
              type="number"
              placeholder="Precio original"
            />
            <input
              className="porcent-to-discount"
              type="number"
              placeholder="Porcentaje de descuento"
            />
            %
          </div>
          <div className="result-box">
            <p className="discount">200</p>
            <p className="final-price">1050</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
