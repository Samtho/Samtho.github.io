import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/data/faq";
import { PENDING } from "@/data/schema";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Pending } from "../Pending";
import { Section } from "../Section";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Faq({ locale, dictionary }: Props) {
  return (
    <Section id="faq" title={dictionary.sections.faq}>
      <Accordion type="single" collapsible className="w-full">
        {faq.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left font-display text-base font-medium">
              {item.question[locale]}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer[locale] === PENDING ? (
                <Pending />
              ) : (
                item.answer[locale]
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
