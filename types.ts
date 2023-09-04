import { ObjectId } from "mongodb";

export type DUMMY_EVENTS_TYPE = {
  _id: ObjectId;
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

export type commentType = {
  _id: string;
  name: string;
  text: string;
};
