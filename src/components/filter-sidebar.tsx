'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { categories, products } from '@/lib/placeholder-data';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';

const allSizes = [...new Set(products.flatMap(p => p.sizes))];
const allColors = [...new Set(products.flatMap(p => p.colors))];

function Filters() {
  return (
    <div className="space-y-6">
       <Accordion type="multiple" defaultValue={['category', 'price']} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="text-base font-body font-semibold">Category</AccordionTrigger>
          <AccordionContent>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="cat-all" />
                <Label htmlFor="cat-all">All</Label>
              </div>
              {categories.map(category => (
                <div key={category.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={category.id} id={`cat-${category.id}`} />
                  <Label htmlFor={`cat-${category.id}`}>{category.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-body font-semibold">Price Range</AccordionTrigger>
          <AccordionContent className="p-2">
            <Slider defaultValue={[50]} max={500} step={1} />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>$0</span>
                <span>$500</span>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sizes">
          <AccordionTrigger className="text-base font-body font-semibold">Sizes</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2">
                {allSizes.map(size => (
                    <Button key={size} variant="outline" size="sm">{size}</Button>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="colors">
          <AccordionTrigger className="text-base font-body font-semibold">Colors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
                {allColors.map(color => (
                    <div key={color} className="flex items-center space-x-2">
                        <Checkbox id={`color-${color}`} />
                        <Label htmlFor={`color-${color}`}>{color}</Label>
                    </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button className="w-full" size="lg">Apply Filters</Button>
    </div>
  )
}

export function FilterSidebar() {
  return (
    <>
      <aside className="hidden lg:block lg:w-72 lg:flex-shrink-0">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <Filters />
      </aside>

      <div className="lg:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
          </SheetTrigger>
          <SheetContent>
            <h2 className="text-2xl font-bold mb-4">Filters</h2>
            <Filters />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
