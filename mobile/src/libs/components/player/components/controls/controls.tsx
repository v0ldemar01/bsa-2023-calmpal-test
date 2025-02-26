import React from 'react';

import { Button, View } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { usePlayerControls, useState } from '#libs/hooks/hooks';

import { styles } from './styles';

type Properties = {
  isPlaying: boolean;
};

const Controls: React.FC<Properties> = ({ isPlaying: initialIsPlaying }) => {
  const {
    handleSkipToPrevious,
    handleSkipBackward,
    handlePlayPause,
    handleSkipForward,
    handleSkipToNext,
  } = usePlayerControls({ isPlaying: initialIsPlaying });
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying);

  const togglePlayPause = (): void => {
    setIsPlaying(!isPlaying);
    handlePlayPause();
  };

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
        onPress={togglePlayPause}
        isRounded
        isVisuallyCentered={!isPlaying}
        type="transparent"
        color={AppColor.BLUE_200}
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
