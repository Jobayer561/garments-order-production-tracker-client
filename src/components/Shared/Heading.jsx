const Heading = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className='text-2xl text-[#3badcd] font-bold'>{title}</div>
      <div className='font-semibold mt-2'>{subtitle}</div>
    </div>
  )
}

export default Heading
