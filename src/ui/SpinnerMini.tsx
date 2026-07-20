import { BiLoaderAlt } from 'react-icons/bi';

function SpinnerMini() {
  return (
    <div className="flex items-center justify-center">
      <BiLoaderAlt className="animate-spin" />
    </div>
  );
}

export default SpinnerMini;
