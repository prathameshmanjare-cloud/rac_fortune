import SectionHeader from '../shared/SectionHeader'
import TestimonialTabs from '../shared/TestimonialTabs'

function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-neutral relative overflow-hidden">
      <div className="absolute inset-0 pattern-fort opacity-[0.04]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeader
          title="Voices of Impact"
          subtitle="अनुभव — Beneficiaries & Partners"
        />
        <TestimonialTabs />
      </div>
    </section>
  )
}

export default Testimonials
