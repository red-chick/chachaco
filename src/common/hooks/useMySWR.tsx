import useSWR, { trigger } from "swr";

const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};

const useMySWR = (url: string) => {
  const { data } = useSWR(url, fetcher);
  const myTrigger = () => trigger(url);
  return {
    data,
    trigger: myTrigger,
  };
};

export default useMySWR;
