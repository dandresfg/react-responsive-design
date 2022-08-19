function resizeToDefinition(width: number, height: number) {
  Object.assign(window, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  });
}
export default resizeToDefinition;
