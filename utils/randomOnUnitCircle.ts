const randomOnUnitCircle = (): [x: number, y: number] => {
  const angle = Math.random() * Math.PI * 2;

  return [Math.sin(angle), Math.cos(angle)];
};

export default randomOnUnitCircle;
