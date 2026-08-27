import ResourceList from './ResourceList.jsx'

export default function Leaderboard() {
  return <ResourceList resource="leaderboard" title="Leaderboard" description="Friendly competition, measured one point at a time." columns={[{ key: 'rank', label: 'Rank' }, { key: 'username', label: 'Athlete' }, { key: 'points', label: 'Points' }, { key: 'team', label: 'Team' }]} />
}
