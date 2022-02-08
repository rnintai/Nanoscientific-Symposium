import { useEffect, useState } from "react";
import axios from "axios";

const useHTML = (url: string) => {
  const [HTML, setHTML] = useState<string>("");
  useEffect(() => {
    const getHTML = async () => {
      const HTML = await axios.get(url);
      setHTML(HTML.data);
    };
    getHTML();
  }, []);

  return HTML;
};
export default useHTML;
