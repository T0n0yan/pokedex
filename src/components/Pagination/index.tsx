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

 
  const handleChangePerPgae = (value: number) => {
    if (value > currentPage) {
      handelNextPgae()
    } else if (value < currentPage) {
      handlePreviousPage()
    }
    dispatch(changePage(value))
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
      onChange={handleChangePerPgae}
      current={currentPage}
      showSizeChanger={false}
      style={{ marginTop: '20px', textAlign: 'end' }}
    />
  );
};

export default CustomPagination;