export default function createElements() {
  const body = document.querySelector('body');

  const main = document.createElement('main');
  main.className = 'main';
  body.append(main);

  const title = document.createElement('h1');
  title.className = 'title';
  title.innerHTML = 'Gem Puzzle';
  main.append(title);

  const buttons = document.createElement('div');
  buttons.className = 'buttons';
  main.append(buttons);

  const newGame = document.createElement('button');
  newGame.className = 'new-game';
  newGame.classList.add('btn');
  newGame.innerHTML = 'New game';
  buttons.append(newGame);

  const stop = document.createElement('button');
  stop.className = 'stop';
  stop.classList.add('btn');
  stop.innerHTML = 'Stop';
  buttons.append(stop);

  const save = document.createElement('button');
  save.className = 'save';
  save.classList.add('btn');
  save.innerHTML = 'Save';
  buttons.append(save);

  const results = document.createElement('button');
  results.className = 'results';
  results.classList.add('btn');
  results.innerHTML = 'Results';
  buttons.append(results);

  const sound = document.createElement('button');
  sound.className = 'sound';
  sound.classList.add('btn');
  buttons.append(sound);

  const info = document.createElement('div');
  info.className = 'info';
  main.append(info);

  const time = document.createElement('div');
  time.className = 'time';
  time.innerHTML = '00:00:00';
  info.append(time);

  const moves = document.createElement('div');
  moves.className = 'moves';
  moves.innerHTML = 'Moves: 0';
  info.append(moves);

  const table = document.createElement('div');
  table.className = 'table';
  main.append(table);

  const currentSize = document.createElement('div');
  currentSize.className = 'current-size';
  currentSize.innerHTML = 'Frame size: 4x4';
  main.append(currentSize);

  const otherSize = document.createElement('div');
  otherSize.className = 'other-size';
  otherSize.innerHTML = 'Other size: ';
  main.append(otherSize);

  const size3 = document.createElement('a');
  size3.className = 'size-3';
  size3.setAttribute('href', '#');
  size3.innerHTML = '3x3';
  otherSize.append(size3);

  const size4 = document.createElement('a');
  size4.className = 'size-4';
  size4.setAttribute('href', '#');
  size4.innerHTML = '4x4';
  otherSize.append(size4);

  const size5 = document.createElement('a');
  size5.className = 'size-5';
  size5.setAttribute('href', '#');
  size5.innerHTML = '5x5';
  otherSize.append(size5);

  const size6 = document.createElement('a');
  size6.className = 'size-6';
  size6.setAttribute('href', '#');
  size6.innerHTML = '6x6';
  otherSize.append(size6);

  const size7 = document.createElement('a');
  size7.className = 'size-7';
  size7.setAttribute('href', '#');
  size7.innerHTML = '7x7';
  otherSize.append(size7);

  const size8 = document.createElement('a');
  size8.className = 'size-8';
  size8.setAttribute('href', '#');
  size8.innerHTML = '8x8';
  otherSize.append(size8);
}
