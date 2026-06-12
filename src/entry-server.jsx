import { renderToString } from "react-dom/server";
import { App } from "./app.jsx";

export { PRERENDER_PATHS, titleFor, descFor, parsePath } from "./routes.js";

export function render(path) {
  return renderToString(<App ssrPath={path} />);
}
