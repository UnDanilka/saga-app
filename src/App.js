import "./App.css";
import Table from "./components/Table";
import { useSelector } from "react-redux";

const App = () => {
  const data = useSelector((store) => store.productsReducer);

  console.log("data", data);

  return (
    <>
      <div>Hello</div>
      <Table data={data} />
    </>
  );
};

export default App;
