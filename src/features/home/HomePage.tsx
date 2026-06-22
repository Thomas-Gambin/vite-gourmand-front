import { CompanyPresentationSection } from './components/CompanyPresentationSection'
import { ExpertiseSection } from './components/ExpertiseSection'
import { HeroSection } from './components/HeroSection'
import { ReviewsSection } from './components/ReviewsSection'

export function HomePage() {
  return (
    <div className="-mt-10 space-y-20 pb-8 sm:space-y-24">
      <HeroSection />
      <CompanyPresentationSection />
      <ExpertiseSection />
      <ReviewsSection />
    </div>
  )
}
