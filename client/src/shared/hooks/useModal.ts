import { useEffect, useState } from 'react';

interface UseModal {
  isOpened: boolean;
}

const useModal = ({ isOpened }: UseModal) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const closeModal = () => setIsModalOpened(false);

  useEffect(() => {
    setIsModalOpened(isOpened);
  }, [isOpened]);

  return { closeModal, isModalOpened };
};

export default useModal;
