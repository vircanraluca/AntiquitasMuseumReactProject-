import { useEffect, useRef } from "react";
import type { TimelineEvent } from "../types/types";

function TimelineItem({ item, index }: { item: TimelineEvent; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) ref.current?.classList.add('visible');
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="timeline-item" ref={ref} style={{ transitionDelay: `${index * 0.1}s` }}>
      {item.position === 'left' ? (
        <div className="timeline-content">
          <span className="timeline-year">{item.year}</span>
          <div className="timeline-event">{item.event}</div>
          <div className="timeline-note">{item.note}</div>
        </div>
      ) : <div />}
      <div className="timeline-dot" />
      {item.position === 'right' ? (
        <div className="timeline-content" style={{ textAlign: 'left', paddingLeft: '2rem', paddingRight: 0 }}>
          <span className="timeline-year">{item.year}</span>
          <div className="timeline-event">{item.event}</div>
          <div className="timeline-note">{item.note}</div>
        </div>
      ) : <div />}
    </div>
  );
}

export default function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="timeline">
      {events.map((item, i) => (
        <TimelineItem key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}