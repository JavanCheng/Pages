import Pages from './components/Pages';

function App() {
  return (
    <div className="App">
      <Pages total={20} pagerSize={4}></Pages>
    </div>
  );
}

export default App;
