let now = Date.now();
now = new Date(now);
const today = (now.getMonth() + 1) + '/' + now.getDate() + '/' + ('' + now.getFullYear()).substr(-2);

export { today };