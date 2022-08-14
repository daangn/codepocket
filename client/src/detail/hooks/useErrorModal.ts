import { useEffect, useState } from 'react';

interface UseErrorModal {
  isError: boolean;
}

const useErrorModal = ({ isError }: UseErrorModal) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const closeModal = () => setIsModalOpened(false);

  useEffect(() => {
    setIsModalOpened(isError);
  }, [isError]);

  return { closeModal, isModalOpened };
};

export default useErrorModal;
