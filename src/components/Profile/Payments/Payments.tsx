import React, {useState} from 'react'

import Table from "./Table/Table";
import {Controls} from "./Controls/Controls";

export interface MockData {
  id: number;
  date: string;
  price: string;
  subscriptionType: string;
  paymentType: string
}

const mockData = [
  {id: 0, date: '12.12.2022', price: '10$', subscriptionType: '2 month', paymentType: 'PayPal'},
  {id: 1, date: '12.12.2022', price: '10$', subscriptionType: '12 month', paymentType: 'Stripe'},
  {id: 2, date: '12.12.2022', price: '70$', subscriptionType: '20 month', paymentType: 'PayPal'},
  {id: 3, date: '12.12.2022', price: '30$', subscriptionType: '12 month', paymentType: 'PayPal'},
  {id: 4, date: '12.12.2022', price: '70$', subscriptionType: '8 month', paymentType: 'Stripe'},
  {id: 5, date: '12.12.2022', price: '30$', subscriptionType: '20 month', paymentType: 'PayPal'},
  {id: 6, date: '12.12.2022', price: '30$', subscriptionType: '30 month', paymentType: 'Stripe'},
  {id: 7, date: '12.12.2022', price: '70$', subscriptionType: '20 month', paymentType: 'PayPal'},
  {id: 8, date: '12.12.2022', price: '30$', subscriptionType: '12 month', paymentType: 'PayPal'},
  {id: 9, date: '12.12.2022', price: '10$', subscriptionType: '5 month', paymentType: 'Stripe'},
]
export const Payments = () => {
    const [showCount, setShowCount] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    const totalCount = mockData.length;
    const pageCount = Math.ceil(totalCount / showCount)

    const startIndex = showCount * currentPage;
    const endIndex = startIndex + showCount;

    const dataChunk = mockData.slice(startIndex, endIndex);

    const handleChangePage = (nextPage: number) => {
      console.log(nextPage)
    }

    return (
      <div>
        <Table data={dataChunk}/>

        <Controls pageCount={pageCount} onChangePage={handleChangePage} />
      </div>
    )
}
