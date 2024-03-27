import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import React from "react"






export default function MessagesModal({Name , Description , Status , Id , Delete}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [scrollBehavior, setScrollBehavior] = React.useState('inside')
  
    const btnRef = React.useRef(null)
    return (
      <>
        
  
        <Button ref={btnRef} onClick={onOpen}>
          See Details
        </Button>
  
        <Modal
          onClose={onClose}
          finalFocusRef={btnRef}
          isOpen={isOpen}
          style={{margin:'10px'}}
          scrollBehavior={scrollBehavior}
        >
          <ModalOverlay  />
          <ModalContent p={3} >
            <ModalHeader>Name - {Name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <h1>Task Id - {Id}</h1>
            <h1>Task status - {Status}</h1>
            <h1>Description</h1>
             <p>{Description}</p>
           
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }