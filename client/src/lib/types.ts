interface Image {
  url: string;
}

export interface User {
  username: string;
  objectId: string;
  email: string;
  profileImage: Image;
  publicEmail: string;
  createdAt: Date;
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

export interface EventForm {
  date: string;
  time: string;
  description: string;
  title: string;
  location: string;
  guests: User[];
}
