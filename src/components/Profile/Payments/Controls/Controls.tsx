import React from 'react';
import cls from "../Payments.module.scss";
import {Pagination} from "@/shared/ui/Pagination/Pagination";
import {PaginationSelect} from "./PaginationSelect/PaginationSelect";

interface Props {
  pageCount: number;
  onChangePage: (nextPage: number) => void;
}
export const Controls = ({pageCount, onChangePage}: Props) => {
  return (
    <div className={cls.controls}>
      <Pagination pageCount={pageCount} currentPage={1} onChangePage={onChangePage} />

      <PaginationSelect />
    </div>
  );
};

