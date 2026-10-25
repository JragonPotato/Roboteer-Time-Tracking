import { ReactNode } from "react";

export default function Page() {
    const utcDate = new Date(Date.now());
    const minDate = new Date(Date.now() - 1209600000);
    let min = minDate.toISOString();
    let date = utcDate.toISOString();
    let minToday = min.substring(0, 10)
    let today = date.substring(0, 10);
    return (
        <form className="btns" action={async (e: FormData) => {
            "use server"
            
        }}>
            <div className="calendar-holder-holder-holder"><input className="title" type="text" placeholder="Title" /></div>
            <div className="calendar-holder-holder-holder"><input className="calendar" type="date" defaultValue={today} min={minToday} max={today} /></div>
            <div className="calendar-holder-holder-holder"><input className="title" placeholder="Description (Must be descriptive)" /></div>
            <div className="calendar-holder-holder-holder"><select className="title"> <option value="">--Please choose an option--</option>
                <option value="software">Software</option>
                <option value="electrical">Electrical</option>
                <option value="strategy">Strategy</option>
                <option value="mechanical">Mechanical</option>
                <option value="marketing">Marketing</option>
                <option value="cad">CAD</option>
                <option value="awards">Awards</option>
                <option value="leadership">Leadership Council</option></select></div>
            <button className="btn"><span className="btn-text">Submit</span></button>
        </form>
    )
}

function Asdf({ children }: { children: ReactNode }) {
    return (
        <div className="real-calendar-holder-holder-holder">
            <div className="calendar-holder-holder">
                <div className="calendar-holder">
                    {children}
                </div>
            </div>
        </div>
    )
}