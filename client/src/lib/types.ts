export interface User {
  username: string;
  objectId: string;
}

interface Date {
  iso: string;
}
export interface EventType {
  objectId: string;
  date: Date;
  description: string;
  title: string;
  owner: User;
}
