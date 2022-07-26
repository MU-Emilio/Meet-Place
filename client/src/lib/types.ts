interface Image {
  url: string;
}

export interface User {
  username: string;
  objectId: string;
  email: string;
  profileImage: Image;
  publicEmail: string;
  createdAt: string;
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
  privacy: boolean;
}

export interface EventForm {
  date: string;
  time: string;
  description: string;
  title: string;
  location: string;
  guests: User[];
  privacy: boolean;
}

export interface Location {
  lat: number;
  lng: number;
}
