import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function JobMatcher() {
  const [jobDescription, setJobDescription] = useState('');
  const [response, setResponse] = useState<any>(null);
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
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Matched Projects:</h2>

          {response.map((project: any) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.keywords.map((keyword: any, i: number) => (
                    <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700 italic">{project.summary}</p>

                <div className="space-y-3">
                  {project.bulletpoints.map((bullet: any, i: number) => (
                    <div key={i} className="pl-4 border-l-2 border-gray-300 space-y-1">
                      <p className="text-sm">
                        <span className="font-semibold">Result:</span> {bullet.result}
                      </p>
                      <p className="text-sm text-green-700">
                        <span className="font-semibold">Metric:</span> {bullet.metric}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Action:</span> {bullet.action}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
