import "./App.css";
import SearchBox from "./SearchBox";
import Autocomplete from "./components/Autocomplete";
import ListBox from "./listBox";

function App() {
  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    return result.recipes;
  };
  return (
    <div>
      <h1>Autocomplete</h1>
      <Autocomplete
        placeholder={"Recipe Enter"}
        fetchSuggestions={fetchSuggestions}
        dataKey={"name"}
        customLoading={<>Loading Recipes....</>}
        onSelect={(res) => console.log(res)}
        onChange={(input) => {}}
        onFocus={(e) => {}}
        onBlur={(e) => {}}
        customStyle={{}}
        caching={true}
      />
    </div>
  );
}

export default App;
