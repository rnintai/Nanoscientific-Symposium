import { useEffect, useState } from "react";
import axios from "axios";

const useHTML = (url: string): [string, boolean] => {
  const [HTML, setHTML] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getHTML = async () => {
      setLoading(true);
      const HTML = await axios.get(url);
      setHTML(HTML.data);
      setLoading(false);
    };
    getHTML();
  }, []);

  return [HTML, loading];
};
export default useHTML;
