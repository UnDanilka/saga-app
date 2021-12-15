import classes from "./App.module.css";
import Table from "./components/Table/Table";
import { useSelector } from "react-redux";
import { Divider } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const data = useSelector((store) => store.productsReducer);

  return (
    <Router>
      <div className={classes.main_app}>
        <h1 className={classes.welcome_text}>
          Welcome to {process.env.REACT_APP_ENV} mode
        </h1>
        <Divider />
        <Routes>
          <Route path="/*" element={<Table data={data} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
