/* eslint-disable @typescript-eslint/no-var-requires */
// require("@babel/register")({
//   presets: ["env"],
// });

const Sitemap = require("react-router-sitemap").default;
const router = require("./SiteMapRoutes.js").default; // 좀 전에 만든 sitemapRoutes 파일이 있는 경로입니다.
// import Sitemap from "react-router-sitemap";
// import router from "./SiteMapRoutes.js"; // 좀 전에 만든 sitemapRoutes 파일이 있는 경로입니다.

function generateSitemap() {
  return new Sitemap(router)
    .build("https://event.nanoscientific.org") // 여러분의 도메인 이름으로 변경해주세요.
    .save("./public/sitemap.xml"); // sitemap.xml 파일이 생성될 위치입니다.
}

generateSitemap();
