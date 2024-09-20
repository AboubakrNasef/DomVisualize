export function getColorOnNumber(num: number) {
  switch (num) {
    case 0:
      return '#e6194b'; // Red
    case 1:
      return '#3cb44b'; // Green
    case 2:
      return '#ffe119'; // Yellow
    case 3:
      return '#4363d8'; // Blue
    case 4:
      return '#f58231'; // Orange
    case 5:
      return '#911eb4'; // Purple
    case 6:
      return '#46f0f0'; // Cyan
    case 7:
      return '#f032e6'; // Magenta
    case 8:
      return '#bcf60c'; // Lime
    case 9:
      return '#fabebe'; // Pink
    case 10:
      return '#008080'; // Teal
    case 11:
      return '#e6beff'; // Lavender
    case 12:
      return '#9a6324'; // Brown
    case 13:
      return '#fffac8'; // Beige
    case 14:
      return '#800000'; // Maroon
    case 15:
      return '#aaffc3'; // Mint
    case 16:
      return '#808000'; // Olive
    case 17:
      return '#ffd8b1'; // Coral
    case 18:
      return '#000075'; // Navy
    case 19:
      return '#808080'; // Grey
    case 20:
      return '#ffffff'; // White
    default:
      return '#000000'; // Black
  }
}
