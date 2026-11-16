"use client"
import { useSearchParams } from "next/navigation"

export default function Page() {
    const searchParams = useSearchParams();

    return (
        <div className="completed-holder-holder">
            <div className="completed-holder">
                <svg className="checkmark" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9 12l2 2 4-4"></path>
                </svg>
                <div className="big">Submission successful</div>
                <a className="btn" href={searchParams.get("redirect")}>Return</a>
            </div>
        </div>
    )
}