const colors = [
  'linear-gradient(to right, rgb(82, 82, 91), rgb(250, 250, 250), rgb(29, 78, 216))',
  'linear-gradient(to right, rgb(219, 234, 254), rgb(224, 242, 254), rgb(55, 65, 81))',
  'linear-gradient(rgb(15, 118, 110), rgb(253, 230, 138), rgb(217, 249, 157))',
  'linear-gradient(to right, rgb(3, 105, 161), rgb(186, 230, 253), rgb(255, 255, 255))',
  'linear-gradient(to right, rgb(3, 105, 161), rgb(233, 213, 255), rgb(125, 211, 252))',
  'linear-gradient(to right, rgb(254, 215, 170), rgb(254, 202, 202), rgb(255, 251, 235))',
  'linear-gradient(rgb(79, 70, 229), rgb(254, 202, 202), rgb(199, 210, 254))',
  'linear-gradient(to left, rgb(185, 28, 28), rgb(186, 230, 253), rgb(252, 165, 165))',
  'linear-gradient(to left, rgb(2, 132, 199), rgb(254, 249, 195), rgb(125, 211, 252))',
];

export function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
