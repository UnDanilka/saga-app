import classes from "./App.module.css";
import Table from "./components/Table/Table";
import { useSelector } from "react-redux";
import { Divider } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const data = useSelector((store) => store.productsReducer);

  return (
    <div className={classes.main_app}>
      <h1 className={classes.welcome_text}>
        Welcome to {process.env.REACT_APP_ENV} mode
      </h1>
      <Divider />
      <Table data={data} />
    </div>
  );
};

export default App;
