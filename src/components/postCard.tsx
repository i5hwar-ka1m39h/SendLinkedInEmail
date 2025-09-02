import React from "react";
import type { PostData } from "../types/allTypes";

export const PostCard = ({ postData }: { postData: PostData }) => {
  
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
          value={postData.emailSubject || ""}
          readOnly
          className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50"
        />
      </div>

      {/* Email Body */}
      <div>
        <p className="text-sm font-semibold text-gray-500">Email Body</p>
        <textarea
          value={postData.emailBody || ""}
          readOnly
          className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 h-32 resize-none"
        />
      </div>
    </div>
  );
};
