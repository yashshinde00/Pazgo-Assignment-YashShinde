interface uploadProps {
  onClick?: () => void;
}

export function Upload(props: uploadProps) {
  return (
    <button
      onClick={props.onClick}
      className="flex items-center justify-center bg-black rounded-lg w-7 h-7 cursor-pointer"
      type="button"
      aria-label="Upload"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="white"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    </button>
  );
}
