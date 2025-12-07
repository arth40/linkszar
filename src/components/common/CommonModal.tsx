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
  placement?: 'center' | 'top' | 'bottom';
  closeModal?: () => void;
  isCloseButtonVisible?: boolean;
}

const CommonModal: React.FC<CommonModalProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (props.isOpen) {
      onOpen();
    } else {
      onClose();
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
              <ModalBody>{props.children}</ModalBody>
              <ModalFooter>
                {props.isCloseButtonVisible && (
                  <Button variant="flat" onPress={onClose}>
                    Close
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommonModal;
