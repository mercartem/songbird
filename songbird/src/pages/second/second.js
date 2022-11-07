import './second.html';
import './second.scss';

import birdsData from './modules/birds.js';

// элементы

const play = document.querySelectorAll('.play');
const volume = document.querySelectorAll('.volume');
const progressBar = document.querySelectorAll('.play-progress');
const currentTime = document.querySelectorAll('.time-now');
const durationTime = document.querySelectorAll('.duration');
const volumeProgress = document.querySelectorAll('.volume-progress');
const birds = document.querySelectorAll('.quiz__bird');
const answer = document.querySelector('.title');
const img = document.querySelectorAll('.quiz__img');
const instructionBlock = document.querySelector('.quiz__instruction');
const descriptionBlock = document.querySelector('.description');
const birdName = document.querySelector('.kind__name');
const birdNameEng = document.querySelector('.kind__name-eng');
const birdAbout = document.querySelector('.kind__text');
const btn = document.querySelector('.quiz__btn');
const btnActive = document.querySelector('.quiz__btn_active');
const lvls = document.querySelectorAll('.quiz__item');
const score = document.querySelector('.score');

// Переменные

let lvl = 0; // текущий уровень
let currentScore = 0; // баллы
let currentBird = {}; // текущая птица в вопросе
let isPlay = false; // флаг проигрывателя
let restoreValue; // сохранение значения звука
let intervalId;
const audio = new Audio();

// Генерация птицы в блок вопроса

const randomBirds = () => { 
  const bird = birdsData[lvl].slice();
  return bird.sort(() => Math.random() - 0.5)[0];
}
currentBird = randomBirds();

// Аудио в блоке вопроса

progressBar[0].value = 0;
progressBar[1].value = 0;

const playAudio = (i, src) => {
  clearInterval(intervalId);
  if (i === 0) {
    audio.src = currentBird.audio;
  } else {
    audio.src = src;
  }
  audio.currentTime = progressBar[i].value;
  if (isPlay === false) {
    audio.play();
    isPlay = true;
    play[i].classList.add('pause');
    intervalId = setInterval(updateProgressValue, 1000, i);
  } else {
    console.log('aa')
    audio.pause();
    isPlay = false;
    play[i].classList.remove('pause');
  }
}

play[0].addEventListener('click', () => {
  playAudio(0)
})

const resetAudio = () => {
  isPlay = false;
  play[0].classList.remove('pause');
  play[1].classList.remove('pause');
  progressBar[0].value = 0;
  progressBar[1].value = 0;
  audio.currentTime = 0;
  currentTime[1].innerHTML = '0:00';
  durationTime[1].innerHTML = '0:00';
  currentTime[0].innerHTML = '0:00';
  durationTime[0].innerHTML = '0:00';
  audio.pause();
  clearInterval(intervalId);
}

audio.addEventListener('ended', resetAudio);

const updateProgressValue = (i) => {
  progressBar[i].max = audio.duration;
  progressBar[i].value = audio.currentTime;
  currentTime[i].innerHTML = (formatTime(Math.floor(audio.currentTime)));
  durationTime[i].innerHTML = (formatTime(Math.floor(audio.duration)));
};

const formatTime = (seconds) => {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10){ 
      sec  = `0${sec}`;
  };
  return `${min}:${sec}`;
};

const moveProgressBar = (i) => {
  audio.currentTime = progressBar[i].value;
}

for (let i = 0; i < progressBar.length; i++) {
  progressBar[i].addEventListener('input', () => {
    moveProgressBar(i);
  });
}

const changeVolume = (i) => {
  audio.volume = volumeProgress[i].value;
  if (audio.volume === 0) {
      volume[i].classList.add('mute');
  } else {
      volume[i].classList.remove('mute');
  }
}

for (let i = 0; i < volumeProgress.length; i++) {
  volumeProgress[i].addEventListener('input', () => {
    changeVolume(i);
  });
}

function muteSound(i) {
  if (volumeProgress[i].value != 0) {
      restoreValue = volumeProgress[i].value;
      audio.volume = 0;
      volumeProgress[i].value = 0;
      volume[i].classList.add('mute');
  } else {
      volume[i].classList.remove('mute');
      volumeProgress[i].value = restoreValue;
      audio.volume = volumeProgress[i].value;
  }
}

for (let i = 0; i < play.length; i++) {
  volume[i].addEventListener('click', () => {
    muteSound(i);
  });
}

// Выбор ответа

const chooseBird = (i) => {
  const points = document.querySelectorAll('.point');
  const answerAudio = new Audio();
  instructionBlock.style.display = 'none';
  descriptionBlock.style.display = 'block';
  img[1].setAttribute('src', birdsData[lvl][i].image);
  birdName.textContent = birdsData[lvl][i].name;
  birdName.setAttribute('id', i);
  birdNameEng.textContent = birdsData[lvl][i].species;
  birdAbout.textContent = birdsData[lvl][i].description;
  play[1].classList.remove('pause');
  if (currentBird.name === birds[i].textContent) {
    answerAudio.src = 'https://allsoundsaround.com/wp-content/uploads/2021/01/zvuk-pravilnogo-otveta-iz-peredachi-100-k-1-5200.mp3?_=1';
    answerAudio.play();
    points[i].style.background = '#00bc8c';
    answer.textContent = currentBird.name;
    img[0].setAttribute('src', currentBird.image);
    btn.classList.add('quiz__btn_active');
    resetAudio();
    if (!btn.classList.contains('quiz__btn_active')) {
      currentScore = currentScore + 5;
    }
  } else {
    answerAudio.src = 'https://allsoundsaround.com/wp-content/uploads/2021/01/zvuk-netochnosti-v-otvete-ne-zaschitan-5194.mp3?_=11';
    answerAudio.play();
    points[i].style.background = '#d62c1a';
    currentScore = currentScore - 1;
  }
  console.log(currentScore)
}

for (let i = 0; i < birds.length; i++) {
  birds[i].addEventListener('click', () => {
    chooseBird(i);
  })
}

// Аудио в описании птиц

play[1].addEventListener('click', () => {
  playAudio(1, birdsData[lvl][birdName.id].audio);
})

// Следующий уровень

const newLvl = () => {
  lvl = lvl + 1;
  lvls[lvl].classList.add('quiz__item_active');
  lvls[lvl - 1].classList.remove('quiz__item_active');
  answer.textContent = '******';
  img[0].setAttribute('src', 'assets/secret-bird.jpg');
  currentBird = randomBirds();
  for (let i = 0; i < birds.length; i++) {
    birds[i].innerHTML = `<span class="point"></span>${birdsData[lvl][i].name}`;
  }
  instructionBlock.style.display = 'block';
  descriptionBlock.style.display = 'none';
  btn.classList.remove('quiz__btn_active');
}

btn.addEventListener('click', newLvl)