const useCurrentURL = () => {
  const urlName = window.location.host;
  const portNum = window.location.port;

  if (urlName.indexOf(".com.cn") !== -1 || portNum === "8081") {
    return "china";
  }
  return "global";
};

export default useCurrentURL;
