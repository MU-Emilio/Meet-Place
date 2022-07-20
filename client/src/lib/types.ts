interface Image {
  url: string;
}

export interface User {
  username: string;
  objectId: string;
  email: string;
  profileImage: Image;
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
  location: string;
}
