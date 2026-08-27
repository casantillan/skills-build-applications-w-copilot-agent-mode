import ResourceList from './ResourceList.jsx'

export default function Workouts() {
  return <ResourceList resource="workouts" title="Workouts" description="A practical menu of ways to build your next session." columns={[{ key: 'name', label: 'Workout' }, { key: 'type', label: 'Type' }, { key: 'difficulty', label: 'Difficulty' }, { key: 'duration', label: 'Duration' }]} />
}
