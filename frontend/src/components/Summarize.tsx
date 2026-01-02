
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useJob } from '@/contexts/JobContext';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown'

export default function Summarize() {
  const {
    jobDescription,
    setJobDescription,
    summary,
    setSummary
  } = useJob();
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription }),
      });
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSummary("")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Summarizer</h1>
      <Textarea
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !loading) {
            e.preventDefault();
            handleSummarize();
          }
        }}
        rows={8}
      />

      <Button onClick={handleSummarize} disabled={loading || !jobDescription}>
        {loading ? 'Generating...' : 'Generate Summary'}
      </Button>

      {summary && (
        <Card className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-[-11px] left-[-11px] h-7 w-7 rounded-full"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardHeader>
            <CardTitle>Your Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap">
              <ReactMarkdown>
                {summary}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
