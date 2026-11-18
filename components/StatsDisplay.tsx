"use client"

import { useEffect, useState } from "react";
import { search } from "../lib/actions";
import UserDisplay from "./UserDisplay";

export default function StatsDisplay() {

    const [results, setResults] = useState<any>({});
    const [query, setQuery] = useState("");

    useEffect(() => {
        search(query).then(x => {
                let out = {}

                for (let i = 0; i < x.length; i++) {
                    const value = x[i];
                    if (!(value.username in out)) {
                        out[value.username] = []
                    }
                    out[value.username].push(value);
                }
                setResults(out);
            }
        );
    }, [query])

    return (
        <div>
            <div className="stats-holder">
                <div className="search-holder">
                    <input className="stats-search" onChange={e => setQuery(e.target.value)} />
                    <svg className="magnifying-glass" xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <div className="user-holder">
                    {Array.from(Object.entries(results).map(([k, v], i) => <UserDisplay key={i} email={k} rows={v as any[]} />))}
                </div>
            </div>
        </div>
    );
}
