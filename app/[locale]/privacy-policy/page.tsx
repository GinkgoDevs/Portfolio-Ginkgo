import type { Metadata } from "next"
import { Suspense } from "react"
import PolicyLayout from "../policy-layout"
import PrivacyPolicyContent from "./privacity-policy-content"

// Update the metadata to use dynamic locale-based titles
export const metadata: Metadata = {
  title: ({ params }) => {
    return params?.locale === "en" ? "Privacy Policy | Ginkgo Devs" : "Política de Privacidad | Ginkgo Devs"
  },
  description: ({ params }) => {
    return params?.locale === "en" ? "Privacy policy of Ginkgo Devs" : "Política de privacidad de Ginkgo Devs"
  },
}

export default function PrivacyPolicyPage({ params }: { params: { locale: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#293B36]" />}>
      <PolicyLayout title={{ en: "Privacy Policy", es: "Política de Privacidad" }} locale={params.locale}>
        <PrivacyPolicyContent locale={params.locale} />
      </PolicyLayout>
    </Suspense>
  )
}

