import './App.css';
import SearchBox from './SearchBox';
import ListBox from './listBox';

function App() {

  const transformData = (data) => data.results;
  const dataPromise = async (query, signal) =>  await fetch(`https://swapi.dev/api/people/?search=${query}`, {signal})
  return (
    <div className="wrapper">
      <SearchBox
        id="PersonName"
        name="PersonName"
        label="Enter Person Name"
        placeholder="Enter your fav startwar characters"
        autoComplete={true}
        maxItems={5}
        styles={{label:"label", input:"input"}}
        debounceWait={400}
        listBox={(items) => <ListBox items={items}/>}
        noItemMessage={()=> <div>No Person Found</div>}
        errorMessage={()=> <div>Something went wrong</div>}
        transformData= {transformData}
        promise={dataPromise}
      />
    </div>
  );
}

export default App;
