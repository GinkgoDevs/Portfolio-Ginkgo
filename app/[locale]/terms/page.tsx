import type { Metadata } from "next"
import { Suspense } from "react"
import PolicyLayout from "../policy-layout"
import TermsContent from "./terms-content"

// Update the metadata to use dynamic locale-based titles
export const metadata: Metadata = {
  title: "Terms and Conditions | Ginkgo Devs",
  description: "Terms and conditions of Ginkgo Devs",
}

export default function TermsPage({ params }: { params: { locale: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#293B36]" />}>
      <PolicyLayout title={{ en: "Terms and Conditions", es: "Términos y Condiciones" }} locale={params.locale}>
        <TermsContent locale={params.locale} />
      </PolicyLayout>
    </Suspense>
  )
}

