function LoadingSpinner({ msg }: { msg: string }) {
  return (
    <div className="flex items-center justify-center h-32">
      <div className="animate-spin mr-2">
        <svg
          className="w-6 h-6 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.292a8.001 8.001 0 014.548-2.08"
          ></path>
        </svg>
      </div>
      <p>{msg}</p>
    </div>
  );
}

export default LoadingSpinner;
