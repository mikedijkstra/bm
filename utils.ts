import VENUES from './data/venues.json'
import USER_SESSIONS from './data/userSessions.json'
import {
  SessionEvent,
  SessionEventData,
  UserSession,
  UserSessionData,
  Venue,
} from './types/models'

const MATCH_POSITION_RANGE = 2

function formatSession(session: UserSessionData) {
  const path = session.path.map((event: SessionEventData) => {
    return {
      ...event,
      position: {
        x: parseFloat(event.position.x),
        y: parseFloat(event.position.y),
      },
    }
  })
  return {
    ...session,
    path,
  }
}

const SESSIONS = USER_SESSIONS.map(formatSession)

export function matchPosition(
  source: number,
  position: number,
  range: number = MATCH_POSITION_RANGE
) {
  const start = source - range
  const end = source + range
  return position >= Math.min(start, end) && position <= Math.max(start, end)
}

function cleanString(value: string) {
  return value.toLowerCase().trim()
}

export function findVenues(name: string, venues = VENUES) {
  const downcaseName = cleanString(name)
  return venues?.filter(
    (venue: Venue) => cleanString(venue.name) === downcaseName
  )
}

export function venueSessions(
  venue: Venue,
  userSessions: UserSession[] = SESSIONS
) {
  const venueSessions = userSessions?.filter((session: UserSession) => {
    const events = session.path.filter(
      (event: SessionEvent) =>
        matchPosition(venue.position.x, event.position.x) &&
        matchPosition(venue.position.y, event.position.y)
    )
    return events.length > 0
  })

  return venueSessions
}
