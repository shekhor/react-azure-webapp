import { useState } from 'react'
import './App.css'
import { get, API_URL } from './api/api'

function App() {
  const [count, setCount] = useState(0)
  const [apiData, setApiData] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Example API call function
  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      // Example: Replace '/example' with your actual API endpoint
      const data = await get('/example')
      setApiData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>Welcome to Simple App</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          Count is {count}
        </button>
      </div>
      
      <div className="card" style={{ marginTop: '20px' }}>
        <h2>API Example</h2>
        <p>API URL: {API_URL}</p>
        <button onClick={fetchData} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data from API'}
        </button>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {apiData !== null && (
          <pre style={{ textAlign: 'left', marginTop: '10px' }}>
            {JSON.stringify(apiData, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}

export default App


