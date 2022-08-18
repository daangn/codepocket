import type { IconInterface } from './@types';

const RightChevron = ({ color }: IconInterface) => (
  <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.04289 19.4571C0.652369 19.0666 0.652369 18.4334 1.04289 18.0429L8.83579 10.25L1.04289 2.45711C0.652369 2.06658 0.652369 1.43342 1.04289 1.04289C1.43342 0.652369 2.06658 0.652369 2.45711 1.04289L10.9571 9.54289C11.3476 9.93342 11.3476 10.5666 10.9571 10.9571L2.45711 19.4571C2.06658 19.8476 1.43342 19.8476 1.04289 19.4571Z"
      fill={color || '#212124'}
    />
  </svg>
);

export default RightChevron;
