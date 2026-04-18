'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import BookingModal from '../components/BookingModal';
import CaretakersModal from '../components/CaretakersModal';
import ProfileModal from '../components/ProfileModal';

interface ModalContextProps {
  openBookingModal: () => void;
  closeBookingModal: () => void;
  openCaretakersModal: () => void;
  closeCaretakersModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCaretakersOpen, setIsCaretakersOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // We are going to mount these modals right here inside the provider
  return (
    <ModalContext.Provider
      value={{
        openBookingModal: () => setIsBookingOpen(true),
        closeBookingModal: () => setIsBookingOpen(false),
        openCaretakersModal: () => setIsCaretakersOpen(true),
        closeCaretakersModal: () => setIsCaretakersOpen(false),
        openProfileModal: () => setIsProfileOpen(true),
        closeProfileModal: () => setIsProfileOpen(false),
      }}
    >
      {children}
      {isBookingOpen && <BookingModal onClose={() => setIsBookingOpen(false)} />}
      {isCaretakersOpen && <CaretakersModal onClose={() => setIsCaretakersOpen(false)} />}
      {isProfileOpen && <ProfileModal onClose={() => setIsProfileOpen(false)} />}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
}
