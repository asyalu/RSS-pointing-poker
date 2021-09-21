import { IFormGameValue } from './forms';
import { IIssue } from './issues';

export interface IChatUsers {
  members: IFormGameValue[];
  observers: IFormGameValue[];
  master: IFormGameValue;
 
}
export interface IMessage {
  text: string;
  name: string;
  avatar: string | ArrayBuffer | null;
}
export interface IChatState {
  users: IChatUsers;
  user: IFormGameValue;
  messages: IMessage[];
  issues: IIssue[];
}
export type chatInfoAction =
  | IFetchUsersAction
  | IFetchUserAction
  | IFetchMessagesAction
  | IFetchNewMessageAction
  | IFetchIssuesAction
  | IFetchAddIssueAction;
export enum GetUsersInfoActionTypes {
  FETCH_SET_USERS = 'FETCH_SET_USERS',
  FETCH_SET_USER = 'FETCH_SET_USER',
  FETCH_SET_MESSAGES = 'FETCH_SET_MESSAGES',
  FETCH_ADD_MESSAGE = 'FETCH_ADD_MESSAGE',
  FETCH_SET_ISSUES = 'FETCH_SET_ISSUES',
  FETCH_ADD_ISSUE = 'FETCH_ADD_ISSUE',
}

export interface IFetchUsersAction {
  type: GetUsersInfoActionTypes.FETCH_SET_USERS;
  payload: {
    users: IChatUsers;
  };
}
export interface IFetchUserAction {
  type: GetUsersInfoActionTypes.FETCH_SET_USER;
  payload: {
    user: IFormGameValue;
  };
}
export interface IFetchMessagesAction {
  type: GetUsersInfoActionTypes.FETCH_SET_MESSAGES;
  payload: {
    messages: IMessage[];
  };
}
export interface IFetchIssuesAction {
  type: GetUsersInfoActionTypes.FETCH_SET_ISSUES;
  payload: {
    issues: IIssue[];
  };
}
export interface IFetchAddIssueAction {
  type: GetUsersInfoActionTypes.FETCH_ADD_ISSUE;
  payload: {
    issue: IIssue;
  };
}
export interface IFetchNewMessageAction {
  type: GetUsersInfoActionTypes.FETCH_ADD_MESSAGE;
  payload: {
    message: IMessage;
  };
}