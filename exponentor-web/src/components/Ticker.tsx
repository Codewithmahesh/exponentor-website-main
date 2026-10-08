import { Fragment } from "react";
import { tickerItems } from "@/lib/content";

/* Orange marquee. The group is rendered twice so the -50% translate loops seamlessly. */
export default function Ticker() {
  const group = (
    <div className="mq-g">
      {tickerItems.map((t) => (
        <Fragment key={t}>
          <span>{t}</span>
          {"//"}
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className="ticker" aria-hidden="true">
      <div className="mq">
        {group}
        {group}
      </div>
    </div>
  );
}
