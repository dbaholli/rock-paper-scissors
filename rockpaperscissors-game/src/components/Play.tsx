type Props = {
  onClick: () => void;
  disabled: boolean;
};

const Play = (props: Props) => {
  return (
    <button
      className='bg-[#161616] border-4 rounded-3xl py-2 px-8 border-yellow-500 
    text-white text-2xl font-medium uppercase'
      onClick={props.onClick}
      disabled={props.disabled}
    >
      Play
    </button>
  );
};

export default Play;
