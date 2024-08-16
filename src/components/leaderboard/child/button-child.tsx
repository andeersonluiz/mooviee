import { Button } from '@mui/material';

const ButtonChild = ({
  title,
  isSelected,
  onClick,
  disabled,
}: {
  title: string;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <Button
      variant='outlined'
      fullWidth
      disabled={disabled}
      onClick={onClick}
      className={`${isSelected ? 'pointer-events-none !bg-slate-500 !text-slate-300' : '!text-slate-500'} mb-2 rounded-xl !border-slate-500 !px-6 !py-2 text-center align-middle !text-sm hover:!border-slate-500 hover:!bg-slate-600 hover:!text-slate-300 disabled:!border-slate-500 disabled:!text-slate-500`}
    >
      {title}
    </Button>
  );
};

export default ButtonChild;
