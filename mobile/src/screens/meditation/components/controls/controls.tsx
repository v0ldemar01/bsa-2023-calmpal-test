import React from 'react';

import { Button, View } from '#libs/components/components';
import { useTrackPlayerControls } from '#libs/hooks/hooks';

import { styles } from './styles';

type Properties = {
  isPlaying: boolean;
};

const Controls: React.FC<Properties> = ({ isPlaying }) => {
  const {
    handleSkipToPrevious,
    handleSkipBackward,
    handlePlayPause,
    handleSkipForward,
    handleSkipToNext,
  } = useTrackPlayerControls({ isPlaying });

  return (
    <View style={styles.container}>
      <Button
        iconName="previous"
        onPress={handleSkipToPrevious}
        type="transparent"
      />
      <Button
        iconName="backward"
        onPress={handleSkipBackward}
        type="transparent"
      />
      <Button
        iconName={isPlaying ? 'pause' : 'play'}
        onPress={handlePlayPause}
        type="rounded"
      />
      <Button
        iconName="forward"
        onPress={handleSkipForward}
        type="transparent"
      />
      <Button iconName="next" onPress={handleSkipToNext} type="transparent" />
    </View>
  );
};
export { Controls };
