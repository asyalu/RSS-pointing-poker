import Button from 'antd/lib/button/button';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { newMessageParams } from '../../redux/actions/chat';
import { socket } from '../../socket';
import styles from './Chat.module.scss';

export const SendingForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  // const user = useSelector((state: RootState) => state.currentUser);
  const user = JSON.parse(sessionStorage.user);
   const { gameID } = sessionStorage;
 /* const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );*/
  const sendMessage = (): void => {
    const newMessage = {
      text: message,
      avatar: user.avatarURL,
      name: user.name,
      lastName: user.lastName,
      gameID,
    };
    if (message !== '') {
      socket.emit('GAME_NEW_MESSAGE', newMessage);
    }
    setMessage('');
  };
  return (
    <>
      <div className={styles.chat__add_messages}>
        <TextArea
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={sendMessage}
          autoSize={{ maxRows: 1 }}
          value={message}
          placeholder="Enter your message"
        />
        <Button type="primary" htmlType="submit" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </>
  );
};

export default SendingForm;
