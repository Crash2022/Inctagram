import { useEffect, useState } from 'react'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'

export const useLoader = (isLoading: boolean) => {
    const [loader, setLoader] = useState<boolean>(false)

    useEffect(() => {
        if (isLoading) setLoader(true)
    }, [loader])
    if (loader) return <LoaderScreen variant={'circle'} />
}
