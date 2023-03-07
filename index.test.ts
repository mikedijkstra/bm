import { findVenues, matchPosition, venueSessions } from './utils'
import { UserSession, Venue } from './types/models'

describe('findVenues', () => {
  test('finds a matching venue', () => {
    const venues = findVenues('Gate 1')
    expect(venues.length).toBe(1)
    expect(venues[0].name).toBe('Gate 1')
  })

  test('finds no venues', () => {
    const venues = findVenues('Non-existent venue')
    expect(venues.length).toBe(0)
  })

  test('finds multiple venues', () => {
    const venues = findVenues('Viewing Mound')
    expect(venues.length).toBe(3)
  })

  test('finds a matching venue with whitespace', () => {
    const venues = findVenues('Ducati')
    expect(venues.length).toBe(1)
    expect(venues[0].name).toBe('Ducati ')
  })
})

describe('matchPosition', () => {
  test('position is within range', () => {
    expect(matchPosition(10, 12, 2)).toBe(true)
  })

  test('position is out of range', () => {
    expect(matchPosition(10, 12, 1)).toBe(false)
  })
})

describe('counstSessions', () => {
  test('counts sessions at a venue', () => {
    const venue: Venue = {
      id: 'hn1fzqXq7G5euaXvEYG4K9',
      name: 'Gate 3',
      position: { x: 258.8300006568632, y: 1083.6799998613317 },
    }

    const userSessions: UserSession[] = [
      {
        endTimeUtc: '2022-10-14T21:52:24.794Z',
        startTimeLocal: '2022-10-15T08:50:19.403Z',
        path: [
          {
            userTimeUtc: '2022-10-15T06:31:55.793Z',
            position: { x: 258.8300006568632, y: 1083.6799998613317 },
          },
        ],
        sessionId: '957b6116-0fa9-4048-8619-9de7d88d2fc9',
        startTimeUtc: '2022-10-14T21:50:19.403Z',
        userId: 'f7cdd5320426f1a8',
      },
    ]

    const sessions = venueSessions(venue, userSessions)
    expect(sessions.length).toBe(1)
  })
})
