
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { communicationFAQ } from '@/data/communicationFAQ';
import { MessageSquare } from 'lucide-react';

const CommunicationFAQ = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="h-8 w-8 text-lysco-turquoise" />
            <h2 className="text-3xl font-bold">Questions & Réponses</h2>
          </div>
          
          {/* <Accordion type="single" collapsible className="space-y-4">
            {communicationFAQ.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg border p-4"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="text-lg font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {communicationFAQ.map((faq, index) => (
    <Accordion
      type="single"
      collapsible
      key={index}
      className="w-full"
    >
      <AccordionItem
        value={`item-${index}`}
        className="bg-white rounded-lg border p-4"
      >
        <AccordionTrigger className="text-left hover:no-underline">
          <span className="text-lg font-medium">{faq.question}</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 pt-2">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ))}
</div>

        </div>
      </div>
    </div>
  );
};

export default CommunicationFAQ;
