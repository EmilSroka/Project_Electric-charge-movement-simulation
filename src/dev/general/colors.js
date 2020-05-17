class Color{
  constructor(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

export function getColor({r, g, b}, alpha = 1){
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const DARK_RED = new Color(141, 2, 31);
export const RED = new Color(237, 41, 57);
export const DARK_BLUE = new Color(19, 60, 85);
export const LIGHT_BLUE = new Color(204, 244, 252);
export const BLUE = new Color(89, 165, 216);
export const DARK_GREEN = new Color(63, 122, 77); 
export const GREEN = new Color(80, 220, 100);

export const LIGHT_GRAY = new Color(165, 165, 165);
export const GRAY = new Color(102, 102, 102);
export const DARK_GRAY = new Color(84, 84, 84);
export const BLACK = new Color(10, 10, 10);