import Button from 'antd/lib/button/button';
import Result from 'antd/lib/result';
import React from 'react';
import { useHistory } from 'react-router';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = (): JSX.Element => {
  const history = useHistory();
  return (
    <div className={styles.main}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => history.push('/')}>
            Back Home
          </Button>
        }
      />
      ,
    </div>
);
};

export default NotFoundPage;
