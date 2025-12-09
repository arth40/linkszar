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

interface CommonConfirmModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  placement?: 'center' | 'top' | 'bottom';
  closeModal: () => void;
  confirmAction?: (...args: unknown[]) => unknown;
}

const CommonConfirmModal: React.FC<CommonConfirmModalProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (props.isOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [props.isOpen]);

  const handleConfirmAction = () => {
    if (props.confirmAction) {
      props.confirmAction();
      props.closeModal();
    }
  };

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
        placement={props.placement || 'center'}
        isOpen={isOpen}
        onClose={onClose}
        closeButton={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {props.title}
              </ModalHeader>
              <ModalBody>
                <p className="text-md">{props.description}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="flat"
                  color="primary"
                  onPress={handleConfirmAction}
                >
                  Confirm
                </Button>
                <Button variant="flat" onPress={props.closeModal}>
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

export default CommonConfirmModal;
