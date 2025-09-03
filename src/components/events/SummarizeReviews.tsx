'use client';

import { useState } from 'react';
import { summarizeEventReviews } from '@/ai/flows/summarize-event-reviews';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SummarizeReviewsProps {
  eventName: string;
  reviews: string[];
}

export default function SummarizeReviews({ eventName, reviews }: SummarizeReviewsProps) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeEventReviews({ eventName, reviews });
      setSummary(result.summary);
    } catch (error) {
      console.error('Error summarizing reviews:', error);
      toast({
        title: 'Error',
        description: 'Could not generate summary. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleSummarize} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Summarize Reviews with AI
          </>
        )}
      </Button>
      
      {summary && (
        <Card className="mt-4 bg-secondary border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-headline text-lg font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Summary
            </h3>
            <p className="text-secondary-foreground/90">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
