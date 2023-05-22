import React from 'react';
import {CustomSelect, Option} from "@/shared/ui/CustomSelect/CustomSelect";

import cls from '../../Payments.module.scss';
import {useTranslation} from "next-i18next";

interface Props {
  selectOptions: Option[];
  onChangeItemsCount: (itemsCount: number) => void;
  value: Option;
}

export const PaginationSelect = ({selectOptions, onChangeItemsCount, value}: Props) => {
  const { t } = useTranslation('settings-payments')

  const handleChange = (value: Option) => {
    onChangeItemsCount(Number(value.value))
  }

  return (
    <div className={cls.select_container}>
      <p>{t('select.show')}</p>
      <div className={cls.select}>
        <CustomSelect options={selectOptions} value={value} onChange={handleChange} />
      </div>
      <p>{t('select.page')}</p>
    </div>
  );
};

