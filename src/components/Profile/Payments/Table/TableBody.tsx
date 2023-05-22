import React from 'react';
import cls from "../Payments.module.scss";
import clsx from "clsx";
import {MockData} from "@/components/Profile/Payments/Payments";

interface Props {
  data: MockData[];
}
export const TableBody = ({data}: Props) => {
  return (
    <div className={cls.table_body}>
      {data.map(dataItem => (
        <div key={dataItem.id} className={clsx(cls.row, cls.row_col_4)}>
          <div>{dataItem.date}</div>
          <div className={cls.col_price}>{dataItem.price}</div>
          <div>{dataItem.subscriptionType}</div>
          <div>{dataItem.paymentType}</div>
        </div>
      ))}
    </div>
  );
};
