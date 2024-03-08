import { makeProject } from "@motion-canvas/core";

import "./global.css";

/* linear
import name from "./scenes/searching/linear/name?scene";
import idea from "./scenes/searching/linear/idea?scene";
import asymptotic from "./scenes/searching/linear/asymptotic?scene";
import code from "./scenes/searching/linear/code?scene";
import audio from "../audio/linear.wav";

export default makeProject({
  scenes: [name, idea, asymptotic, code],
  audio: audio,
});
*/

/* sentinel_linear
import name from "./scenes/searching/sentinel_linear/name?scene";
import idea from "./scenes/searching/sentinel_linear/idea?scene";
import asymptotic from "./scenes/searching/sentinel_linear/asymptotic?scene";
import code from "./scenes/searching/sentinel_linear/code?scene";
import audio from "../audio/sentinel_linear.wav";

export default makeProject({
  scenes: [name, idea, asymptotic, code],
  audio: audio,
});
*/

/* binary
import idea from "./scenes/searching/binary/idea?scene";
import asymptotic from "./scenes/searching/binary/asymptotic?scene";
import code from "./scenes/searching/binary/code?scene";
import name from "./scenes/searching/binary/name?scene";
import audio from "../audio/binary_search.wav";

export default makeProject({
  scenes: [name, idea, asymptotic, code],
  audio: audio,
});
*/

import idea from "./scenes/searching/meta_binary/idea?scene";
import asymptotic from "./scenes/searching/meta_binary/asymptotic?scene";
import code from "./scenes/searching/meta_binary/code?scene";
import name from "./scenes/searching/meta_binary/name?scene";

export default makeProject({
  scenes: [idea],
});
