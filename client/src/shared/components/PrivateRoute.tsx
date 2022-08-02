import { VerifyUserRequest, VerifyUserResponse } from '@pocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { ReactElement, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { verifyUserUrl } from '../../auth/api';
import { authPath } from '../../routes';
import localStorage from '../utils/localStorage';

type VerifyUserBodyType = VerifyUserRequest['body'];
interface PrivateRoutProps {
  element: ReactElement;
  path: (params?: any) => string;
}

const PrivateRoute: React.FC<PrivateRoutProps> = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const navigateAuthPage = useCallback(
    () => navigate(authPath, { replace: true, state: { path: props.path(params) } }),
    [navigate, params, props],
  );
  const { mutate: verifyUserMutate } = useCustomMutation<
    VerifyUserResponse,
    VerifyUserResponse,
    VerifyUserBodyType
  >({
    url: verifyUserUrl,
    method: 'POST',
    onError: navigateAuthPage,
  });

  const authenticateUser = useCallback(async () => {
    const token = localStorage.getUserToken();
    if (!token) return navigateAuthPage();

    return verifyUserMutate({ pocketToken: token });
  }, [navigateAuthPage, verifyUserMutate]);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  return props.element;
};

export default PrivateRoute;
