import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

export const useErrorSnackbar = (isError: boolean) => {
    const { t } = useTranslation('common')
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        if (isError)
            enqueueSnackbar(/*error.data.messages[0].message*/ t('Error'), {
                variant: 'error',
                autoHideDuration: 3000
            })
    }, [isError])
}
