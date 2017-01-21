import { Router } from 'express';
import * as InvoiceController from '../controllers/invoice.controller';

const router = new Router();


router.route('/invoices').post(InvoiceController.addInvoice);

router.route('/invoices').get(InvoiceController.getInvoices);

router.route('/pdfs/:id').get(InvoiceController.generatePdf);

router.route('/invoices/:id').put(InvoiceController.editInvoice);

router.route('/invoices/:id').delete(InvoiceController.deleteInvoice);

router.route('/invoices/:id').get(InvoiceController.getInvoice);

export default router;

