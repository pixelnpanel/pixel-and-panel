"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const CHATBASE_VISIBLE_CLASS = "chatbase-widget-visible";
const FLOATING_WIDGET_SCROLL_THRESHOLD = 240;

export default function ChatbaseWidget() {
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      document.documentElement.classList.toggle(
        CHATBASE_VISIBLE_CLASS,
        window.scrollY > FLOATING_WIDGET_SCROLL_THRESHOLD
      );
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateVisibility);
      document.documentElement.classList.remove(CHATBASE_VISIBLE_CLASS);
    };
  }, [pathname]);

  return (
    <>
      {/* Chatbase identity verification is intentionally not used because this site does not currently have logged-in users. */}
      <Script id="chatbase-widget-loader" strategy="afterInteractive">
        {`
          (function(){
            if (document.getElementById("BemVZrqFviEDoZvrG_94D")) return;
            if(!window.chatbase||window.chatbase("getState")!=="initialized"){
              window.chatbase=(...arguments)=>{
                if(!window.chatbase.q){window.chatbase.q=[]}
                window.chatbase.q.push(arguments)
              };
              window.chatbase=new Proxy(window.chatbase,{
                get(target,prop){
                  if(prop==="q"){return target.q}
                  return(...args)=>target(prop,...args)
                }
              })
            }
            const onLoad=function(){
              if (document.getElementById("BemVZrqFviEDoZvrG_94D")) return;
              const script=document.createElement("script");
              script.src="https://www.chatbase.co/embed.min.js";
              script.id="BemVZrqFviEDoZvrG_94D";
              script.domain="www.chatbase.co";
              document.body.appendChild(script)
            };
            if(document.readyState==="complete"){onLoad()}
            else{window.addEventListener("load",onLoad,{once:true})}
          })();
        `}
      </Script>
    </>
  );
}
