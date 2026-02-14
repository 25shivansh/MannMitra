'use client';

import { useState } from 'react';

// Sample counselor data - replace with your actual data source
const counselors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Licensed Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Stress Management"],
    experience: "8 years",
    location: "Main Campus - Building A, Room 201",
    availability: "Mon-Fri: 9:00 AM - 5:00 PM",
    image: "/api/placeholder/150/150",
    rating: 4.9,
    university: "University Health Center",
    languages: ["English", "Spanish"],
    nextAvailable: "Tomorrow at 2:00 PM"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    title: "Counseling Psychologist",
    specialties: ["Academic Stress", "Social Anxiety", "Career Guidance"],
    experience: "6 years",
    location: "Student Wellness Center - Floor 2",
    availability: "Tue-Sat: 10:00 AM - 6:00 PM",
    image: "/api/placeholder/150/150",
    rating: 4.8,
    university: "Student Support Services",
    languages: ["English", "Mandarin"],
    nextAvailable: "Today at 4:30 PM"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    title: "Licensed Marriage & Family Therapist",
    specialties: ["Relationship Issues", "Family Dynamics", "Life Transitions"],
    experience: "12 years",
    location: "Counseling Center - Suite 105",
    availability: "Mon-Wed-Fri: 8:00 AM - 4:00 PM",
    image: "/api/placeholder/150/150",
    rating: 4.9,
    university: "Campus Counseling Services",
    languages: ["English", "Spanish", "Portuguese"],
    nextAvailable: "Friday at 10:00 AM"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    title: "Clinical Social Worker",
    specialties: ["Trauma Counseling", "PTSD", "Grief Support"],
    experience: "10 years",
    location: "Health Services - Wing B",
    availability: "Mon-Thu: 9:00 AM - 7:00 PM",
    image: "/api/placeholder/150/150",
    rating: 4.7,
    university: "University Mental Health",
    languages: ["English"],
    nextAvailable: "Wednesday at 1:00 PM"
  },
  {
    id: 5,
    name: "Dr. Priya Patel",
    title: "Licensed Professional Counselor",
    specialties: ["Cultural Identity", "International Students", "Mindfulness"],
    experience: "7 years",
    location: "International Student Center",
    availability: "Tue-Fri: 11:00 AM - 7:00 PM",
    image: "/api/placeholder/150/150",
    rating: 4.8,
    university: "Global Student Support",
    languages: ["English", "Hindi", "Gujarati"],
    nextAvailable: "Thursday at 3:00 PM"
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    title: "Psychiatric Nurse Practitioner",
    specialties: ["Medication Management", "Bipolar Disorder", "ADHD"],
    experience: "9 years",
    location: "Medical Center - Floor 3",
    availability: "Mon-Wed-Fri: 8:00 AM - 3:00 PM",
    image: "/api/placeholder/150/150",
    rating: 4.6,
    university: "Campus Medical Services",
    languages: ["English", "Korean"],
    nextAvailable: "Monday at 9:30 AM"
  }
];

export default function CounselorsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedCounselor, setSelectedCounselor] = useState<typeof counselors[0] | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    type: 'in-person',
    reason: '',
    emergency: false
  });

  // Get unique specialties for filter
  const allSpecialties = ['All', ...new Set(counselors.flatMap(c => c.specialties))];

  // Filter counselors based on selected specialty
  const filteredCounselors = selectedSpecialty === 'All' 
    ? counselors 
    : counselors.filter(c => c.specialties.includes(selectedSpecialty));

  const handleBooking = (counselor:any) => {
    setSelectedCounselor(counselor);
    setShowBookingModal(true);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    // Here you would typically make an API call to book the session
    console.log('Booking submitted:', {
      counselor: selectedCounselor ,
      ...bookingForm
    });
    
    // Show success message (you can replace with proper notification)
    if (selectedCounselor) {
      alert(`Booking request submitted for ${selectedCounselor.name}. You will receive a confirmation email shortly.`);
    }
    setShowBookingModal(false);
    setBookingForm({ date: '', time: '', type: 'in-person', reason: '', emergency: false });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">MannMitra</h1>
                <p className="text-sm text-gray-400">AI-Powered Care, Human-Centered Support</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">About Mann Mitra</a>
              <button className="p-2 text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </button>
              <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Campus Mental Health Counselors</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Connect with licensed mental health professionals at your university. Book confidential, 
            in-person sessions for personalized support and guidance.
          </p>
          
          {/* Emergency Notice */}
          <div className="bg-red-900/50 border border-red-800 rounded-xl p-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h3 className="text-red-300 font-semibold">Crisis Support</h3>
            </div>
            <p className="text-red-100 text-sm">
              If you're experiencing a mental health emergency, please call Campus Security at <span className="font-bold">911</span> or 
              the Crisis Hotline at <span className="font-bold">1-800-273-8255</span>
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Filter by Specialty</h3>
            <div className="flex flex-wrap gap-3">
              {allSpecialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedSpecialty === specialty
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Counselors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCounselors.map((counselor) => (
            <div key={counselor.id} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg hover:border-teal-500 transition-all duration-300">
              {/* Profile Section */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{counselor.name}</h3>
                <p className="text-teal-400 font-medium">{counselor.title}</p>
                <p className="text-gray-400 text-sm">{counselor.university}</p>
              </div>

              {/* Rating and Experience */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-yellow-400 font-medium">{counselor.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">{counselor.experience} experience</span>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {counselor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Languages</h4>
                <p className="text-gray-400 text-sm">{counselor.languages.join(', ')}</p>
              </div>

              {/* Location and Availability */}
              <div className="mb-4 space-y-2">
                <div className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-400 text-sm">{counselor.location}</p>
                </div>
                <div className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-400 text-sm">{counselor.availability}</p>
                </div>
              </div>

              {/* Next Available */}
              <div className="bg-green-900/30 border border-green-800 rounded-lg p-3 mb-4">
                <p className="text-green-300 text-sm font-medium">Next Available: {counselor.nextAvailable}</p>
              </div>

              {/* Book Session Button */}
              <button
                onClick={() => handleBooking(counselor)}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Book Session
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Book Session</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-300 mb-1">Counselor: <span className="text-teal-400">{selectedCounselor?.name}</span></p>
              <p className="text-gray-400 text-sm">{selectedCounselor?.title}</p>
            </div>

            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date</label>
                <input
                  type="date"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Time</label>
                <input
                  type="time"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={bookingForm.time}
                  onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Session Type</label>
                <select
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={bookingForm.type}
                  onChange={(e) => setBookingForm({...bookingForm, type: e.target.value})}
                >
                  <option value="in-person">In-Person Session</option>
                  <option value="phone">Phone Consultation</option>
                  <option value="video">Video Call</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reason for Visit (Optional)</label>
                <textarea
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent h-20 resize-none"
                  placeholder="Brief description of what you'd like to discuss..."
                  value={bookingForm.reason}
                  onChange={(e) => setBookingForm({...bookingForm, reason: e.target.value})}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="emergency"
                  className="w-4 h-4 text-red-500 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                  checked={bookingForm.emergency}
                  onChange={(e) => setBookingForm({...bookingForm, emergency: e.target.checked})}
                />
                <label htmlFor="emergency" className="text-sm text-gray-300">
                  This is an urgent/emergency request
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}