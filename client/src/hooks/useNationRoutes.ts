import ChinaRoutes from "Routes/ChinaRoutes";
import AsiaRoutes from "Routes/AsiaRoutes";
import KoreaRoutes from "Routes/KoreaRoutes";
import UsRoutes from "Routes/UsRoutes";
import EuropeRoutes from "Routes/EuropeRoutes";
import JapanRoutes from "Routes/JapanRoutes";

const useNationRoutes = (): any[] => {
  const urlName = window.location.host;
    switch(urlName){
      case "localhost:8080":
        return [AsiaRoutes,KoreaRoutes,UsRoutes,EuropeRoutes,JapanRoutes,ChinaRoutes]
      case "nanoscientific.com.cn" :
        return [ChinaRoutes];
      default :  return [AsiaRoutes,KoreaRoutes,UsRoutes,EuropeRoutes,JapanRoutes]
    }
  };
  
  export default useNationRoutes;
