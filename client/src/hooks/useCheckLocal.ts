// 현재가 로컬상태라면 true 를 반환합니다.

const useCheckLocal = (): boolean => {
  console.log(window.location.protocol);
  console.log(window.location.host);
  console.log(window.location.host.includes("3000"));
  return window.location.host.includes("3000");
};

export default useCheckLocal;
