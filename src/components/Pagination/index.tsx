import React, { FC, useEffect } from "react";
import { Pagination } from 'antd';
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { changePage, fetchAllPokemons } from "store/reducers/pokemonSlice";

export type TPagination = {
  page: number | null;
  perPage: string
};

const CustomPagination: FC<TPagination> = ({ page, perPage }) => {
  const nextPage = useAppSelector(state => state.pokemonReducer.nextURL)
  const previousPage = useAppSelector(state => state.pokemonReducer.previousURL)
  const currentPage = useAppSelector(state => state.pokemonReducer.currentPage)


  const dispatch = useAppDispatch()

  if (page === null) {
    return null;
  }

  const handleChangePerPgae = async (value: number) => {
    dispatch(changePage(value));
    if (value - currentPage === 1) {
      handelNextPgae();
      console.log(currentPage, 'next')
    } else if (currentPage - value === 1) {
      handlePreviousPage();
      console.log(currentPage, 'prev')
    }
    else {
      await dispatch(fetchAllPokemons({ perPage }))
      console.log(currentPage, 'xary')
    }

  };
  const handelNextPgae = () => {
    dispatch(fetchAllPokemons({ perPage, fetchURl: nextPage }))
  }
  const handlePreviousPage = () => {
    dispatch(fetchAllPokemons({ perPage, fetchURl: previousPage }))
  }

  return (
    <Pagination
      defaultCurrent={1}
      total={page}
      pageSize={+perPage}
      onChange={handleChangePerPgae}
      current={currentPage}
      showSizeChanger={false}
      style={{ marginTop: '20px', textAlign: 'end' }}
    />
  );
};

export default CustomPagination;