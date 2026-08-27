import ResourceList from './ResourceList.jsx'

export default function Teams() {
  return <ResourceList resource="teams" title="Teams" description="Find your crew and see how each team is moving." columns={[{ key: 'name', label: 'Team' }, { key: 'members', label: 'Members' }, { key: 'points', label: 'Points' }, { key: 'description', label: 'About' }]} />
}
