const WhyChooseCard = ({title, desc}: {title: string, desc: string}) => {
    return (
        <div className='border border-white/15 rounded-[30px] text-white px-8 py-6'>
            <h3 className='text-[22px] font-medium'>{title}</h3>
            <p className='mt-2'>{desc}</p>
        </div>
    )
}

export default WhyChooseCard