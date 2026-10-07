import '../css/herosection.css';
function HeroSection() {
    return(
        <>
        <div className="heroSection">
            <div className="heroTitle">
                One Unified Ecosystem for <span>Clinical Mastery</span> & Client <br></br>Healing.
            </div>
            <p className="heroDesc">
                Bridge the clinical gap between weekly therapy hours. Empower mental health clinicians with automated SOAP charting and CPT billing, while offering clients a peaceful sanctuary for daily mood logs, CBT worksheets, and guided breathing.
            </p>
        </div>
        <div className="heroBtn">
            <button className="heroBtn1">Explore Theraipist</button>
            <button className="heroBtn2">Get In Touch</button>
        </div>
        <div className="heroIntro">
            <div className="heroMind">
                <span>Introduction to MindBridge</span>
                <h2>
                    Traditional therapy stops at the door.
                    <br />MindBridge extends care into everyday life.
                </h2>
                <p>
                    Most therapy fails not in the clinic, but during the 167 hours between appointments. MindBridge<br /> provides an intelligent clinical workspace for therapists to chart, bill, and monitor outcomes, paired<br /> with an empathetic patient sanctuary that promotes engagement, homework completion, and<br /> continuous emotional resilience
                </p>
            </div>
            <div className="heroCard">
                <div className="herocard1">
                    <h3>98.4%</h3>
                    <p>Session Attendance</p>
                </div>
                <div className="herocard1">
                    <h3>4.2 Hrs</h3>
                    <p>Saved / Wk on Charting</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default HeroSection;