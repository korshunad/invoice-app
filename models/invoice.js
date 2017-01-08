const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const itemSchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  price: {type: Number},
  quantity: {type: Number},
}) 

const invoiceSchema = new mongoose.Schema( {

  invoiceTitle: {type: String/*, default: 'Invoice', required: true*/},
  invoiceSummary: {type: String},
  invoiceNumber: {type: Number},
  invoiceDate: {type: Date/*, required: true*/},
  paymentdue: {type: Date},

  itemsName: {type: String/*, default: 'ITEMS'*/},
  itemsDescriptionName: {type:String/*, default: 'DESCRIPTION'*/},
  unitPriceName: {type: String/*, default: 'UNIT PRICE'*/},
  quantityName: {type: String/*, default: 'QUANTITY'*/},
  totalName: {type: String/*, default: 'TOTAL'*/},

  currency: {type: String},

  invoiceTotal: {type: Number/*, required: true*/},
  taxName: {type: String},
  tax: {type: Number},
  taxType: {type: String},
  discountName: {type: String},
  discount: {type: Number},
  additionalChargeName: {type: String},
  additionalCharge: {type: Number},

  items: {type: [itemSchema]},  

  notes: {type: String},
  footer: {type: String},

  companyName: {type: String/*, required: true*/},
  companyAddressL1: {type: String},
  companyAddressL2: {type: String},
  companyCity: {type: String},
  companyZip: {type: Number},
  companyCountry: {type: String},
  companyProvince: {type: String},
  companyPhone: {type: String},
  companyWebsite: {type: String},
  companyFax: {type: String},
  companyEmail: {type: String},
  companyAccount: {type: String},
  companyBankAccountHolder: {type: String},
  companyBankName: {type: String},
  companyBankAddress: {type: String},
  companySWIFT: {type: String},  
  companyBIC: {type: String},  
  companyIBAN: {type: String},  
  companyPayPalinfo: {type: String},  
  companyOtherBilling: {type: String},  

  customerName: {type: String/*, required: true*/},
  customerAccount: {type: String},
  customerAddressL1: {type: String},
  customerAddressL2: {type: String},
  customerCity: {type: String},
  customerZip: {type: Number},
  customerCountry: {type: String},
  customerProvince: {type: String},
  customerPhone: {type: String},
  customerEmail: {type: String},
  customerContactFirstName: {type: String},
  customerContactLastName: {type: String},
  customerWebsite: {type: String},
  customerFax: {type: String},
  customerAccountNumber: {type:String}
  
}) 



invoiceSchema.plugin(autoIncrement.plugin, 'Invoice');

const Invoice = mongoose.connection.model('Invoice', invoiceSchema);


module.exports = Invoice
