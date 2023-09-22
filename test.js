function checkUrl(url) {
  /*
    匹配/xxx#hash
    /xxx/?name=xxx#xxx
    /xxx#xxx?xxx=xxx

    */

  const regex = /^(?!\/#\/).*\/[^\/#?]*?(#[^#\/?]*|\?[^#]*=[^#\/]*|#[^#\/?]*\?[^#]*=[^#\/]*)*$/;
  return regex.test(url);
}
const a = '/tipset/message-list?name=AddBalance&p=4';
const b = '/miner/f01345523#block_list';
const c = '/#/home'
const d = 'miner/f01345523?name=ChangeMultiaddrs#traces_list';
const e ='token/0x005e02a4a934142d8dd476f192d0dd9c381b16b4#owner'
console.log(checkUrl(e))