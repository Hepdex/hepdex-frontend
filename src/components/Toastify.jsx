import {toast } from 'react-toastify';
const customId = "id-static";


const Toastify = (msg) => {
     toast.error(msg, {
      toastId: customId,
      position: 'top-center'
    });
}


export {Toastify};