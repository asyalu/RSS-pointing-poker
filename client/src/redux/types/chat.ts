import { IFormGameValue } from './forms';
import { IGameCard } from './gameCard';
import { IGameSetting } from './gameSetting';
import { IIssue } from './issues';

export interface IChatUsers {
  members: IFormGameValue[];
  observers: IFormGameValue[];
  master: IFormGameValue;
}
export interface IMessage {
  text: string;
  name: string;
  lastName: string;
  avatar: string | ArrayBuffer | null;
}
export interface IChatState {
  sessionName: string;
  users: IChatUsers;
  messages: IMessage[];
  issues: IIssue[];
  setting: IGameSetting;
  gameCards: IGameCard[];
}
export type chatInfoAction =
  | IFetchSessionNameAction
  | IFetchUsersAction
  | IFetchMessagesAction
  | IFetchNewMessageAction
  | IFetchIssuesAction
  | IFetchAddIssueAction
  | IFetchGameCardsAction
  | IFetchSettingAction;
export enum GetUsersInfoActionTypes {
  FETCH_SET_SESSION_NAME = 'FETCH_SET_SESSION_NAME',
  FETCH_SET_USERS = 'FETCH_SET_USERS',
  FETCH_SET_MESSAGES = 'FETCH_SET_MESSAGES',
  FETCH_ADD_MESSAGE = 'FETCH_ADD_MESSAGE',
  FETCH_SET_ISSUES = 'FETCH_SET_ISSUES',
  FETCH_ADD_ISSUE = 'FETCH_ADD_ISSUE',
  FETCH_SET_SETTING = 'FETCH_SET_SETTING',
  FETCH_SET_GAME_CARDS = 'FETCH_SET_GAME_CARDS',
}
export interface IFetchSessionNameAction {
  type: GetUsersInfoActionTypes.FETCH_SET_SESSION_NAME;
  payload: {
    sessionName: string;
  };
}

export interface IFetchUsersAction {
  type: GetUsersInfoActionTypes.FETCH_SET_USERS;
  payload: {
    users: IChatUsers;
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
export interface IFetchSettingAction {
  type: GetUsersInfoActionTypes.FETCH_SET_SETTING;
  payload: {
    setting: IGameSetting;
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
export interface IFetchGameCardsAction {
  type: GetUsersInfoActionTypes.FETCH_SET_GAME_CARDS;
  payload: {
    gameCards: IGameCard[];
  };
}
