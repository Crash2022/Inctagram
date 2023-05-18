import { useEffect } from 'react'
import { useSnackbar } from 'notistack'

export const useErrorSnackbar = (isError: boolean) => {
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        if (isError)
            enqueueSnackbar(/*error.data.messages[0].message*/ 'Ошибка сервера', {
                variant: 'error',
                autoHideDuration: 3000
            })
    }, [isError])
}
