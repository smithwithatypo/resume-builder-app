import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useJob } from '@/contexts/JobContext';
import { X } from 'lucide-react';

export default function CoverLetterGenerator() {
  // const { jobDescription, setJobDescription } = useJob();
  // const [coverLetter, setCoverLetterOutput] = useState('');
  const {
    jobDescription,
    setJobDescription,
    coverLetterOutput,
    setCoverLetterOutput
  } = useJob();
  const [style, setStyle] = useState('startup');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, style }),
      });
      const data = await response.json();
      setCoverLetterOutput(data.coverLetter);
    } catch (error) {
      console.error('Failed to generate cover letter:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCoverLetterOutput("")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cover Letter Generator</CardTitle>
          <CardDescription>Paste job description and choose your style</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !loading) {
                e.preventDefault();
                handleGenerate();
              }
            }}
            rows={8}
          />

          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="startup">Startup (concise)</SelectItem>
              <SelectItem value="government">Government/Corporate (formal)</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleGenerate} disabled={loading || !jobDescription}>
            {loading ? 'Generating...' : 'Generate Cover Letter'}
          </Button>
        </CardContent>
      </Card>

      {coverLetterOutput && (
        <Card className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-[-11px] left-[-11px] h-6 w-6 rounded-full"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardHeader>
            <CardTitle>Your Cover Letter</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{coverLetterOutput}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
