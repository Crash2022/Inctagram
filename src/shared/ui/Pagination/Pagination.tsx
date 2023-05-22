import React from 'react';
import ReactPaginate from "react-paginate";

import cls from 'src/shared/ui/Pagination/Pagination.module.scss';

interface PaginationChangeEvent {
  index: number | null;
  selected: number;
  nextSelectedPage: number | undefined;
  event: object;
  isPrevious: boolean;
  isNext: boolean;
  isBreak: boolean;
  isActive: boolean;
}

interface Props {
  pageCount: number;
  currentPage: number;
  onChangePage: (nextPage: number) => void;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
}
export const Pagination = ({pageCount, currentPage, onChangePage, pageRangeDisplayed=3, marginPagesDisplayed=1}: Props) => {
  const handleChangePage = (event:PaginationChangeEvent) => {
    onChangePage(event.selected + 1)
  }

  return (
    <ReactPaginate
      containerClassName={cls.container}
      pageLinkClassName={cls.pageItem}
      activeLinkClassName={cls.active}
      previousLinkClassName={cls.pageItem}
      nextLinkClassName={cls.pageItem}
      disabledLinkClassName={cls.disabled}
      pageCount={pageCount}
      breakLabel="..."
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      previousLabel={<span>&#8249;</span>}
      nextLabel={<span>&#8250;</span>}
      prevPageRel={currentPage === 0 ? null : 'prev'}
      onPageChange={handleChangePage}
    />
  );
};
