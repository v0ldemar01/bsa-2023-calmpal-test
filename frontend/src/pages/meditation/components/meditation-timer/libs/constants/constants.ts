import { SECONDS_IN_MINUTE } from '#libs/helpers/helpers.js';

const SHORT_DURATION_IN_MINUTES = 5;
const MEDIUM_DURATION_IN_MINUTES = 10;
const LONG_DURATION_IN_MINUTES = 15;

const MEDITATION_DURATION = {
  SHORT: SHORT_DURATION_IN_MINUTES * SECONDS_IN_MINUTE,
  MEDIUM: MEDIUM_DURATION_IN_MINUTES * SECONDS_IN_MINUTE,
  LONG: LONG_DURATION_IN_MINUTES * SECONDS_IN_MINUTE,
} as const;

const DURATION_UNIT = {
  MINUTES: 'min',
} as const;

export { DURATION_UNIT, MEDITATION_DURATION };
