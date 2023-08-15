/** @format */

export default ({ left }: { left: string }) => {
  return (
    <ul className='flex gap-x-px w-fit h-fit relative'>
      <li
        className={`absolute mark h-full ${
          left ? 'mark' : 'bg-transparent'
        } right-0`}
        style={{
          width: left,
        }}
      />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
        return (
          <li
            key={item}
            className='w-[5px] h-[12px] rounded-[1px] bg-primary'
          />
        );
      })}
    </ul>
  );
};
