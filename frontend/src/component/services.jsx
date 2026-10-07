import '../css/feature.css';
import '../css/services.css';
import {NotebookPen, Video, NotepadText, FaceSlightlySmiling, Boxes, Wind} from 'lucide-react';
function Services() {
    return(
    <>
    <section className="feature">
        <div className="featureInfo">
            <span>CLINICAL CARE APPROACHES</span>
            <h2>Personalized Care for Every Journey</h2>
            <p>MindBridge supports a wide range of therapeutic approaches, giving clinicians the tools they need to deliver personalized care while helping clients make meaningful progress between sessions.</p>
        </div>
        <div className="featureCards">
            <div className="featureCard">
                <div className="featureIconColor0">
                    <span className="featureIcon featureText">01</span>
                </div>
                <h4>Cognitive Behavioral Therapy (CBT)</h4>
                <p>Structured exercises and thought-tracking tools help clients recognize patterns, challenge unhelpful thoughts, and develop healthier coping strategies.</p>
            </div>

            <div className="featureCard">
                <div className="featureIconColor01">
                    <span className="featureIcon1 featureText1">02</span>
                </div>
                <h4>Trauma & EMDR Support</h4>
                <p>Organized tools and progress tracking help clinicians provide structured, client-centered support throughout the trauma recovery journey.</p>
            </div>

            <div className="featureCard">
                <div className="featureIconColor02">
                   <span className="featureIcon2 featureText2">03</span>
                </div>
                <h4>Anxiety & Panic Management</h4>
                <p>Mood tracking and guided breathing exercises give clients practical tools to manage anxiety and build calm, healthy coping habits.</p>
            </div>

            <div className="featureCard">
                <div className="featureIconColor03">
                    <span className="featureIcon3 featureText3">04</span>
                </div>
                <h4>Depression & Mood Support</h4>
                <p>Daily check-ins, journaling, and guided activities help clients understand their mood patterns and stay engaged with their progress.</p>
            </div>

            <div className="featureCard">
                <div className="featureIconColor04">
                    <span className="featureIcon4 featureText4">05</span>
                </div>
                <h4>Burnout & ADHD Support</h4>
                <p>Simple tools for focus, organization, routines, and habit building help clients manage everyday challenges and maintain sustainable progress.</p>
            </div>

            <div className="featureCard">
                <div className="featureIconColor05">
                    <span className="featureIcon5 featureText5">06</span>
                </div>
                <h4>Couples & Family Counseling</h4>
                <p>Shared sessions and communication-focused tools help couples and families stay connected, work through challenges, and build healthier relationships.</p>
            </div>
        </div>
        </section>
    </>
    );
}

export default Services;