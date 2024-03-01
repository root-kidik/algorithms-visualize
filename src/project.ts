import { makeProject } from "@motion-canvas/core";

/* linear
import idea from "./scenes/searching/linear/idea?scene";
import asymptotic from "./scenes/searching/linear/asymptotic?scene";
import code from "./scenes/searching/linear/code?scene";
*/

import idea from "./scenes/searching/sentinel_linear/idea?scene";
import asymptotic from "./scenes/searching/sentinel_linear/asymptotic?scene";
import code from "./scenes/searching/sentinel_linear/code?scene";

import "./global.css";

/* linear
export default makeProject({
  scenes: [idea, asymptotic, code],
});
*/

export default makeProject({
  scenes: [idea, asymptotic, code],
});
