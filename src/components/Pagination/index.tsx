import React, {FC} from "react";
import {Pagination} from "antd";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {changePage, fetchAllPokemons} from "store/reducers/pokemonSlice";

export type TPagination = {
    total: number | null;
    perPage: string;
};

const CustomPagination: FC<TPagination> = ({total, perPage}) => {
    const dispatch = useAppDispatch();

    const nextPage = useAppSelector(state => state.pokemonReducer.nextURL);
    const previousPage = useAppSelector(state => state.pokemonReducer.previousURL);
    const currentPage = useAppSelector(state => state.pokemonReducer.currentPage);


    if (total === null) {
        return null;
    }

    const handleChangePerPage = async (value: number) => {
        dispatch(changePage(value));
        if (value - currentPage === 1) {
            handelNextPage();
        } else if (currentPage - value === 1) {
            handlePreviousPage();
        } else {
            await dispatch(fetchAllPokemons({perPage}))
        }
    };
    const handelNextPage = () => {
        dispatch(fetchAllPokemons({perPage, fetchURl: nextPage}));
    };
    const handlePreviousPage = () => {
        dispatch(fetchAllPokemons({perPage, fetchURl: previousPage}));
    };

    return (
        <Pagination
            defaultCurrent={1}
            pageSize={+perPage}
            total={total}
            onChange={handleChangePerPage}
            current={currentPage}
            showSizeChanger={false}
            style={{marginTop: "20px", textAlign: "end"}}
        />
    );
};

export default CustomPagination;
