// utils/errorHandler.js

import {TFunction} from "next-i18next";

type ErrorMessages = Record<string, string>;

type ErrorType = Record<string, {
        type: string;
    }>;

export const handleFormErrors = (errors:ErrorType, t:TFunction) => {
    const errorMessages:ErrorMessages = {};

    for (const [key, value] of Object.entries(errors)) {
        if (value?.type === "required") {
            errorMessages[key] = t('Err_Yup_Required');
        } else if (value?.type === "min") {
            errorMessages[key] = t('Err_Yup_Min');
        } else if (value?.type === "max") {
            errorMessages[key] = t('Err_Yup_Max_Password');
        } else if (value?.type === "email") {
            errorMessages[key] = t('Err_Yup_Email');
        } else if (value?.type === "oneOf") {
            errorMessages[key] = t('Err_Yup_FieldMatch');
        }
    }

    return errorMessages;
};
