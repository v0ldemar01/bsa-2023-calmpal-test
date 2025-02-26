const DEFAULT_NOTE_PAYLOAD = {
  title: 'New note',
  text: '<p dir="ltr"><span style="white-space:pre-wrap">Type your text here</span></p>',
};

const TEXT_PLACEHOLDER = 'Type your text here';

const SAVE_NOTE_TIMEOUT = 2000;

export { DEFAULT_NOTE_PAYLOAD, SAVE_NOTE_TIMEOUT, TEXT_PLACEHOLDER };
export { NOTE_SANITIZER_OPTIONS } from 'shared/build/index.js';
