import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does the AI generate LinkedIn posts?",
    answer: "Our advanced AI uses natural language processing to analyze your input topic, tone, and style preferences. It then creates engaging, professional LinkedIn posts tailored to your specific needs and audience."
  },
  {
    question: "What's included in the free trial?",
    answer: "The free trial includes 3 AI-generated LinkedIn posts with basic styles and tones. You can test all the core features before deciding to upgrade to a paid plan."
  },
  {
    question: "Can I customize the generated posts?",
    answer: "Absolutely! All generated posts can be edited and customized. You can also regenerate posts with different tones or styles until you find the perfect content for your LinkedIn profile."
  },
  {
    question: "How does the AI image generation work?",
    answer: "Our AI can generate professional images and graphics to accompany your LinkedIn posts. Simply describe what you need, and the AI will create relevant visuals that enhance your content's engagement."
  },
  {
    question: "Is there a limit to how many posts I can generate?",
    answer: "Free trial users get 3 posts. Pro plan users have unlimited post generation, while Enterprise users get additional team collaboration features and advanced analytics."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes! You can cancel your subscription at any time. There are no long-term commitments, and you'll continue to have access to your plan features until the end of your current billing period."
  },
  {
    question: "Do you store my generated content?",
    answer: "We securely store your post history so you can access and reuse previous content. All data is encrypted and you can delete your content at any time from your dashboard."
  },
  {
    question: "What makes UpShotX different from other AI writers?",
    answer: "UpShotX is specifically trained on LinkedIn content patterns and engagement data. It understands LinkedIn's unique format, audience expectations, and creates content optimized for professional networking and engagement."
  }
]

export default function FAQSection() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}Questions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about UpShotX and AI-powered LinkedIn content generation
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border border-border/50 rounded-lg gradient-glass px-6"
              >
                <AccordionTrigger className="text-left hover:text-primary transition-smooth">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:hello@upshotx.com" 
                className="text-primary hover:text-primary-glow transition-smooth"
              >
                hello@upshotx.com
              </a>
              <span className="hidden sm:block text-muted-foreground">•</span>
              <a 
                href="https://twitter.com/upshot_ai" 
                className="text-primary hover:text-primary-glow transition-smooth"
              >
                @upshot_ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}