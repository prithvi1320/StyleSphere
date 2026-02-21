'use server';

import { generateProductDescription } from '@/ai/flows/generate-product-description-flow';

export async function generateDescriptionAction(keywords: string) {
  try {
    const keywordList = keywords.split(',').map(k => k.trim()).filter(Boolean);
    if (keywordList.length === 0) {
      return { success: false, error: 'Please provide some keywords.' };
    }
    const result = await generateProductDescription({ keywords: keywordList });
    return { success: true, description: result.description };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate description. Please try again.' };
  }
}
