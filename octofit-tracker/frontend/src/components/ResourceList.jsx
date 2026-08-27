import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function formatValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

export default function ResourceList({ resource, title, description, columns }) {
  const [records, setRecords] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetchCollection(resource)
      .then((items) => {
        if (active) {
          setRecords(items)
          setStatus('ready')
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message)
          setStatus('error')
        }
      })
    return () => {
      active = false
    }
  }, [resource])

  return (
    <section className="resource-view" aria-labelledby={`${resource}-title`}>
      <div className="resource-heading">
        <div>
          <p className="eyebrow">OctoFit / {resource}</p>
          <h1 id={`${resource}-title`}>{title}</h1>
          <p className="resource-description">{description}</p>
        </div>
        <span className="record-count">{records.length} registros</span>
      </div>

      {status === 'loading' && <p className="status-message">Cargando datos...</p>}
      {status === 'error' && <p className="status-message error-message">{error}</p>}
      {status === 'ready' && records.length === 0 && (
        <p className="status-message">Todavía no hay registros.</p>
      )}
      {status === 'ready' && records.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id || record.id || index}>
                  {columns.map((column) => (
                    <td key={column.key}>{formatValue(record[column.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
