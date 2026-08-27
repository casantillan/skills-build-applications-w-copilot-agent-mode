import ResourceList from './ResourceList.jsx'

export default function Activities() {
  return <ResourceList resource="activities" title="Activity log" description="Keep an eye on movement, effort, and consistency." columns={[{ key: 'type', label: 'Type' }, { key: 'durationMinutes', label: 'Minutes' }, { key: 'points', label: 'Points' }, { key: 'user', label: 'Athlete' }]} />
}
