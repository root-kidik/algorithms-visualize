import { makeProject } from "@motion-canvas/core";

import idea from "./scenes/searching/linear/idea?scene";
import asymptotic from "./scenes/searching/linear/asymptotic?scene";
import code from "./scenes/searching/linear/code?scene";

import "./global.css";

export default makeProject({
  scenes: [idea, asymptotic, code],
});
