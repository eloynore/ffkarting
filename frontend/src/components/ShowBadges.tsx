import { FastLaps } from "../helper/models";

export default function ShowBadges(badges: Readonly<FastLaps>) {
  if (badges.fastLap) {
    return (
      <img
        className="w-8 aspect-auto"
        src="/icons/fastlap.png"
        alt="Fast lap"
      />
    );
  } else if (badges.theFasto) {
    return (
      <img
        className="w-8 aspect-auto"
        src="/icons/thefasto.png"
        alt="The fasto"
      />
    );
  } else if (badges.grandChelem) {
    return (
      <img
        className="w-8 aspect-auto"
        src="/icons/grandchelem.png"
        alt="Grand chelem"
      />
    );
  } else {
    return <></>;
  }
}
