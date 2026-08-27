import ResourceList from './ResourceList.jsx'

export default function Users() {
  return <ResourceList resource="users" title="Athletes" description="The OctoFit community, ready for the next challenge." columns={[{ key: 'username', label: 'Username' }, { key: 'email', label: 'Email' }, { key: 'team', label: 'Team' }, { key: 'fitnessLevel', label: 'Fitness level' }]} />
}
