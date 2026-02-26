import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactMarkdown from 'react-markdown';
import { 
  Search, 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  BookOpen, 
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  Mic,
  Camera,
  Link as LinkIcon,
  ExternalLink,
  Clock,
  Bookmark,
  Copy,
  Check
} from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';

const AIQueryFeature = () => {
  // State management
  const [selectedSubjects, setSelectedSubjects] = useLocalStorage('selectedSubjects', []);
  const [query, setQuery] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);

  // Available subjects with metadata
  const availableSubjects = [
    { 
      id: 'physics', 
      name: 'Physics', 
      icon: '⚛️', 
      color: 'blue',
      chapters: ['Laws of Motion', 'Thermodynamics', 'Optics', 'Electromagnetism']
    },
    { 
      id: 'chemistry', 
      name: 'Chemistry', 
      icon: '🧪', 
      color: 'green',
      chapters: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry']
    },
    { 
      id: 'mathematics', 
      name: 'Mathematics', 
      icon: '📐', 
      color: 'purple',
      chapters: ['Calculus', 'Algebra', 'Geometry', 'Trigonometry']
    },
    { 
      id: 'biology', 
      name: 'Biology', 
      icon: '🧬', 
      color: 'emerald',
      chapters: ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology']
    },
    { 
      id: 'computer-science', 
      name: 'Computer Science', 
      icon: '💻', 
      color: 'orange',
      chapters: ['Data Structures', 'Algorithms', 'Programming', 'DBMS']
    },
    { 
      id: 'history', 
      name: 'History', 
      icon: '📜', 
      color: 'amber',
      chapters: ['Ancient History', 'Medieval History', 'Modern History']
    }
  ];

  // Color mapping for UI
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    green: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
  };

  // File dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    maxSize: 5242880, // 5MB
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setError('File too large or invalid format. Max size: 5MB');
        return;
      }
      
      const file = acceptedFiles[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
      
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  });

  // Handle subject selection (max 3)
  const toggleSubject = (subjectId) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subjectId)) {
        return prev.filter(id => id !== subjectId);
      } else if (prev.length < 3) {
        return [...prev, subjectId];
      }
      return prev;
    });
  };

  // Remove image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setUploadProgress(0);
  };

  // Handle query submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!query && !imageFile) {
      setError('Please enter a question or upload an image');
      return;
    }

    if (selectedSubjects.length === 0) {
      setError('Please select at least one subject');
      return;
    }

    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('query', query);
      formData.append('subjects', JSON.stringify(selectedSubjects));
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      // Make API call to backend
      const response = await fetch('http://localhost:3000/api/query', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to get answer');
      }

      const data = await response.json();
      setAnswer(data);
      
      // Generate suggested questions based on answer
      if (data.sources && data.sources.length > 0) {
        generateSuggestedQuestions(data.sources);
      }
      
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Generate suggested questions
  const generateSuggestedQuestions = (sources) => {
    const questions = [
      "Can you explain this in more detail?",
      "What are the key concepts here?",
      "Give me examples related to this topic",
      "What are the applications of this?",
      "Summarize this topic briefly"
    ];
    setSuggestedQuestions(questions);
  };

  // Copy answer to clipboard
  const copyAnswer = () => {
    if (answer?.answer) {
      navigator.clipboard.writeText(answer.answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Handle suggested question click
  const handleSuggestedQuestion = (question) => {
    setQuery(question);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-500" />
          AI Study Assistant
          <span className="text-sm font-normal text-gray-500 ml-2">
            Powered by your notes
          </span>
        </h1>
        <p className="text-gray-600 mt-2">
          Select up to 3 subjects and ask anything. I'll answer using only your study materials.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar - Subject Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
              <span>Select Subjects</span>
              <span className="text-sm font-normal text-gray-500">
                {selectedSubjects.length}/3 selected
              </span>
            </h2>
            
            <div className="space-y-2">
              {availableSubjects.map(subject => {
                const isSelected = selectedSubjects.includes(subject.id);
                const isDisabled = selectedSubjects.length >= 3 && !isSelected;
                
                return (
                  <button
                    key={subject.id}
                    onClick={() => toggleSubject(subject.id)}
                    disabled={isDisabled}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-200
                      ${isSelected 
                        ? `border-${subject.color}-500 bg-${subject.color}-50` 
                        : isDisabled
                          ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{subject.icon}</span>
                        <span className={`font-medium ${isSelected ? `text-${subject.color}-700` : 'text-gray-700'}`}>
                          {subject.name}
                        </span>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className={`w-5 h-5 text-${subject.color}-500`} />
                      )}
                    </div>
                    
                    {/* Show chapters when selected */}
                    {isSelected && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {subject.chapters.slice(0, 2).map((chapter, idx) => (
                          <span key={idx} className={`text-xs px-2 py-1 rounded-full bg-${subject.color}-100 text-${subject.color}-700`}>
                            {chapter}
                          </span>
                        ))}
                        {subject.chapters.length > 2 && (
                          <span className={`text-xs px-2 py-1 rounded-full bg-${subject.color}-100 text-${subject.color}-700`}>
                            +{subject.chapters.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Subjects Summary */}
            {selectedSubjects.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Selected for this query:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSubjects.map(id => {
                    const subject = availableSubjects.find(s => s.id === id);
                    return (
                      <span key={id} className={`px-3 py-1 rounded-full text-sm ${colorClasses[subject.color]}`}>
                        {subject.icon} {subject.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Query Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Query Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Text Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Question
                </label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., Explain Newton's First Law of Motion..."
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           resize-none transition-all duration-200"
                />
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or Upload an Image (Optional)
                </label>
                {!imageFile ? (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
                              transition-all duration-200
                              ${isDragActive 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                              }`}
                  >
                    <input {...getInputProps()} />
                    <ImageIcon className={`w-10 h-10 mx-auto mb-3 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
                    <p className="text-sm text-gray-600">
                      {isDragActive ? 'Drop the image here' : 'Drag & drop an image, or click to select'}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Supports: JPG, PNG, GIF (Max 5MB)
                    </p>
                  </div>
                ) : (
                  <div className="relative border rounded-xl overflow-hidden">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={removeImage}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                    {uploadProgress < 100 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || (!query && !imageFile) || selectedSubjects.length === 0}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 
                         text-white font-medium rounded-xl shadow-md
                         hover:from-blue-600 hover:to-blue-700 
                         disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed
                         transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Get Answer from Notes
                  </>
                )}
              </button>
            </form>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* Answer Display */}
          {answer && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Answer Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Answer from your notes
                  </h2>
                  <button
                    onClick={copyAnswer}
                    className="p-2 hover:bg-white rounded-lg transition-colors relative"
                    title="Copy answer"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                    {copied && (
                      <span className="absolute -top-8 right-0 text-xs bg-gray-800 text-white px-2 py-1 rounded">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Answer Content */}
              <div className="px-6 py-4">
                <div className="prose max-w-none">
                  <ReactMarkdown>{answer.answer}</ReactMarkdown>
                </div>
              </div>

              {/* Citations/Sources */}
              {answer.sources && answer.sources.length > 0 && (
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Sources ({answer.sources.length})
                  </h3>
                  <div className="space-y-3">
                    {answer.sources.map((source, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 mb-1">{source.text}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                {source.book}
                              </span>
                              <span className="flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                Page {source.page}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Chapter {source.chapter}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium
                              ${colorClasses[availableSubjects.find(s => s.id === source.subject)?.color] || 'bg-gray-100 text-gray-700'}`}>
                              {availableSubjects.find(s => s.id === source.subject)?.name || source.subject}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Questions */}
              {suggestedQuestions.length > 0 && (
                <div className="bg-white px-6 py-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Suggested follow-up questions:</h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 
                                 rounded-full text-sm text-gray-700 transition-colors
                                 flex items-center gap-1"
                      >
                        {question}
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!answer && !loading && !error && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Ready to help you study
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Select subjects and ask a question or upload an image. 
                  I'll search through your notes to find the answer.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIQueryFeature;