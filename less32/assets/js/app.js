const musicAll = [
	{
		id: '1',
		name: 'Thiên Lý ơi',
		artist: 'Jack',
		image: '../images/jack.jpg',
		link: '../music/ThienLyOi.mp3',
	},
	{
		id: '2',
		name: 'Thất tình',
		artist: 'Trịnh Đình Quang',
		image: '../images/trinhdinhquanh.jpg',
		link: '../music/ThatTinh.mp3',
	},
	{
		id: '3',
		name: 'Cơn mưa băng',
		artist: 'Noo Phước Thịnh',
		image: '../images/conmuabanggia.jpg',
		link: '../music/ConMuaBangGia.mp3',
	},
];

const wrapper = document.querySelector('.wrapper');
const musicImage = wrapper.querySelector('img');
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
