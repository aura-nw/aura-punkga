interface IChip {
  value?: string;
  children: React.ReactNode;
  selected?: string;
  disabled?: boolean;
  onClick?: (value: string) => void;
}
const Chip = ({
  children,
  selected,
  onClick,
  value,
  disabled = false,
}: IChip) => {
  const classes = {
    selected: `text-gray rounded-full border-solid border-[1px] border-medium-gray px-[12px] bg-primary-color`,
    unSelected: `text-medium-gray rounded-full border-solid border-[1px] border-medium-gray px-[12px]`,
  };

  return (
    <button
      className={
        selected && value && selected === value
          ? classes.selected
          : classes.unSelected
      }
      onClick={() => onClick && onClick(value)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Chip;
