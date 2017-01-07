import Invoice from '../models/invoice';


// Add an invoice 

export function addInvoice(req, res) {
  console.log(req.body)
/*  if (!req.body.invoice.invoiceTitle || !req.body.invoice.invoiceDate || !req.body.invoice.invoiceTotal || !req.body.invoice.companyName || !req.body.invoice.customerName) {
    return res.status(403).end();
  } 
*/
  const newInvoice = new Invoice(req.body.invoice);

  newInvoice.save((err, saved) => {
    console.log("saved"+saved)
    if (err) {
     return res.status(500).send(err);
    }

    res.json({ invoice: saved._id }); // or might be saved.id
  });
}

// Get all invoices
export function getInvoices(req, res) {
  Invoice.find().exec((err, invoices) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ invoices });
  });
}
