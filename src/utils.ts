export function getRetinaImg (img: string) {
  return img.slice(0, -4).concat('@2x.jpg 2x');
}
