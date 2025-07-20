interface GetDrawContextOptions {
  contextType?: string;
}

declare function getDrawContext(
  id?: string,
  options?: GetDrawContextOptions
): WebGL2RenderingContext;
