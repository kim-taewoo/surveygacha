interface Props {
  className?: string;
}

export function CheckIcon({ className }: Props) {
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20.2778" cy="20" r="15" fill="#FB923C" />
      <path fillRule="evenodd" clipRule="evenodd" d="M26.3205 15.4554C26.9063 16.0412 26.9063 16.991 26.3205 17.5768L19.2611 24.6362C18.9798 24.9175 18.5983 25.0755 18.2005 25.0755C17.8026 25.0755 17.4211 24.9175 17.1398 24.6362L13.931 21.4274C13.3452 20.8416 13.3452 19.8918 13.931 19.306C14.5168 18.7202 15.4665 18.7202 16.0523 19.306L18.2005 21.4542L24.1992 15.4554C24.785 14.8697 25.7348 14.8697 26.3205 15.4554Z" fill="#FAFAFA" />
    </svg>
  );
}
