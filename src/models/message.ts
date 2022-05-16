export interface IMessage {
  id: string;
  content: string;
  createdAt: number;
  user: {
    id: string;
    name: string;
  };
}
