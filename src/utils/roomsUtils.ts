import moment from 'moment';
import type { Attendee, RoomDetails } from '../types/room';
import { attendeeIcons } from '../constants/attendees';

export const checkRoomStatus = (room: RoomDetails) => {
  let status = 'end';
  const now = moment.now();
  const start = moment(Number(room?.startTime));
  const end = moment(Number(room?.endTime));
  if (start.isAfter(now)) {
    status = 'waiting';
  } else if (start.isBefore(now) && end.isAfter(now)) {
    status = 'live';
  }
  return status;
};

export const getNewTime = (time: string, duration: number) => {
  const oldTime = moment(Number(time));
  const newTime = oldTime.clone().add(duration, 'minutes').valueOf();
  return newTime.toString();
};

export const checkValidRoom = (room: RoomDetails): string => {
  let reason = 'TRUE';
  if (checkRoomStatus(room) !== 'waiting') {
    reason = 'NON_WAITING';
  }
  if (room.attendees?.length === room.maxAttendees) {
    reason = 'ROOM_FULL';
  }
  return reason;
};

export const generateAttendeeIcon = (attendees?: Array<Attendee>): string => {
  let existingIcons: Array<string>;
  if (attendees) {
    existingIcons = attendees.map((a) => a.icon);
  }
  const IconsArray = attendeeIcons.filter(
    (icon) => !existingIcons.includes(icon)
  );
  const index = Math.floor(Math.random() * IconsArray.length);
  const newAttendeeIcon = IconsArray[index];
  return newAttendeeIcon;
};
