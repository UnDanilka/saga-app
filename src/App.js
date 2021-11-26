import "./App.css";
import Table from "./components/Table/Table";
import { useSelector } from "react-redux";

const App = () => {
  const data = useSelector((store) => store.productsReducer);

  console.log("data", data);

  return (
    <>
      <h1>Hello Table</h1>
      <Table data={data} />
    </>
  );
};

export default App;
