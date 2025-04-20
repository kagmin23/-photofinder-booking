import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Messenges } from "../../types";

const messages: Messenges[] = [
  {
    messenger_id: 1,
    conversation_id: 101,
    sender_id: 1,
    content: "Ngay mai anh gap o dau",
    is_read: false,
    sent_at: new Date("2024-02-18T12:00:00Z"),
  },
  {
    messenger_id: 2,
    conversation_id: 102,
    sender_id: 2,
    content: "ok anh nhe",
    is_read: true,
    sent_at: new Date("2024-02-18T14:30:00Z"),
  },
  {
    messenger_id: 3,
    conversation_id: 103,
    sender_id: 3,
    content: "chup style nay nhe",
    is_read: false,
    sent_at: new Date("2024-02-18T16:45:00Z"),
  },
  {
    messenger_id: 4,
    conversation_id: 104,
    sender_id: 4,
    content: "done",
    is_read: true,
    sent_at: new Date("2024-02-18T18:00:00Z"),
  },
  {
    messenger_id: 1,
    conversation_id: 101,
    sender_id: 1,
    content: "Ngay mai anh gap o dau",
    is_read: false,
    sent_at: new Date("2024-02-18T12:00:00Z"),
  },
  {
    messenger_id: 2,
    conversation_id: 102,
    sender_id: 2,
    content: "ok anh nhe",
    is_read: true,
    sent_at: new Date("2024-02-18T14:30:00Z"),
  },
  {
    messenger_id: 3,
    conversation_id: 103,
    sender_id: 3,
    content: "chup style nay nhe",
    is_read: false,
    sent_at: new Date("2024-02-18T16:45:00Z"),
  },
  {
    messenger_id: 4,
    conversation_id: 104,
    sender_id: 4,
    content: "done",
    is_read: true,
    sent_at: new Date("2024-02-18T18:00:00Z"),
  },
  {
    messenger_id: 1,
    conversation_id: 101,
    sender_id: 1,
    content: "Ngay mai anh gap o dau",
    is_read: false,
    sent_at: new Date("2024-02-18T12:00:00Z"),
  },
  {
    messenger_id: 2,
    conversation_id: 102,
    sender_id: 2,
    content: "ok anh nhe",
    is_read: true,
    sent_at: new Date("2024-02-18T14:30:00Z"),
  },
  {
    messenger_id: 3,
    conversation_id: 103,
    sender_id: 3,
    content: "chup style nay nhe",
    is_read: false,
    sent_at: new Date("2024-02-18T16:45:00Z"),
  },
  {
    messenger_id: 4,
    conversation_id: 104,
    sender_id: 4,
    content: "done",
    is_read: true,
    sent_at: new Date("2024-02-18T18:00:00Z"),
  },
];

const formatTime = (date: Date) => {
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    return date.toLocaleDateString();
  }
};

const MessageList = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100">
      <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between bg-white p-4 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center font-semibold text-[#9681FA]"
        >
          <IoChevronBackOutline className="mr-1 h-5 w-5" />
          Back
        </button>
      </div>

      <div className="mt-20 px-6">
        <h1 className="text-center text-2xl font-bold text-[#9681FA]">
          MESSAGE
        </h1>
      </div>

      <div className="animate-fade-in flex-1 overflow-y-auto pb-5">
        {messages.map((msg) => (
          <Link
            // to={`/chatbox/${msg.conversation_id}`}
            to={`/chatbox`}
            key={msg.messenger_id}
            className="flex items-start gap-4 border-b border-gray-200 px-6 py-4 transition duration-200 hover:bg-gray-100"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-300 font-bold text-white">
              {`U${msg.sender_id}`}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="truncate text-lg font-bold text-black">
                  User {msg.sender_id}
                </h3>
              </div>
              <p
                className={`mt-1 truncate ${msg.is_read ? "text-gray-800" : "font-semibold text-black"}`}
              >
                {msg.content}
              </p>
            </div>
            <span className="ml-auto flex-shrink-0 text-sm text-gray-500">
              {formatTime(msg.sent_at)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
