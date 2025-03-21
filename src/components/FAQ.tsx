
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the authentication process work?",
    answer: "All sneakers listed on SneakerSwap go through a rigorous authentication process. Once a sale is made, the seller ships the sneakers to our authentication center where experts verify their authenticity, condition, and match with the listing description. After passing verification, sneakers are shipped to the buyer."
  },
  {
    question: "What fees are associated with buying or selling?",
    answer: "Buyers pay no additional fees beyond the listed price and shipping costs. Sellers are charged a 9% transaction fee on successful sales, which covers payment processing, platform maintenance, and our authentication service."
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping times vary depending on the authentication process and your location. Typically, buyers receive their authenticated sneakers within 7-10 business days after purchase. You can track your order status in real-time through your account dashboard."
  },
  {
    question: "Can I return sneakers if they don't fit?",
    answer: "We have a limited return policy for size issues. If the sneakers don't fit, you can request a return within 3 days of delivery. The sneakers must be unworn and in the original packaging. Returns for size issues are subject to a restocking fee of 10%."
  },
  {
    question: "How does the bidding system work?",
    answer: "Our bidding system allows you to place offers on sneakers below the asking price. Sellers can accept, reject, or counter your bid. Once a bid is accepted, payment is processed automatically and the authentication process begins. Bids are active for 48 hours unless canceled."
  }
];

const FAQ = () => {
  return (
    <section className="py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mt-2">Everything you need to know about SneakerSwap</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-10 text-center">
          <p className="text-muted-foreground">
            Still have questions? <a href="#" className="font-medium text-primary hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
