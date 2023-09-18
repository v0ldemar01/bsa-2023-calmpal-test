import { AudioPlayer, Loader } from '#libs/components/components.js';
import { DataStatus } from '#libs/enums/data-status.enum.js';
import { useAppSelector, useCallback, useState } from '#libs/hooks/hooks.js';
import {
  MOCKED_IMAGE,
  TRACK_FIRST_INDEX,
} from '#pages/meditation/libs/constants/constants.js';

import styles from './styles.module.scss';

const MeditationPlayer: React.FC = () => {
  const { meditationEntries, meditationEntriesDataStatus } = useAppSelector(
    ({ meditation }) => {
      return {
        meditationEntries: meditation.meditationEntries,
        meditationEntriesDataStatus: meditation.meditationEntriesDataStatus,
      };
    },
  );
  const [trackIndex, setTrackIndex] = useState(TRACK_FIRST_INDEX);
  const [currentTrack, setCurrentTrack] = useState(
    meditationEntries[trackIndex],
  );

  const handleTrackIndex = useCallback(
    (index: number): void => {
      setTrackIndex(index);
      setCurrentTrack(meditationEntries[index]);
    },
    [meditationEntries],
  );

  if (
    meditationEntriesDataStatus === DataStatus.IDLE ||
    meditationEntriesDataStatus === DataStatus.PENDING
  ) {
    return <Loader />;
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['meditation-player']}>
        <div className={styles['image-wrapper']}>
          <img
            className={styles['image']}
            src={MOCKED_IMAGE}
            alt="Meditation"
            width={355}
            height={355}
          />
        </div>
        <p className={styles['title']}>{currentTrack?.name}</p>
        <AudioPlayer
          src={currentTrack?.mediaUrl ?? ''}
          trackIndex={trackIndex}
          onSetTrackIndex={handleTrackIndex}
          onSetCurrentTrack={setCurrentTrack}
          tracks={meditationEntries}
        />
      </div>
    </div>
  );
};

export { MeditationPlayer };
