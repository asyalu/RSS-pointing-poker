/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import styles from './GamePage.module.scss';
import ScramMasterInfo from '../../components/ScramMasterCard/ScramMasterCard';
import Issue from '../../components/Issues/Issue';
import Timer from '../../components/Timer/Timer';
import CreateIssue from '../../components/Issues/CreateIssueButton';
import IssueForm from '../../components/Issues/IssueForm';
import UserCard from '../../components/UserCard/UserCard';
import { RootState } from '../../redux';
import { IIssue } from '../../redux/types/issues';
import Statistics from '../../components/Statistics/Statistics';
import GameCard from '../../components/GameCard/GameCard';
import CoffeeGameCard from '../../components/GameCard/CoffeeGameCard';
import { IGameCard } from '../../redux/types/gameCard';

const GamePage = (): JSX.Element => {
  const issues = useSelector((state: RootState) => state.addIssueReducer);
  const [formVisible, setFormVisible] = useState(false);
  const joinMember = useSelector((state: RootState) => state.chatReducer);
  const gameCards = useSelector((state: RootState) => state.gameCards);

  const history = useHistory();
  const result = (): void => {
    history.push('/result');
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
                <Button
                  type="primary"
                  className={styles.button}
                  onClick={result}
                >
                  Stop game
                </Button>
              </div>
              <div style={{ width: '40%' }}>
                <Timer />
              </div>
            </div>
            <div className={styles.process}>
              <div className={styles.issue}>
                <h2 className={styles.game_title}>Issues: </h2>
                <Col>
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
                    className={styles.button_issue}
                    type="button"
                    onClick={() => setFormVisible(true)}
                  >
                    <CreateIssue />
                  </button>
                </Col>
              </div>
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
                {joinMember.users.members.map((user) => (
                  <UserCard
                    name={user.name}
                    lastName={user.lastName}
                    avatar={user.avatarURL}
                    position={user.jobPosition}
                    visibil="visible"
                    key={user.name}
                  />
                ))}
              </Col>
            </div>
            <div>
              <h1>Players:</h1>
              <Col style={{ width: '100%' }}>
                {joinMember.users.members.map((user) => (
                  <UserCard
                    name={user.name}
                    lastName={user.lastName}
                    avatar={user.avatarURL}
                    position={user.jobPosition}
                    visibil="visible"
                    key={user.name}
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

export default GamePage;