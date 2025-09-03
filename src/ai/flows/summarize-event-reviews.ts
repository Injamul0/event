'use server';

/**
 * @fileOverview Summarizes user reviews for an event using Genkit.
 *
 * - summarizeEventReviews - A function that generates a summary of event reviews.
 * - SummarizeEventReviewsInput - The input type for the summarizeEventReviews function.
 * - SummarizeEventReviewsOutput - The return type for the summarizeEventReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const SummarizeEventReviewsInputSchema = z.object({
  reviews: z.array(z.string()).describe('An array of user review strings for the event.'),
  eventName: z.string().describe('The name of the event.'),
});
export type SummarizeEventReviewsInput = z.infer<
  typeof SummarizeEventReviewsInputSchema
>;

const SummarizeEventReviewsOutputSchema = z.object({
  summary: z.string().describe('A short summary of the user reviews.'),
});
export type SummarizeEventReviewsOutput = z.infer<
  typeof SummarizeEventReviewsOutputSchema
>;

export async function summarizeEventReviews(
  input: SummarizeEventReviewsInput
): Promise<SummarizeEventReviewsOutput> {
  return summarizeEventReviewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeEventReviewsPrompt',
  input: {schema: SummarizeEventReviewsInputSchema},
  output: {schema: SummarizeEventReviewsOutputSchema},
  prompt: `You are an expert at summarizing user reviews for events.

  Given the following user reviews for the event "{{eventName}}", generate a short summary of the reviews:

  {% for review in reviews %}
  - {{review}}
  {% endfor %}

  Summary: `,
});

const summarizeEventReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeEventReviewsFlow',
    inputSchema: SummarizeEventReviewsInputSchema,
    outputSchema: SummarizeEventReviewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
