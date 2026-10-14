import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이 프로젝트는 ESLint를 쓰지 않으므로 빌드 중 린트 검사를 건너뜁니다.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
