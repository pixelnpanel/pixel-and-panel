import { redirect } from 'next/navigation'

export default async function SignageCategoryRedirect({ params }) {
    const resolvedParams = await params

    redirect(`/signage?category=${resolvedParams.category}`)
}