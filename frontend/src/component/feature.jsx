import '../css/feature.css';
import {NotebookPen, Video, NotepadText, FaceSlightlySmiling, Boxes, Wind} from 'lucide-react';
function Feature() {
    return(
    <>
    <section className="feature">
        <div className="featureInfo">
            <span>Clinical Platform Features</span>
            <h2>Everything You Need for Better Mental Healthcare</h2>
            <p>Streamline clinical workflows, simplify administration, and help clients stay connected throughout their therapeutic journey.</p>
        </div>
        <div className="featureCards">
            <div className="featureCard">
                <div className="featureIconColor fback">
                    <NotebookPen className="featureIcon" />
                </div>
                <h4>Smart SOAP & DAP Notes</h4>
                <p>Create structured clinical notes faster and keep patient records organized and secure.</p>
            </div>

            <div className="featureCard">
                <div className="featureIconColor1 fback">
                    <Video className="featureIcon1" />
                </div>
                <h4>Secure Telehealth Sessions</h4>
                <p>Connect with clients through secure, high-quality video sessions without extra software.</p>
            </div>

            <div className="featureCard">
                <div className="featureIconColor2 fback">
                    <NotepadText className="featureIcon2" />
                </div>
                <h4>Payments & Billing</h4>
                <p>Simplify payments, invoices, and billing with everything managed in one place.</p>
            </div>

            <div className="featureCard">
                <div className="featureIconColor3 fback">
                    <FaceSlightlySmiling className="featureIcon3" />
                </div>
                <h4>Daily Mood Tracking</h4>
                <p>Let clients record their mood and help therapists understand changes between sessions.</p>
            </div>

            <div className="featureCard">
                <div className="featureIconColor4 fback">
                    <Boxes className="featureIcon4" />
                </div>
                <h4>Care Packages</h4>
                <p>Create multi-session packages with simple tracking of remaining sessions and credits.</p>
            </div>

            <div className="featureCard">
                <div className="featureIconColor5 fback">
                    <Wind className="featureIcon5" />
                </div>
                <h4>Guided Breathing</h4>
                <p>Help clients manage stress with a simple guided breathing exercise available anytime.</p>
            </div>
        </div>
        </section>
    </>
    );
}

export default Feature;