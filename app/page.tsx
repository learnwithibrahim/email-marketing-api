import Navbar from "@/components/home/navbar";
import Hero from "@/components/home/hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}