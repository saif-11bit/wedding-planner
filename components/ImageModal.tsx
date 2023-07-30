import Modal from "./Modal";
import useServiceModal from "@/hooks/userServiceModal";

const ImageModal = () => {
  const {isOpen, onClose} = useServiceModal();

  const onChange = (open: boolean) => {
      if (!open) {
          onClose();
      }
  }

  return ( 
      <Modal
      isOpen={isOpen}
      onChange={onChange}
      title="Image"
      description=""
    >
      <div className="flex gap-4 flex-col justify-center items-center">
        <img src="https://shorturl.at/clvZ1" width={100} height={100} alt="" />
      </div>
    </Modal>
    );
}

export default ImageModal;