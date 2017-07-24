let now = Date.now();
now = new Date(now);
const today = now.getMonth() + '/' + now.getDate() + '/' + ('' + now.getFullYear()).substr(-2);

export { today };