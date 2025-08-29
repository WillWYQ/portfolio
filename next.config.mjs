/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // the following is added for github pages
  // 关键：让 Next.js 走静态导出
  output: "export",

  // GitHub Pages 没有 Next 的图片优化服务，导出时关闭它
  images: {
    unoptimized: true,
  },

};

export default nextConfig;
