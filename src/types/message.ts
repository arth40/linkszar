export interface MessageInfo {
  id?: string;
  userId: string;
  icon: string;
  message: string;
  reactions?: Array<Reaction>;
}

export interface Reaction {
  userId: string;
  emoji: string;
}
