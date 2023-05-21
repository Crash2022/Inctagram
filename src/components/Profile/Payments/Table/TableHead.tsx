import React from 'react';
import cls from "../Payments.module.scss";
import clsx from "clsx";

export const TableHead = () => {
  return (
    <div className={cls.table_head}>
      <div className={clsx(cls.row, cls.row_col_4)}>
        <div className={cls.col}>
          Date of Payment
        </div>
        <div className={cls.col}>
          Price
        </div>
        <div className={cls.col}>
          Subscription Type
        </div>
        <div className={cls.col}>
          Payment type
        </div>
      </div>
    </div>
  );
};

