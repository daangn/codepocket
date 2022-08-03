import { CreateUserResponse } from '@pocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { localStorage } from '@shared/utils/localStorage';
import { useNavigate } from 'react-router-dom';

import { generateTokenPath } from '../../routes';
import { createUserUrl } from '../api';

interface CreateUserProps {
  userName?: string;
  email?: string;
}

const useCreateUser = ({ userName, email }: CreateUserProps) => {
  const navigate = useNavigate();
  const { mutate: createUserMutate } = useCustomMutation<
    CreateUserResponse,
    CreateUserResponse,
    CreateUserProps
  >({
    url: createUserUrl,
    method: 'POST',
    options: {
      onSuccess: async (response) => {
        const { pocketToken: token } = response;
        localStorage.setUserToken(token);
        navigate(generateTokenPath({ token }));
      },
    },
  });

  const createUser = () => {
    createUserMutate({
      userName,
      email,
    });
  };

  return { createUser };
};

export default useCreateUser;
