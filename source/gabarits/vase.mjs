/* Géométrie du « vase de Rubin » de la direction Figure et fond : deux profils face à face,
   la coupe est le vide entre eux. Repère 0 0 1000 1000, profil gauche tourné vers la droite. */
export const CONTOUR = [
  [318, 0], [330, 90], [352, 200], [372, 285], [360, 318], [378, 350], [440, 418], [392, 452],
  [402, 478], [386, 500], [400, 524], [372, 556], [398, 610], [352, 668], [330, 760], [322, 880], [300, 1000],
];
const r = (n) => Math.round(n * 10) / 10;
/* Courbe de Catmull-Rom passant par les points, en courbes de Bézier. */
function courbe(pts) {
  let d = '';
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${r(c1[0])} ${r(c1[1])} ${r(c2[0])} ${r(c2[1])} ${r(p2[0])} ${r(p2[1])}`;
  }
  return d;
}
const miroir = (pts) => pts.map(([x, y]) => [1000 - x, y]);
export const profilGauche = `M0 0 L${CONTOUR[0].join(' ')}${courbe(CONTOUR)} L0 1000 Z`;
export const profilDroit = `M1000 0 L${miroir(CONTOUR)[0].join(' ')}${courbe(miroir(CONTOUR))} L1000 1000 Z`;
export const coupe = `M${CONTOUR[0].join(' ')}${courbe(CONTOUR)} L${1000 - CONTOUR.at(-1)[0]} 1000${courbe(miroir(CONTOUR).reverse())} Z`;
