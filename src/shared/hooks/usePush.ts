import { NextRouter, useRouter } from 'next/router'
import { useRef, useState } from 'react'

export function usePush(): NextRouter['push'] {
    const router = useRouter()
    const routerRef = useRef(router)

    routerRef.current = router

    const [{ push }] = useState<Pick<NextRouter, 'push'>>({
        push: async (path) => await routerRef.current.push(path)
    })
    return push
}
