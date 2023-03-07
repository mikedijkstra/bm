export type Coordinate = {
  x: number
  y: number
}

export type SessionEvent = {
  userTimeUtc: string
  position: Coordinate
}

export type UserSession = {
  userId: string
  sessionId: string
  startTimeUtc: string
  endTimeUtc: string
  startTimeLocal: string
  path: SessionEvent[]
}

export interface SessionEventData extends Omit<SessionEvent, 'position'> {
  userTimeUtc: string
  position: {
    x: string
    y: string
  }
}
export interface UserSessionData extends Omit<UserSession, 'path'> {
  path: SessionEventData[]
}

export type Venue = {
  id: string
  name: string
  position: Coordinate
}
