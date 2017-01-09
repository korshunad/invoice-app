import Invoice from '../models/invoice';
var jadepdf = require('jade-pdf2')
  , fs = require('fs');


// Add an invoice 
let addedId=null;
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

export function getPdf(req, res) {
  Invoice.find().exec((err, invoices) => {
    if (err) {
      return res.status(500).send(err);
    }
  res.render('pdf', { invoice: invoices[invoices.length-1]})
  });
}


export function generatePdf(req, res) {
  Invoice.findOne({_id: req.params.id })
    .exec((err, invoice) => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(invoice)
      fs.createReadStream('views/test.pug')
        .pipe(jadepdf({locals: {invoice: invoice}}))
        .pipe(fs.createWriteStream('dist/invoices/document.pdf'))
        .on('finish', function(){
            res.redirect('/invoices/document.pdf')
        });
    })
}

 





