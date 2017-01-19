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
    res.json({ invoice: saved }); // or might be saved.id
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
  res.render('pdf', { invoice: invoices[1]})
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
        .pipe(jadepdf({ locals: {invoice: invoice}}))
        .pipe(fs.createWriteStream('dist/invoices/document.pdf'))
        .on('finish', function(){
            res.redirect('/invoices/document.pdf')
        });
    })
}

 
export function editInvoice(req, res) {
 Invoice.findOne({_id:req.params.id}).exec((err, invoice) => {
    if(err){
      return res.status(500).send(err);
    } else {

       /* good.categoryId = req.body.good.categoryId || good.categoryId;
        good.name= req.body.good.name || good.name;
        good.purchasingPrice = req.body.good.purchasingPrice || good.purchasingPrice;
        good.retailPrice = req.body.good.retailPrice || good.retailPrice;*/
 invoice.invoiceTitle =  req.body.invoice.invoiceTitle || invoice.invoiceTitle ,
 invoice.invoiceSummary =  req.body.invoice.invoiceSummary || invoice.invoiceSummary ,
 invoice.invoiceNumber =  req.body.invoice.invoiceNumber || invoice.invoiceNumber ,
 invoice.invoiceDate =  req.body.invoice.invoiceDate || invoice.invoiceDate ,
 invoice.paymentDue =  req.body.invoice.paymentDue || invoice.paymentDue ,

 invoice.itemsName =  req.body.invoice.itemsName || invoice.itemsName ,
 invoice.itemsDescriptionName =  req.body.invoice.itemsDescriptionName || invoice.itemsDescriptionName ,
 invoice.unitPriceName =  req.body.invoice.unitPriceName || invoice.unitPriceName ,
 invoice.quantityName =  req.body.invoice.quantityName || invoice.quantityName ,
 invoice.totalName =  req.body.invoice.totalName || invoice.totalName ,

 invoice.currencySymbol =  req.body.invoice.currencySymbol ,
 invoice.currencyCode =  req.body.invoice.currencyCode,

 invoice.invoiceTotal =  req.body.invoice.invoiceTotal || invoice.invoiceTotal ,
 invoice.taxName =  req.body.invoice.taxName || invoice.taxName ,
 invoice.tax =  req.body.invoice.tax || invoice.tax ,
 invoice.taxType =  req.body.invoice.taxType || invoice.taxType ,
 invoice.discountName =  req.body.invoice.discountName || invoice.discountName ,
 invoice.discount =  req.body.invoice.discount || invoice.discount ,
 invoice.additionalChargeName =  req.body.invoice.additionalChargeName || invoice.additionalChargeName ,
 invoice.additionalCharge =  req.body.invoice.additionalCharge || invoice.additionalCharge ,

 invoice.items =  req.body.invoice.items || invoice.items ,  

 invoice.notes =  req.body.invoice.notes || invoice.notes ,
 invoice.footer =  req.body.invoice.footer || invoice.footer ,

 invoice.companyName =  req.body.invoice.companyName || invoice.companyName ,
 invoice.companyAddressL1 =  req.body.invoice.companyAddressL1 || invoice.companyAddressL1 ,
 invoice.companyAddressL2 =  req.body.invoice.companyAddressL2 || invoice.companyAddressL2 ,
 invoice.companyCity =  req.body.invoice.companyCity || invoice.companyCity ,
 invoice.companyZip =  req.body.invoice.companyZip || invoice.companyZip ,
 invoice.companyCountry =  req.body.invoice.companyCountry || invoice.companyCountry ,
 invoice.companyProvince =  req.body.invoice.companyProvince || invoice.companyProvince ,
 invoice.companyPhone =  req.body.invoice.companyPhone || invoice.companyPhone ,
 invoice.companyWebsite =  req.body.invoice.companyWebsite || invoice.companyWebsite ,
 invoice.companyFax =  req.body.invoice.companyFax || invoice.companyFax ,
 invoice.companyEmail =  req.body.invoice.companyEmail || invoice.companyEmail ,
 invoice.companyAccount =  req.body.invoice.companyAccount || invoice.companyAccount ,
 invoice.companyBankAccountHolder =  req.body.invoice.companyBankAccountHolder || invoice.companyBankAccountHolder ,
 invoice.companyBankName =  req.body.invoice.companyBankName || invoice.companyBankName ,
 invoice.companyBankAddress =  req.body.invoice.companyBankAddress || invoice.companyBankAddress ,
 invoice.companySWIFT =  req.body.invoice.companySWIFT || invoice.companySWIFT ,  
 invoice.companyBIC =  req.body.invoice.companyBIC || invoice.companyBIC ,  
 invoice.companyIBAN =  req.body.invoice.companyIBAN || invoice.companyIBAN ,  
 invoice.companyPayPalinfo =  req.body.invoice.companyPayPalinfo || invoice.companyPayPalinfo ,  
 invoice.companyOtherBilling =  req.body.invoice.companyOtherBilling || invoice.companyOtherBilling ,  

 invoice.customerName =  req.body.invoice.customerName || invoice.customerName ,
 invoice.customerAccount =  req.body.invoice.customerAccount || invoice.customerAccount ,
 invoice.customerAddressL1 =  req.body.invoice.customerAddressL1 || invoice.customerAddressL1 ,
 invoice.customerAddressL2 =  req.body.invoice.customerAddressL2 || invoice.customerAddressL2 ,
 invoice.customerCity =  req.body.invoice.customerCity || invoice.customerCity ,
 invoice.customerZip =  req.body.invoice.customerZip || invoice.customerZip ,
 invoice.customerCountry =  req.body.invoice.customerCountry || invoice.customerCountry ,
 invoice.customerProvince =  req.body.invoice.customerProvince || invoice.customerProvince ,
 invoice.customerPhone =  req.body.invoice.customerPhone || invoice.customerPhone ,
 invoice.customerEmail =  req.body.invoice.customerEmail || invoice.customerEmail ,
 invoice.customerContactFirstName =  req.body.invoice.customerContactFirstName || invoice.customerContactFirstName ,
 invoice.customerContactLastName =  req.body.invoice.customerContactLastName || invoice.customerContactLastName ,
 invoice.customerWebsite =  req.body.invoice.customerWebsite || invoice.customerWebsite ,
 invoice.customerFax =  req.body.invoice.customerFax || invoice.customerFax ,
 invoice.customerAccountNumber =  req.body.invoice.customerAccountNumber || invoice.customerAccountNumber 

 invoice.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ invoice: saved });
  });

    }
  });
}



export function deleteInvoice(req, res) {
  Invoice.findOne({ _id: req.params.id }).exec((err, invoice) => {

    if (err) {
      return res.status(500).send(err);
    }

    invoice.remove(() => {
      res.status(200).end();
    });
  });
}


export function getInvoice(req, res) {
  Invoice.findOne({ _id: req.params.id }).exec((err, invoice) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ invoice });
  });
}




