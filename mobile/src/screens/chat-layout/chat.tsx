import React from 'react';

import { ScrollView, Text, View } from '#libs/components/components';
import {
  useAppForm,
  useCallback,
  useEffect,
  useRef,
  useState,
} from '#libs/hooks/hooks';

import { ChatInput, MessageItem } from './components/components';
import { DEFAULT_VALUES, MOCKED_DATA, PREVIOUS_USER } from './libs/constants';
import { styles } from './styles';

type Message = {
  id: number;
  isUser: boolean;
  message: string;
};

const Chat: React.FC = () => {
  const { control, handleSubmit, reset } = useAppForm<{ text: string }>({
    defaultValues: DEFAULT_VALUES,
  });

  const [messages, setMessages] = useState<Message[]>(MOCKED_DATA);
  const scrollViewReference = useRef<ScrollView | null>(null);

  const scrollViewToEnd = (): void => {
    scrollViewReference.current?.scrollToEnd();
  };

  const onSubmit = useCallback(
    (payload: { text: string }): void => {
      setMessages((previous) => [
        ...previous,
        {
          id: Date.now(),
          isUser: true,
          message: payload.text,
        },
      ]);
      scrollViewToEnd();
      reset();
    },
    [setMessages, reset],
  );

  const handlePress = useCallback((): void => {
    void handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  useEffect(() => {
    scrollViewToEnd();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.title}>Doctor Freud.ai</Text>
      </View>
      <View style={styles.divider} />
      <ScrollView style={styles.chatWrapper} ref={scrollViewReference}>
        {messages.map((item, index) => (
          <MessageItem
            text={item.message}
            isUser={item.isUser}
            isAvatarVisible={
              item.isUser !== messages[index - PREVIOUS_USER]?.isUser
            }
            key={item.id}
          />
        ))}
      </ScrollView>
      <ChatInput
        scrollViewToEnd={scrollViewToEnd}
        onPress={handlePress}
        control={control}
        name="text"
      />
    </View>
  );
};

export { Chat };
