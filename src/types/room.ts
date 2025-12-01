export interface Attendee {
  id: string;
  icon: string;
  isMuted?: boolean;
  status?: string;
}

export interface RoomDetails {
  id?: string;
  title: string;
  description: string;
  creatorId: string;
  duration: number;
  maxAttendees: number;
  startTime: string;
  endTime: string;
  feed: string;
  attendees?: Array<Attendee>;
}

export interface RoomInfoShort {
  roomId: string;
  feed: string;
}
