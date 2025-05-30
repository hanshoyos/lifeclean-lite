import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [breaches, setBreaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!email) return;
    setLoading(true);
    setError('');
    setBreaches([]);

    try {
      const res = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}`, {
        headers: {
          'User-Agent': 'LifeClean Lite',
        }
      });

      if (res.status === 404) {
        setBreaches([]);
      } else if (res.ok) {
        const data = await res.json();
        setBreaches(data);
      } else {
        throw new Error('Unable to check breaches.');
      }
    } catch (err) {
      setError('Failed to fetch data. Try again later.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-hacker">LifeClean Lite</h1>
      <input
        type="email"
        placeholder="Enter your email"
        className="p-2 rounded bg-gray-900 border border-hacker text-hacker w-full max-w-md mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleCheck}
        className="bg-hacker text-black px-4 py-2 rounded hover:bg-green-400 transition"
      >
        Check Breaches
      </button>

      {loading && <p className="mt-4 text-sm">Checking...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-6 w-full max-w-2xl">
        {breaches.length > 0 ? (
          breaches.map((b, i) => (
            <div key={i} className="border border-hacker rounded p-4 mb-2 bg-gray-800">
              <h2 className="text-xl font-bold">{b.Name}</h2>
              <p className="text-sm text-gray-300">{b.Description}</p>
              <p className="text-xs mt-1 text-gray-400">Breach Date: {b.BreachDate}</p>
            </div>
          ))
        ) : (
          !loading && <p className="mt-4 text-sm text-gray-400">No breaches found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
