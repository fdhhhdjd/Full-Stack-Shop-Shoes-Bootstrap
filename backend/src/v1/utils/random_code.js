module.exports = {
  /**
   * random code
   * @author Nguyen Tiến Tài
   *
   * @param {string} random
   *
   */
  randomCode: () => {
    let now = Date.now().toString();
    now += now + Math.floor(Math.random() * 10);
    return [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join("-");
  },
};
