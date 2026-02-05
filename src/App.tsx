import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

type Heart = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

const YES_GIF_URL =
  "https://media2.giphy.com/media/xkhYa5Vf7LG25sFAG8/200.gif";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noClicks, setNoClicks] = useState(0);
  const [note, setNote] = useState("");
  const noBtnRef = useRef<HTMLButtonElement | null>(null);

  const hearts: Heart[] = useMemo(() => {
    const count = 18;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 22,
      delay: Math.random() * 2.5,
      duration: 6 + Math.random() * 6,
      opacity: 0.25 + Math.random() * 0.45,
    }));
  }, []);

  useEffect(() => {
    const hints = [
      "Be honest 🙂",
      "Are you sure? 🤨",
      "Nope… try again 😌",
      "It’s getting harder to say no 😅",
      "Okay okay… I see you 😏",
      "At this point, the answer is yes 😭",
    ];
    setNote(hints[Math.min(noClicks, hints.length - 1)]);
  }, [noClicks]);

  function moveNoButton() {
    const btn = noBtnRef.current;
    if (!btn) return;

    const area = btn.closest(".buttons") as HTMLElement | null;
    if (!area) return;

    const padding = 14;

    const areaRect = area.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const maxX = Math.max(padding, areaRect.width - btnRect.width - padding);
    const maxY = Math.max(padding, areaRect.height - btnRect.height - padding);

    const x = padding + Math.random() * (maxX - padding);
    const y = padding + Math.random() * (maxY - padding);

    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
  }

  const yesScale = 1 + noClicks * 0.08;

  return (
    <div className="page">
      <div className="bgGlow" />

      <div className="hearts" aria-hidden="true">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="heart"
            style={
              {
                left: `${h.left}%`,
                width: `${h.size}px`,
                height: `${h.size}px`,
                animationDelay: `${h.delay}s`,
                animationDuration: `${h.duration}s`,
                opacity: h.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <main className="wrap">
        <div className={`card ${accepted ? "accepted" : ""}`}>
          {!accepted ? (
            <>
              <div className="badge">💌 Valentine Request</div>
              <h1 className="title">Will you be my Valentine?</h1>
              <p className="subtitle">No pressure… but also, yes pressure.</p>

              <div className="buttons">
                <button
                  className="btn yes"
                  style={{ transform: `scale(${yesScale})` }}
                  onClick={() => setAccepted(true)}
                >
                  Yes 💖
                </button>

                <button
                  ref={noBtnRef}
                  className="btn no floatingNo"
                  onMouseEnter={moveNoButton}
                  onMouseDown={moveNoButton}
                  onFocus={moveNoButton}
                  onClick={() => {
                    setNoClicks((c) => c + 1);
                    moveNoButton();
                  }}
                >
                  No 🙃
                </button>
              </div>

              <div className="hint">{note}</div>
              <p className="footer">Tip: try to click “No” if you can 😈</p>
            </>
          ) : (
            <>
              <div className="badge">✅ Accepted</div>
              <h1 className="title">YAYYY!! 💞</h1>
              <p className="subtitle">
                Officially locked in. Happy Valentine’s Day!
              </p>

              <img className="yesGif" src={YES_GIF_URL} alt="Happy Valentine" />

              <div className="bigHeart" aria-hidden="true">
                💘
              </div>

              <div className="actions">
                <button
                  className="btn ghost"
                  onClick={() => {
                    setAccepted(false);
                    setNoClicks(0);
                    const btn = noBtnRef.current;
                    if (btn) {
                      btn.style.left = "";
                      btn.style.top = "";
                    }
                  }}
                >
                  Do it again
                </button>
              </div>

              <p className="footer">
                Made with too much love (and a sneaky “No” button).
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
