import React from "react";
import Modal from "react-bootstrap/Modal";
import "./OrderModal.css";

const OrderModal = (props) => {
  // let sentImage;
  // var reader = new FileReader();
  //           reader.readAsDataURL(props.image);
  //           reader.onloadend =(event)=>{
  //             sentImage=event.target.result;
  //           }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Make Your Order Now</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <a className="order-method" target="_blank" rel="noopener noreferrer" href={"https://api.WhatsApp.com/send?phone=+201101038345&text=I would like to make an order for the " + props.name}>
          <i className="fab fa-whatsapp"></i>Order through WhatsApp
        </a>
        {/* <MessengerSendToMessenger pageId="<PAGE_ID>" appId="<APP_ID>"/> */}
        {/* <a className="order-method" target="_blank" href="#">  <i className="fab fa-facebook-f"></i>https://www.facebook.com/izi.handmade</a>
        <a className="order-method" target="_blank" href="#"><i className="fab fa-instagram"></i>https://www.instagram.com/izi.handmade</a> */}
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default OrderModal;
