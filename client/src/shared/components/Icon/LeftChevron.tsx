export interface LeftChevronType {
  color?: string;
}

const LeftChevron = ({ color }: LeftChevronType) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polygon
      fill={color || 'black'}
      fillRule="evenodd"
      points="9.414 12 16.707 19.293 15.293 20.707 6.586 12 15.293 3.293 16.707 4.707"
    />
  </svg>
);

export default LeftChevron;
