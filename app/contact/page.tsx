import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function ContactPage() {
  return (
    <main className="container mx-auto px-6 py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">
          Get in Touch
        </h1>
        <p className="text-xl text-muted-foreground mb-16 leading-relaxed">
          Have a project in mind? Let's talk about how we can work together.
        </p>

        <form className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Your name"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium">
              Company
            </Label>
            <Input
              id="company"
              placeholder="Your company (optional)"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project..."
              rows={6}
              className="resize-none"
            />
          </div>

          <Button type="submit" size="lg" className="w-full md:w-auto px-12">
            Send Message
          </Button>
        </form>

        <p className="mt-12 text-sm text-muted-foreground">
          Note: This is a demo form. In production, you would connect this to your preferred form handler or API.
        </p>
      </div>
    </main>
  )
}
