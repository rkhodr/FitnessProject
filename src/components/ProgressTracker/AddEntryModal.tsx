import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    squat: number;
    bench: number;
    deadlift: number;
    calories: number;
    weight: number;
  }) => void;
}

const AddEntryModal: React.FC<AddEntryModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    squat: '',
    bench: '',
    deadlift: '',
    calories: '',
    weight: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      squat: Number(formData.squat),
      bench: Number(formData.bench),
      deadlift: Number(formData.deadlift),
      calories: Number(formData.calories),
      weight: Number(formData.weight),
    });
    onClose();
    setFormData({ squat: '', bench: '', deadlift: '', calories: '', weight: '' });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded-xl bg-white p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold">Add New Entry</Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium mb-3">Lift Numbers</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Squat (lbs)
                  </label>
                  <input
                    type="number"
                    value={formData.squat}
                    onChange={(e) => setFormData({ ...formData, squat: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bench (lbs)
                  </label>
                  <input
                    type="number"
                    value={formData.bench}
                    onChange={(e) => setFormData({ ...formData, bench: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deadlift (lbs)
                  </label>
                  <input
                    type="number"
                    value={formData.deadlift}
                    onChange={(e) => setFormData({ ...formData, deadlift: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Daily Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calories
                  </label>
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save Entry
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddEntryModal; 