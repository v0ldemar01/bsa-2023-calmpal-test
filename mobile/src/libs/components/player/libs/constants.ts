import { type Track } from '#libs/types/types';

const TRACK_START_INDEX = 0;
const EMPTY_ARRAY_LENGTH = 0;

const MOCKED_PLAYLIST: Track[] = [
  {
    id: '1',
    title: 'Meditation for deep sleep',
    artist: 'Stress relief',
    url: 'http://traffic.libsyn.com/mindfulorg/winston-breathing-5mins.mp3',
    artwork: '',
  },
  {
    id: '2',
    title: 'Meditation for relaxing',
    artist: 'Relax',
    url: 'http://traffic.libsyn.com/mindfulorg/SusanKaiserGreenland.mp3',
    artwork: '',
  },
];

export { EMPTY_ARRAY_LENGTH, MOCKED_PLAYLIST, TRACK_START_INDEX };
