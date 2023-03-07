import { findVenues, venueSessions } from './utils'

function venueReport(venueName: string) {
  const venues = findVenues(venueName)
  if (!venues.length) {
    console.log(`  No venues found with name '${venueName}'`)
    return
  }
  venues.forEach((venue, index) => {
    const sessions = venueSessions(venue)
    const uniqueSessions = new Set(sessions.map((session) => session.userId))
    console.log(`  ${index + 1} - ${venue.name} - ${venue.id}`)
    console.log(`    Total Sessions: ${sessions.length}`)
    console.log(`    Unique Sessions: ${uniqueSessions.size}`)
  })
}

function main() {
  const venueName = 'Ducati'
  console.log(`How many people visited ${venueName}?`)
  venueReport(venueName)

  console.log('---\n')

  const entranceNames = ['Gate 1', 'Gate 2', 'Gate 3', 'Gate 4', 'Gate 5']
  entranceNames.forEach((entranceName) => {
    console.log(`How many people visited ${entranceName}?`)
    venueReport(entranceName)
    console.log('\n')
  })
}

main()
