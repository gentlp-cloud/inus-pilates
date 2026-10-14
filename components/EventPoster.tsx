"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { isEventEnded, type EventContent } from "@/lib/event-data";
import { BenefitIconSvg, DeadlineCalendarIcon, LockIcon, PhoneIcon } from "./Icons";

type Props = {
  content: EventContent;
  /** 서버에서 계산한 마감 여부 (첫 화면 깜빡임 방지용) */
  initialEnded: boolean;
  /** 미리보기에서 '마감 화면'을 강제로 보여줄 때 사용 */
  forceEnded?: boolean;
};

/** "\n" 으로 나뉜 문장을 <br/> 로 줄바꿈해서 보여줍니다. */
function Lines({ text }: { text: string }) {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />} {line}
        </Fragment>
      ))}
    </>
  );
}

export default function EventPoster({ content, initialEnded, forceEnded = false }: Props) {
  const [timeEnded, setTimeEnded] = useState(initialEnded);
  const [toast, setToast] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 열려 있는 동안에도 마감 시각이 지나면 자동으로 마감 화면으로 바뀌도록 1분마다 확인합니다.
  useEffect(() => {
    const check = () => setTimeEnded(isEventEnded(content));
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, [content]);

  useEffect(() => setMounted(true), []);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const ended = forceEnded || timeEnded;
  const { brand, headline, decor, title, products, benefits, limit, closing, consult, images } = content;

  function say(message: string) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }

  function onCtaClick(e: MouseEvent<HTMLAnchorElement>) {
    if (ended) {
      e.preventDefault();
      return;
    }
    if (!consult.url) {
      e.preventDefault();
      say("상담 연결 주소(카카오톡·전화·예약 링크)는 관리자 페이지에서 설정합니다.");
    }
  }

  function renderCta(label: string) {
    const isExternal = /^https?:\/\//.test(consult.url);
    return (
      <a
        className="cta"
        href={!ended && consult.url ? consult.url : "#consult"}
        target={!ended && isExternal ? "_blank" : undefined}
        rel={!ended && isExternal ? "noopener noreferrer" : undefined}
        aria-disabled={ended ? "true" : undefined}
        onClick={onCtaClick}
      >
        {ended ? (
          closing.endedLabel
        ) : (
          <>
            {label} <span aria-hidden="true">→</span>
          </>
        )}
      </a>
    );
  }

  return (
    <main className={`poster${ended ? " is-ended" : ""}`}>
      <div className="leaf a" aria-hidden="true" />
      <div className="leaf b" aria-hidden="true" />
      <div className="leaf c" aria-hidden="true" />

      <header className="brand-row">
        <div className="logo">
          <span className="logo-name">{brand.name}</span>
          <span className="logo-sub">
            {brand.sloganLines[0]}
            <br /> {brand.sloganLines[1]}
          </span>
        </div>
        <div className="tagline">
          {brand.tagline.map((word, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {word}
            </Fragment>
          ))}
        </div>
      </header>

      <section className="hero" aria-label="메인 메시지">
        <div className="hero-text">
          <h1 className="headline">
            <span className="q">“</span>
            {headline.line1}
            <span className="l2">
              {headline.line2}
              <span className="q">”</span>
            </span>
          </h1>
          <p className="sub">{headline.sub}</p>
          <div className="pen">
            {decor.penLine1}
            <br />
            {decor.penLine2}
          </div>

          <div className="title">
            <div className="vip-wrap">
              <div className="vip">{title.main}</div>
              <div className="vip-badge" aria-hidden="true">
                <span>{title.badge}</span>
              </div>
            </div>
            <div className="title-sub">
              <i aria-hidden="true" />
              <strong>{title.sub}</strong>
              <i aria-hidden="true" />
            </div>
            <p className="title-desc">{title.description}</p>
          </div>
        </div>

        <figure className="hero-photo" style={{ marginBlock: 0 }}>
          <div className="photo">
            <Image
              src={images.model.src}
              alt={images.model.alt}
              fill
              priority
              sizes="(min-width: 1000px) 40vw, 80vw"
              style={{ objectPosition: images.model.objectPosition }}
            />
          </div>
          <div className="tagline">
            {brand.tagline.map((word, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {word}
              </Fragment>
            ))}
          </div>
          <div className="script" aria-hidden="true">
            {decor.scriptLine1}
            <span>{decor.scriptLine2}</span>
          </div>
          <div className="pen">
            {decor.penLine1}
            <br />
            {decor.penLine2}
          </div>
        </figure>
      </section>

      <section className="cards" aria-label="이벤트 상품">
        {products.map((p, i) => (
          <article className="card" key={i}>
            <div className="card-main">
              <div className="card-count">
                <span className="card-label">{p.label}</span>
                <span className="num">
                  <b>{p.count}</b>
                  <small>{p.countUnit}</small>
                </span>
              </div>
              <span className="card-div" aria-hidden="true" />
              <div className="card-price">
                <span className="num">
                  <b>{p.price}</b>
                  <small>{p.priceUnit}</small>
                </span>
              </div>
            </div>
            <div className="perk">
              <LockIcon />
              <span className="perk-text">
                <strong>{p.perkTitle}</strong>
                <span>{p.perkNote}</span>
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="info" aria-label="회원 혜택과 모집 안내">
        <ul className="benefits">
          {benefits.map((b, i) => (
            <li key={i}>
              <BenefitIconSvg name={b.icon} />
              <span>
                {b.lines[0]}
                <br className="m" /> {b.lines[1]}
              </span>
            </li>
          ))}
        </ul>
        <div className="limit">
          <div className="limit-seats">
            <div className="seats">
              <span>지점별 단</span>
              <b>{limit.perBranch}</b>
              <span>명</span>
            </div>
            <div className="seats-total">
              전 지점 총 <b>{limit.total}</b>명 한정
            </div>
          </div>
          <div className="limit-date">
            <DeadlineCalendarIcon className="open-only" />
            <div className="when open-only">
              {limit.deadlineLine1}
              <br />
              {limit.deadlineLine2}
            </div>
            <div className="closed">
              <strong>{limit.closedTitle}</strong>
              <span>{limit.closedNote}</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="closing">
        <p>
          <Lines text={closing.message} />
        </p>
        {renderCta(closing.ctaLabel)}
        <div className="sign">
          <i aria-hidden="true" />
          <span>{brand.name}</span>
          <i aria-hidden="true" />
        </div>
      </footer>

      <div className="dock">
        {consult.phone ? (
          <a className="call" href={`tel:${consult.phone}`} aria-label="전화 상담">
            <PhoneIcon />
          </a>
        ) : (
          <button type="button" className="call" aria-label="전화 상담" onClick={() => say("전화번호는 관리자 페이지에서 설정합니다.")}>
            <PhoneIcon />
          </button>
        )}
        {renderCta(closing.mobileCtaLabel)}
      </div>

      {/* 안내 문구는 화면 맨 아래 가운데에 잠깐 떴다 사라집니다 */}
      {mounted &&
        createPortal(
          <div className="toast" role="status" hidden={!toast}>
            {toast}
          </div>,
          document.body,
        )}
    </main>
  );
}
