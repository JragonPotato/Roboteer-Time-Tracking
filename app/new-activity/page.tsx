'use client';

import { useState } from 'react';
import { putActivity } from '../../lib/actions';
import { useUser } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default function Page() {
    const utcDate = new Date(Date.now() - 6 * 3.6e+6);
    const minDate = new Date(Date.now() - 1209600000 - 6 * 3.6e+6);
    let min = minDate.toISOString();
    let date = utcDate.toISOString();
    let minToday = min.substring(0, 10);
    let today = date.substring(0, 10);

    let time = date.substring(11, 16);

    const [startTime, setStartTime] = useState(time);

    const {user, isLoading} = useUser();

    return (
        <form className="btns" onSubmit={(e) => {
            e.preventDefault();

            let formData = new FormData(e.target);

            putActivity(
                user.email,
                formData.get('date') as string,
                formData.get('project_name') as string,
                formData.get('start_time') as string,
                formData.get('end_time') as string,
                formData.get('description') as string,
                formData.get('crew') as string);

            redirect("/completed?redirect=%2F");
        }}>
            <div className="calendar-holder-holder-holder"><input className="title" type="text" placeholder="Project Name" name="project_name" /></div>
            <div className="calendar-holder-holder-holder"><input className="title" type="date" defaultValue={today} min={minToday} max={today} name="date" /></div>
            <div className="calendar-holder-holder-holder">
                <div className="time-holder-holder">
                    <div className="time-holder time-l">
                        <label>Start Time</label>
                        <input className="time time-l" type="time" defaultValue={time} onChange={x => { setStartTime(x.currentTarget.value) }} name="start_time" />
                    </div>
                    <div className="time-holder time-r">
                        <label>End Time</label>
                        <input className="time time-r" type="time" min={startTime} defaultValue={time} name="end_time" />
                    </div>
                </div>
            </div>
            <div className="calendar-holder-holder-holder"><input className="title" placeholder="Description (Must be descriptive)" name="description" /></div>
            <div className="calendar-holder-holder-holder"><select className="title" name="crew" defaultValue={""} >
                <option className="whyNotCentered" value="" disabled hidden>--Crew--</option>
                <option className="whyNotCentered" value="software">Software</option>
                <option className="whyNotCentered" value="electrical">Electrical</option>
                <option className="whyNotCentered" value="strategy">Strategy</option>
                <option className="whyNotCentered" value="mechanical">Mechanical</option>
                <option className="whyNotCentered" value="marketing">Marketing</option>
                <option className="whyNotCentered" value="cad">CAD</option>
                <option className="whyNotCentered" value="awards">Awards</option>
                <option className="whyNotCentered" value="leadership">Leadership Council</option></select>
            </div>
            <button className="btn" disabled={isLoading}><span className="btn-text">Submit</span></button>
        </form>
    )
}
