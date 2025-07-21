interface GetDrawContextOptions {
  contextType?: string;
}

declare function getDrawContext(
  id?: string,
  options?: GetDrawContextOptions
): WebGL2RenderingContext;

declare function register(...params: any): any;

declare function registerControl(name: string, ...aliases: string[]): any;
