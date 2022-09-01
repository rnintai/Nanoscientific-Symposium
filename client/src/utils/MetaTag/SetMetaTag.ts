import { MetaTag } from "utils/MetaTag/MetaTag";

const setMetaTag = (pathname: string, subpath: string) => {
  const metaTag = MetaTag.get(pathname);
  let metaDescription = "";
  let metaKeywords = "";
  console.log(subpath);

  for (let i = 0; i < metaTag.length; i += 1) {
    if (metaTag[i].path === subpath) {
      if (!metaTag[i].description && metaTag[i].keywords) {
        metaDescription = metaTag[0].description;
        metaKeywords = metaTag[i].keywords;
      } else if (!metaTag[i].keywords && metaTag[i].description) {
        metaDescription = metaTag[i].description;
        metaKeywords = metaTag[0].keywords;
      } else if (metaTag[i].keywords && metaTag[i].description) {
        metaDescription = metaTag[i].description;
        metaKeywords = metaTag[i].keywords;
      } else break;
      return { metaDescription, metaKeywords };
    }
  }
  metaDescription = metaTag[0].description;
  metaKeywords = metaTag[0].keywords;

  return { metaDescription, metaKeywords };
};

export default setMetaTag;
