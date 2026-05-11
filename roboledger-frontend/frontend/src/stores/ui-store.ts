import { create } from 'zustand';

export type ModalType = 'ROBOT' | 'TASK' | 'SETTLEMENT' | 'LOG' | 'NETWORK_STATS' | 'LIVE_BLOCK' | 'FLEET_EFFICIENCY' | null;

interface UiStore {
  activeModal: ModalType;
  modalData: any;
  openModal: (type: ModalType, data: any) => void;
  closeModal: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  activeModal: null,
  modalData: null,
  openModal: (type, data) => set({ activeModal: type, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null })
}));
