import { makeProject } from "@motion-canvas/core";

import "./global.css";

/* linear
import idea from "./scenes/searching/linear/idea?scene";
import asymptotic from "./scenes/searching/linear/asymptotic?scene";
import code from "./scenes/searching/linear/code?scene";

export default makeProject({
  scenes: [idea, asymptotic, code],
});
*/

/* sentinel_linear
import idea from "./scenes/searching/sentinel_linear/idea?scene";
import asymptotic from "./scenes/searching/sentinel_linear/asymptotic?scene";
import code from "./scenes/searching/sentinel_linear/code?scene";

export default makeProject({
  scenes: [idea, asymptotic, code],
});
*/

import idea from "./scenes/searching/binary/idea?scene";
import asymptotic from "./scenes/searching/binary/asymptotic?scene";
import code from "./scenes/searching/binary/code?scene";

export default makeProject({
  scenes: [idea, asymptotic, code],
});
