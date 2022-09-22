const { reasonPhraseCodeProNewMap } = require("../utils/storage");
module.exports = {
  returnReasons: (code) => {
    return reasonPhraseCodeProNewMap().get(code);
  },
};
