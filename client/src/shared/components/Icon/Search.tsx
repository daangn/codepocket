import type { IconInterface } from './@types';

const Search = ({ color }: IconInterface) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.9502 13.2C10.8497 13.2 13.2002 10.8495 13.2002 7.95001C13.2002 5.05052 10.8497 2.70001 7.9502 2.70001C5.0507 2.70001 2.7002 5.05052 2.7002 7.95001C2.7002 10.8495 5.0507 13.2 7.9502 13.2Z"
      stroke={color || '#212124'}
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M11.7998 11.8L15.2998 15.3"
      stroke={color || '#212124'}
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
  </svg>
);

export default Search;
