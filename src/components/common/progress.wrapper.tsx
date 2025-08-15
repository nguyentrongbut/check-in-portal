'use client'

import {AppProgressBar as ProgressBar} from 'next-nprogress-bar'
import React, {Suspense} from 'react'

const ProgressWrapper = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <Suspense>
                <ProgressBar
                    height="2px"
                    color="var(--primary)"
                    options={{showSpinner: false}}
                    shallowRouting
                />
            </Suspense>
        </>
    )
}

export default ProgressWrapper
