/**
 * @param degree 산미, 당도 등의 string값
 * @param color degreeBar의 hex code 색상 */
function DegreeBar({ degree, color }: { degree: string; color: string }) {
  /**
   * 산미, 당도값을 받아서 degreeBar의 width값을 계산합니다
   * @param tasteDegree 산미, 당도값
   */
  const translateWidth = (tasteDegree: string) => {
    if (tasteDegree === "1") {
      tasteDegree = "w-1/5";
    } else if (tasteDegree === "2") {
      tasteDegree = "w-2/5";
    } else if (tasteDegree === "3") {
      tasteDegree = "w-3/5";
    } else if (tasteDegree === "4") {
      tasteDegree = "w-4/5";
    } else if (tasteDegree === "5") {
      tasteDegree = "w-full";
    }
    return tasteDegree;
  };

  /**
   * hex 컬러코드를 rgb 컬러코드로 변환합니다
   * @param hexColor hex 컬러코드(ex. #ff8f4b) */
  const hexToRgb = (hexColor: string) => {
    const hexCode = hexColor.slice(1);
    const [r, g, b] = [hexCode.slice(0, 2), hexCode.slice(2, 4), hexCode.slice(4, 6)].map((hex) =>
      Number.parseInt(hex, 16),
    );
    return [r, g, b];
  };

  /**
   * rgb 컬러코드를 hsl 컬러코드로 변환합니다
   * @param rgbColor hex 컬러코드(ex. [225, 0, 225]) */
  const rgbToHsl = (rgbColor: number[]) => {
    let [r, g, b] = rgbColor;
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    let h;
    if (s) {
      if (l === r) {
        h = (g - b) / s;
      } else if (l === g) {
        h = 2 + (b - r) / s;
      } else {
        h = 4 + (r - g) / s;
      }
    } else {
      h = 0;
    }
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
  };

  /**
   * hex코드를 hsl코드로 변환 후 lightness값을 조정하여 반환합니다
   * @param hexColor 변환할 컬러의 hex코드 */
  const convertBGColor = (hexColor: string) => {
    const hslColor = rgbToHsl(hexToRgb(hexColor));
    const [h, s, l] = hslColor;
    return `hsl(${Math.round(h)}, ${Math.floor(s)}%, ${Math.floor(l) + 27}%)`;
  };

  return (
    <div
      className="flex flex-row gap-[1px] h-4 rounded-full overflow-hidden"
      style={{ backgroundColor: `${convertBGColor(color)}` }}
    >
      <div
        className={`${translateWidth(degree)} h-full rounded-full`}
        style={{ backgroundColor: `${color}` }}
      ></div>
    </div>
  );
}

export default DegreeBar;
