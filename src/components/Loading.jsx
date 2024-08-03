import React from 'react'

const Dots = () => {
    return <span className='inline-block animate-spin rounded-sm mr-2 border-2 w-2 h-2'></span>
}

const Loading = () => {
    return <>
        <p className='w-full text-4xl text-center my-auto '>
            Loading <Dots /><Dots /><Dots />
        </p>
    </>
}

const Error = ({ Error }) => {
    if (Error) {
        return (
            <p className='w-100 h-max text-center text-2xl text-red-600 animate-pulse'>{Error.message}</p>
        )
    }
    return;
}

export { Loading, Error };