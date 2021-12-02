import { useEffect, useState } from "react";
import classes from "./Table.module.css";
import Product from "../Product/Product";
import Search from "../Search/Search";
import Header from "../Header/Header";
import { Button } from "antd";
import EditAddModal from "../Modal/EditAddModal";
import { CloseCircleTwoTone } from "@ant-design/icons";
import Loading from "../Loading/Loading";

const Table = (props) => {
  const { products, loading } = props.data;
  const [productsState, setProductsState] = useState(products);
  const [sorting, setSorting] = useState({ name: null, price: null });
  const [searchValue, setSearchValue] = useState("");
  const [editModal, setEditModal] = useState({
    visible: false,
    products: null,
  });

  useEffect(() => {
    setProductsState(products?.filter((p) => p.name.includes(searchValue)));
  }, [products]);

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
    setEditModal((prev) => {
      return { product: null, visible: true };
    });
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
            return (
              <Product
                product={product}
                key={index}
                setEditModal={setEditModal}
              />
            );
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

        <EditAddModal editModal={editModal} setEditModal={setEditModal} />
      </div>
    </div>
  );
};

export default Table;
