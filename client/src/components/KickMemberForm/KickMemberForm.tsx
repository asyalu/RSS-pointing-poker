import Button from 'antd/lib/button';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { chatParams } from '../../redux/actions/chat';
import { kickForm } from '../../redux/actions/kickForm';
import { IChatUsers } from '../../redux/types/chat';
import { socket } from '../../socket';
import styles from './KickMemberForm.module.scss';

const KickMemberForm = ({ formVisible, setFormVisible }: any): JSX.Element => {
  const dispatch = useDispatch();
  const formData = (kickData: any): void => {
    dispatch(kickForm(kickData));
  };
  const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  ); 
  // const { gameID } = sessionStorage;

  const kickUserData = useSelector((state: RootState) => state.kickUserData);
  const agreeKickMember = (): void => {
    socket.emit('AGREE_KICK_MEMBER', gameID, socket.id);
    dispatch(kickForm({ ...kickUserData, visibil: false }));
  };
  const disagreeKickMember = (): void => {
    socket.emit('DISAGREE_KICK_MEMBER', gameID, socket.id);
    dispatch(kickForm({ ...kickUserData, visibil: false }));
  };
  useEffect(() => {
    socket.on('KICK_DATA', formData);
    socket.on('FINISH_VOITING', formData);
    
  }, []);
  return (
    <div
      className={
        kickUserData.visibil
          ? `${styles.kick} ${styles.kick__active}`
          : `${styles.kick}`
      }
      onClick={() => setFormVisible(false)}
    >
      <div className={styles.kick__content}>
        <h2>Kick member</h2>
        <div className={styles.kick__description_wrapper}>
          <p className={styles.kick__description}>
            {`${kickUserData.initiator.name} ${kickUserData.initiator.lastName} want to kick member ${kickUserData.exclusion.name} ${kickUserData.exclusion.name}`}
          </p>
          <p className={styles.kick__description}>Do you agree with it?</p>
        </div>
        <div className={styles.kick__buttons}>
          <Button
            type="primary"
            style={{ width: '100px' }}
            onClick={agreeKickMember}
          >
            Yes
          </Button>
          <Button
            type="default"
            style={{ width: '100px' }}
            onClick={disagreeKickMember}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KickMemberForm;
