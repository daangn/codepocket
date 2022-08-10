import dotenv from 'dotenv-safe';
import path from 'path';

(() => {
  const result = dotenv.config({
    path: path.join(__dirname, '../..', '.env'),
    example: path.join(__dirname, '../..', process.env.CI ? '.env.ci.example' : '.env.example'),
    // allowEmptyValues: !!process.env.CI,
  });
  if (!result.parsed) throw new Error('.env 환경변수 파일 읽기를 실패했어요');
})();
