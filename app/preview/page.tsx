import type { Metadata } from "next";
import PreviewFrame from "@/components/PreviewFrame";
import { isEventEnded, vipEvent } from "@/lib/event-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "디자인 미리보기 | INUS PILATES",
  robots: { index: false, follow: false },
};

/** 직원 검토용 화면: PC/모바일 화면 전환과 마감 화면 미리보기 도구가 위에 붙습니다. */
export default function PreviewPage() {
  return <PreviewFrame content={vipEvent} initialEnded={isEventEnded(vipEvent)} />;
}
