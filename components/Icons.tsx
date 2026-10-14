import type { BenefitIcon } from "@/lib/event-data";

/** 상품 카드의 자물쇠 아이콘 */
export function LockIcon() {
  return (
    <svg viewBox="0 0 30 34" fill="none" aria-hidden="true">
      <rect x="3" y="14" width="24" height="18" rx="3" fill="#E9CF9C" />
      <path d="M8 14V9a7 7 0 0 1 14 0v5" stroke="#E9CF9C" strokeWidth="3" />
      <circle cx="15" cy="22" r="2.4" fill="#4A331F" />
      <rect x="14" y="23" width="2" height="5" fill="#4A331F" />
    </svg>
  );
}

/** 마감 박스의 달력 아이콘 (흰색) */
export function DeadlineCalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4M7 13h2M11 13h2M15 13h2" />
    </svg>
  );
}

/** 모바일 하단 전화 아이콘 */
export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#3F2C1B" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

/** 회원 혜택 아이콘 4종 */
export function BenefitIconSvg({ name }: { name: BenefitIcon }) {
  const common = { fill: "none", stroke: "#3B2A1C", strokeWidth: 1.6, "aria-hidden": true } as const;
  switch (name) {
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...common}>
          <rect x="3" y="4.5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 2.5v4M16 2.5v4M7 13h2M11 13h2M15 13h2M7 16.5h2M11 16.5h2" />
        </svg>
      );
    case "infinity":
      return (
        <svg viewBox="0 0 28 24" strokeLinecap="round" {...common}>
          <path d="M14 12c-2.5-3.5-4.5-5-7-5a5 5 0 0 0 0 10c2.5 0 4.5-1.5 7-5zm0 0c2.5 3.5 4.5 5 7 5a5 5 0 0 0 0-10c-2.5 0-4.5 1.5-7 5z" />
        </svg>
      );
    case "person":
      return (
        <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...common}>
          <circle cx="12" cy="4" r="2" />
          <path d="M5 9l7 1.5L19 9M12 10.5V15l-3 7M12 15l3 7" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 24 24" strokeLinejoin="round" {...common}>
          <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" />
        </svg>
      );
  }
}
