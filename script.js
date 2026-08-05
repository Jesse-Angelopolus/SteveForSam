/* STEEEEEVE — press the thing on his chest. */

const GUMMY_ODDS = 1 / 15; // one press in fifteen
const POOL_SIZE = 4; // lets you mash the button and hear them overlap

const params = new URLSearchParams(location.search);
const forceGummy = params.get("gummy") === "1"; // ?gummy=1 rigs every press
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const button = document.getElementById("translator");
const stage = document.querySelector(".steve-stage");
const rain = document.getElementById("rain");
const shout = document.getElementById("shout");
const pressCount = document.getElementById("count-press");
const gummyCount = document.getElementById("count-gummy");

let presses = 0;
let jackpots = 0;

/* --- audio ---------------------------------------------------------- */

function makePool(src) {
  const pool = [];
  for (let i = 0; i < POOL_SIZE; i++) {
    const a = new Audio(src);
    a.preload = "auto";
    pool.push(a);
  }
  let next = 0;
  return function play() {
    const a = pool[next];
    next = (next + 1) % pool.length;
    a.currentTime = 0;
    const p = a.play();
    if (p)
      p.catch((err) => console.warn("[steve] playback blocked:", err.name));
  };
}

// three different recordings of "Steve", one per press, picked at random.
// each is trimmed to a single utterance and levelled to match the others.
// drop one from this list and the roll adjusts itself.
const TAKES = ["media/steve-a.wav", "media/steve-d.mp3"];
const steveTakes = TAKES.map(makePool);

/*
let lastTake = -1;
function playSteve() {
  // avoid immediate repeats, otherwise a run of the same take reads as "it's broken"
  let take = (Math.random() * steveTakes.length) | 0;
  if (take === lastTake && steveTakes.length > 1)
    take =
      (take + 1 + ((Math.random() * (steveTakes.length - 1)) | 0)) %
      steveTakes.length;
  lastTake = take;
  steveTakes[take]();
  return take;
}
*/

const playGummy = makePool("media/gummi-bears.mp3");

/* --- gummi bear downpour --------------------------------------------- */

const CANDY = [
  "#e8352c",
  "#f5821f",
  "#f7c815",
  "#58b947",
  "#ffd9a0",
  "#9b59d0",
];
const SVG_NS = "http://www.w3.org/2000/svg";

function dropBears() {
  const count = reducedMotion ? 14 : 70;

  for (let i = 0; i < count; i++) {
    const svg = document.createElementNS(SVG_NS, "svg");
    const use = document.createElementNS(SVG_NS, "use");
    use.setAttribute("href", "#gummy");
    svg.appendChild(use);
    svg.setAttribute("class", "bear");
    svg.setAttribute("viewBox", "0 0 40 54");

    const scale = 0.55 + Math.random() * 0.9;
    const duration = (reducedMotion ? 4.5 : 2.4) + Math.random() * 2.6;

    svg.style.color = CANDY[i % CANDY.length];
    svg.style.left = Math.random() * 100 + "vw";
    svg.style.width = 40 * scale + "px";
    svg.style.height = 54 * scale + "px";
    svg.style.animationDuration = duration + "s";
    svg.style.animationDelay = Math.random() * 1.2 + "s";
    svg.style.setProperty("--spin-from", Math.random() * 360 - 180 + "deg");
    svg.style.setProperty("--spin-to", Math.random() * 1080 - 540 + "deg");

    svg.addEventListener("animationend", () => svg.remove());
    // belt and braces: animationend never fires if the tab is hidden mid-fall
    setTimeout(() => svg.remove(), (duration + 2) * 1000);
    rain.appendChild(svg);
  }

  shout.classList.remove("go");
  void shout.offsetWidth; // restart the animation on repeat jackpots
  shout.classList.add("go");
}

/* --- the press -------------------------------------------------------- */

button.addEventListener("click", () => {
  presses++;
  pressCount.textContent = presses;

  const jackpot = forceGummy || Math.random() < GUMMY_ODDS;

  if (jackpot) {
    jackpots++;
    gummyCount.textContent = jackpots;
    playGummy();
    dropBears();
    console.log("[steve] GUMMI BEARS (press #" + presses + ")");
  } else {
    const take = playSteve();
    console.log(
      "[steve] steeeeeve, take " + "abc"[take] + " (press #" + presses + ")",
    );
  }

  if (!reducedMotion) {
    stage.classList.remove("jolt");
    void stage.offsetWidth;
    stage.classList.add("jolt");
  }
});

console.log(
  "[steve] ready. odds 1 in 15." + (forceGummy ? " (?gummy=1 — rigged)" : ""),
);
