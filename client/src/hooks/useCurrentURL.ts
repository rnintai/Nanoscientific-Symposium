
const useCurrentURL = () => {
  const urlName = window.location.host;
  const portNum = window.location.port;

  if (urlName === "nanoscientific.com.cn" || portNum === "8081") {
    return "china";
  }
  return "global";
};

export default useCurrentURL;
