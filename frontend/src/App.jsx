import Header from "./components/Header";
import Stops from "./components/Stops";

function App() {
  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto mt-8">
        <Stops />
      </div>
    </div>
  );
}

export default App;
