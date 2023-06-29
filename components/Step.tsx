import React, { FC } from 'react'

interface Props {
    title: string;
    number: number;
}

const Step: FC<Props> = ({ title, number }) => {
    return (
        <div className='flex items-center gap-4 font-bold tracking-wide'>
            <div className='ring-2 flex items-center justify-center ring-[#44dfff] w-8 h-8 p-2 rounded-full'>{number}</div>
            <h2 className='text-xl'>{title}</h2>
        </div>
    )
}

export default Step