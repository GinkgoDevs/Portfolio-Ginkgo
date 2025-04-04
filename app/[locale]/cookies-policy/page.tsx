import type { Metadata } from "next"
import { Suspense } from "react"
import PolicyLayout from "../policy-layout"
import CookiesPolicyContent from "./cookies-policy-content"

// Update the metadata to use dynamic locale-based titles
export const metadata: Metadata = {
  title: ({ params }) => {
    return params?.locale === "en" ? "Cookie Policy | Ginkgo Devs" : "Política de Cookies | Ginkgo Devs"
  },
  description: ({ params }) => {
    return params?.locale === "en" ? "Cookie policy of Ginkgo Devs" : "Política de cookies de Ginkgo Devs"
  },
}

export default function CookiesPolicyPage({ params }: { params: { locale: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#293B36]" />}>
      <PolicyLayout title={{ en: "Cookie Policy", es: "Política de Cookies" }} locale={params.locale}>
        <CookiesPolicyContent locale={params.locale} />
      </PolicyLayout>
    </Suspense>
  )
}

