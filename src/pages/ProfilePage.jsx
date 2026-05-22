import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';

export const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-center text-slate-400">You need to be signed in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/30 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition-all"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h2 className="text-2xl font-bold">Profile</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-800/40 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold">{(user.name || 'U').split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}</div>
              <div>
                <h3 className="font-semibold text-white">{user.name}</h3>
                <p className="text-xs text-slate-400">Full Name</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800/40 rounded-lg">
            <div className="flex items-start gap-3">
              <Mail className="text-slate-300" />
              <div>
                <h4 className="font-semibold text-white">{user.email}</h4>
                <p className="text-xs text-slate-400">Email</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800/40 rounded-lg">
            <div className="flex items-start gap-3">
              <Phone className="text-slate-300" />
              <div>
                <h4 className="font-semibold text-white">{user.mobileNo || '—'}</h4>
                <p className="text-xs text-slate-400">Mobile Number</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800/40 rounded-lg">
            <div className="flex items-start gap-3">
              <MapPin className="text-slate-300" />
              <div>
                <h4 className="font-semibold text-white">{user.address || '—'}</h4>
                <p className="text-xs text-slate-400">Address</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
