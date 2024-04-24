import { ReactNode } from 'react';

type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
};

const Button = ({ onClick, disabled, children }: ButtonProps) => {
  return (
    <button
      className='bg-[#161616] border-4 rounded-3xl py-2 px-8 border-yellow-500 
    text-white text-2xl font-medium uppercase'
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
