import React, {useState} from 'react';
import {CustomSelect, Option} from "@/shared/ui/CustomSelect/CustomSelect";

import cls from '../../Payments.module.scss';

const options: Option[] = [
  {label: '1', value: '1'},
  {label: '5', value: '5'},
  {label: '10', value: '10'},
  {label: '20', value: '20'},
]
export const PaginationSelect = () => {
  const [value, setValue] = useState(options[0])

  const handleChange = (value: Option) => {
    console.log(value)
    setValue(value);
  }

  return (
    <div className={cls.select_container}>
      <p>Показать</p>
      <div className={cls.select}>
        <CustomSelect options={options} value={value} onChange={handleChange} />
      </div>
      <p>на странице</p>
    </div>
  );
};

