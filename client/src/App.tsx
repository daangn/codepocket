import { Navigate, Route, Routes } from 'react-router-dom';

import AuthPage from './auth/Auth';
import DetailPage from './detail/Detail';
import PocketPage from './pocket/Pocket';
import * as routes from './routes';
import PrivateRoute from './shared/components/PrivateRoute';
import TokenPage from './token/Token';

function App() {
  return (
    <Routes>
      <Route path={routes.authPath} element={<AuthPage />} />
      <Route
        path={routes.detailPath}
        element={<PrivateRoute path={routes.generateDetailPath} element={<DetailPage />} />}
      />
      <Route
        path={routes.pocketPath}
        element={<PrivateRoute path={routes.generatePocketPath} element={<PocketPage />} />}
      />
      <Route path={routes.tokenPath} element={<TokenPage />} />
      <Route path="*" element={<Navigate to={routes.authPath} replace />} />
    </Routes>
  );
}

export default App;
