/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import Row from 'antd/lib/grid/row';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SettingPage.module.scss';
import SessionInfo from '../../components/SettingPagePart/SessionInfo/SessionInfo';
import StartCancelButtons from '../../components/SettingPagePart/StartCancelButton/StartCancelButton';
import UserCard from '../../components/UserCard/UserCard';
import Issue from '../../components/Issues/Issue';
import CreateIssue from '../../components/Issues/CreateIssueButton';
import IssueForm from '../../components/Issues/IssueForm';
import GameSetting from '../../components/SettingPagePart/GameSetting/GameSetting';
import CreateGameCard from '../../components/GameCard/CreateGameCard';
import GameCard from '../../components/GameCard/GameCard';
import CoffeeGameCard from '../../components/GameCard/CoffeeGameCard';
import { RootState } from '../../redux';
import { IIssue } from '../../redux/types/issues';
import { addGameCards } from '../../redux/actions/gameCards';
import { IGameCard } from '../../redux/types/gameCard';
import Chat from '../../components/Chat/Chat';
import { socket } from '../../socket';
import { IChatUsers } from '../../redux/types/chat';
import { getUsersParams } from '../../redux/actions/createSession';
import { chatParams, newMessageParams } from '../../redux/actions/chat';

const SettingPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const getUsers = ({ members, observers, master }: IChatUsers): void => {
    dispatch(chatParams({ members, observers, master }));
  };
  useEffect(() => {
    socket.on('MEMBER_JOINED', getUsers);
    socket.on('MEMBER_LEAVED', getUsers);
    dispatch(getUsersParams('1111'));
    socket.on('GAME_NEW_MESSAGE', (message) => {
      dispatch(newMessageParams(message));
    });
  }, []);
  /* const socket = new WebSocket('ws://localhost:3002/');
  socket.onopen = () => {
    console.log('подключение установлено');
  };
  socket.onmessage = (event) => {
    console.log(event.data);
  */
  const joinMember = useSelector((state: RootState) => state.chatReducer);
  const issues = useSelector((state: RootState) => state.addIssueReducer);
  const gameCards = useSelector((state: RootState) => state.gameCards);
  const [formVisible, setFormVisible] = useState(false);

  const nextCardValue = (): IGameCard => {
    const cardValue =
      gameCards[gameCards.length - 1].cardValue +
      gameCards[gameCards.length - 2].cardValue;
    return { cardValue, id: cardValue };
  };

  return (
    <Content className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.main__panel}>
          <SessionInfo />
          <StartCancelButtons />
        </div>
        <div className={styles.main__panel}>
          <h3>Members:</h3>
          <Row style={{ width: '100%' }} justify="start">
            {joinMember.users.members &&
              joinMember.users.members.map((user) => (
                <UserCard
                  name={user.name}
                  lastName={user.lastName}
                  avatar={user.avatarURL}
                  position={user.jobPosition}
                  visibil="visible"
                  key={user.name}
                />
              ))}
          </Row>
        </div>
        <div className={styles.main__panel}>
          <h3>Issues:</h3>
          <Row style={{ width: '100%' }} justify="start">
            {issues &&
              issues.issues.map((issue: IIssue) => (
                <Issue
                  title={issue.title}
                  priority={issue.priority}
                  link={issue.link}
                  id={issue.id}
                  key={issue.id}
                />
              ))}
            <button
              className={styles.main__button_invis}
              type="button"
              onClick={() => {
                setFormVisible(true);
              }}
            >
              <CreateIssue />
            </button>
          </Row>
        </div>
        <div className={styles.main__panel}>
          <h3>Game setting:</h3>
          <GameSetting />
        </div>
        <div className={styles.main__panel}>
          <h3>Add card values:</h3>
          <Row style={{ width: '100%' }} justify="start">
            <CoffeeGameCard />
            {gameCards.map((gameCard: IGameCard) => (
              <GameCard
                cardValue={gameCard.cardValue}
                id={gameCard.id}
                key={gameCard.id}
              />
            ))}
            <button
              className={styles.main__button_invis}
              type="button"
              onClick={() => dispatch(addGameCards(nextCardValue()))}
            >
              <CreateGameCard />
            </button>
          </Row>
        </div>
      </div>
      <IssueForm formVisible={formVisible} setFormVisible={setFormVisible} />
      <Chat />
    </Content>
  );
};

export default SettingPage;
