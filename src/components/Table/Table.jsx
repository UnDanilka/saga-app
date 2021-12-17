import { useEffect, useState } from "react";
import classes from "./Table.module.css";
import Product from "../Product/Product";
import Search from "../Search/Search";
import Header from "../Header/Header";
import { Button } from "antd";
import EditAddModal from "../Modal/EditAddModal";
import { CloseCircleTwoTone } from "@ant-design/icons";
import Loading from "../Loading/Loading";
import { Routes, Route } from "react-router-dom";
import ModalInfo from "../Modal/ModalInfo";
import { useNavigate, useParams } from "react-router-dom";

const Table = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { products, loading } = props.data;
  const [productsState, setProductsState] = useState(products);
  const [sorting, setSorting] = useState({ name: null, price: null });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setProductsState(products?.filter((p) => p.name.includes(searchValue)));
  }, [products]);

  useEffect(() => {
    const paramsFilter = params["*"].split("/");
    if (paramsFilter[0] === "filter") {
      setSearchValue(paramsFilter[1]);
      if (!paramsFilter[1]) navigate("/");
    }
  }, [navigate, params]);

  const setSortedValue = (exp) => {
    setProductsState((prev) => {
      const currProducts = [...prev];
      // eslint-disable-next-line no-eval
      currProducts.sort((a, b) => eval(exp));
      return currProducts;
    });
  };

  useEffect(() => {
    if (sorting.name) {
      if (sorting.name === "asc") {
        setSortedValue("a.name.localeCompare(b.name)");
      } else {
        setSortedValue("b.name.localeCompare(a.name)");
      }
      return;
    }
    if (sorting.price) {
      if (sorting.price === "asc") {
        setSortedValue("a.price - b.price");
      } else {
        setSortedValue("b.price - a.price");
      }
      return;
    }
    setProductsState(() => {
      return products?.filter((p) => p.name.includes(searchValue));
    });
  }, [products, searchValue, sorting]);

  const handleAdd = () => {
    navigate("add");
  };

  return (
    <div className={classes.table_overflow_wrapper}>
      <div className={classes.table_main}>
        <div className={classes.widgets}>
          <Search
            products={products}
            setProductsState={setProductsState}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <Button type="primary" onClick={handleAdd}>
            Add new
          </Button>
        </div>
        <Header sorting={sorting} setSorting={setSorting} />
        {loading ? (
          <Loading />
        ) : productsState.length > 0 ? (
          productsState?.map((product, index) => {
            return <Product product={product} key={index} />;
          })
        ) : (
          <div className={classes.noData_wrapper}>
            <CloseCircleTwoTone
              className={classes.noData_icon}
              twoToneColor="#eb2f96"
            />
            <div className={classes.noData_text}>No data yet:(</div>
          </div>
        )}

        <Routes>
          <Route
            path="info/:id"
            element={<ModalInfo productsState={productsState} />}
          />
          <Route
            path="edit/:id"
            element={<EditAddModal productsState={productsState} />}
          />
          <Route
            path="add"
            element={<EditAddModal productsState={productsState} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Table;
