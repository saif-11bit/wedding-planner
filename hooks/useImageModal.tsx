import { create } from "zustand";


interface ImgModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useImgModal = create<ImgModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useImgModal;