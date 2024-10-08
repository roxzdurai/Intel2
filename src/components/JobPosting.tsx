import React, { useState } from 'react';
import { AiOutlineEdit, AiOutlineFileText } from 'react-icons/ai';

interface Job {
  jobTitle: string;
  jobDescription: string;
  skills: string[];
  location: string;
  salaryRange: string;
  datePosted: string;
  applicants: number;
}

const JobPosting: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'posted'>('create');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState('Work from office');
  const [salaryRange, setSalaryRange] = useState('3 - 4 LPA');
  const [postedJobs, setPostedJobs] = useState<Job[]>([]);

  // Handle enter key press for adding skills
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim() !== '') {
      e.preventDefault(); // Prevent form submission on Enter key
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]); // Add skill to the list
      }
      setSkillInput(''); // Clear the input after adding the skill
    }
  };

  // Remove a skill
  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  // Handle form submission and add new job to postedJobs array
  const handlePostJob = () => {
    if (jobTitle && jobDescription) {
      const newJob: Job = {
        jobTitle,
        jobDescription,
        skills,
        location,
        salaryRange,
        datePosted: new Date().toLocaleDateString(), // Use current date for the job post
        applicants: Math.floor(Math.random() * 100) + 1, // Random applicants for demo purposes
      };
      setPostedJobs([...postedJobs, newJob]); // Add the new job to the list of posted jobs
      setActiveTab('posted'); // Switch to Posted tab
      resetForm(); // Clear form inputs
    }
  };

  const resetForm = () => {
    setJobTitle('');
    setJobDescription('');
    setSkillInput('');
    setSkills([]);
    setLocation('Work from office');
    setSalaryRange('3 - 4 LPA');
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header with JOBS title */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">JOBS</h1>
        {/* Create and Posted buttons under the title */}
        <div className="flex items-center mt-2">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center text-lg font-semibold mr-6 ${
              activeTab === 'create' ? 'text-orange-500' : 'text-gray-500'
            }`}
          >
            <AiOutlineEdit className="mr-1" /> Create
          </button>
          <button
            onClick={() => setActiveTab('posted')}
            className={`flex items-center text-lg font-semibold ${
              activeTab === 'posted' ? 'text-orange-500' : 'text-gray-500'
            }`}
          >
            <AiOutlineFileText className="mr-1" /> Posted
          </button>
        </div>
      </div>

      {/* Conditional rendering based on the selected tab */}
      {activeTab === 'create' ? (
        <div className="max-w-full" style={{ textAlign: 'left' }}>
          {/* Form aligned to the left */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Job Role / Title */}
            <div className="text-left">
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-600">
                Job Role / Title
              </label>
              <select
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select a role</option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="Frontend Developer">Frontend Developer</option>
              </select>
            </div>

            {/* Job Description */}
            <div className="text-left">
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-600">
                Job Description
              </label>
              <textarea
                id="jobDescription"
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter job description"
              />
            </div>

            {/* Requirements / Skills */}
            <div className="text-left">
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-600">
                Requirements
              </label>
              <input
                id="requirements"
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter requirements and press Enter (e.g., HTML, CSS)"
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="flex items-center px-2 py-1 bg-orange-100 text-orange-800 rounded-md text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      className="ml-2 text-orange-800"
                      onClick={() => removeSkill(index)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="text-left">
              <label htmlFor="location" className="block text-sm font-medium text-gray-600">
                Location
              </label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="Work from office">Work from office</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            {/* Salary Range */}
            <div className="text-left">
              <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-600">
                Salary Range
              </label>
              <select
                id="salaryRange"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="3 - 4 LPA">3 - 4 LPA</option>
                <option value="4 - 5 LPA">4 - 5 LPA</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={resetForm}
              >
                Clear
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                onClick={handlePostJob}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postedJobs.map((job, index) => (
              <div key={index} className="border border-gray-300 p-4 rounded-md shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">{job.jobTitle}</h3>
                <p className="text-sm text-gray-600 mt-1">{job.datePosted}</p>
                <p className="text-gray-700 mt-2">{job.jobDescription}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-600">Requirements</h4>
                  <ul className="list-disc list-inside mt-1">
                    {job.skills.map((skill, i) => (
                      <li key={i} className="text-gray-700 text-sm">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between mt-4">
                  <span className="text-gray-600 text-sm">{job.location}</span>
                  <span className="text-gray-600 text-sm">Applicants: {job.applicants}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPosting;