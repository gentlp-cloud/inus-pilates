import EventPoster from "@/components/EventPoster";
import { isEventEnded, vipEvent } from "@/lib/event-data";

// 1분마다 페이지를 새로 만들어 마감 여부를 다시 계산합니다.
export const revalidate = 60;

export default function HomePage() {
  return (
    <div className="viewport">
      <div className="stage">
        <EventPoster content={vipEvent} initialEnded={isEventEnded(vipEvent)} />
      </div>
    </div>
  );
}
