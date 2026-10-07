import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Video,
  Phone,
  ArrowLeft,
  CheckCheck
} from "lucide-react";

import "../css/clientMessages.css";

function ClientMessages() {
  return (
    <section className="clientMessages">

      {/* HEADER */}
      <div className="clientMessagesHeader">
        <div>
          <h1>Messages</h1>
          <p>Communicate securely with your therapist.</p>
        </div>
      </div>


      {/* MESSAGES LAYOUT */}
      <div className="messagesContainer">

        {/* CONVERSATIONS */}
        <div className="conversationList">

          <div className="conversationSearch">
            <Search size={17} />

            <input
              type="text"
              placeholder="Search messages..."
            />
          </div>


          <div className="conversationTitle">
            <span>CONVERSATIONS</span>
          </div>


          {/* ACTIVE CONVERSATION */}
          <button className="conversationItem active">

            <div className="conversationAvatar">
              SS
            </div>

            <div className="conversationInfo">

              <div className="conversationTop">
                <strong>Dr. Sarah Sharma</strong>
                <small>9:42 AM</small>
              </div>

              <div className="conversationBottom">
                <span>I'll see you in our next session.</span>
                <b>2</b>
              </div>

            </div>

          </button>


          {/* OTHER CONVERSATION */}
          <button className="conversationItem">

            <div className="conversationAvatar">
              RM
            </div>

            <div className="conversationInfo">

              <div className="conversationTop">
                <strong>Dr. Rahul Mehta</strong>
                <small>Yesterday</small>
              </div>

              <div className="conversationBottom">
                <span>Thank you for your response.</span>
              </div>

            </div>

          </button>

        </div>


        {/* CHAT */}
        <div className="chatArea">

          {/* CHAT HEADER */}
          <div className="chatHeader">

            <div className="chatUser">

              <div className="chatAvatar">
                SS
              </div>

              <div>
                <strong>Dr. Sarah Sharma</strong>
                <span>Clinical Psychologist · Online</span>
              </div>

            </div>


            <div className="chatHeaderActions">

              <button>
                <Phone size={18} />
              </button>

              <button>
                <Video size={18} />
              </button>

              <button>
                <MoreVertical size={18} />
              </button>

            </div>

          </div>


          {/* CHAT BODY */}
          <div className="chatBody">

            <div className="chatDate">
              <span>Today</span>
            </div>


            <div className="message received">
              <p>
                Hi! How are you feeling today?
              </p>
              <small>9:30 AM</small>
            </div>


            <div className="message sent">
              <p>
                I'm feeling a little better than yesterday.
              </p>
              <small>
                9:34 AM
                <CheckCheck size={13} />
              </small>
            </div>


            <div className="message received">
              <p>
                That's good to hear. Remember to take
                things one step at a time.
              </p>
              <small>9:38 AM</small>
            </div>


            <div className="message sent">
              <p>
                Thank you. I'll try to keep that in mind.
              </p>
              <small>
                9:40 AM
                <CheckCheck size={13} />
              </small>
            </div>


            <div className="message received">
              <p>
                I'll see you in our next session.
              </p>
              <small>9:42 AM</small>
            </div>

          </div>


          {/* MESSAGE INPUT */}
          <div className="messageInputArea">

            <button className="attachmentButton">
              <Paperclip size={19} />
            </button>

            <input
              type="text"
              placeholder="Type a message..."
            />

            <button className="sendMessageButton">
              <Send size={18} />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ClientMessages;