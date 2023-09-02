import { create } from "zustand";

interface useGuideModalGuide {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useGuideModal = create<useGuideModalGuide>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false }),
}));