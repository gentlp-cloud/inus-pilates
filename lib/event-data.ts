/**
 * 이벤트 페이지에 표시되는 모든 내용.
 *
 * 지금은 이 파일의 값이 화면에 그대로 나옵니다.
 * 다음 단계에서 관리자 페이지(Supabase)를 연결하면, 같은 모양의 데이터를
 * 데이터베이스에서 불러오도록 바뀝니다. 그래서 화면 코드는 이 형태(EventContent)만 따릅니다.
 */

export type BenefitIcon = "calendar" | "infinity" | "person" | "heart";

export type Product = {
  label: string; // 예: 그룹레슨
  count: string; // 예: 60
  countUnit: string; // 예: 회
  price: string; // 예: 75
  priceUnit: string; // 예: 만원
  perkTitle: string; // 예: 특별 혜택
  perkNote: string; // 예: 상담 시 안내
};

export type Benefit = {
  icon: BenefitIcon;
  /** 모바일에서는 두 줄, PC에서는 한 줄로 이어서 표시됩니다. */
  lines: [string, string];
};

export type EventContent = {
  brand: {
    name: string;
    sloganLines: [string, string];
    tagline: string[];
  };
  headline: {
    line1: string;
    line2: string;
    /** 줄바꿈은 \n 으로 넣습니다. */
    sub: string;
  };
  decor: {
    scriptLine1: string;
    scriptLine2: string;
    penLine1: string;
    penLine2: string;
  };
  title: {
    main: string;
    badge: string;
    sub: string;
    description: string;
  };
  products: Product[];
  benefits: Benefit[];
  limit: {
    perBranch: string;
    total: string;
    deadlineLine1: string;
    deadlineLine2: string;
    closedTitle: string;
    closedNote: string;
  };
  /** 이 시각이 지나면 자동으로 '접수 마감' 화면으로 바뀝니다. (한국 시간 +09:00) */
  endAt: string;
  closing: {
    message: string;
    ctaLabel: string;
    mobileCtaLabel: string;
    endedLabel: string;
  };
  consult: {
    /** 상담 신청 버튼을 눌렀을 때 열 주소. 비어 있으면 안내 문구만 표시합니다. */
    url: string;
    /** 모바일 전화 버튼 번호. 비어 있으면 안내 문구만 표시합니다. */
    phone: string;
  };
  images: {
    model: { src: string; alt: string; objectPosition: string };
  };
};

export const vipEvent: EventContent = {
  brand: {
    name: "INUS PILATES",
    sloganLines: ["PILATES FOR", "A BETTER TOMORROW"],
    tagline: ["HEALTHY", "BEAUTIFUL", "CONFIDENT", "YOU"],
  },
  headline: {
    line1: "꾸준함이,",
    line2: "더 좋은 나를 만듭니다.",
    sub: "운동은 결국,\n오늘의 내가 내일의 나를\n더 잘 지켜주는 선택입니다.",
  },
  decor: {
    scriptLine1: "Upgrade",
    scriptLine2: "Your Life",
    penLine1: "지금도 충분히 멋진 당신,",
    penLine2: "앞으로는 더 건강하게.",
  },
  title: {
    main: "VIP MEMBER",
    badge: "VIP",
    sub: "전용 재등록 상품",
    description: "지금, 더 좋은 조건으로\n당신의 건강한 루틴을 이어가세요.",
  },
  products: [
    { label: "그룹레슨", count: "60", countUnit: "회", price: "75", priceUnit: "만원", perkTitle: "특별 혜택", perkNote: "상담 시 안내" },
    { label: "그룹레슨", count: "110", countUnit: "회", price: "109", priceUnit: "만원", perkTitle: "특별 혜택", perkNote: "상담 시 안내" },
    { label: "그룹레슨", count: "150", countUnit: "회", price: "140", priceUnit: "만원", perkTitle: "특별 혜택", perkNote: "상담 시 안내" },
  ],
  benefits: [
    { icon: "calendar", lines: ["원하는", "시작일 선택"] },
    { icon: "infinity", lines: ["더 여유로운", "이용기간"] },
    { icon: "person", lines: ["전문 강사진의", "맞춤 케어"] },
    { icon: "heart", lines: ["지속되는", "건강한 변화"] },
  ],
  limit: {
    perBranch: "5",
    total: "30",
    deadlineLine1: "10월 16일(목)까지",
    deadlineLine2: "한정 접수",
    closedTitle: "접수 마감",
    closedNote: "성원에 감사드립니다",
  },
  endAt: "2026-10-16T23:59:59+09:00",
  closing: {
    message: "VIP 회원님께만 제공되는 특별한 기회,\n지금 바로 상담하세요.",
    ctaLabel: "상담 신청하기",
    mobileCtaLabel: "VIP 상담 신청하기",
    endedLabel: "이벤트가 종료되었습니다",
  },
  consult: {
    url: "",
    phone: "",
  },
  images: {
    // 임시 사진입니다. 관리자 기능이 생기면 업로드한 사진으로 바뀝니다.
    model: { src: "/images/model.jpg", alt: "필라테스 동작을 하는 모델", objectPosition: "50% 0%" },
  },
};

export function isEventEnded(content: EventContent, now: number = Date.now()): boolean {
  return now > new Date(content.endAt).getTime();
}
