export interface Cat {
  id: string;
  image: string;
  tags: string[];
  mimeType: string;
  createdAt: string;
  votes: number;
}

export interface Count {
  count: number;
}

export interface VotingMap {
  [key: string]: Cat;
}

export const initialState: VotingMap = {};