/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Row from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
import styles from './GamePageMember.module.scss';
import ScramMasterInfo from '../../components/ScramMasterCard/ScramMasterCard';
import Issue from '../../components/Issues/Issue';
import Timer from '../../components/Timer/Timer';
import IssueForm from '../../components/Issues/IssueForm';
import UserCard from '../../components/UserCard/UserCard';
import GameCard from '../../components/GameCard/GameCard';
import CoffeeGameCard from '../../components/GameCard/CoffeeGameCard';
import { RootState } from '../../redux';
import { IIssue } from '../../redux/types/issues';
import { IGameCard } from '../../redux/types/gameCard';
import Statistics from '../../components/Statistics/Statistics';

const GamePageMember = (): JSX.Element => {
  // const issues = useSelector((state: RootState) => state.cdissues);
  const issues = [
    {
      title: 'string',
      link: 'string',
      priority: 'string',
      id: 'string',
    },
  ];
  const gameCards = useSelector((state: RootState) => state.gameCards);
  const [formVisible, setFormVisible] = useState(false);
  const users = useSelector((state: RootState) => state.chatReducer);

  const history = useHistory();
  const exit = (): void => {
    history.push('/');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.game}>
        <div className={styles.game__part_game}>
          <h1 className={styles.game_title}>
            Sprint 23 planning (issues 13, 533, 5623, 3252, 6623, ...)
          </h1>
          <div className={styles.game_info}>
            <div className={styles.game_side}>
              <div>
                <ScramMasterInfo />
              </div>
              <div>
                <Button type="primary" className={styles.button} onClick={exit}>
                  EXIT
                </Button>
              </div>
              <div style={{ width: '35%' }}>
                <Timer />
              </div>
            </div>
            <div className={styles.process}>
              <div className={styles.issue}>
                <h2 className={styles.game_title}>Issues: </h2>
                <Row style={{ width: '100%' }} justify="start">
                  {issues &&
                    issues.map((issue: IIssue) => (
                      <Issue
                        title={issue.title}
                        priority={issue.priority}
                        link={issue.link}
                        id={issue.id}
                        key={issue.id}
                      />
                    ))}
                </Row>
              </div>
              <div>
                <div>
                  <h2 className={styles.game_title}>Statistics:</h2>
                  <Statistics />
                </div>
                <div>
                  <Row style={{ width: '100%' }} justify="center">
                    <CoffeeGameCard />
                    {gameCards.map((gameCard: IGameCard) => (
                      <GameCard
                        cardValue={gameCard.cardValue}
                        id={gameCard.id}
                        key={gameCard.id}
                      />
                    ))}
                  </Row>
                </div>
              </div>
            </div>
          </div>
          <IssueForm
            formVisible={formVisible}
            setFormVisible={setFormVisible}
          />
        </div>
        <div className={styles.game__part_score}>
          <div className={styles.score_title}>
            <div>
              <h1>Score:</h1>
              <Col style={{ width: '100%' }}>
                {users.users.members.map((user) => (
                  <UserCard
                    name={user.name}
                    avatar={user.avatarURL}
                    position={user.jobPosition}
                    visibil="visible"
                    key={user.name}
                    lastName={user.lastName}
                  />
                ))}
              </Col>
            </div>
            <div>
              <h1>Players:</h1>
              <Col style={{ width: '100%' }}>
                {users.users.members.map((user) => (
                  <UserCard
                    name={user.name}
                    avatar={user.avatarURL}
                    position={user.jobPosition}
                    visibil="visible"
                    key={user.name}
                    lastName={user.lastName}
                  />
                ))}
              </Col>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePageMember;