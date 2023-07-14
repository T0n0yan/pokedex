import React, { FC} from "react";
import { Pagination } from "antd";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { changePage, fetchAllPokemons } from "store/reducers/pokemonSlice";
import styles from './Pagination.module.scss'


export type TPagination = {
  total: number | null;
  perPage: string;
};

const CustomPagination: FC<TPagination> = ({ total, perPage }) => {
  const nextPage = useAppSelector(state => state.pokemonReducer.nextURL);
  const previousPage = useAppSelector(state => state.pokemonReducer.previousURL);
  const currentPage = useAppSelector(state => state.pokemonReducer.currentPage);

  const dispatch = useAppDispatch();


  if (total === null) {
    return null;
  }

  const handleChangePerPgae = async (value: number) => {
    dispatch(changePage(value));
    if (value - currentPage === 1) {
      handelNextPgae();
    } else if (currentPage - value === 1) {
      handlePreviousPage();
    }
    else{
      await dispatch(fetchAllPokemons({ perPage}))
    }

  };
  const handelNextPgae = () => {
    dispatch(fetchAllPokemons({ perPage, fetchURl: nextPage }));
  };
  const handlePreviousPage = () => {
    dispatch(fetchAllPokemons({ perPage, fetchURl: previousPage }));
  };

  return (
      <Pagination
          defaultCurrent={1}
          pageSize={+perPage}
          total={total}
          onChange={handleChangePerPgae}
          current={currentPage}
          showSizeChanger={false}
          style={{ marginTop: "20px", textAlign: "end" }}
      />
  );
};

export default CustomPagination;
