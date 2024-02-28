import { makeProject } from "@motion-canvas/core";

import idea from "./scenes/searching/idea?scene";
import asymptotic from "./scenes/searching/asymptotic?scene";
import code from "./scenes/searching/code?scene";

import "./global.css";

export default makeProject({
  scenes: [idea, asymptotic, code],
});
