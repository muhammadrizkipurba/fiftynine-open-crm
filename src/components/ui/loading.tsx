import { Spinner } from './spinner';

const loading = ({
  size = "small",
  label="Loading...",
  show,
  spinnerClassName,
  labelClassName,
}: {
  size?: "small" | "medium" | "large";
  label?: string;
  show: boolean;
  spinnerClassName?: string;
  labelClassName?: string;
}) => {
  return (
    <div className='flex items-center gap-2'>
      <Spinner show={show} size={size} className={spinnerClassName} />
      <span className={`font-semibold tracking-tight text-xl ${labelClassName}`}>{label}</span>
    </div>
  )
}

export default loading