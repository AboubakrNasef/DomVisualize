export function getColorOnNumber(num: number) {
  switch (num) {
    case 0:
      return 'red';
    case 1:
      return 'Orange';
    case 2:
      return 'Indigo';
    case 3:
      return 'Maroon';

    case 4:
      return 'LimeGreen';
    case 5:
      return 'CadetBlue';
    case 6:
      return 'Olive';
    case 7:
      return 'RosyBrown';
    default:
      return 'DarkKhaki';
  }
}
