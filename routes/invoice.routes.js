import { Router } from 'express';
import * as InvoiceController from '../controllers/invoice.controller';

const router = new Router();


// Add a new good
router.route('/invoices').post(InvoiceController.addInvoice);


export default router;
