interface Image {
  url: string;
}

export interface User {
  fullName: string;
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

export interface EventTypeStatus {
  event: EventType;
  status: string;
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

export interface SuggestedDateType {
  date: string;
  points: number;
}

export interface EventFeedType {
  guest: { objectId: string };
  event: EventType;
}

export interface Guest {
  guest: User;
  status: string;
}

export interface CategoryType {
  objectId: string;
  name: string;
  icon: string;
  color: string;
}
