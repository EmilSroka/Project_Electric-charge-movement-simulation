import { wait } from '../general/utils';

const cooldownTime = 200;

const subscribers = [];
let isBlocked = false;

export default {
  subscribe, unsubscribe
}

function subscribe(cb){
  if(subscribers.includes(cb))
    return;

  subscribers.push(cb);
}

function unsubscribe(cb){
  if(!subscribers.includes(cb))
    return;

  const index = subscribers.indexOf(cb);
  subscribers.splice(index, 1);
}

window.addEventListener('resize', async () => {
  if(isBlocked)
    return;

  isBlocked = true;
  await wait(cooldownTime);
  notifySubscribers();
  isBlocked = false;
});

function notifySubscribers() {
  for(const subscriber of subscribers)
    subscriber();
}