import classes from "./App.module.css";
import Table from "./components/Table/Table";
import { useSelector } from "react-redux";

const App = () => {
  const data = useSelector((store) => store.productsReducer);

  console.log("data", data);

  return (
    <div className={classes.main_app}>
      <Table data={data} />
    </div>
  );
};

export default App;
