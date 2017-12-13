import rand from "random-seed";
import quip from "quip";

import App from "./App.jsx";

quip.apps.initialize({
  initializationCallback: (rootNode, { isCreation }) => {
    const rootRecord = quip.apps.getRootRecord();
    if (isCreation) {
      rootRecord.set("seed", rand.create().string(12));
    }
    ReactDOM.render(<App rootRecord={rootRecord}/>, rootNode);
  },
});
