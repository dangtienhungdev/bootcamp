const musicAll = [
	{
		id: 'music-0',
		name: 'Thất tình',
		artist: 'Trịnh Đình Quang',
		image: './assets/images/trinhdinhquanh.jpg',
		link: './assets/music/ThatTinh.mp3',
	},
	{
		id: 'music-1',
		name: 'Thiên Lý ơi',
		artist: 'Jack',
		image: './assets/images/jack.jpg',
		link: './assets/music/ThienLyOi.mp3',
	},
	{
		id: 'music-2',
		name: 'Cơn mưa băng',
		artist: 'Noo Phước Thịnh',
		image: './assets/images/conmuabanggia.jpg',
		link: './assets/music/ConMuaBangGia.mp3',
	},
];

const wrapper = document.querySelector('.wrapper');
const musicImage = wrapper.querySelector('.image-area img');
const musicName = wrapper.querySelector('.name');
const musicArtists = wrapper.querySelector('.artists');
const playPauseBtn = wrapper.querySelector('.play-pause');
const prevBtn = wrapper.querySelector('.btn-prev');
const nextBtn = wrapper.querySelector('.btn-next');
const mAudio = wrapper.querySelector('#m-audio');
const progressArea = wrapper.querySelector('.progress-area');
const progressBar = wrapper.querySelector('.progress-bar');
const start = wrapper.querySelector('.current-time');
const end = wrapper.querySelector('.max-duration');
const musicList = wrapper.querySelector('.music-list');
const closeMusicBtn = wrapper.querySelector('#close');
const ultag = wrapper.querySelector('ul');
const menulistBtn = wrapper.querySelector('#menu-list');

let musicIndex = 0;

// đăng ký 1 sợ kiện khi mà tất cả các tài nguyên được nạp vào thành công mới cho chạy code
window.addEventListener('load', () => {
	const currentMusic = musicAll[musicIndex];
	musicImage.src = currentMusic.image;
	musicName.innerText = currentMusic.name;
	musicArtists.innerText = currentMusic.artist;
	mAudio.src = currentMusic.link;
});

// open list menu
menulistBtn.addEventListener('click', () => musicList.classList.add('show'));
closeMusicBtn.addEventListener('click', () =>
	musicList.classList.remove('show')
);

for (let i = 0; i < musicAll.length; i++) {
	const item = musicAll[i];
	let litag = /* html */ `<li class="" li-index="${i}">
       <div class="row">
         <span>${item.name}</span>
         <p class="artists">${item.artist}</p>
       </div>

       <audio class="${item.id}" src="${item.link}" type="audio/mp3"></audio>

       <span id="${item.id}" class="timer audio-duration m-list">02:00</span>
     </li>`;
	ultag.insertAdjacentHTML('beforeend', litag);

	// lấy ra các phần tử liên qua đến thẻ audio và thời gian bài hát
	const liAudioDurationTag = ultag.querySelector(`#${item.id}`);
	const liAudioTag = ultag.querySelector(`.${item.id}`);

	liAudioTag.addEventListener('loadeddata', () => {
		const duration = liAudioTag.duration;
		// tính toán ra phút, giây
		const min = Math.floor(duration / 60);
		let sec = Math.floor(duration % 60);
		if (sec < 10) {
			sec = '0' + sec;
		}
		liAudioDurationTag.innerText = `${min}:${sec}`;
	});
}

function clicked() {
	console.log('abc');
}

const litags = wrapper.querySelectorAll('li');
for (let i = 0; i < litags.length; i++) {
	const item = litags[i];
	const audioTag = item.querySelector('.audio-duration');

	if (item.getAttribute('li-index') == musicIndex) {
		item.classList.add('playing');
		// audioTag.innerText = /* html */ `ahihi`;
	}

	item.setAttribute('onclick', `clicked()`);
}
