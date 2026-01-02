import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useJob } from '@/contexts/JobContext';
import { X } from 'lucide-react';

export default function CoverLetterGenerator() {
  const {
    jobDescription,
    setJobDescription,
    coverLetterOutput,
    setCoverLetterOutput
  } = useJob();
  const [style, setStyle] = useState('startup');
  const [modelChoice, setModelChoice] = useState('fast')
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, style, modelChoice }),
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
      <h1 className="text-2xl font-bold">Cover Letter Generator</h1>
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

      <div className='flex gap-4'>
        <Select value={style} onValueChange={setStyle}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="startup">Short</SelectItem>
            <SelectItem value="government">Long</SelectItem>
          </SelectContent>
        </Select>

        <Select value={modelChoice} onValueChange={setModelChoice}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fast">Fast</SelectItem>
            <SelectItem value="smart">Smart</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleGenerate} disabled={loading || !jobDescription}>
        {loading ? 'Generating...' : 'Generate Cover Letter'}
      </Button>

      {coverLetterOutput && (
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
            <CardTitle>Your Cover Letter</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{coverLetterOutput}</p>
          </CardContent>
        </Card>
      )
      }
    </div >
  );
}
