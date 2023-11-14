/** @format */

export default ({ left }: { left: string }) => {
  return (
    <ul className="relative flex h-fit w-fit gap-x-px">
      <li
        className={`mark absolute h-full ${
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
            className="h-[12px] w-[5px] rounded-[1px] bg-primary"
          />
        )
      })}
    </ul>
  )
}
