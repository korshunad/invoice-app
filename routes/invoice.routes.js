import { Router } from 'express';
import * as InvoiceController from '../controllers/invoice.controller';

const router = new Router();


// Add a new good
router.route('/invoices').post(InvoiceController.addInvoice);

// Get all invoices
router.route('/invoices').get(InvoiceController.getInvoices);

router.route('/pdf').get(InvoiceController.getPdf);

router.route('/pdfs/:id').get(InvoiceController.generatePdf);

export default router;

