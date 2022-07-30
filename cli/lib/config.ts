import dotenv from 'dotenv';
import path from 'path';

(() => {
  const result = dotenv.config({ path: path.join(__dirname, '../..', '.env') });
  if (!result.parsed) throw new Error('.env 환경변수 파일 읽기를 실패했어요');
})();
