const CONFIGS = require("../configs/config");
const CONSTANTS = require("../configs/constants")
const db_algolia = {
    appId: CONFIGS.APP_ID_ALGOLIA,
    apiKey: CONFIGS.ADMIN_KEY_ALGOLIA,
    indexName: CONSTANTS.NAME_INDEX_ALGOLIA,
    selector: "-rating -_id",
    populate: {
        path: 'categories',
        select: 'name -_id',
    },
    filter: function(doc) {
        return !doc.softdelete
    },
};

module.exports = db_algolia;