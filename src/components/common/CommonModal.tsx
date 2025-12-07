import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/modal';
import { Button } from '@heroui/button';
import React, { useEffect } from 'react';

interface CommonModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  closeModal?: () => void;
}

const CommonModal: React.FC<CommonModalProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (props.isOpen) {
      onOpen();
    }
  }, [props.isOpen]);
  useEffect(() => {
    if (!isOpen) {
      props.closeModal && props.closeModal();
    }
  }, [isOpen]);
  return (
    <div>
      <Modal
        className="linkszar-light"
        backdrop="blur"
        size={'md'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {props.title}
              </ModalHeader>
              <ModalBody>{props.children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommonModal;
