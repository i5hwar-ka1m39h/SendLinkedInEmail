import React, { useState, useEffect } from "react";
import type { PostData } from "../types/allTypes";
import axios from "axios";

export const PostCard = () => {
  const [postData, setPostData] = useState<PostData | null>(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        type: "GET_PAGE_TEXT",
      },
      (res) => {
        setPostData(res.data);
        setSubject(res.data.emailSubject);
        setBody(res.data.emailSubject);
      }
    );
  }, []);

  const sendEmail = async () => {
    try {
      const formData = new FormData();
      formData.append("to", postData?.hrEmailIds.join(",") as string)
      formData.append("subject",subject)
      formData.append("message", body);

      if(resumeFile){
        formData.append("resume", resumeFile)
      }
      
      setLoading(true)
      const response = await axios.post("https://emailsenderauto.onrender.com/sendEmail", {
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: postData?.hrEmailIds,   // multiple recipients
          subject,
          body,
        }),
      })

      if(response.status !== 200){
        alert("failed to send email")
      }

      setLoading(false)
      alert("email sent")
    } catch (error) {
      console.error(error);
      alert("error sending email");
    }
  };

  if (!postData) {
    return <div> Loading Post data...</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4  h-fit">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        Job Post Details
      </h2>

      {/* Post By */}
      <div>
        <p className="text-sm font-semibold text-gray-500">Post By</p>
        <p className="text-lg text-gray-800">
          {postData.postBy || "Not present"}
        </p>
      </div>

      {/* Company */}
      <div>
        <p className="text-sm font-semibold text-gray-500">Company</p>
        <p className="text-lg text-gray-800">
          {postData.companyName || "Not present"}
        </p>
      </div>

      {/* Job Title */}
      <div>
        <p className="text-sm font-semibold text-gray-500">Job Title</p>
        <p className="text-lg text-gray-800">
          {postData.jobTitle || "Not present"}
        </p>
      </div>

      {/* Job Requirements */}
      <div>
        <p className="text-sm font-semibold text-gray-500">Job Requirements</p>
        <ul className="grid grid-cols-3 gap-2 text-gray-700 list-disc list-inside">
          {postData.jobRequirements.map((req, index) => (
            <li key={index} className="break-words">
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Experience */}
      <div>
        <p className="text-sm font-semibold text-gray-500">Experience</p>
        <p className="text-lg text-gray-800">
          {postData.experience || 0} years
        </p>
      </div>

      {/* HR Emails */}
      <div>
        <p className="text-sm font-semibold text-gray-500">HR Emails</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {postData.hrEmailIds && postData.hrEmailIds.length > 0 ? (
            postData.hrEmailIds.map((email, index) => (
              <li key={index}>{email}</li>
            ))
          ) : (
            <li>Not present</li>
          )}
        </ul>
      </div>

      {/* Email Subject */}
      <div>
        <p className="text-sm font-semibold text-gray-500">Email Subject</p>
        <input
          type="text"
          value={subject || ""}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50"
        />
      </div>

      {/* Email Body */}
      <div>
        <p className="text-sm font-semibold text-gray-500">Email Body</p>
        <textarea
          value={body || ""}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 h-32 resize-none"
        />
      </div>

      <div>
        <button
          className="border rounded-2xl bg-gray-400 p-5"
          onClick={sendEmail}
        >
          Send Email
        </button>
      </div>
    </div>
  );
};
