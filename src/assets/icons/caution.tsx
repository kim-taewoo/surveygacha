interface Props {
  className?: string;
}

export function CautionIcon({ className }: Props) {
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20.2778" cy="20" r="15" fill="#FBBF24" />
      <path d="M20.3035 13C21.685 13 22.639 13.322 22.6061 14.1553L22.0798 22.8106C22.0469 23.5871 21.1916 23.8523 20.3035 23.8523C19.4153 23.8523 18.56 23.5871 18.5271 22.8106L18.0008 14.1553C17.9679 13.322 18.9219 13 20.3035 13Z" fill="white" />
      <circle cx="20.3037" cy="26.5" r="1.5" fill="white" />
    </svg>

  );
}
