import ResourceList from './ResourceList.jsx'

export default function Activities() {
  return <ResourceList resource="activities" title="Activity log" description="Keep an eye on movement, effort, and consistency." columns={[{ key: 'type', label: 'Type' }, { key: 'duration', label: 'Duration' }, { key: 'calories', label: 'Calories' }, { key: 'userId', label: 'Athlete' }]} />
}
