import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function JobMatcher() {
  const [jobDescription, setJobDescription] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/projects/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription })
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Job Matcher</h1>

      <Textarea
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={10}
      />

      <Button onClick={handleMatch} disabled={loading}>
        {loading ? 'Matching...' : 'Match Projects'}
      </Button>

      {response && (
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
