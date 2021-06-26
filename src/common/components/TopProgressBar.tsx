import Router from "next/router";
import NProgress from "nprogress";
import { useEffect, useRef } from "react";

const TopProgressBar = () => {
  const timerRef = useRef(null);

  const routeChangeStart = () => {
    NProgress.start();
  };

  const routeChangeEnd = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      NProgress.done(true);
    }, 200);
  };

  useEffect(() => {
    Router.events.on("routeChangeStart", routeChangeStart);
    Router.events.on("routeChangeComplete", routeChangeEnd);
    Router.events.on("routeChangeError", routeChangeEnd);
  }, []);

  return (
    <style jsx global>{`
      #nprogress .bar {
        background: #eaae00;
      }
      #nprogress .peg {
        box-shadow: 0 0 10px #eaae00, 0 0 5px #eaae00;
      }
      #nprogress .spinner-icon {
        border-top-color: #eaae00;
        border-left-color: #eaae00;
      }
    `}</style>
  );
};

export default TopProgressBar;
