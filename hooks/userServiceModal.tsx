import { create } from "zustand";


interface ServiceModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useServiceModal = create<ServiceModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useServiceModal;