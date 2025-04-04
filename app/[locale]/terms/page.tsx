import type { Metadata } from "next"
import { Suspense } from "react"
import PolicyLayout from "../policy-layout"
import TermsContent from "./terms-content"

// Update the metadata to use dynamic locale-based titles
export const metadata: Metadata = {
  title: ({ params }) => {
    return params?.locale === "en" ? "Terms and Conditions | Ginkgo Devs" : "Términos y Condiciones | Ginkgo Devs"
  },
  description: ({ params }) => {
    return params?.locale === "en"
      ? "Terms and conditions of Ginkgo Devs"
      : "Términos y condiciones de uso de Ginkgo Devs"
  },
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

