'use server';
/**
 * @fileOverview A Genkit flow for generating product descriptions based on keywords.
 *
 * - generateProductDescription - A function that handles the product description generation process.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  keywords: z
    .array(z.string())
    .describe('A list of keywords to base the product description on.'),
});
export type GenerateProductDescriptionInput = z.infer<
  typeof GenerateProductDescriptionInputSchema
>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<
  typeof GenerateProductDescriptionOutputSchema
>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are a professional marketing copywriter for an e-commerce clothing store named StyleSphere. Your task is to create a compelling and engaging product description based on the provided keywords. The description should be suitable for a product listing page. Focus on highlighting features, benefits, and the overall appeal of the product to potential customers.

Keywords to incorporate:
{{#each keywords}} - {{{this}}}
{{/each}}

Generate the product description in a concise and appealing manner. The output should be a JSON object with a single field, "description", containing the generated text.`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
