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
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState('Work from office');
  const [salaryRange, setSalaryRange] = useState('3 - 4 LPA');
  const [postedJobs, setPostedJobs] = useState<Job[]>([]);

  // Predefined skills list for the dropdown
  const predefinedSkills = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'C++',
    'SQL',
    'AWS',
    'Docker',
    'Kubernetes',
    'DevOps',
    'Git',
    'TypeScript',
    
  ];

  // Handle skill selection from dropdown
  const handleSkillSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSkill = e.target.value;
    if (selectedSkill && !skills.includes(selectedSkill)) {
      setSkills([...skills, selectedSkill]); // Add the skill to the list
    }
  };

  // Remove a skill from the list
  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  // Handle form submission to add a new job
  const handlePostJob = () => {
    if (jobTitle && jobDescription) {
      const newJob: Job = {
        jobTitle,
        jobDescription,
        skills,
        location,
        salaryRange,
        datePosted: new Date().toLocaleDateString(),
        applicants: Math.floor(Math.random() * 100) + 1, // Random applicants for demo purposes
      };
      setPostedJobs([...postedJobs, newJob]);
      setActiveTab('posted');
      resetForm(); // Clear the form after posting
    }
  };

  // Reset form fields
  const resetForm = () => {
    setJobTitle('');
    setJobDescription('');
    setSkills([]);
    setLocation('Work from office');
    setSalaryRange('3 - 4 LPA');
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">JOBS</h1>
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

      {activeTab === 'create' ? (
        <div className="max-w-full" style={{ textAlign: 'left' }}>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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

            {/* Skills Dropdown */}
            <div className="text-left">
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-600">
                Requirements
              </label>
              <select
                id="requirements"
                value=""
                onChange={handleSkillSelect}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="" disabled>
                  Select skills
                </option>
                {predefinedSkills.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>

              {/* Render selected skills */}
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
                <option value="More than 5 LPA"> More than 5 LPA</option>
              </select>
            </div>

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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.jobTitle}</h3>
                <p className="text-gray-600 mb-2">{job.jobDescription}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {job.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-orange-100 text-orange-800 rounded-md text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm mb-1">Location: {job.location}</p>
                <p className="text-gray-500 text-sm mb-1">Salary: {job.salaryRange}</p>
                <p className="text-gray-400 text-sm">Posted on: {job.datePosted}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPosting;
