"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { EventContent } from "@/lib/event-data";
import EventPoster from "./EventPoster";

type Mode = "auto" | "pc" | "mobile";
const PC_WIDTH = 1440;

type Props = { content: EventContent; initialEnded: boolean };

export default function PreviewFrame({ content, initialEnded }: Props) {
  const [mode, setMode] = useState<Mode>("auto");
  const [forceEnded, setForceEnded] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // PC 미리보기: 1440px 화면을 지금 창 너비에 맞게 축소해서 보여줍니다.
  const fitPc = useCallback(() => {
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    if (!stage || !viewport) return;
    if (mode !== "pc") {
      stage.style.removeProperty("zoom");
      return;
    }
    const available = viewport.clientWidth - 32;
    stage.style.setProperty("zoom", String(Math.min(1, available / PC_WIDTH)));
  }, [mode]);

  useEffect(() => {
    fitPc();
    window.addEventListener("resize", fitPc);
    return () => window.removeEventListener("resize", fitPc);
  }, [fitPc]);

  const modes: { id: Mode; label: string }[] = [
    { id: "auto", label: "자동" },
    { id: "pc", label: "PC" },
    { id: "mobile", label: "모바일" },
  ];

  return (
    <>
      <div className="tools" role="region" aria-label="디자인 미리보기 도구">
        <b>디자인 미리보기</b>
        <span className="tools-group">
          화면
          <span className="seg">
            {modes.map((m) => (
              <button key={m.id} type="button" aria-pressed={mode === m.id} onClick={() => setMode(m.id)}>
                {m.label}
              </button>
            ))}
          </span>
        </span>
        <span className="tools-group">
          이벤트 상태
          <span className="seg">
            <button type="button" aria-pressed={!forceEnded} onClick={() => setForceEnded(false)}>
              날짜 기준
            </button>
            <button type="button" aria-pressed={forceEnded} onClick={() => setForceEnded(true)}>
              마감 화면
            </button>
          </span>
        </span>
      </div>

      <div ref={viewportRef} className={mode === "auto" ? "viewport" : `viewport framed mode-${mode}`}>
        <div ref={stageRef} className="stage">
          <EventPoster content={content} initialEnded={initialEnded} forceEnded={forceEnded} />
        </div>
      </div>
    </>
  );
}
