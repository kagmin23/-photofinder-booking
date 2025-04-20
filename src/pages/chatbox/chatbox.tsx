import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { FaSmile } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

const messagesData = [
  { id: 1, name: "MIMI", message: "Ngay mai anh gap o dau", time: "1 day" },
  { id: 2, name: "JONI", message: "ok anh nhe", time: "1 day" },
  { id: 3, name: "VY", message: "chup style nay nhe", time: "1 day" },
  { id: 4, name: "MINH", message: "done", time: "1 day" },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 5,
    name: `User ${i + 5}`,
    message: `This is message number ${i + 5}`,
    time: "1 day",
  })),
];

const Chatbox = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>(); // Lấy id từ URL
  const selectedMessage = messagesData.find((msg) => msg.id === Number(id)); // Tìm tin nhắn theo id

  const [messages, setMessages] = useState([
    { id: 1, text: selectedMessage ? selectedMessage.message : "No message found", sender: "bot" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = { id: Date.now(), text: inputMessage, sender: "user" };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      setShowEmojiPicker(false);

      // Simulate bot response
      setTimeout(() => {
        const botResponse = { id: Date.now() + 1, text: "This is a simulated response!", sender: "bot" };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  const onEmojiClick = (emojiData: any) => {
    setInputMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white p-4">
      <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center font-semibold text-[#9681FA]"
          >
          <IoChevronBackOutline className="mr-1 h-5 w-5" />
          Back
          </button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="space-y-4 py-2">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.sender === "user" ? "justify-end" : ""}`}>
              {message.sender === "bot" && <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100"></div>}
              <div className="max-w-[70%] rounded-3xl bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 p-4">
                <p className="text-gray-800">{message.text}</p>
              </div>
              {message.sender === "user" && <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 border-t bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <div className="flex items-center rounded-full bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 p-2">
              <input
                type="text"
                placeholder="Type"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-transparent px-4 text-gray-800 placeholder-gray-500 outline-none"
              />
              <button type="button" title="Emotion" className="mx-2 text-gray-500 hover:text-gray-700" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                <FaSmile size={20} />
              </button>
              <button type="submit" title="Send" disabled={!inputMessage.trim()} className="rounded-full bg-purple-100 p-2 text-purple-500 hover:bg-purple-200 disabled:opacity-50">
                <FiSend size={20} />
              </button>
            </div>

            {showEmojiPicker && <div className="absolute bottom-full right-0 mb-2"><EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} /></div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
